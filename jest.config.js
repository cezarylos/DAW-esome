module.exports = {
    'preset': 'ts-jest',
    'moduleFileExtensions': [
        'js',
        'json',
        'ts',
        'tsx'
    ],
    'rootDir': 'src',
    'modulePaths': [
        '<rootDir>'
    ],
    'moduleDirectories': [
        'node_modules'
    ],
    'moduleNameMapper': {
        '\\.(s?css|less)$': '<rootDir>/__tests__/__mocks__/_styleMock.ts',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__tests__/__mocks__/_fileMock.ts'
    },
    'testPathIgnorePatterns': [
        '<rootDir>/../(build|docs|node_modules)/',
        '<rootDir>/__tests__/__mocks__/'
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    globals: {
        "ts-jest": {
            "isolatedModules": false
        }
    },
    'setupFilesAfterEnv': ['<rootDir>/setupTests.ts']
};
