// jest.config.js
// const nextJest = import 'next/jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const clientTestConfig = {
  displayName: 'client',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/client/**/*.[jt]s?(x)'],
  setupFilesAfterEnv: [
    '<rootDir>/__mocks__/before.ts',
    '<rootDir>/jest.setup.ts',
  ],
};

const serverTestConfig = {
  preset: '@shelf/jest-mongodb',
  displayName: 'server',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/server/**/*.[jt]s?(x)'],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
    '<rootDir>/__tests__/env_setup.ts',
  ],
};

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */

// const customJestConfig = {
//   // Add more setup options before each test is run
//   // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
//   moduleDirectories: ['node_modules', '<rootDir>/'],
//   testPathIgnorePatterns: [
//     '<rootDir>/old/*',
//     '<rootDir>/src/components/global/examples/*',
//   ],
//   testEnvironment: 'jest-environment-jsdom',
//   setupFilesAfterEnv: [
//     '<rootDir>/__mocks__/before.ts',
//     '<rootDir>/jest.setup.ts',
//   ],
//   moduleNameMapper: {
//     axios: '<rootDir>/node_modules/axios/dist/node/axios.cjs',
//     '^@chakra/(.*)$': '<rootDir>/chakra/$1',
//     '^@styles/(.*)$': '<rootDir>/styles/$1',
//     '^@components/(.*)$': '<rootDir>/components/$1',
//     '^@components(.*)$': '<rootDir>/components',
//     '^@global/(.*)$': '<rootDir>/components/global/$1',
//     '^@global(.*)$': '<rootDir>/components/global',
//     '^@redux/(.*)$': '<rootDir>/redux/$1',
//     '^@hooks/(.*)$': '<rootDir>/hooks/$1',
//     '^@hooks(.*)$': '<rootDir>/hooks',
//     '^@utils/(.*)$': '<rootDir>/utils/$1',
//     '^@icons/(.*)$': '<rootDir>/icons/$1',
//     '^@icons(.*)$': '<rootDir>/icons$1',
//   },
// };

const config = {
  // Add more setup options before each test is run
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testPathIgnorePatterns: [
    '<rootDir>/old/*',
    '<rootDir>/src/components/global/examples/*',
  ],
  moduleNameMapper: {
    axios: '<rootDir>/node_modules/axios/dist/node/axios.cjs',
    '^@chakra/(.*)$': '<rootDir>/chakra/$1',
    '^@styles/(.*)$': '<rootDir>/styles/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@components(.*)$': '<rootDir>/components',
    '^@global/(.*)$': '<rootDir>/components/global/$1',
    '^@global(.*)$': '<rootDir>/components/global',
    '^@redux/(.*)$': '<rootDir>/redux/$1',
    '^@hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@hooks(.*)$': '<rootDir>/hooks',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@icons/(.*)$': '<rootDir>/icons/$1',
    '^@icons(.*)$': '<rootDir>/icons$1',
  },
  projects: [
    await createJestConfig(serverTestConfig)(),
    await createJestConfig(clientTestConfig)(),
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default config;
