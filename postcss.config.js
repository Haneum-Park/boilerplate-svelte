import postcssPresetEnv from 'postcss-preset-env';

export default {
  plugins: [
    postcssPresetEnv({
      stage: 2,
      features: {
        'custom-properties': {
          disableDeprecationNotice: true,
        },
      },
      importFrom: './src/lib/css/styles.css',
    }),
  ],
};
