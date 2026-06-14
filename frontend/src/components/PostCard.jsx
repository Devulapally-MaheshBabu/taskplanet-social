import React, { useContext } from 'react';
import { 
  Card, CardHeader, CardContent, CardActions, CardMedia, 
  Avatar, IconButton, Typography, Box, Button 
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubble";
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/AuthContext';

const PostCard = ({ post, onPostUpdate }) => {
  const { user, token } = useContext(AuthContext);

  const hasLiked = post.likes.some(like => like.userId === user?._id);

  const handleLike = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/posts/${post._id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onPostUpdate(res.data);
    } catch (err) {
      console.error('Error liking post', err);
    }
  };

  const handleComment = async () => {
    const text = prompt('Enter your comment:');
    if (!text) return;

    try {
      const res = await axios.post(`http://localhost:5000/api/posts/${post._id}/comment`, { text }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onPostUpdate(res.data);
    } catch (err) {
      console.error('Error commenting on post', err);
    }
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <CardHeader
        avatar={
          <Avatar src={`https://ui-avatars.com/api/?name=${post.username}&background=random`} alt={post.username} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{post.username.toLowerCase()}
            </Typography>
          </Box>
        }
        subheader={moment(post.createdAt).fromNow()}
      />
      
      {post.text && (
        <CardContent sx={{ pt: 0, pb: 1 }}>
          <Typography variant="body1" color="text.primary">
            {post.text}
          </Typography>
        </CardContent>
      )}

      {post.image && (
        <CardMedia
          component="img"
          image={post.image.startsWith('http') ? post.image : `http://localhost:5000${post.image}`}
          alt="Post image"
          sx={{ maxHeight: 400, objectFit: 'cover' }}
        />
      )}

      <CardActions disableSpacing sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="add to favorites" onClick={handleLike} color={hasLiked ? 'error' : 'default'}>
              {hasLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {post.likes.length}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="comment" onClick={handleComment}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {post.comments.length}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              0
            </Typography>
          </Box>
        </Box>
      </CardActions>
      
      {/* Optional: Render a few recent comments */}
      {post.comments.length > 0 && (
        <Box sx={{ px: 3, pb: 2 }}>
          <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>Comments</Typography>
          {post.comments.slice(-2).map((c, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
              <Typography variant="body2" fontWeight="bold">{c.username}:</Typography>
              <Typography variant="body2">{c.text}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
};

export default PostCard;
