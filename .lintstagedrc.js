export default {
  "*.{js,ts,jsx,tsx}": () => {
    return "pnpm -r check:fix --staged --no-errors-on-unmatched";
  },
};
