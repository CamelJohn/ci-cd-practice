import fs from 'node:fs/promises';
import path from 'node:path';
import util from 'node:util';
import child_process from 'node:child_process';

const ROUTE_IMPORT_STATEMENT = "import __dto__Routes from './modules/__dto__';\n";
const ROUTE_USE_STATEMENT = "main_router.use('/__dto__', __dto__Routes);\n\n";

async function createRootFolder(name) {
    const fullPath = path.join(process.cwd(), 'src', 'modules', name);
    await fs.mkdir(fullPath, { recursive: true });

    return fullPath;
}

async function createFiles(folderPath) {
    try {
        const asyncExec = util.promisify(child_process.exec);
        const templatesPath = path.join(process.cwd(), 'scripts', 'templates');
        await asyncExec(`cp ${templatesPath}/*.ts ${folderPath}`);
        return true;
    } catch (error) {
        console.error({ error });
        return false;
    }
}

function capitalize(text) {
    return text.replace(/./, c => c.toUpperCase());
}

async function handleRouter(mainRouterFile) {
    const originalImport = "import express from 'express';\n";
    const withImport =mainRouterFile.replace(originalImport, originalImport.concat(ROUTE_IMPORT_STATEMENT));
    const originalExport = "export default main_router;";
    const updatedFile = withImport.replace(originalExport, ROUTE_USE_STATEMENT.concat(originalExport));

    return updatedFile;
}

async function linkModuleToMainRouter() {
    const mainRouterPath = path.join(process.cwd(), 'src', 'router.ts');
    try {
        const mainRouterFile = await fs.readFile(mainRouterPath, 'utf-8');
        const updatedFile = await handleRouter(mainRouterFile);

        await fs.writeFile(mainRouterPath, updatedFile, { encoding: 'utf-8' });
    } catch (error) {
        console.error({ error });
    }
}

async function replaceModulePlaceholders(folderPath, name) {
    const moduleNameCapitalized = capitalize(name);

    const files = await fs.readdir(folderPath);

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const newContent = content
            .replace(/__module__/g, moduleNameCapitalized)
            .replace(/__dto__/g, name);

        await fs.writeFile(filePath, newContent);
    }
}

async function replaceMainRouterPlaceholders(name) {
    const mainRouterPath = path.join(process.cwd(), 'src', 'router.ts');
    const mainRouterFile = await fs.readFile(mainRouterPath, 'utf-8');
    const newContent = mainRouterFile.replace(/__dto__/g, name);
    await fs.writeFile(mainRouterPath, newContent);
}

async function generateModule(name) {
    const folderPath = await createRootFolder(name);
    const successfullCreatingFiles = await createFiles(folderPath);

    if (!successfullCreatingFiles) {
        return;
    }

    await linkModuleToMainRouter();
    await replaceModulePlaceholders(folderPath, name);
    await replaceMainRouterPlaceholders(name);
}

const [moduleName] = process.argv.slice(3);

generateModule(moduleName);