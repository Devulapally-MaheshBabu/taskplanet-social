const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Post = require('../models/Post');

const seedData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already seeded. Skipping seed process.');
      return;
    }

    console.log('Seeding initial data...');

    // Hash dummy passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create Users
    const usersData = [
      { username: 'Mahesh', email: 'mahesh@example.com', password: hashedPassword, avatar: 'https://ui-avatars.com/api/?name=Mahesh&background=random' },
      { username: 'Rahul', email: 'rahul@example.com', password: hashedPassword, avatar: 'https://ui-avatars.com/api/?name=Rahul&background=random' },
      { username: 'Priya', email: 'priya@example.com', password: hashedPassword, avatar: 'https://ui-avatars.com/api/?name=Priya&background=random' },
      { username: 'Kiran', email: 'kiran@example.com', password: hashedPassword, avatar: 'https://ui-avatars.com/api/?name=Kiran&background=random' }
    ];

    const users = await User.insertMany(usersData);
    console.log('Users seeded successfully');

    // Helper to get random user
    const getRandomUser = () => users[Math.floor(Math.random() * users.length)];

    // Create Posts
    const postsData = [
      {
        userId: users[1]._id, // Rahul
        username: 'Rahul',
        text: 'Just completed my React project 🚀',
        likes: [{ userId: users[0]._id, username: 'Mahesh' }, { userId: users[2]._id, username: 'Priya' }],
        comments: [{ userId: users[3]._id, username: 'Kiran', text: 'Great job!' }]
      },
      {
        userId: users[2]._id, // Priya
        username: 'Priya',
        text: 'Learning MongoDB Atlas today. It is really powerful and easy to use.',
        likes: [{ userId: users[1]._id, username: 'Rahul' }],
        comments: []
      },
      {
        userId: users[3]._id, // Kiran
        username: 'Kiran',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
        text: 'Beautiful workspace setup for today\'s coding session!',
        likes: [{ userId: users[0]._id, username: 'Mahesh' }, { userId: users[1]._id, username: 'Rahul' }, { userId: users[2]._id, username: 'Priya' }],
        comments: [{ userId: users[0]._id, username: 'Mahesh', text: 'Looks so cozy!' }]
      },
      {
        userId: users[0]._id, // Mahesh
        username: 'Mahesh',
        text: 'Working on Full Stack Development for my internship assignment.',
        likes: [{ userId: users[3]._id, username: 'Kiran' }],
        comments: [{ userId: users[1]._id, username: 'Rahul', text: 'All the best, mate!' }]
      },
      {
        userId: users[1]._id, // Rahul
        username: 'Rahul',
        text: 'Anyone have good resources for learning Material UI? I am transitioning from Tailwind.',
        likes: [],
        comments: [{ userId: users[0]._id, username: 'Mahesh', text: 'Check the official MUI docs, they are fantastic.' }]
      },
      {
        userId: users[2]._id, // Priya
        username: 'Priya',
        text: 'Just solved a really tricky bug with JWT authentication. Feels great!',
        likes: [{ userId: users[0]._id, username: 'Mahesh' }, { userId: users[3]._id, username: 'Kiran' }],
        comments: []
      },
      {
        userId: users[0]._id, // Mahesh
        username: 'Mahesh',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        text: 'Late night coding vibes 💻☕',
        likes: [{ userId: users[1]._id, username: 'Rahul' }, { userId: users[2]._id, username: 'Priya' }],
        comments: [{ userId: users[2]._id, username: 'Priya', text: 'Don\'t stay up too late!' }]
      },
      {
        userId: users[3]._id, // Kiran
        username: 'Kiran',
        text: 'MERN stack is definitely my favorite stack right now.',
        likes: [{ userId: users[1]._id, username: 'Rahul' }],
        comments: []
      },
      {
        userId: users[2]._id, // Priya
        username: 'Priya',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713',
        text: '', // Image only post
        likes: [{ userId: users[0]._id, username: 'Mahesh' }],
        comments: []
      },
      {
        userId: users[1]._id, // Rahul
        username: 'Rahul',
        text: 'Successfully connected my Express backend to MongoDB Atlas today. Time to build the frontend!',
        likes: [{ userId: users[3]._id, username: 'Kiran' }, { userId: users[0]._id, username: 'Mahesh' }],
        comments: [{ userId: users[3]._id, username: 'Kiran', text: 'Awesome milestone!' }]
      }
    ];

    await Post.insertMany(postsData);
    console.log('Posts seeded successfully');

  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;
