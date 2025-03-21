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
exports.TaskCard = void 0;
var react_1 = require("react");
require("./taskCard.css");
var taskService_1 = require("../services/taskService");
exports.TaskCard = function (_a) {
    var tasks = _a.tasks, onStatusUpdate = _a.onStatusUpdate;
    var _b = react_1.useState(null), selectedTask = _b[0], setSelectedTask = _b[1];
    var _c = react_1.useState(""), newStatus = _c[0], setNewStatus = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var editTask = function (task) {
        setSelectedTask(task);
        setNewStatus(task.status);
    };
    var handleStatusUpdate = function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatedTask, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedTask)
                        return [2 /*return*/];
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, taskService_1.updateTaskStatus(selectedTask._id, newStatus)];
                case 2:
                    updatedTask = _a.sent();
                    console.log("Updated Task Response:", updatedTask);
                    if (updatedTask && updatedTask.task) {
                        onStatusUpdate(updatedTask.task);
                        setSelectedTask(null);
                    }
                    else {
                        console.warn("Unexpected response format:", updatedTask);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error updating task status:", error_1.message);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "task-card-container" },
        tasks.map(function (task) { return (react_1["default"].createElement("div", { key: task._id, className: "task-card" },
            react_1["default"].createElement("div", { className: "task-content" },
                react_1["default"].createElement("h3", { className: "task-title" }, task.title),
                react_1["default"].createElement("p", { className: "task-description" }, task.description),
                react_1["default"].createElement("p", { className: "task-status" },
                    react_1["default"].createElement("strong", null, "Status:"),
                    " ",
                    task.status)),
            react_1["default"].createElement("div", { className: "task-actions" },
                react_1["default"].createElement("button", { className: "edit-btn", onClick: function () { return editTask(task); } }, "Edit Status")))); }),
        selectedTask && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: "modal-overlay", onClick: function () { return setSelectedTask(null); } }),
            react_1["default"].createElement("div", { className: "modal" },
                react_1["default"].createElement("div", { className: "modal-Content" },
                    react_1["default"].createElement("h3", null, "Edit Task Status"),
                    react_1["default"].createElement("p", { className: "task-title-modal" }, selectedTask.title),
                    react_1["default"].createElement("select", { value: newStatus, onChange: function (e) { return setNewStatus(e.target.value); }, className: "status-dropdown" },
                        react_1["default"].createElement("option", { value: "Pending" }, "Pending"),
                        react_1["default"].createElement("option", { value: "In Progress" }, "In Progress"),
                        react_1["default"].createElement("option", { value: "Completed" }, "Completed")),
                    react_1["default"].createElement("div", { className: "modal-actions" },
                        react_1["default"].createElement("button", { className: "update-btn", onClick: handleStatusUpdate, disabled: loading }, loading ? "Updating..." : "Update"),
                        react_1["default"].createElement("button", { className: "cancel-btn", onClick: function () { return setSelectedTask(null); } }, "Cancel"))))))));
};
