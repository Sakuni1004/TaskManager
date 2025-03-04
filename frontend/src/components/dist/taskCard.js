"use strict";
exports.__esModule = true;
var react_1 = require("react");
var TaskCard = function (_a) {
    var task = _a.task;
    return (react_1["default"].createElement("div", { className: "task-card" },
        react_1["default"].createElement("h2", { className: "task-title" }, task.title),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Task ID:"),
            " ",
            task.id),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Status:"),
            " ",
            task.status),
        react_1["default"].createElement("p", null,
            react_1["default"].createElement("strong", null, "Due Date:"),
            " ",
            task.dueDate),
        react_1["default"].createElement("button", { className: "complete-btn" }, "Mark as Complete")));
};
exports["default"] = TaskCard;
