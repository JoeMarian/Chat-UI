import { Box, Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useStore } from '../store/useStore';

// Sample data for visualizations
const pendingTasksData = [
  { priority: 'High', tasks: 12 },
  { priority: 'Medium', tasks: 24 },
  { priority: 'Low', tasks: 8 },
];

const performanceData = [
  { name: 'Week 1', tasks: 15, efficiency: 85 },
  { name: 'Week 2', tasks: 20, efficiency: 88 },
  { name: 'Week 3', tasks: 25, efficiency: 92 },
  { name: 'Week 4', tasks: 22, efficiency: 90 },
];

const completedWorkData = [
  { name: 'Bugs Fixed', value: 30 },
  { name: 'Features Developed', value: 45 },
  { name: 'Documents Completed', value: 25 },
];

const notificationsData = [
  { name: 'Mentions', value: 15 },
  { name: 'Meeting Reminders', value: 20 },
  { name: 'Deadlines', value: 25 },
  { name: 'Project Updates', value: 40 },
];

const workloadData = [
  { name: 'Team A', week1: 40, week2: 45, week3: 35, week4: 50 },
  { name: 'Team B', week1: 35, week2: 40, week3: 45, week4: 40 },
  { name: 'Team C', week1: 45, week2: 35, week3: 40, week4: 45 },
];

const projectAnalyticsData = [
  { name: 'Project A', success: 85, failure: 15 },
  { name: 'Project B', success: 92, failure: 8 },
  { name: 'Project C', success: 78, failure: 22 },
  { name: 'Project D', success: 88, failure: 12 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const tasks = useStore((state) => state.tasks);
  const pendingTasks = useStore((state) => state.pendingTasks);
  const completedTasks = useStore((state) => state.completedTasks);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Tasks
            </Typography>
            <Typography variant="h3">{tasks.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Pending Tasks
            </Typography>
            <Typography variant="h3">{pendingTasks.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Completed Tasks
            </Typography>
            <Typography variant="h3">{completedTasks.length}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Pending Work Tracker */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Pending Tasks by Priority
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pendingTasksData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priority" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tasks" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Performance Improvement Analysis */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Performance Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tasks" stroke="#8884d8" />
                <Line type="monotone" dataKey="efficiency" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Completed Work Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Completed Work Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={completedWorkData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {completedWorkData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Notifications Dashboard */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Notifications Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={notificationsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {notificationsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Workload Distribution Analysis */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Workload Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={workloadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="week1" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Area type="monotone" dataKey="week2" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Area type="monotone" dataKey="week3" stackId="1" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                <Area type="monotone" dataKey="week4" stackId="1" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Project Success and Failure Analytics */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Project Success and Failure Rates
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectAnalyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="success" fill="#82ca9d" name="Success Rate" />
                <Bar dataKey="failure" fill="#ff7300" name="Failure Rate" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 