import { axiosApi, axiosWithCredentials } from "../providers";

export const userLogin = async (payload) => {
    const response = await axiosApi.post("/auth/login", payload);
    return response.data;
};

export const getUserData = async () => {
    const response = await axiosWithCredentials.get(`/user/profile`);
    return response.data;
};
