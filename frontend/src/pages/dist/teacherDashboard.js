"use strict";
exports.__esModule = true;
// TeacherDashboard.tsx
var react_1 = require("react");
var material_1 = require("@mui/material");
var createTaskForm_1 = require("../components/createTaskForm");
require("./teacherDashbord.css");
var TeacherDashboard = function () {
    var _a = react_1.useState(false), openForm = _a[0], setOpenForm = _a[1];
    var handleSubmit = function (task) {
        console.log("Task Created:", task);
        setOpenForm(false);
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h1", { className: "heading" }, "Teacher Dashboard"),
        react_1["default"].createElement(material_1.Button, { variant: "contained", color: "primary", className: "addButton", onClick: function () { return setOpenForm(true); }, style: {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: 'blue',
                padding: '10px 20px',
                zIndex: 1000
            } }, "Add Task"),
        openForm && (react_1["default"].createElement(createTaskForm_1["default"], { onClose: function () { return setOpenForm(false); }, onSubmit: handleSubmit }))));
};
exports["default"] = TeacherDashboard;
