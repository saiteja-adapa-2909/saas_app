const checkToken = () => {
  const token = localStorage.getItem("jwtToken"); // Retrieve the token from localStorage

  // Perform token validation logic
  console.log(`your token from LS:${token}`)
  if (token) {
    // Token is valid
    return true;
  } else {
    // Token is not valid
    return false;
  }
};

export default checkToken;
