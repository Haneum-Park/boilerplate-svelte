import { readFileSync } from 'fs';
import { dirname, resolve, extname } from 'path';
import { fileURLToPath } from 'url';
import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import svg from '@poppanator/sveltekit-svg';

// HACK : MY HACK

// The recommended way to list the legacy browsers is by putting this on a file named '.browserslistrc'.
// Sadly, babel preset plugin (the one that is being used by vite legacy plugin) doesn't read this file automatically,
// and from the other hand, postcssPresetEnv can't read the value passed to vite legacy plugin.
// This is why we don't specify the browser list explicitly in this vite config, but rather added this utility function
//  to read the browser list from the file.
const readBrowsersList = () =>
  readFileSync('./.browserslistrc', { encoding: 'utf-8' })
    .split(/\r?\n/) // Split it to lines
    .map((line) => {
      const trimmedLine = line.trim();
      return trimmedLine.length === 0 || trimmedLine[0] === '#' ? undefined : trimmedLine;
    })
    .filter((query) => query !== undefined)
    .join(', ');

const __dirname = dirname(fileURLToPath(import.meta.url));
/**
 *
 * @param {string} path
 * @returns
 */
const localPath = (path) => resolve(__dirname, path);
const supportedExtensions = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'];

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    imagetools({
      defaultDirectives: (url) => {
        const extension = extname(url.pathname);
        if (supportedExtensions.includes(extension)) {
          return new URLSearchParams({
            format: `webp;avif;${extension}`,
            picture: true,
          });
        }
        return new URLSearchParams();
      },
    }),
    svg(),
    sveltekit(),
  ],
  publicDir: 'static',
};

export default config;
