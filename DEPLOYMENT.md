# Deployment Instructions for Render

## Server Deployment:
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the following settings:
   - **Root Directory**: `Server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `MONGO_URI`: Your MongoDB connection string (use MongoDB Atlas)
     - `PORT`: 10000 (Render's default)
     - `JWT_SECRET`: Your JWT secret
     - `NODE_ENV`: production

## Client Deployment:
1. Deploy to Vercel or Netlify
2. Set the build directory to `Client`
3. Set environment variable:
   - `REACT_APP_API_URL`: Your deployed server URL

## MongoDB Setup:
1. Create a MongoDB Atlas account
2. Create a cluster
3. Get the connection string
4. Replace localhost connection with Atlas connection string

## Important Notes:
- Make sure to use the correct case-sensitive directory names
- Update CORS settings in your server to allow your client domain
- Set up proper environment variables for production