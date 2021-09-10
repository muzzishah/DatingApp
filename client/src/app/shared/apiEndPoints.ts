import { environment } from "src/environments/environment";

const baseUrl = environment.baseUrl;

export const StaticAPI = {
  getUsers: {
    url: `${baseUrl}/users`,
  },
};
