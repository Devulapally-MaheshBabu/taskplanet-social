import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ChatIcon from '@mui/icons-material/Chat';

const BottomNav = () => {
  const [value, setValue] = React.useState(2); // Default to Social tab

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          '& .Mui-selected': {
            color: '#1976d2',
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Tasks" icon={<AssignmentIcon />} />
        <BottomNavigationAction label="Social" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Leaderboard" icon={<LeaderboardIcon />} />
        <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
