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
exports.deleteTask = exports.updateTaskStatus = exports.getTasksByTeacher = exports.createTask = void 0;
var Task_1 = require("../models/Task");
var jsonwebtoken_1 = require("jsonwebtoken");
exports.createTask = function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var _a, title, description, dueDate, studentId, token, decoded, teacherId, task, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, dueDate = _a.dueDate, studentId = _a.studentId;
                token = (_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", "");
                if (!token) {
                    res.status(401).json({ message: "No token, authorization denied" });
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
                teacherId = decoded.id;
                task = new Task_1["default"]({
                    title: title,
                    description: description,
                    dueDate: dueDate,
                    teacherId: teacherId,
                    studentId: studentId
                });
                return [4 /*yield*/, task.save()];
            case 2:
                _c.sent();
                res.status(201).json({ message: "Task created successfully", task: task });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                res.status(500).json({ message: "Server error", error: error_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Get all tasks for a specific teacher (requires authentication)
exports.getTasksByTeacher = function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var teacherId, token, decoded, tasks, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                teacherId = req.params.teacherId;
                token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                if (!token) {
                    res.status(401).json({ message: "No token, authorization denied" });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
                if (decoded.id !== teacherId) {
                    res.status(403).json({ message: "Not authorized to view these tasks" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Task_1["default"].find({ teacherId: teacherId })];
            case 2:
                tasks = _b.sent();
                res.status(200).json(tasks);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res.status(500).json({ message: "Server error", error: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Update task status (e.g., completed or pending)
exports.updateTaskStatus = function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var status, taskId, token, decoded, task, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                status = req.body.status;
                taskId = req.params.taskId;
                token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                if (!token) {
                    res.status(401).json({ message: "No token, authorization denied" });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
                return [4 /*yield*/, Task_1["default"].findById(taskId)];
            case 2:
                task = _b.sent();
                if (!task) {
                    res.status(404).json({ message: "Task not found" });
                    return [2 /*return*/];
                }
                if (decoded.id !== task.teacherId.toString()) {
                    res.status(403).json({ message: "Not authorized to update this task" });
                    return [2 /*return*/];
                }
                task.status = status;
                return [4 /*yield*/, task.save()];
            case 3:
                _b.sent();
                res.status(200).json({ message: "Task updated successfully", task: task });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                res.status(500).json({ message: "Server error", error: error_3.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Delete a task
exports.deleteTask = function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var taskId, token, decoded, task, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                taskId = req.params.taskId;
                token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                if (!token) {
                    res.status(401).json({ message: "No token, authorization denied" });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
                return [4 /*yield*/, Task_1["default"].findByIdAndDelete(taskId)];
            case 2:
                task = _b.sent();
                if (!task) {
                    res.status(404).json({ message: "Task not found" });
                    return [2 /*return*/];
                }
                if (decoded.id !== task.teacherId.toString()) {
                    res.status(403).json({ message: "Not authorized to delete this task" });
                    return [2 /*return*/];
                }
                res.status(200).json({ message: "Task deleted successfully" });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                res.status(500).json({ message: "Server error", error: error_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
