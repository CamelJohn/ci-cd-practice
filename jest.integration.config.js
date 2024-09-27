import baseJestConfig from './jest.config.js';

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    ...baseJestConfig,
    testMatch: ['<rootDir>/**/*.test.ts'],
};
