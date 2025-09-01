import { axiosApi, axiosWithCredentials } from "../providers";

export const userLogin = async (payload) => {
    const response = await axiosApi.post("/token/", payload);
    return response.data;
};

export const getUserData = async () => {
    const response = await axiosWithCredentials.get(`/users/info/`);
    return response.data;
};
