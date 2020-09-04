module.exports = function (user, userReqData) {
  //   console.log("USer >>>", user);
  //   console.log("userdata", userReqData);
  if (userReqData.name) {
    user.name = userReqData.name;
  }
  if (userReqData.email) {
    user.email = userReqData.email;
  }
  if (userReqData.userName) {
    user.userName = userReqData.userName;
  }
  if (userReqData.password) {
    user.password = userReqData.password;
  }
  if (userReqData.phoneNumber) {
    user.phoneNumber = userReqData.phoneNumber;
  }
  if (userReqData.gender) {
    user.gender = userReqData.gender;
  }
  if (userReqData.dob) {
    user.dob = userReqData.dateOfBirth;
  }
  if (userReqData.numberOfPosts) {
    user.numberOfPosts = userReqData.numberOfPosts;
  }
  if (userReqData.role) {
    user.role = userReqData.role;
  }
  if (userReqData.status) {
    user.status = userReqData.status;
  }
  if (!user.address) {
    user.address = {};
  }
  if (userReqData.temp_addr) {
    user.address.temp_addr =
      typeof user.address.temp_addr === "string" &&
      userReqData.temp_addr.split(",");
  }
  if (userReqData.permanent_addr) {
    user.address.permanent_addr = userReqData.permanent_addr;
  }

  return user;
};
