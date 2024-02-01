module.exports = {
  '*.{js,jsx,ts,tsx,json,html}': ['prettier --write'],
  '*.{tsx,ts,js,jsx}': 'eslint --ext .tsx --ext .ts src/ --fix',
  '*.{ts,tsx}': [() => 'npx tsc -p tsconfig.json '],
};
