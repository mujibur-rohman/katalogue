import { fetcher } from ".";
import { ProfileType, ResponseProfile } from "../types/profile.type";

export const profileEndpoint = "/profile";

const profileApi = {
  update: async ({
    payload,
    userId,
  }: {
    payload: FormData;
    userId: string;
  }) => {
    try {
      const res = await fetcher.put(profileEndpoint + "/a" + userId, payload);
      return res.data;
    } catch (error: any) {
      console.log(error);
      if (error.response?.data) {
        throw new Error(error.response.data.errors);
      }
      throw new Error(error.message);
    }
  },
  get: async (userId: string) => {
    try {
      const res = await fetcher.get<ResponseProfile>(
        profileEndpoint + "/" + userId
      );
      return res.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw new Error(error.response.data.errors);
      }
      throw new Error(error.message);
    }
  },
};

export default profileApi;
