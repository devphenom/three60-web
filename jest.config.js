// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testPathIgnorePatterns: [
    '<rootDir>/old/',
    '<rootDir>/src/components/global/examples/',
  ],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    axios: '<rootDir>/node_modules/axios/dist/node/axios.cjs',
    '^@chakra/(.*)$': '<rootDir>/src/chakra/$1',
    '^@styles/(.*)$': '<rootDir>/styles/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@global/(.*)$': '<rootDir>/src/components/global/$1',
    '^@redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
