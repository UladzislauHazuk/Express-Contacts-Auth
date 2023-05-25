const express = require("express");
const { createUser, authorizationUser } = require("../service/user.service");
const { createToken, createCookie } = require("../helper/jws");

const route = express.Router();

route.post("/registration", async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const data = await createUser(email, pwd);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

route.post("/authorization", async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const data = await authorizationUser(email, pwd);
    const token = createToken(data);

    res.setHeader('authorization', [createCookie(token)])

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = route;
