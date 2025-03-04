"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var database_1 = require("./config/database");
var authRoutes_1 = require("./routes/authRoutes");
var taskRoutes_1 = require("./routes/taskRoutes");
dotenv_1["default"].config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
var app = express_1["default"]();
var PORT = process.env.PORT || 5000;
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.use("/auth", authRoutes_1["default"]);
app.use('/auth/tasks', taskRoutes_1["default"]);
database_1["default"]().then(function () {
    app.listen(PORT, function () { return console.log(" Server running http://localhost:" + PORT); });
});
