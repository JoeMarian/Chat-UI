import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Chip } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Task } from '../types/chat';
import { useStore } from '../store/useStore';

interface TaskListProps {
  tasks: Task[];
  pendingTasks: Task[];
  completedTasks: Task[];
}

export default function TaskList({ tasks, pendingTasks, completedTasks }: TaskListProps) {
  const updateTaskStatus = useStore((state) => state.updateTaskStatus);

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    updateTaskStatus(taskId, newStatus);
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        All Tasks
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <ListItemText
              primary={task.title}
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {task.description}
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Chip
                      label={task.priority}
                      size="small"
                      color={getPriorityColor(task.priority)}
                    />
                    <Chip
                      label={task.status}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
} 