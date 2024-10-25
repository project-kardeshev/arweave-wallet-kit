module.exports = {
stories: [
  '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)', 
  '../docs/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx|svelte)', 
],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  docs: {
    autodocs: true,
  },
};
