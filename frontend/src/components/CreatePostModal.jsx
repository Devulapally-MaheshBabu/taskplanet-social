import React, { useState, useContext } from 'react';
import { 
  Modal, Box, Typography, TextField, Button, IconButton, 
  Avatar, Divider, CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
};

const CreatePostModal = ({ open, handleClose, onPostCreated }) => {
  const { user, token } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!text.trim() && !image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await axios.post(
        "https://taskplanet-social-zi9m.onrender.com/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      onPostCreated(res.data);
      handleCloseModal();
    } catch (err) {
      console.error('Error creating post', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setText('');
    setImage(null);
    setImagePreview(null);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2" fontWeight="bold">
            Create Post
          </Typography>
          <IconButton onClick={handleCloseModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Avatar src={user?.avatar} alt={user?.username} />
          <Typography fontWeight="bold" sx={{ mt: 1 }}>{user?.username}</Typography>
        </Box>

        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="What's on your mind?"
          variant="standard"
          InputProps={{ disableUnderline: true }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />

        {imagePreview && (
          <Box sx={{ position: 'relative', mb: 2 }}>
            <img src={imagePreview} alt="Preview" style={{ width: '100%', borderRadius: 8, maxHeight: 300, objectFit: 'cover' }} />
            <IconButton 
              sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
              onClick={removeImage}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" component="span">
                <ImageIcon />
              </IconButton>
            </label>
            <IconButton color="primary">
              <EmojiEmotionsIcon />
            </IconButton>
            <IconButton color="primary">
              <FormatAlignLeftIcon />
            </IconButton>
          </Box>
          <Button 
            variant="contained" 
            onClick={handleSubmit} 
            disabled={(!text.trim() && !image) || loading}
            sx={{ borderRadius: 6, px: 3 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Post'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
