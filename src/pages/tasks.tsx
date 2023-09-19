import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

const TaskComponent: React.FC<{
  task: Task;
  onDelete: (taskId: number) => void;
}> = ({ task, onDelete }) => {
  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="h6">{task.title}</Typography>
      <Typography variant="body2">Description: {task.description}</Typography>
      <Typography variant="body2">Due Date: {task.dueDate}</Typography>
      <Typography variant="body2">Status: {task.status}</Typography>
      <IconButton onClick={() => onDelete(task.id)}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    id: 0,
    title: '',
    description: '',
    dueDate: '',
    status: 'To Do',
  });

  const [filterStatus, setFilterStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  const handleCreateTask = () => {
    // Create a new task and add it to the tasks array
    const task: Task = { ...newTask, id: Date.now() };
    setTasks([...tasks, task]);
    setNewTask({
      id: 0,
      title: '',
      description: '',
      dueDate: '',
      status: 'To Do',
    });
  };

  const handleDeleteTask = (taskId: number) => {
    // Remove a task by filtering out the task with the matching ID
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Apply filter based on status
  const filteredTasks = tasks.filter(
    (task) => !filterStatus || task.status === filterStatus,
  );

  // Apply sorting based on sortBy
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" style={{ marginTop: '20px' }}>
        Task Management
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        style={{ marginTop: '10px' }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        style={{ marginTop: '10px' }}
      />
      <TextField
        label="Due Date"
        variant="outlined"
        fullWidth
        type="date"
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        style={{ marginTop: '10px' }}
      />
      <TextField
        select
        label="Status"
        variant="outlined"
        fullWidth
        value={newTask.status}
        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        style={{ marginTop: '10px' }}
      >
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleCreateTask}
        style={{ marginTop: '10px' }}
      >
        Create Task
      </Button>
      <TextField
        select
        label="Filter by Status"
        variant="outlined"
        fullWidth
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{ marginTop: '10px' }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>
      <TextField
        select
        label="Sort by"
        variant="outlined"
        fullWidth
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ marginTop: '10px' }}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="dueDate">Due Date</MenuItem>
        <MenuItem value="status">Status</MenuItem>
      </TextField>
      <div style={{ marginTop: '20px' }}>
        {sortedTasks.map((task) => (
          <TaskComponent
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </Container>
  );
};

export default Tasks;
