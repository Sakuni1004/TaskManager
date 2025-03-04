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
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var CreateTaskForm = function (_a) {
    var onClose = _a.onClose, onSubmit = _a.onSubmit;
    var _b = react_1.useState({
        title: "",
        description: "",
        taskId: "",
        status: "Pending"
    }), task = _b[0], setTask = _b[1];
    // Handle input changes
    var handleChange = function (e) {
        var _a;
        setTask(__assign(__assign({}, task), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    // Handle status change
    var handleChangeProgressButton = function (e) {
        setTask(function (prevTask) { return (__assign(__assign({}, prevTask), { status: e.target.value })); });
    };
    // Handle form submission
    var handleSubmit = function (e) {
        e.preventDefault();
        onSubmit(task);
        setTask({ title: "", description: "", taskId: "", status: "Pending" }); // Reset the form
    };
    return (react_1["default"].createElement("div", { className: "taskForm" },
        react_1["default"].createElement("h2", null, "Create New Task"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit },
            react_1["default"].createElement(material_1.TextField, { label: "Task Title", variant: "outlined", fullWidth: true, margin: "normal", name: "title", value: task.title, onChange: handleChange }),
            react_1["default"].createElement(material_1.TextField, { label: "Task ID", variant: "outlined", fullWidth: true, margin: "normal", name: "taskId", value: task.taskId, onChange: handleChange }),
            react_1["default"].createElement(material_1.TextField, { label: "Task Description", variant: "outlined", fullWidth: true, margin: "normal", name: "description", value: task.description, onChange: handleChange, multiline: true, rows: 4 }),
            react_1["default"].createElement(material_1.FormControl, { fullWidth: true, margin: "normal" },
                react_1["default"].createElement(material_1.InputLabel, null, "Task Status"),
                react_1["default"].createElement(material_1.Select, { value: task.status, label: "Task Status", name: "status" },
                    react_1["default"].createElement(material_1.MenuItem, { value: "Pending" }, "Pending"),
                    react_1["default"].createElement(material_1.MenuItem, { value: "Completed" }, "Completed"),
                    react_1["default"].createElement(material_1.MenuItem, { value: "In Progress" }, "In Progress"))),
            react_1["default"].createElement(material_1.Button, { type: "submit", variant: "contained", color: "primary" }, "Create Task"),
            react_1["default"].createElement(material_1.Button, { type: "button", variant: "outlined", color: "secondary", onClick: onClose, style: { marginLeft: '10px' } }, "Cancel"))));
};
exports["default"] = CreateTaskForm;
