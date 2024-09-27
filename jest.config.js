import { createDefaultPreset } from 'ts-jest';
// import { compilerOptions } from './tsconfig.json' assert { type: 'json' };

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['<rootDir>/**/*.spec.ts'],
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
