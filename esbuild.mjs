import esBuild from 'esbuild';

esBuild.build({
    entryPoints: ['src/**/*.ts'],
    outdir: 'dist',
    bundle: false,
    minify: false,
    platform: 'node',
    format: 'cjs',
    target: 'node20',
    logLevel: 'info',
}).catch(() => process.exit(1))