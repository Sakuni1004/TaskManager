import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Grid,
} from "@mui/material";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: string;
  };
  onEdit: (updatedTask: { id: string; title: string; description: string; status: string }) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setEditedTask({ ...editedTask, [name]: value });
  };

  // For handling status change (Select dropdown)
  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      status: value,
    }));
  };

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task); // Reset to original task
    setIsEditing(false);
  };

  return (
    <Card
      style={{
        margin: "10px",
        padding: "20px",
        width: "100%",  // Make width 100% for responsiveness
        height: "200px", // Fixed height for square shape
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Center content vertically
        borderRadius: "10px", // Optional: makes corners rounded
      }}
    >
      <CardContent style={{ flex: 1 }}>
        {isEditing ? (
          <>
            <Typography variant="h6">Edit Task</Typography>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleEditChange}
              placeholder="Task Title"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleEditChange}
              placeholder="Task Description"
              style={{ width: "100%", marginBottom: "10px", height: "80px" }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={editedTask.status}
                onChange={handleStatusChange}  // Use handleStatusChange for Select
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={handleCancel} variant="outlined" color="secondary" style={{ marginLeft: "10px" }}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {task.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Status: {task.status}
            </Typography>
            <Button
              onClick={() => setIsEditing(true)}
              variant="outlined"
              color="primary"
              style={{ marginRight: "10px", marginTop: "10px" }}
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(task.id)}
              variant="outlined"
              color="secondary"
              style={{ marginTop: "10px" }}
            >
              Delete
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const TaskCardList: React.FC<{
  tasks: { id: string; title: string; description: string; status: string }[];
  onEdit: (updatedTask: { id: string; title: string; description: string; status: string }) => void;
  onDelete: (id: string) => void;
}> = ({ tasks, onEdit, onDelete }) => {
  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid item xs={12} sm={6} md={2} lg={2} key={task.id}>
          <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskCardList;
