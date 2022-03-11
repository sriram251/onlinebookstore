const loginstatus = (islogged = false, action) => {
  switch (action.type) {
    case "setLogin":
      return (islogged = true);
    case "setLogout":
      return (islogged = false);
    default:
      return islogged;
  }
};

export default loginstatus;
