// src/pages/dashboard.tsx
import React from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

// Sample dummy task data
const dummyTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description for Task 1",
    status: "To Do",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description for Task 2",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description for Task 3",
    status: "Completed",
  },
  // Add more tasks as needed
];

const Dashboard: React.FC = () => {
  // Calculate task statistics based on the dummy data
  const taskStatistics = {
    todo: dummyTasks.filter((task) => task.status === "To Do").length,
    inProgress: dummyTasks.filter((task) => task.status === "In Progress").length,
    completed: dummyTasks.filter((task) => task.status === "Completed").length,
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>

      {/* Task Statistics */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">To Do</Typography>
              <Typography variant="body2">
                Tasks: {taskStatistics.todo}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">In Progress</Typography>
              <Typography variant="body2">
                Tasks: {taskStatistics.inProgress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed</Typography>
              <Typography variant="body2">
                Tasks: {taskStatistics.completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* User's Tasks */}
      <Paper elevation={3} style={{ padding: "16px", marginTop: "20px" }}>
        <Typography variant="h5">Your Tasks</Typography>
        <ul>
          {dummyTasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
            </li>
          ))}
        </ul>
      </Paper>
    </Container>
  );
};

export default Dashboard;
