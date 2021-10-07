import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('snowpack').SnowpackUserConfig } */
export default {
  alias: {
    '@': path.resolve(__dirname, './src')
  },
  mount: {
    src: '/dist',
    public: {
      url: '/',
      static: true
    }
  },
  plugins: [
    '@snowpack/plugin-webpack',
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-postcss'
  ],
  routes: [
    {
      'match': 'routes',
      'src': '.*',
      'dest': '/index.html'
    }
  ],
  packageOptions: {
    'knownEntrypoints': [
      'svelte',
      'svelte/store',
      'svelte/transition',
      '@imask/svelte'
    ]
  },
  devOptions: {
    port: 3000,
    tailwindConfig: './tailwind.config.js'
  },
  buildOptions: {
    /* ... */
  }
};
