const bcrypt = require("bcrypt");
const {
  getUserByEmailDB,
  createUserDB,
} = require("../repository/user.repository");

const createUser = async (email, pwd) => {
  const findUser = await getUserByEmailDB(email);
  if (findUser) throw new Error("User with this email already exist");
  const salt = 10;
  const hashPwd = await bcrypt.hash(pwd, salt);
  const createdUser = await createUserDB(email, hashPwd);
  return createdUser;
};

const authorizationUser = async (email, pwd) => {
  const findUser = await getUserByEmailDB(email);
  if (!findUser) throw new Error("User whith this email not found");
  const hashedPassword = findUser.pwd;
  if(!(await bcrypt.compare(pwd, hashedPassword))) throw new Error("Password mismatch");
  return findUser;
};

module.exports = { createUser, authorizationUser };
