"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom"); // To redirect after signup
var signupServices_1 = require("../services/signupServices"); // Your service file to handle the API call
require("./signUp.css");
var SignUp = function () {
    var _a = react_1.useState(""), username = _a[0], setUsername = _a[1];
    var _b = react_1.useState(""), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(""), password = _c[0], setPassword = _c[1];
    var _d = react_1.useState(""), studentRegistrationNumber = _d[0], setStudentRegistrationNumber = _d[1];
    var _e = react_1.useState("student"), role = _e[0], setRole = _e[1];
    var _f = react_1.useState(""), errorMessage = _f[0], setErrorMessage = _f[1];
    var _g = react_1.useState(""), successMessage = _g[0], setSuccessMessage = _g[1];
    var navigate = react_router_dom_1.useNavigate();
    var handleSignUp = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setErrorMessage("");
                    setSuccessMessage("");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, signupServices_1.signUpUser(username, email, password, role, role === "student" ? studentRegistrationNumber : undefined // Only send the studentRegistrationNumber for students
                        )];
                case 2:
                    response = _a.sent();
                    setSuccessMessage("Signup successful!");
                    navigate("/");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setErrorMessage(error_1.message || "Something went wrong!");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "signup-container" },
        react_1["default"].createElement("div", { className: "signup-form" },
            react_1["default"].createElement("h1", { className: "signup-heading" }, "Sign Up"),
            react_1["default"].createElement("form", { onSubmit: handleSignUp, className: "form" },
                react_1["default"].createElement("div", { className: "form-input" },
                    react_1["default"].createElement("input", { type: "text", className: "input", placeholder: "Username", value: username, onChange: function (e) { return setUsername(e.target.value); }, required: true })),
                react_1["default"].createElement("div", { className: "form-input" },
                    react_1["default"].createElement("input", { type: "email", className: "input", placeholder: "Email", value: email, onChange: function (e) { return setEmail(e.target.value); }, required: true })),
                react_1["default"].createElement("div", { className: "form-input" },
                    react_1["default"].createElement("input", { type: "password", className: "input", placeholder: "Password", value: password, onChange: function (e) { return setPassword(e.target.value); }, required: true })),
                react_1["default"].createElement("div", { className: "form-input" },
                    react_1["default"].createElement("select", { value: role, onChange: function (e) { return setRole(e.target.value); }, className: "inputOption" },
                        react_1["default"].createElement("option", { value: "student" }, "Student"),
                        react_1["default"].createElement("option", { value: "teacher" }, "Teacher"))),
                role === "student" && (react_1["default"].createElement("div", { className: "form-input" },
                    react_1["default"].createElement("input", { type: "text", className: "input", placeholder: "Student Registration Number", value: studentRegistrationNumber, onChange: function (e) { return setStudentRegistrationNumber(e.target.value); }, required: true }))),
                successMessage && react_1["default"].createElement("p", { className: "success-message" }, successMessage),
                errorMessage && react_1["default"].createElement("p", { className: "error-message" }, errorMessage),
                react_1["default"].createElement("button", { type: "submit", className: "submit-button" }, "Sign Up")),
            react_1["default"].createElement("div", { className: "login-link" },
                react_1["default"].createElement("p", null,
                    "Already have an account? ",
                    react_1["default"].createElement("a", { href: "/" }, "Login here"))))));
};
exports["default"] = SignUp;
