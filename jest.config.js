import { createDefaultPreset } from 'ts-jest';
// import { compilerOptions } from './tsconfig.json' assert { type: 'json' };

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: [
      '**/__tests__/**/*.+(ts|tsx|js)',
      '**/?(*.)(spec|test).+(ts|tsx|js)'
    ],
    testEnvironmentOptions: {
        node: {
            loader: 'ts-jest/loader',
        },
    },
    roots: ['<rootDir>'],
    // modulePaths: compilerOptions.baseUrl,
    transform: {
        ...createDefaultPreset().transform,
        '^.+.tsx?$': ['ts-jest', {}],
    },
};
