import coreAxios from "../utils/axios";

export const handleSignup = async (userdata) => {
  try {
    const result = await coreAxios.post(
      `/accounts/registration/`,
      userdata
    );
    return result;
  } catch (error) {
    return error.response;
  }
};

export const handleSignin = async (userData) => {
  try {
    const result = await coreAxios.post(
      "/accounts/login/",
      userData
    );

    return result;
  } catch (error) {
    return error.response.data;
  }
};
