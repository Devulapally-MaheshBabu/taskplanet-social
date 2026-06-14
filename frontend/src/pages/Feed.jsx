import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, Container, Typography, Avatar, InputBase, IconButton, 
  Button, Tabs, Tab, Fab, CircularProgress, Paper, Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import CreatePostModal from '../components/CreatePostModal';

const Feed = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(posts.map(p => p._id === updatedPost._id ? updatedPost : p));
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <Box sx={{ pb: 8, bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      {/* Top Header */}
      <Paper elevation={0} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          Social
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#ffecb3', px: 1.5, py: 0.5, borderRadius: 4 }}>
            <Typography variant="body2" fontWeight="bold" color="#f57f17">🪙 150</Typography>
          </Box>
          <Avatar src={user?.avatar} alt={user?.username} sx={{ width: 32, height: 32 }} />
        </Box>
      </Paper>

      <Container maxWidth="sm" sx={{ mt: 2 }}>
        {/* Search Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Paper elevation={0} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', borderRadius: 6, border: '1px solid #e0e0e0' }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <IconButton sx={{ bgcolor: 'white', border: '1px solid #e0e0e0' }}>
            <DarkModeOutlinedIcon />
          </IconButton>
        </Box>

        {/* Create Post Section */}
        <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 3, border: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
            <Avatar src={user?.avatar} alt={user?.username} />
            <InputBase
              placeholder="What's on your mind?"
              fullWidth
              multiline
              onClick={() => setModalOpen(true)}
              sx={{ bgcolor: '#f0f2f5', borderRadius: 4, px: 2, py: 1, cursor: 'pointer' }}
              readOnly
            />
          </Box>
          <Divider sx={{ mb: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
            <Box>
              <IconButton color="primary" onClick={() => setModalOpen(true)}><ImageIcon /></IconButton>
              <IconButton color="primary" onClick={() => setModalOpen(true)}><EmojiEmotionsIcon /></IconButton>
              <IconButton color="primary" onClick={() => setModalOpen(true)}><FormatAlignLeftIcon /></IconButton>
            </Box>
            <Button variant="contained" size="small" sx={{ borderRadius: 6 }} onClick={() => setModalOpen(true)}>Post</Button>
          </Box>
        </Paper>

        {/* Post Filter Tabs */}
        <Paper elevation={0} sx={{ mb: 2, borderRadius: 3, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
          <Tabs 
            value={tabValue} 
            onChange={(e, val) => setTabValue(val)} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{ minHeight: 48 }}
          >
            <Tab label="All Posts" sx={{ textTransform: 'none', fontWeight: 'bold' }} />
            <Tab label="For You" sx={{ textTransform: 'none', fontWeight: 'bold' }} />
            <Tab label="Most Liked" sx={{ textTransform: 'none', fontWeight: 'bold' }} />
            <Tab label="Most Commented" sx={{ textTransform: 'none', fontWeight: 'bold' }} />
          </Tabs>
        </Paper>

        {/* Posts List */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          posts.map(post => (
            <PostCard key={post._id} post={post} onPostUpdate={handlePostUpdate} />
          ))
        )}
      </Container>

      {/* Floating Action Button */}
      <Fab 
        color="primary" 
        aria-label="add" 
        sx={{ position: 'fixed', bottom: 70, right: 16 }}
        onClick={() => setModalOpen(true)}
      >
        <AddIcon />
      </Fab>

      <CreatePostModal open={modalOpen} handleClose={() => setModalOpen(false)} onPostCreated={handlePostCreated} />
    </Box>
  );
};

export default Feed;
