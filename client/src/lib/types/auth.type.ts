export type LoginType = {
  email: string;
  password: string;
};

export type ResponseLogin = {
  data: {
    id: string;
    name: string;
    email: string;
    profilePicture: string | null;
    token: {
      accessToken: string;
      refreshToken: string;
    };
  };
  message: string;
};

export type RegisterType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ResponseRegister = {
  data: {
    id: string;
    email: string;
    name: string;
    provider: string;
  };
};
