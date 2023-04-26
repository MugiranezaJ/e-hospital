// import store from "store";
import { authActions } from ".";
import {
  addMedecinesService,
  diagnoseDiseaseService,
  getDiagnosedDiseaseService,
  getMedecinesDataService,
  getUsersService,
  getUsersWithGrantedAccessService,
  grantAccessService,
  loginService,
  profileService,
  registerService,
} from "./authServices";

export const registerAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsFetching(true));
      const res = await registerService(data);
      dispatch(authActions.setResponse(res?.data));
      if (res?.status === 200) {
        // store.set("authToken", res?.data?.data?.token);
        // store.set("user", res?.data?.data?.user);
        dispatch(
          authActions.login({ ...res?.data, status: res?.status, isAuth: true })
        );
        dispatch(authActions.setIsFetching(false));
      } else {
        dispatch(authActions.login({ error: res.data, isAuth: false }));
        dispatch(authActions.login({ error: null }));
        dispatch(authActions.setIsFetching(false));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const loginAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsFetching(true));
      const res = await loginService(data);
      console.log("RES", res?.data?.data);
      if (res?.status === 200) {
        localStorage.setItem("euser", JSON.stringify(res?.data?.data));
        // store.set("authToken", res?.data?.data?.token);
        // store.set("user", res?.data?.data?.user);
        authActions.setUser(res?.data);
        dispatch(authActions.setIsFetching(false));
      } else {
        dispatch(authActions.setIsFetching(false));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const profileAction = (token) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsFetching(true));
      const res = await profileService(token);
      // console.log(">>>>>>>:: ", res);
      if (res?.status === 200) {
        dispatch(authActions.setUser(res.data));
        dispatch(authActions.setIsFetching(false));
      }
    } catch (err) {
      // dispatch(authActions.login({ isAuth: false }));
      // dispatch(authActions.setIsFetching(false));
      console.log(err);
    }
  };
};

export const getPhysiciansAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsFetching(true));
      const res = await getUsersService(data);
      dispatch(authActions.setPhysicians(res?.data));
      if (res?.status === 200) {
        // store.set("authToken", res?.data?.data?.token);
        // store.set("user", res?.data?.data?.user);
        dispatch(authActions.setIsFetching(false));
      } else {
        dispatch(authActions.setIsFetching(false));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPharmacistsAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsFetching(true));
      const res = await getUsersService(data);
      dispatch(authActions.setPharmacists(res?.data));
      if (res?.status === 200) {
        // store.set("authToken", res?.data?.data?.token);
        // store.set("user", res?.data?.data?.user);
        dispatch(authActions.setIsFetching(false));
      } else {
        dispatch(authActions.setIsFetching(false));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const grantAccessAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsFetching(true));
      const res = await grantAccessService(data);
      // console.log(">>>>>>>:: ", res);
      if (res?.status === 200) {
        dispatch(authActions.setGrantAccess(res.data));
        dispatch(authActions.setIsFetching(false));
      }
    } catch (err) {
      // dispatch(authActions.login({ isAuth: false }));
      // dispatch(authActions.setIsFetching(false));
      console.log(err);
    }
  };
};

export const getUsersWithGrantedAccessAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsFetching(true));
      const res = await getUsersWithGrantedAccessService(data);
      dispatch(authActions.setUsersWithGrantedAccess(res?.data));
      if (res?.status === 200) {
        // store.set("authToken", res?.data?.data?.token);
        // store.set("user", res?.data?.data?.user);
        dispatch(authActions.setIsFetching(false));
      } else {
        dispatch(authActions.setIsFetching(false));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPhysiciansWithGrantedAccessAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsFetching(true));
      const res = await getUsersWithGrantedAccessService(data);
      dispatch(authActions.setphysiciansWithAcces(res?.data));
      if (res?.status === 200) {
        // store.set("authToken", res?.data?.data?.token);
        // store.set("user", res?.data?.data?.user);
        dispatch(authActions.setIsFetching(false));
      } else {
        dispatch(authActions.setIsFetching(false));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getMyPatientsPharmacistAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsFetching(true));
      const res = await getUsersWithGrantedAccessService(data);
      dispatch(authActions.setMyPatientsPharmacist(res?.data));
      if (res?.status === 200) {
        // store.set("authToken", res?.data?.data?.token);
        // store.set("user", res?.data?.data?.user);
        dispatch(authActions.setIsFetching(false));
      } else {
        dispatch(authActions.setIsFetching(false));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const diagnoseDiseaseAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsFetching(true));
      const res = await diagnoseDiseaseService(data);
      dispatch(authActions.setDiagnosis(res.data));
      // console.log(">>>>>>>:: ", res);
      if (res?.status === 200) {
        dispatch(authActions.setIsFetching(false));
      }
      dispatch(authActions.setIsFetching(false));
    } catch (err) {
      // dispatch(authActions.login({ isAuth: false }));
      // dispatch(authActions.setIsFetching(false));
      console.log(err);
    }
  };
};

export const getDiagnosedDiseaseAction = (patientId) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsFetching(true));
      const res = await getDiagnosedDiseaseService(patientId);
      dispatch(authActions.setDiagnosis(res.data));
      // console.log(">>>>>>>:: ", res);
      if (res?.status === 200) {
        dispatch(authActions.setIsFetching(false));
      }
      dispatch(authActions.setIsFetching(false));
    } catch (err) {
      // dispatch(authActions.login({ isAuth: false }));
      // dispatch(authActions.setIsFetching(false));
      console.log(err);
    }
  };
};

export const addMedecinesAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsFetching(true));
      const res = await addMedecinesService(data);
      dispatch(authActions.setMedecines(res.data));
      // console.log(">>>>>>>:: ", res);
      if (res?.status === 200) {
        dispatch(authActions.setIsFetching(false));
      }
      dispatch(authActions.setIsFetching(false));
    } catch (err) {
      // dispatch(authActions.login({ isAuth: false }));
      // dispatch(authActions.setIsFetching(false));
      console.log(err);
    }
  };
};

export const getMedecinesDataAction = () => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsFetching(true));
      const res = await getMedecinesDataService();
      dispatch(authActions.setmedecinesData(res.data));
      // console.log(">>>>>>>:: ", res);
      if (res?.status === 200) {
        dispatch(authActions.setIsFetching(false));
      }
      dispatch(authActions.setIsFetching(false));
    } catch (err) {
      // dispatch(authActions.login({ isAuth: false }));
      // dispatch(authActions.setIsFetching(false));
      console.log(err);
    }
  };
};
