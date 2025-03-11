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
exports.deleteTaskService = exports.updateTaskStatusService = exports.updateTaskService = exports.getTasksByStudentService = exports.getTasksByTeacherService = exports.createTaskService = void 0;
var taskRepo_1 = require("../db/taskRepo");
var mongoose_1 = require("mongoose");
var Task_1 = require("../models/Task");
//create task
exports.createTaskService = function (taskData) { return __awaiter(void 0, void 0, void 0, function () {
    var newTask;
    return __generator(this, function (_a) {
        newTask = new Task_1["default"](taskData);
        return [2 /*return*/, newTask.save()];
    });
}); };
//get task by teacheId
exports.getTasksByTeacherService = function (TeacherId) { return __awaiter(void 0, void 0, void 0, function () {
    var objectId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1["default"].Types.ObjectId.isValid(TeacherId)) {
                    throw new Error("Invalid student ID format");
                }
                objectId = new mongoose_1["default"].Types.ObjectId(TeacherId);
                return [4 /*yield*/, taskRepo_1.findTaskByTeacherRepo(objectId)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//get task by studentId
exports.getTasksByStudentService = function (studentId) { return __awaiter(void 0, void 0, void 0, function () {
    var objectId, tasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1["default"].Types.ObjectId.isValid(studentId)) {
                    throw new Error("Invalid student ID format");
                }
                objectId = new mongoose_1["default"].Types.ObjectId(studentId);
                console.log(" Converted studentId:", studentId);
                return [4 /*yield*/, taskRepo_1.findTaskByStudentRepo(objectId)];
            case 1:
                tasks = _a.sent();
                console.log(" Tasks fetched in Service:", tasks);
                return [2 /*return*/, tasks];
        }
    });
}); };
// update task by studentId
exports.updateTaskService = function (taskId, taskData) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedTask, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, taskRepo_1.updateTask(taskId, taskData)];
            case 1:
                updatedTask = _a.sent();
                return [2 /*return*/, updatedTask];
            case 2:
                error_1 = _a.sent();
                throw new Error("Service error while updating task: ");
            case 3: return [2 /*return*/];
        }
    });
}); };
// update task status
exports.updateTaskStatusService = function (taskId, status) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedTask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!taskId || !status) {
                    console.log("tttt", taskId);
                    console.log("mmm", status);
                    throw new Error("Task ID and status are required.");
                }
                return [4 /*yield*/, taskRepo_1.updateTaskStatusRepo(taskId, status)];
            case 1:
                updatedTask = _a.sent();
                if (!updatedTask) {
                    throw new Error("Task not found or could not be updated.");
                }
                return [2 /*return*/, updatedTask];
        }
    });
}); };
//delete
exports.deleteTaskService = function (taskId) { return __awaiter(void 0, void 0, Promise, function () {
    var deletedTask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, taskRepo_1.deleteTaskRepo(taskId)];
            case 1:
                deletedTask = _a.sent();
                if (!deletedTask) {
                    throw new Error("Task with ID " + taskId + " not found.");
                }
                return [2 /*return*/, "Task deleted successfully"];
        }
    });
}); };
