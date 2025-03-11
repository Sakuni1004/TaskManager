import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "../services/taskService";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { getAllStudents } from "../services/studentServices";
import "./CreateTaskForm.css";

// Define Student interface
interface Student {
  _id: string;
  studentRegistrationNumber: string;
  username: string;
}

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
  const studentId = localStorage.getItem("sId") || "";
  const teacherId = localStorage.getItem("id") || "";

  if (!teacherId) {
    console.error("Teacher ID not found in localStorage");
  }



  const [students, setStudents] = useState<Student[]>([]); // Ensure proper type
  const [selectedStudentId, setSelectedStudentId] = useState<string>(""); // Store selected student ID
  const [selectedRegNumber, setSelectedRegNumber] = useState<string>(""); // Store registration number


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
  }, [task, teacherId, studentId]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents();
       const dataArray = response.data
        if (Array.isArray(dataArray)) {

          setStudents(dataArray);
        } else {
          console.error("Expected an array but got:", response);
          setStudents([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]); 
      }
    };
  
    fetchStudents();
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const student = students.find((s) => s._id === selectedId);

    if (student) {
      setSelectedStudentId(student._id);
      setSelectedRegNumber(student.studentRegistrationNumber);

      // Update taskData with selected student details
      setTaskData((prevTaskData) => ({
        ...prevTaskData,
        studentId: student._id,
        studentRegistrationNumber: student.studentRegistrationNumber,
      }));
    } else {
      setSelectedStudentId("");
      setSelectedRegNumber("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !taskData.title ||
      !taskData.description ||
      !taskData.dueDate ||
      !taskData.studentRegistrationNumber ||
      !taskData.teacherId ||
      !taskData.studentId
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      if (task) {
        await updateTask(task._id, taskData);
        alert("Task updated successfully!");
      } else {
        await createTask(taskData);
        alert("Task created successfully!");
      }

      onTaskCreated();
      onClose();
    } catch (error) {
      console.error("Failed to create/edit task:", error);
    }
  };

  return (
    <div className="task-form-container">
      <h2 className="form-title">{task ? "Edit Task" : "Create Task"}</h2>
      <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="title" style={{ fontWeight: '500',  }}>Enter Task Title</label>
        <input className="updateFormData"
         style={{ fontWeight: '100', fontSize: '12px' }}
          type="text"
          name="title"
          placeholder="Task Title"
          value={taskData.title}
          onChange={handleChange}
          required
        />
      <label htmlFor="title" style={{ fontWeight: '500',  }}>Enter Task Sescription</label>
        <textarea
        style={{ fontWeight: '100', fontSize: '12px' }}
          name="description"
          placeholder="Task Description"
          value={taskData.description}
          onChange={handleChange}
          required
        />
      <label htmlFor="title" style={{ fontWeight: '500',  }}>Enter deadline for the task</label>

        <input
        style={{ fontWeight: '100', fontSize: '12px' }}
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          required
        />

        {/* Student Dropdown */}
        <div>
          <label style={{ fontWeight: '500',  }}>Select a Student:</label><br/>
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
            <div>
              <h3>Selected Student Details:</h3>
              <p>
                <strong>ID:</strong> {selectedStudentId}
              </p>
              <p>
                <strong>Registration Number:</strong> {selectedRegNumber}
              </p>
            </div>
          )}
        </div>

        {/* Status Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ fontWeight: 600 , color :'green' }}>Status</InputLabel>
          <Select
            name="status"
            value={taskData.status}
            style={{ fontWeight: '100', fontSize: '12px' }}
            onChange={(e) =>
              setTaskData((prev) => ({
                ...prev,
                status: e.target.value as string,
              }))
            }
          >
            <MenuItem value="Created" style={{ fontWeight: '100', fontSize: '12px' }}>Created</MenuItem>
            <MenuItem value="Pending" style={{ fontWeight: '100', fontSize: '12px' }}>Pending</MenuItem>
            <MenuItem value="Completed" style={{ fontWeight: '100', fontSize: '12px' }}>Completed</MenuItem>
            <MenuItem value="In Progress" style={{ fontWeight: '100', fontSize: '12px' }}>In Progress</MenuItem>
          </Select>
        </FormControl>

        <div className="button-group">
          <button type="button" className="cancel-button" onClick={onClose}>
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
