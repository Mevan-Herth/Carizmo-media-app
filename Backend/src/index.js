const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./interfaces/routes/userRoutes');
const userProfileRoutes = require('./interfaces/routes/userProfileRoutes');
const commentRoutes = require('./interfaces/routes/CommentRoutes'); 
const privPostRoutes = require('./interfaces/routes/privatePostRoutes');
const pubPostRoutes = require('./interfaces/routes/publicPostRoutes');
const { connectDB, env, serverConfig, logger } = require('./config');
const {} = require('./application/userCases');
const {authMiddleware} = require('../src/shared/middlewares/authMiddleware');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET))

//connect to MongoDb
connectDB();


// use routes
app.use('/api/users', userRoutes);
app.use('/api/posts',pubPostRoutes);

//protected routes
app.use(authMiddleware);
app.use('/api/users', userProfileRoutes);
app.use('/api/user-posts',privPostRoutes)


// Comment routes
app.use('/api/comments', commentRoutes); 

// Start the server
app.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port}`);
});


