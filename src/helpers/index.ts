export const brands = ['Audi', 'Mazda', 'BMW'];
export const models = ['Rainier', 'Jetta', '350Z'];

// build list of years
const startYear = 1980;
const currentYear = new Date().getFullYear();
export const years = [...Array(currentYear - startYear + 1).keys()].map(
  i => `${i + startYear}`,
);

export const colors = ['white', 'black'];
export const fuelTypes = ['gas', 'diesel'];
export const transmissionTypes = ['manual', 'automatic'];
export const condition = ['new', 'used'];
