import axios from "axios";
import { SERVER_URL } from "../../utils/constants";

export const registerService = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${SERVER_URL}/user/register`,
      data,
    });
    return res;
  } catch (err) {
    return err?.response;
  }
};

export const loginService = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${SERVER_URL}/user/login`,
      data,
    });
    return res;
  } catch (err) {
    return err?.response;
  }
};

export const profileService = async (token) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${SERVER_URL}/user/profile`,
    });
    return res;
  } catch (err) {
    return err?.response;
  }
};

// users
export const getUsersService = async (data) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${SERVER_URL}/user/all`,
      params: data,
    });
    return res;
  } catch (err) {
    return err?.response;
  }
};

export const grantAccessService = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${SERVER_URL}/access/grant`,
      data: data,
    });
    return res;
  } catch (err) {
    return err?.response;
  }
};

export const getUsersWithGrantedAccessService = async (data) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${SERVER_URL}/access/grant?userType=${data?.userType}`,
      // data: data,
    });
    return res;
  } catch (err) {
    return err?.response;
  }
};
