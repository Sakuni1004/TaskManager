"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var secretKey = crypto.randomBytes(32).toString("hex");
console.log("Generated JWT Secret Key:", secretKey);
