import { http } from '..';

export const getCars = async () => {
  const response = await http.get('/cars');

  return response;
};
