import { useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useStore } from '../store/useStore';
import { Task } from '../types/chat';

export default function TaskForm() {
  const addTask = useStore((state) => state.addTask);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !dueDate || !assignedTo) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      status: 'pending',
      assignedTo,
      dueDate,
    };

    addTask(newTask);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate(new Date());
    setAssignedTo('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add New Task
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
        required
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          label="Priority"
          onChange={(e) => setPriority(e.target.value as Task['priority'])}
        >
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
      </FormControl>
      <DatePicker
        label="Due Date"
        value={dueDate}
        onChange={(newValue) => setDueDate(newValue)}
        slotProps={{ textField: { fullWidth: true, required: true } }}
      />
      <TextField
        label="Assigned To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Add Task
      </Button>
    </Box>
  );
} 