import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      $route: './src/routes',
      $comp: './src/components',
      $atom: './src/components/atoms',
      $block: './src/components/blocks',
      $css: './src/lib/css',
      $util: './src/lib/utils',
      $img: './src/lib/images',
      $store: './src/stores',
    },
  },
  compilerOptions: {
    dev: process.env.NODE_ENV === 'production',
    hydratable: true,
    customElement: false,
    preserveComments: false,
    preserveWhitespace: false,
  },
};

export default config;
