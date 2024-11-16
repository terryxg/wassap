export type CreateAccount = {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  newsletter: boolean;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};
