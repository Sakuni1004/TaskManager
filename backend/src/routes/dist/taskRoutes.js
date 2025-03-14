"use strict";
exports.__esModule = true;
var express_1 = require("express");
var taskController_1 = require("../controllers/taskController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1["default"].Router();
router.post("/create", authMiddleware_1.authenticateUser, taskController_1.createTaskController);
router.get("/teacher/:teacherId", authMiddleware_1.authenticateUser, taskController_1.getTasksByTeacherId);
router.get("/student/:studentId", authMiddleware_1.authenticateUser, taskController_1.getTasksByStudentId);
router.put("/:taskId", authMiddleware_1.authenticateUser, taskController_1.updateTaskController);
router["delete"]("/:id", authMiddleware_1.authenticateUser, taskController_1.deleteTaskController);
router.put("/status/:taskId", authMiddleware_1.authenticateUser, taskController_1.updateTaskStatusController);
exports["default"] = router;
