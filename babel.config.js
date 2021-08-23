module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@assets': './src/assets',
          '@hooks': './src/@core/hooks',
          '@utils': './src/@core/utils',
          '@screens': './src/app/screens',
          '@navigation': './src/app/navigation',
          '@components': './src/@core/components',
          '@nativeModules': './src/@core/nativeModules',
          '@reducers': './src/@core/reducers',
        }
      },
      require.resolve('react-native-reanimated/plugin'),
    ],
    'jest-hoist'
  ]
};
