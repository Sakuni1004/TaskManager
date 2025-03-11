"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deleteTask = exports.updateTaskStatus = exports.updateTask = exports.getTasksByTeacher = exports.getTasksByStudent = exports.createTask = void 0;
var axios_1 = require("axios");
var API_URL = "http://localhost:5000";
//create
exports.createTask = function (taskData) { return __awaiter(void 0, void 0, void 0, function () {
    var token, teacherId, updatedTaskData, response, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = localStorage.getItem("authToken");
                teacherId = localStorage.getItem("id");
                if (!token)
                    throw new Error("No token found. Please log in.");
                if (!teacherId) {
                    console.error("Teacher ID not found in localStorage");
                    throw new Error("Teacher ID is missing");
                }
                updatedTaskData = __assign(__assign({}, taskData), { teacherId: teacherId || "" });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1["default"].post(API_URL + "/tasks/create", updatedTaskData, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token
                        }
                    })];
            case 2:
                response = _b.sent();
                return [2 /*return*/, response.data];
            case 3:
                error_1 = _b.sent();
                console.error("Error creating task:", ((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) || error_1.message);
                throw error_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
// get tasks by student
exports.getTasksByStudent = function (studentId) { return __awaiter(void 0, void 0, void 0, function () {
    var token, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = localStorage.getItem("authToken");
                console.log("ffffffffffffffuuuuuuu", token);
                if (!token)
                    throw new Error("No token found. Please log in.");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1["default"].get(API_URL + "/tasks/student/" + studentId, {
                        headers: { Authorization: "Bearer " + token }
                    })];
            case 2:
                response = _a.sent();
                console.log("Fetched tasks response:", response);
                return [2 /*return*/, response.data];
            case 3:
                error_2 = _a.sent();
                console.error("Error fetching student tasks:", error_2);
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
// get tasks by teacher
exports.getTasksByTeacher = function (teacherId) { return __awaiter(void 0, void 0, void 0, function () {
    var token, response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Teacher ID:", teacherId);
                token = localStorage.getItem("authToken");
                console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv", token);
                if (!token) {
                    console.error("Token not found.");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, axios_1["default"].get(API_URL + "/tasks/teacher/" + teacherId, {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    })];
            case 1:
                response = _a.sent();
                console.log("Fetched tasks response:", response);
                return [2 /*return*/, response.data];
            case 2:
                error_3 = _a.sent();
                console.error("Error fetching tasks:", error_3);
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
//update task by task id
exports.updateTask = function (taskId, taskData, token) { return __awaiter(void 0, void 0, void 0, function () {
    var authToken, response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authToken = token || localStorage.getItem("authToken");
                if (!authToken)
                    throw new Error("No authentication token provided");
                return [4 /*yield*/, axios_1["default"].put(API_URL + "/tasks/" + taskId, taskData, {
                        headers: {
                            Authorization: "Bearer " + authToken,
                            "Content-Type": "application/json"
                        }
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_4 = _a.sent();
                console.error("Error updating task:", error_4);
                throw new Error("Error updating task");
            case 3: return [2 /*return*/];
        }
    });
}); };
//update task status
exports.updateTaskStatus = function (taskId, status, token) { return __awaiter(void 0, void 0, void 0, function () {
    var authToken, response, error_5;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                authToken = token || localStorage.getItem("authToken");
                if (!authToken)
                    throw new Error("No authentication token provided");
                return [4 /*yield*/, axios_1["default"].put(API_URL + "/tasks/status/" + taskId, { status: status }, {
                        headers: {
                            Authorization: "Bearer " + authToken,
                            "Content-Type": "application/json"
                        }
                    })];
            case 1:
                response = _d.sent();
                console.log("responceeeeeeeeeeeee", response);
                return [2 /*return*/, response.data];
            case 2:
                error_5 = _d.sent();
                console.error("Error updating task status:", ((_a = error_5.response) === null || _a === void 0 ? void 0 : _a.data) || error_5.message);
                throw new Error(((_c = (_b = error_5.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || "Failed to update task status");
            case 3: return [2 /*return*/];
        }
    });
}); };
//delete the task
exports.deleteTask = function (taskId, token) { return __awaiter(void 0, void 0, void 0, function () {
    var authToken, response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authToken = token || localStorage.getItem("authToken");
                if (!authToken)
                    throw new Error("No authentication token provided");
                return [4 /*yield*/, axios_1["default"]["delete"](API_URL + "/tasks/" + taskId, {
                        headers: {
                            Authorization: "Bearer " + authToken,
                            "Content-Type": "application/json"
                        }
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 2:
                error_6 = _a.sent();
                throw new Error("Error deleting task: ");
            case 3: return [2 /*return*/];
        }
    });
}); };
