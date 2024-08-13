export default {
  "*.{js,ts,jsx,tsx}": () => {
    return `pnpm -r check --staged`;
  },
};
