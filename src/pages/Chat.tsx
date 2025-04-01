import { Box, Typography, Paper, TextField, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Grid, Divider } from '@mui/material';
import { Send as SendIcon, Person as PersonIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const chatRooms = useStore((state) => state.chatRooms);
  const activeChatRoom = useStore((state) => state.activeChatRoom);
  const messages = useStore((state) => state.messages[activeChatRoom || ''] || []);
  const addMessage = useStore((state) => state.addMessage);
  const setActiveChatRoom = useStore((state) => state.setActiveChatRoom);

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
    const existingRoom = chatRooms.find(room => 
      room.participants.includes(userId) && room.participants.length === 2
    );
    
    if (existingRoom) {
      setActiveChatRoom(existingRoom.id);
    } else {
      const newRoom = {
        id: Date.now().toString(),
        name: `Chat with ${userId}`,
        participants: ['user', userId],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setActiveChatRoom(newRoom.id);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !activeChatRoom) return;

    addMessage(activeChatRoom, {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      isRead: false,
    });

    setMessage('');
  };

  return (
    <Grid container spacing={2} sx={{ height: 'calc(100vh - 64px)' }}>
      {/* Chat List Sidebar */}
      <Grid item xs={12} md={3}>
        <Paper sx={{ height: '100%', overflow: 'auto' }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Contacts
            </Typography>
            <List>
              {['Joe', 'Jabin', 'Madhavv', 'Saran', 'Keerthivasan'].map((user) => (
                <ListItem
                  key={user}
                  button
                  selected={selectedUser === user}
                  onClick={() => handleUserSelect(user)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Grid>

      {/* Chat Window */}
      <Grid item xs={12} md={9}>
        <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {selectedUser ? (
            <>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6">
                  Chat with {selectedUser}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                <List>
                  {messages.map((msg) => (
                    <ListItem
                      key={msg.id}
                      sx={{
                        flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          {msg.sender[0].toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={msg.sender}
                        secondary={msg.content}
                        secondaryTypographyProps={{
                          sx: { 
                            whiteSpace: 'pre-wrap',
                            bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.100',
                            p: 1,
                            borderRadius: 1,
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <form onSubmit={handleSendMessage}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      variant="outlined"
                    />
                    <IconButton type="submit" color="primary">
                      <SendIcon />
                    </IconButton>
                  </Box>
                </form>
              </Box>
            </>
          ) : (
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'text.secondary'
            }}>
              <Typography variant="h6">
                Select a contact to start chatting
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
} 