
import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";



interface CreateTaskFormProps {
  onClose: () => void;
  onSubmit: (task: { title: string; description: string; taskId: string; status: string }) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onClose, onSubmit }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    taskId: "",
    status: "Pending",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    setTask({ ...task, [e.target.name as string]: e.target.value });
  };

  // Handle status change
  const handleChangeProgressButton = (e: React.ChangeEvent<{ value: unknown }>) => {
    setTask((prevTask) => ({
      ...prevTask,
      status: e.target.value as string, 
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task); 
    setTask({ title: "", description: "", taskId: "", status: "Pending" }); // Reset the form
  };

  return (
    <div className="taskForm">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>

        {/* Task Title */}
        <TextField
          label="Task Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={task.title}
          onChange={handleChange}
        />

        {/* Task ID */}
        <TextField
          label="Task ID"
          variant="outlined"
          fullWidth
          margin="normal"
          name="taskId"
          value={task.taskId}
          onChange={handleChange}
        />

        {/* Task Description */}
        <TextField
          label="Task Description"
          variant="outlined"
          fullWidth
          margin="normal"
          name="description"
          value={task.description}
          onChange={handleChange}
          multiline
          rows={4}
        />

        {/* Task Status */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Task Status</InputLabel>
          <Select
            value={task.status}
            label="Task Status"
            name="status"
           
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Create Task
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          onClick={onClose} // Close form when clicking cancel
          style={{ marginLeft: '10px' }}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
