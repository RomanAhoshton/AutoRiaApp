import { http } from '..';

interface Props {
  brandValue: string;
  engineValue: string;
  modelValue: string;
  fuelValue: string;
  transmissionValue: string;
  colorValue: string;
  highMileage: number;
  highPrice: number;
  lowPrice: number;
  highYear: number;
  lowYear: number;
  lowMileage: number;
}

const filterCars = async ({
  brandValue,
  engineValue,
  modelValue,
  fuelValue,
  transmissionValue,
  colorValue,
  highMileage,
  highPrice,
  lowPrice,
  highYear,
  lowYear,
  lowMileage,
}: Props) => {
  const response = await http.get(
    `cars/?brand_name=${brandValue}&engine=${engineValue}&model_name=${modelValue}
      &fuel_type=${fuelValue}&transmission=${transmissionValue}&exterior_color=${colorValue}
      &price_max=${highPrice}&price_min=${lowPrice}&year_max=${highYear}
      &year_min=${lowYear}&mileage_min=${lowMileage}&mileage_max=${highMileage}`,
  );

  return response;
};
export default filterCars;
