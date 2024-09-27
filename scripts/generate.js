import fs from 'node:fs/promises';
import path from 'node:path';
import util from 'node:util';
import child_process from 'node:child_process';

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

async function generateModule(name) {
    const folderPath = await createRootFolder(name);
    const successfullCreatingFiles = await createFiles(folderPath);

    if (!successfullCreatingFiles) {
        return;
    }

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

const [moduleName] = process.argv.slice(3);

generateModule(moduleName);