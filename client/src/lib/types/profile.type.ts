export type ProfileType = {
  name: string;
  bio: string;
  profilePicture?: string;
};

export type ResponseProfile = {
  userId: string;
  bio: string;
  photoFilename: string;
  profilePicture: string;
  user: {
    email: string;
    name: string;
  };
};
