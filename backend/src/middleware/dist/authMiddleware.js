"use strict";
exports.__esModule = true;
exports.authenticateUser = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
exports.authenticateUser = function (req, res, next) {
    var _a;
    var token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token)
        return res.status(401).json({ message: "No token, authorization denied" });
    console.log("token", process.env.JWT_SECRET);
    console.log("token", token);
    try {
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
