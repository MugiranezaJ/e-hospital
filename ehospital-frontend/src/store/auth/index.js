import { createSlice } from "@reduxjs/toolkit";
// import store from "store";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isFetching: false,
    isAuth: false,
    token: "",
    users: {},
    user: {},
    diagnosis: {},
    medecines: {},
    medecinesData: {},
    physicians: {},
    pharmacists: {},
    usersWithGrantedAccess: {},
    myPatientsPharmacist: {},
    physiciansWithAcces: {},
    grantAccess: null,
    response: null,
    status: "",
    error: null,
    pathUrl: null,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.data?.token;
      state.user = action.payload.data?.user;
      state.status = action.payload.status;
      state.isAuth = action.payload.isAuth;
      state.error = action.payload?.error;
    },
    setToken(state, action) {
      state.token = action.payload.token;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      //   store.remove("user");
      //   store.remove("authToken");
      state.token = "";
      state.status = "";
      state.user = {};
      state.isAuth = false;
    },
    setIsFetching(state, action) {
      state.isFetching = action.payload;
    },
    setPathUrl(state, action) {
      state.pathUrl = action.payload;
    },

    setResponse(state, action) {
      state.response = action.payload;
    },
    setPhysicians(state, action) {
      state.physicians = action.payload;
    },
    setPharmacists(state, action) {
      state.pharmacists = action.payload;
    },
    setGrantAccess(state, action) {
      state.grantAccess = action.payload;
    },
    setUsersWithGrantedAccess(state, action) {
      state.usersWithGrantedAccess = action.payload;
    },
    setphysiciansWithAcces(state, action) {
      state.physiciansWithAcces = action.payload;
    },
    setDiagnosis(state, action) {
      state.diagnosis = action.payload;
    },
    setMedecines(state, action) {
      state.medecines = action.payload;
    },
    setmedecinesData(state, action) {
      state.medecinesData = action.payload;
    },
    setMyPatientsPharmacist(state, action) {
      state.myPatientsPharmacist = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
