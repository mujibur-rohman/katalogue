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
