import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Group as GroupIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ChatRoom } from '../../types/chat';

export default function ChatList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const { chatRooms, activeChatRoom, setActiveChatRoom } = useStore();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, room: ChatRoom) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRoom(room);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRoom(null);
  };

  const handleRoomSelect = (roomId: string) => {
    setActiveChatRoom(roomId);
  };

  const formatLastMessage = (message?: string) => {
    if (!message) return 'No messages yet';
    return message.length > 50 ? `${message.substring(0, 50)}...` : message;
  };

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {chatRooms.map((room) => (
          <ListItem
            key={room.id}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="more"
                onClick={(e) => handleMenuClick(e, room)}
              >
                <MoreVertIcon />
              </IconButton>
            }
          >
            <ListItemButton
              selected={activeChatRoom === room.id}
              onClick={() => handleRoomSelect(room.id)}
            >
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  color="success"
                >
                  <Avatar>
                    {room.type === 'group' ? <GroupIcon /> : <PersonIcon />}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={room.name}
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    sx={{ display: 'block' }}
                  >
                    {formatLastMessage(room.lastMessage?.content)}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Mute Notifications</MenuItem>
        <MenuItem onClick={handleMenuClose}>Leave Chat</MenuItem>
      </Menu>
    </>
  );
} 