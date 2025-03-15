import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../store/store';
import { createNewTask, updateExistingTask } from "../slices/taskSlice";
import { fetchStudents } from "../slices/studentSlice";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { RootState } from "../store/store";
import "./CreateTaskForm.css";

interface CreateTaskFormProps {
  onClose: () => void;
  onTaskCreated: () => void;
  task?: any;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  onClose,
  onTaskCreated,
  task,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const students = useSelector((state: RootState) => state.students.students);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [selectedRegNumber, setSelectedRegNumber] = useState<string>("");

  const teacherId = localStorage.getItem("id") || "";
  const studentId = localStorage.getItem("sId") || "";

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
    teacherId,
    studentRegistrationNumber: selectedRegNumber,
    studentId: selectedStudentId,
  });

  useEffect(() => {
    dispatch(fetchStudents());
    if (task) {
      setTaskData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate || "",
        status: task.status || "Pending",
        teacherId: task.teacherId || teacherId,
        studentRegistrationNumber: task.studentRegistrationNumber || "",
        studentId: task.studentId || studentId,
      });
    }
  }, [task, teacherId, studentId, dispatch]);

  useEffect(() => {
    if (selectedStudentId) {
      const selectedStudent = students.find(
        (student) => student._id === selectedStudentId
      );
      if (selectedStudent) {
        setSelectedRegNumber(selectedStudent.studentRegistrationNumber);
        setTaskData((prevTaskData) => ({
          ...prevTaskData,
          studentRegistrationNumber: selectedStudent.studentRegistrationNumber,
          studentId: selectedStudentId,
        }));
      }
    }
  }, [selectedStudentId, students]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStudentId(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Task Data Submitted:", taskData); 
  
    if (
      !taskData.title ||
      !taskData.description ||
      !taskData.dueDate ||
      !taskData.studentRegistrationNumber ||
      !taskData.teacherId ||
      !taskData.studentId
    ) {
      alert("All fields are required!!");
      return;
    }
  
    try {
      
      if (task) {
        const updatedTaskData = { ...taskData, _id: task._id }; 
        await dispatch(updateExistingTask(updatedTaskData));
        alert("Task updated successfully!");
      } else {
        const taskWithPlaceholderId = { ...taskData, _id: "" }; 
       await dispatch(createNewTask(taskWithPlaceholderId));
        alert("Task created successfully!");
      }
  
      onTaskCreated();
      onClose();
    } catch (error) {
      console.error("Failed to create/edit task:", error);
    }
  };
  

  const handleCancel = () => {
    onClose();
  };


  if (!Array.isArray(students)) {
    console.error("Expected students to be an array, but got:", students);
    return <div>Error: Unable to load students data!</div>;
  }

  return (
    <div className="task-form-container">
      <h2 className="form-title">{task ? "Edit Task" : "Create Task"}</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <label htmlFor="title" style={{ fontWeight: "500" }}>
          Enter Task Title
        </label>
        <input
          className="updateFormData"
          style={{ fontWeight: "100", fontSize: "12px" }}
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="title" style={{ fontWeight: "500" }}>
          Enter Task Sescription
        </label>
        <textarea
          style={{ fontWeight: "100", fontSize: "12px" }}
          name="description"
          placeholder="Task Description"
          value={taskData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="title" style={{ fontWeight: "500" }}>
          Enter deadline for the task
        </label>

        <input
          style={{ fontWeight: "100", fontSize: "12px" }}
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          required
        />

        {/* Student Dropdown */}
        <div>
          <label style={{ fontWeight: "500" }}>Select a Student:</label>
          <br />
          <select onChange={handleSelectChange} value={selectedStudentId}>
            <option value="">-- Select --</option>
            {Array.isArray(students) &&
              students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.username}
                </option>
              ))}
          </select>

          {selectedStudentId && (
            <div style={{ color: "rgb(93, 99, 93)", opacity: 0.6 }}>
              <h5 style={{ lineHeight: "0.5" }}>Selected Student Details:</h5>

              <h6 style={{ lineHeight: "0.5" }}>
                Registration Number: {selectedRegNumber}
              </h6>
            </div>
          )}
        </div>

        {/* Status Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ fontWeight: 600, color: "green" }}>
            Status
          </InputLabel>
          <Select
            name="status"
            value={taskData.status}
            style={{ fontWeight: "100", fontSize: "12px" }}
            onChange={(e) =>
              setTaskData((prev) => ({
                ...prev,
                status: e.target.value as string,
              }))
            }
          >
            <MenuItem
              value="Created"
              style={{ fontWeight: "100", fontSize: "12px" }}
            >
              Created
            </MenuItem>
            <MenuItem
              value="Pending"
              style={{ fontWeight: "100", fontSize: "12px" }}
            >
              Pending
            </MenuItem>
            <MenuItem
              value="Completed"
              style={{ fontWeight: "100", fontSize: "12px" }}
            >
              Completed
            </MenuItem>
            <MenuItem
              value="In Progress"
              style={{ fontWeight: "100", fontSize: "12px" }}
            >
              In Progress
            </MenuItem>
          </Select>
        </FormControl>

        <div className="button-group">
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="Cbutton">
            {task ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );

  
};

export default CreateTaskForm;





