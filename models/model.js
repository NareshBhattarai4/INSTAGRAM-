const mongoose = require("mongoose");
const express = require("express");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true

  },
  password: {
    type: String,
    required: true
  }
});
mongoose.model("Usertype", userSchema);

