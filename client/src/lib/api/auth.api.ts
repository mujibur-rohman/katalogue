import { fetcher } from ".";
import { LoginType, ResponseLogin } from "../types/auth.type";

export const authEndPoint = "/auth";

const authApi = {
  login: async (payload: LoginType) => {
    try {
      const res = await fetcher.post<ResponseLogin>(authEndPoint, payload);
      return res.data;
    } catch (error: any) {
      if (error.response.data) {
        throw new Error(error.response.data.errors);
      }
      throw new Error(error.message);
    }
  },
};

export default authApi;
