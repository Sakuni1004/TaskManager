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
exports.deleteTaskController = exports.updateTaskStatusController = exports.updateTaskController = exports.getTasksByStudentId = exports.getTasksByTeacherId = exports.createTaskController = void 0;
var taskServices_1 = require("../services/taskServices");
//create task
exports.createTaskController = function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var _a, title, description, dueDate, status, teacherId, studentId, studentRegistrationNumber, newTask, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, description = _a.description, dueDate = _a.dueDate, status = _a.status, teacherId = _a.teacherId, studentId = _a.studentId, studentRegistrationNumber = _a.studentRegistrationNumber;
                if (!title ||
                    !description ||
                    !dueDate ||
                    !status ||
                    !teacherId ||
                    !studentId ||
                    !studentRegistrationNumber) {
                    return [2 /*return*/, res.status(400).json({ message: "All fields are required" })];
                }
                return [4 /*yield*/, taskServices_1.createTaskService({
                        title: title,
                        description: description,
                        dueDate: dueDate,
                        status: status,
                        teacherId: teacherId,
                        studentId: studentId,
                        studentRegistrationNumber: studentRegistrationNumber
                    })];
            case 1:
                newTask = _b.sent();
                console.log(newTask);
                return [2 /*return*/, res.status(201).json(newTask)];
            case 2:
                error_1 = _b.sent();
                console.error("Error in createTaskController:", error_1);
                return [2 /*return*/, res.status(500).json({ message: "Error creating task" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
//get Tasks by teacher Id
exports.getTasksByTeacherId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var teacherId, tasks, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                teacherId = req.params.teacherId;
                return [4 /*yield*/, taskServices_1.getTasksByTeacherService(teacherId)];
            case 1:
                tasks = _a.sent();
                console.log("tasksTeacher", tasks);
                res.status(200).json(tasks);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json("Error fetching tasks");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//get task by student Id
exports.getTasksByStudentId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var studentId, tasks, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(" Controller reached!");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                studentId = req.params.studentId;
                console.log("Received studentId:", studentId);
                return [4 /*yield*/, taskServices_1.getTasksByStudentService(studentId)];
            case 2:
                tasks = _a.sent();
                console.log("Fetched tasks:", tasks);
                res.status(200).json(tasks);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error("Error in controller:", error_3);
                res.status(500).json({ message: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//update tasks by taskId
exports.updateTaskController = function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var taskId, taskData, updatedTask, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.params.taskId;
                taskData = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, taskServices_1.updateTaskService(taskId, taskData)];
            case 2:
                updatedTask = _a.sent();
                if (!updatedTask) {
                    res.status(404).json({ message: "Task not found" });
                    return [2 /*return*/];
                }
                res.status(200).json(updatedTask);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({ message: "Error updating task: " });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//updateStatus
exports.updateTaskStatusController = function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var status, taskId, updatedTask, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                status = req.body.status;
                taskId = req.params.taskId;
                console.log("tttt", req.body);
                console.log("id", taskId);
                if (!status) {
                    res.status(400).json({ message: "Status is required." });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, taskServices_1.updateTaskStatusService(taskId, status)];
            case 1:
                updatedTask = _a.sent();
                console.log("update", updatedTask);
                if (!updatedTask) {
                    res.status(404).json({ message: "Task not found or could not be updated." });
                }
                res.status(200).json({
                    message: "Task status updated successfully",
                    task: updatedTask
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500).json({
                    message: "Server error updating task status",
                    error: error_5.message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//delete
exports.deleteTaskController = function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var id, message, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (!id) {
                    res.status(400).json({ error: "Task ID is required" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, taskServices_1.deleteTaskService(id)];
            case 1:
                message = _a.sent();
                res.status(200).json({ message: message });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500).json({ error: error_6 instanceof Error ? error_6.message : "Failed to delete task" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
