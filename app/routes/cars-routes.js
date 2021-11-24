"use strict";

const express = require("express");
const router = express.Router();

router.route("/").get(() => {
  console.log("getCars");
});

module.exports = router;
