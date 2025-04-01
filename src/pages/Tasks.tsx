import { Box, Typography, Grid, Paper } from '@mui/material';
import { useStore } from '../store/useStore';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

export default function Tasks() {
  const tasks = useStore((state) => state.tasks);
  const pendingTasks = useStore((state) => state.pendingTasks);
  const completedTasks = useStore((state) => state.completedTasks);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <TaskList
              tasks={tasks}
              pendingTasks={pendingTasks}
              completedTasks={completedTasks}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <TaskForm />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 