// To change the login state
export const setlogin = () => {
  return {
    type: "setLogin",
  };
};
export const Logout = () => {
  return {
    type: "setLogout",
  };
};
// to set user details
export const setuserdetails = (details) => {
  return {
    type: "setuserDetail",
    payload: details,
  };
};

export const restuserdetails = (details) => {
  return {
    type: "resetuser",
  };
};
