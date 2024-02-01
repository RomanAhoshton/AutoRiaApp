import { http } from '.';
import { UserLogin, CreateNewUser } from './types';

export const createUser = async (body: CreateNewUser) => {
  const response = await http.post('user/create/', body);
  return response;
};

export const login = async (body: UserLogin) => {
  const response = await http.post('user/login/', body);

  return response;
};
