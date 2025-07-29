import { Router } from 'express';
import { z } from 'zod';
import { storage } from './storage';
import { 
  insertUserSchema, 
  insertMessageSchema, 
  insertChatRoomSchema,
  LoginRequest,
  SendMessageRequest,
  AddReactionRequest,
  UpdateUserStatusRequest,
  ApiResponse 
} from '@shared/schema';

const router = Router();

// Error handling helper
const handleError = (error: any, res: any) => {
  console.error('API Error:', error);
  
  if (error instanceof z.ZodError) {
    return res.status(400).json({ 
      success: false, 
      error: 'Validation error',
      details: error.errors 
    });
  }
  
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
};

// User routes
router.post('/users/login', async (req, res) => {
  try {
    const { name, avatar }: LoginRequest = req.body;
    
    if (!name || !avatar) {
      return res.status(400).json({
        success: false,
        error: 'Name and avatar are required'
      });
    }

    const user = await storage.createUser({
      name: name.trim(),
      avatar,
      status: 'online',
      lastSeen: new Date()
    });

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    handleError(error, res);
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await storage.getUsers();
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    handleError(error, res);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await storage.getUserById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    handleError(error, res);
  }
});

router.put('/users/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status }: { status: 'online' | 'away' | 'offline' } = req.body;
    
    const user = await storage.updateUserStatus(id, status);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    handleError(error, res);
  }
});

// Chat Room routes
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await storage.getRooms();
    res.json({
      success: true,
      data: rooms
    });
  } catch (error) {
    handleError(error, res);
  }
});

router.get('/rooms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const room = await storage.getRoomById(id);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }

    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    handleError(error, res);
  }
});

router.post('/rooms', async (req, res) => {
  try {
    const roomData = insertChatRoomSchema.parse(req.body);
    const room = await storage.createRoom(roomData);
    
    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    handleError(error, res);
  }
});

// Message routes
router.post('/rooms/:roomId/messages', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { content, userId }: SendMessageRequest = req.body;
    
    if (!content || !userId) {
      return res.status(400).json({
        success: false,
        error: 'Content and userId are required'
      });
    }

    const message = await storage.createMessage({
      content: content.trim(),
      userId,
      roomId,
      timestamp: new Date(),
      reactions: [],
      type: 'text'
    });

    // Update room's last activity
    await storage.updateRoomActivity(roomId);

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    handleError(error, res);
  }
});

router.get('/rooms/:roomId/messages', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { limit = '50', offset = '0' } = req.query;
    
    const messages = await storage.getMessagesByRoomId(
      roomId, 
      parseInt(limit as string), 
      parseInt(offset as string)
    );
    
    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    handleError(error, res);
  }
});

// Reaction routes
router.post('/messages/:messageId/reactions', async (req, res) => {
  try {
    const { messageId } = req.params;
    const { emoji, userId }: AddReactionRequest = req.body;
    
    if (!emoji || !userId) {
      return res.status(400).json({
        success: false,
        error: 'Emoji and userId are required'
      });
    }

    const message = await storage.addReaction(messageId, emoji, userId);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    handleError(error, res);
  }
});

router.delete('/messages/:messageId/reactions', async (req, res) => {
  try {
    const { messageId } = req.params;
    const { emoji, userId } = req.body;
    
    if (!emoji || !userId) {
      return res.status(400).json({
        success: false,
        error: 'Emoji and userId are required'
      });
    }

    const message = await storage.removeReaction(messageId, emoji, userId);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    handleError(error, res);
  }
});

// Search routes
router.get('/search/messages', async (req, res) => {
  try {
    const { q, roomId } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const messages = await storage.searchMessages(
      q as string, 
      roomId as string
    );
    
    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    handleError(error, res);
  }
});

router.get('/search/users', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const users = await storage.searchUsers(q as string);
    
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    handleError(error, res);
  }
});

export default router;