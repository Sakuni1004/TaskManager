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
exports.deleteTaskRepo = exports.updateTaskStatusRepo = exports.updateTask = exports.findTaskByStudentRepo = exports.findTaskByTeacherRepo = exports.createTaskRepo = void 0;
var Task_1 = require("../models/Task");
var mongoose_1 = require("mongoose");
//create task
exports.createTaskRepo = function (data) { return new Task_1["default"](data).save(); };
//find task by teache Id
exports.findTaskByTeacherRepo = function (teacherId) {
    return Task_1["default"].find({ teacherId: teacherId }).populate("studentId").exec();
};
//find task by student Id
exports.findTaskByStudentRepo = function (studentId) { return __awaiter(void 0, void 0, void 0, function () {
    var objectId, tasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("findTaskByStudentRepo called with studentId:", studentId);
                objectId = new mongoose_1["default"].Types.ObjectId(studentId);
                return [4 /*yield*/, Task_1["default"].find({ studentId: objectId })
                        .populate("teacherId")
                        .exec()];
            case 1:
                tasks = _a.sent();
                console.log("Tasks found:", tasks);
                return [2 /*return*/, tasks];
        }
    });
}); };
//update task by teacher
exports.updateTask = function (taskId, taskData) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedTask, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Task_1["default"].findByIdAndUpdate(taskId, taskData, {
                        "new": true,
                        runValidators: true
                    })];
            case 1:
                updatedTask = _a.sent();
                return [2 /*return*/, updatedTask];
            case 2:
                error_1 = _a.sent();
                throw new Error("Error updating task: ");
            case 3: return [2 /*return*/];
        }
    });
}); };
//update task status by student
exports.updateTaskStatusRepo = function (taskId, status) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Task_1["default"].findByIdAndUpdate(taskId, { status: status }, { "new": true })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//delete
exports.deleteTaskRepo = function (id) { return Task_1["default"].findByIdAndDelete(id); };
