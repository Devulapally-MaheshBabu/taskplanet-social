# TaskPlanet Social Post Application

This is a Full Stack MERN application replicating the TaskPlanet Social Feed.

## 📁 Folder Structure

```text
taskplanet-social/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Post.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   ├── seed/
│   │   └── seedData.js
│   ├── uploads/          # Directory for image uploads
│   ├── .env              # Environment variables
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── BottomNav.jsx
    │   │   ├── CreatePostModal.jsx
    │   │   └── PostCard.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Feed.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    └── package.json
```

## 🚀 Installation & Running Locally

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (`.env` file is already provided). Ensure it contains:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/taskplanet-social
   JWT_SECRET=supersecretjwtkey
   ```
   *(Change the MONGODB_URI to your Atlas URI if you want to use the cloud database).*
4. Start the backend server:
   ```bash
   node server.js
   ```
   *Note: Upon the first startup, the `seedData.js` script will automatically inject 4 dummy users and 10 realistic posts into the database.*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`

---

## 🍃 MongoDB Atlas Connection Setup

If you want to use MongoDB Atlas instead of a local database:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and log in.
2. Create a new Cluster (the free tier works fine).
3. Under "Database Access", create a new database user and save the password.
4. Under "Network Access", add your IP address (or `0.0.0.0/0` to allow all).
5. Go back to "Database", click **Connect**, then **Connect your application**.
6. Copy the connection string. It will look something like this:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskplanet-social?retryWrites=true&w=majority`
7. Replace `<username>` and `<password>` with the credentials from Step 3.
8. Open the `backend/.env` file and replace the `MONGODB_URI` value with your connection string.

---

## 🚀 Deployment Instructions

### Backend (Render or Heroku)
1. Push your code to GitHub.
2. Sign up on [Render.com](https://render.com/).
3. Create a new "Web Service" and connect your GitHub repository.
4. Set the Root Directory to `backend`.
5. Build Command: `npm install`
6. Start Command: `node server.js`
7. Add Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `PORT`).
   *Note: For image uploads on Render's free tier, the disk is ephemeral. For production, consider modifying `postRoutes.js` to upload to a cloud service like AWS S3 or Cloudinary instead of the local `uploads` folder.*

### Frontend (Vercel or Netlify)
1. Before deploying, update the API base URL in `AuthContext.jsx`, `CreatePostModal.jsx`, `Feed.jsx`, and `PostCard.jsx` from `http://localhost:5000` to your deployed backend URL.
2. Sign up on [Vercel](https://vercel.com/).
3. Import your GitHub repository.
4. Set the Root Directory to `frontend`.
5. Framework preset: `Vite`.
6. Click Deploy.
