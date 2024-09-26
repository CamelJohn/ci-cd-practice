import esBuild from 'esbuild';

esBuild.build({
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    minify: true,
    platform: 'node',
    format: 'esm',
    logLevel: 'verbose',
}).catch(() => process.exit(1))