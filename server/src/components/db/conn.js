const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/hlo",{ useNewUrlParser: true })
  .then(() => {
    console.log("data connected");
  })
  .catch(() => {
    console.log("not conneted");
  });
