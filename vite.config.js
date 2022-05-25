/**
 * @type {import('vite').UserConfig}
 */
const config = {
  build: {
    assetsInlineLimit: 0, // to prevent favicon inlining
  }
}

export default config;
