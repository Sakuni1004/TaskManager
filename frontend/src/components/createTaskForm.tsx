import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent, // Import this
} from "@mui/material";
import "./CreateTaskForm.css"; // Import the CSS file

interface CreateTaskFormProps {
  onClose: () => void;
  onSubmit: (task: {
    title: string;
    description: string;
    dueDate: string;
    studentId: string;
    status: string;
  }) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  onClose,
  onSubmit,
}) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    studentId: "",
    status: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    setTask({
      title: "",
      description: "",
      dueDate: "",
      studentId: "",
      status: "",
    });
  };

  return (
    <div className="task-form-container">
      <h2 className="form-title">Create New Task</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <TextField
          label="Task Title"
          name="title"
          value={task.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Task Description"
          name="description"
          value={task.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />

        <TextField
          type="date"
          label="Due Date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          label="Student ID"
          name="studentId"
          value={task.studentId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={task.status} onChange={handleChange}>
            <MenuItem value="Created">Created</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
          </Select>
        </FormControl>

        <div className="button-group">
          <Button type="submit" variant="contained" color="primary">
            Create Task
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={onClose}
            className="cancel-button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;
