import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import {
  Send as SendIcon,
  PriorityHigh as PriorityHighIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useStore } from '../../store/useStore';
import { Message } from '../../types/chat';

export default function ChatWindow() {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<Message['priority']>('normal');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { activeChatRoom, messages, addMessage } = useStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeChatRoom) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message.trim(),
      sender: 'Current User', // Replace with actual user
      timestamp: new Date(),
      priority,
      isRead: false,
    };

    addMessage(activeChatRoom, newMessage);
    setMessage('');
    setPriority('normal');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  if (!activeChatRoom) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Select a chat room to start messaging
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Paper
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages[activeChatRoom]?.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'Current User' ? 'flex-end' : 'flex-start',
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                maxWidth: '70%',
              }}
            >
              {msg.sender !== 'Current User' && (
                <Avatar sx={{ width: 32, height: 32 }}>
                  {msg.sender[0]}
                </Avatar>
              )}
              <Box
                sx={{
                  bgcolor: msg.sender === 'Current User' ? 'primary.main' : 'grey.100',
                  color: msg.sender === 'Current User' ? 'white' : 'text.primary',
                  p: 1,
                  borderRadius: 2,
                  position: 'relative',
                }}
              >
                <Typography variant="body1">{msg.content}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    mt: 0.5,
                  }}
                >
                  {msg.priority === 'urgent' && (
                    <PriorityHighIcon sx={{ fontSize: 16, color: 'error.main' }} />
                  )}
                  {msg.priority === 'important' && (
                    <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                  )}
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </Typography>
                </Box>
              </Box>
              {msg.sender === 'Current User' && (
                <Avatar sx={{ width: 32, height: 32 }}>
                  {msg.sender[0]}
                </Avatar>
              )}
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>
      <Divider />
      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          variant="outlined"
          size="small"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <IconButton
            color={priority === 'urgent' ? 'error' : 'default'}
            onClick={() => setPriority('urgent')}
          >
            <PriorityHighIcon />
          </IconButton>
          <IconButton
            color={priority === 'important' ? 'warning' : 'default'}
            onClick={() => setPriority('important')}
          >
            <StarIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
} 