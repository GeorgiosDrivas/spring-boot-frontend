export default {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
