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
var react_1 = require("react");
var taskService_1 = require("../services/taskService");
var material_1 = require("@mui/material");
var studentServices_1 = require("../services/studentServices");
require("./CreateTaskForm.css");
var CreateTaskForm = function (_a) {
    var onClose = _a.onClose, onTaskCreated = _a.onTaskCreated, task = _a.task;
    var studentId = localStorage.getItem("sId") || "";
    var teacherId = localStorage.getItem("id") || "";
    if (!teacherId) {
        console.error("Teacher ID not found in localStorage");
    }
    var _b = react_1.useState([]), students = _b[0], setStudents = _b[1];
    var _c = react_1.useState(""), selectedStudentId = _c[0], setSelectedStudentId = _c[1];
    var _d = react_1.useState(""), selectedRegNumber = _d[0], setSelectedRegNumber = _d[1];
    var _e = react_1.useState({
        title: "",
        description: "",
        dueDate: "",
        status: "Pending",
        teacherId: teacherId,
        studentRegistrationNumber: selectedRegNumber,
        studentId: selectedStudentId
    }), taskData = _e[0], setTaskData = _e[1];
    react_1.useEffect(function () {
        if (task) {
            setTaskData({
                title: task.title || "",
                description: task.description || "",
                dueDate: task.dueDate || "",
                status: task.status || "Pending",
                teacherId: task.teacherId || teacherId,
                studentRegistrationNumber: task.studentRegistrationNumber || "",
                studentId: task.studentId || studentId
            });
        }
    }, [task, teacherId, studentId]);
    react_1.useEffect(function () {
        var fetchStudents = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, dataArray, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, studentServices_1.getAllStudents()];
                    case 1:
                        response = _a.sent();
                        dataArray = response.data;
                        if (Array.isArray(dataArray)) {
                            setStudents(dataArray);
                        }
                        else {
                            console.error("Expected an array but got:", response);
                            setStudents([]);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error fetching students:", error_1);
                        setStudents([]);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchStudents();
    }, []);
    var handleChange = function (e) {
        var _a;
        setTaskData(__assign(__assign({}, taskData), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var handleSelectChange = function (event) {
        var selectedId = event.target.value;
        var student = students.find(function (s) { return s._id === selectedId; });
        if (student) {
            setSelectedStudentId(student._id);
            setSelectedRegNumber(student.studentRegistrationNumber);
            // Update taskData with selected student details
            setTaskData(function (prevTaskData) { return (__assign(__assign({}, prevTaskData), { studentId: student._id, studentRegistrationNumber: student.studentRegistrationNumber })); });
        }
        else {
            setSelectedStudentId("");
            setSelectedRegNumber("");
        }
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!taskData.title ||
                        !taskData.description ||
                        !taskData.dueDate ||
                        !taskData.studentRegistrationNumber ||
                        !taskData.teacherId ||
                        !taskData.studentId) {
                        alert("All fields are required!");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    if (!task) return [3 /*break*/, 3];
                    return [4 /*yield*/, taskService_1.updateTask(task._id, taskData)];
                case 2:
                    _a.sent();
                    alert("Task updated successfully!");
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, taskService_1.createTask(taskData)];
                case 4:
                    _a.sent();
                    alert("Task created successfully!");
                    _a.label = 5;
                case 5:
                    onTaskCreated();
                    onClose();
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    console.error("Failed to create/edit task:", error_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "task-form-container" },
        react_1["default"].createElement("h2", { className: "form-title" }, task ? "Edit Task" : "Create Task"),
        react_1["default"].createElement("form", { className: "task-form", onSubmit: handleSubmit },
            react_1["default"].createElement("label", { htmlFor: "title", style: { fontWeight: "500" } }, "Enter Task Title"),
            react_1["default"].createElement("input", { className: "updateFormData", style: { fontWeight: "100", fontSize: "12px" }, type: "text", name: "title", placeholder: "Task Title", value: taskData.title, onChange: handleChange, required: true }),
            react_1["default"].createElement("label", { htmlFor: "title", style: { fontWeight: "500" } }, "Enter Task Sescription"),
            react_1["default"].createElement("textarea", { style: { fontWeight: "100", fontSize: "12px" }, name: "description", placeholder: "Task Description", value: taskData.description, onChange: handleChange, required: true }),
            react_1["default"].createElement("label", { htmlFor: "title", style: { fontWeight: "500" } }, "Enter deadline for the task"),
            react_1["default"].createElement("input", { style: { fontWeight: "100", fontSize: "12px" }, type: "date", name: "dueDate", value: taskData.dueDate, onChange: handleChange, required: true }),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("label", { style: { fontWeight: "500" } }, "Select a Student:"),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("select", { onChange: handleSelectChange, value: selectedStudentId },
                    react_1["default"].createElement("option", { value: "" }, "-- Select --"),
                    Array.isArray(students) &&
                        students.map(function (student) { return (react_1["default"].createElement("option", { key: student._id, value: student._id }, student.username)); })),
                selectedStudentId && (react_1["default"].createElement("div", { style: { color: "rgb(93, 99, 93)", opacity: 0.6 } },
                    react_1["default"].createElement("h5", { style: { lineHeight: "0.5" } }, "Selected Student Details:"),
                    react_1["default"].createElement("h6", { style: { lineHeight: "0.5" } },
                        "Registration Number: ",
                        selectedRegNumber)))),
            react_1["default"].createElement(material_1.FormControl, { fullWidth: true, margin: "normal" },
                react_1["default"].createElement(material_1.InputLabel, { sx: { fontWeight: 600, color: "green" } }, "Status"),
                react_1["default"].createElement(material_1.Select, { name: "status", value: taskData.status, style: { fontWeight: "100", fontSize: "12px" }, onChange: function (e) {
                        return setTaskData(function (prev) { return (__assign(__assign({}, prev), { status: e.target.value })); });
                    } },
                    react_1["default"].createElement(material_1.MenuItem, { value: "Created", style: { fontWeight: "100", fontSize: "12px" } }, "Created"),
                    react_1["default"].createElement(material_1.MenuItem, { value: "Pending", style: { fontWeight: "100", fontSize: "12px" } }, "Pending"),
                    react_1["default"].createElement(material_1.MenuItem, { value: "Completed", style: { fontWeight: "100", fontSize: "12px" } }, "Completed"),
                    react_1["default"].createElement(material_1.MenuItem, { value: "In Progress", style: { fontWeight: "100", fontSize: "12px" } }, "In Progress"))),
            react_1["default"].createElement("div", { className: "button-group" },
                react_1["default"].createElement("button", { type: "button", className: "cancel-button", onClick: onClose }, "Cancel"),
                react_1["default"].createElement("button", { type: "submit", className: "Cbutton" }, task ? "Update Task" : "Create Task")))));
};
exports["default"] = CreateTaskForm;
