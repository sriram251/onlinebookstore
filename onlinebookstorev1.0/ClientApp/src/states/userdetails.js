const userDetails = (state = {}, action) => {
  switch (action.type) {
    case "setuserDetail":
      return (state = action.payload);
    case "resetuser":
      return (state = {});
    default:
      return state;
  }
};
export default userDetails;
