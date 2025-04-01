import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { useStore } from '../store/useStore';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Analytics() {
  const { tasks, pendingTasks, completedTasks } = useStore();

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    pending: pendingTasks.length,
    completed: completedTasks.length,
    highPriority: tasks.filter((task) => task.priority === 'high').length,
    mediumPriority: tasks.filter((task) => task.priority === 'medium').length,
    lowPriority: tasks.filter((task) => task.priority === 'low').length,
  };

  // Sample data for charts
  const performanceData = [
    { name: 'Week 1', tasks: 15, efficiency: 85 },
    { name: 'Week 2', tasks: 20, efficiency: 88 },
    { name: 'Week 3', tasks: 25, efficiency: 92 },
    { name: 'Week 4', tasks: 22, efficiency: 90 },
  ];

  const priorityData = [
    { name: 'High', value: taskStats.highPriority },
    { name: 'Medium', value: taskStats.mediumPriority },
    { name: 'Low', value: taskStats.lowPriority },
  ];

  const statusData = [
    { name: 'Pending', value: taskStats.pending },
    { name: 'Completed', value: taskStats.completed },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Quick Stats */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Total Tasks
            </Typography>
            <Typography variant="h4">{taskStats.total}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Pending Tasks
            </Typography>
            <Typography variant="h4" color="warning.main">
              {taskStats.pending}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Completed Tasks
            </Typography>
            <Typography variant="h4" color="success.main">
              {taskStats.completed}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Completion Rate
            </Typography>
            <Typography variant="h4" color="primary.main">
              {Math.round((taskStats.completed / taskStats.total) * 100)}%
            </Typography>
          </Paper>
        </Grid>

        {/* Performance Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Performance Metrics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="#8884d8"
                  name="Tasks Completed"
                />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#82ca9d"
                  name="Efficiency (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Priority Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Task Priority Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Task Status */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Task Status Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Team Performance */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Team Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: 'Team A', tasks: 40, efficiency: 85 },
                  { name: 'Team B', tasks: 35, efficiency: 82 },
                  { name: 'Team C', tasks: 45, efficiency: 88 },
                  { name: 'Team D', tasks: 30, efficiency: 80 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tasks" fill="#8884d8" name="Tasks Completed" />
                <Bar dataKey="efficiency" fill="#82ca9d" name="Efficiency (%)" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 