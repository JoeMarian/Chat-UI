import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Slider,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useStore } from '../store/useStore';

export default function Settings() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const fontSize = useStore((state) => state.fontSize);
  const setFontSize = useStore((state) => state.setFontSize);
  const language = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Appearance
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              color="primary"
            />
          }
          label="Dark Mode"
        />
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>Font Size</Typography>
          <Slider
            value={fontSize}
            onChange={(_: Event, value: number | number[]) => setFontSize(value as number)}
            min={12}
            max={24}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Language
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            label="Language"
            onChange={(e: { target: { value: string } }) => setLanguage(e.target.value)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="de">German</MenuItem>
            <MenuItem value="it">Italian</MenuItem>
            <MenuItem value="pt">Portuguese</MenuItem>
            <MenuItem value="ru">Russian</MenuItem>
            <MenuItem value="zh">Chinese</MenuItem>
            <MenuItem value="ja">Japanese</MenuItem>
            <MenuItem value="ko">Korean</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Accessibility
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="High Contrast Mode"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Screen Reader Support"
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Keyboard Navigation"
        />
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Email Notifications"
              secondary="Receive updates via email"
            />
            <ListItemSecondaryAction>
              <Switch defaultChecked />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Push Notifications"
              secondary="Receive updates in browser"
            />
            <ListItemSecondaryAction>
              <Switch defaultChecked />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Task Reminders"
              secondary="Get notified about task deadlines"
            />
            <ListItemSecondaryAction>
              <Switch defaultChecked />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Mention Alerts"
              secondary="Get notified when mentioned"
            />
            <ListItemSecondaryAction>
              <Switch defaultChecked />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Language & Region
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Language</InputLabel>
          <Select defaultValue="en" label="Language">
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="de">German</MenuItem>
            <MenuItem value="ja">Japanese</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Time Zone</InputLabel>
          <Select defaultValue="utc" label="Time Zone">
            <MenuItem value="utc">UTC</MenuItem>
            <MenuItem value="est">Eastern Time</MenuItem>
            <MenuItem value="pst">Pacific Time</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Account Settings
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Display Name"
            defaultValue="John Doe"
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            defaultValue="john.doe@example.com"
            fullWidth
          />
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
} 