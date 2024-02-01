export interface CreateNewUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmed_password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface Model {
  id: number;
  name: string;
  body_style: string;
  brand: number;
}

export interface Car {
  price: number;
  year: number;
  model: Model;
  name: string;
  title: string;
  model_name: string;
  year_of_issue: string;
  mileage: string;
  engine: string;
  transmission: string;
  exterior_color: string;
  interior_color: string;
  id: number;
  brand: {
    id: number;
    name: string;
    models: Model[];
    headquarters_country: string;
  };
  description: string;
}
