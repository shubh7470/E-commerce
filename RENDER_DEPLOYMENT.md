# Render Deployment Configuration Guide

## Server Deployment Steps:

### 1. Create New Web Service
- Go to Render Dashboard
- Click "New +" → "Web Service"
- Connect your GitHub repository: `shubh7470/E-commerce`

### 2. Configure Server Settings
```
Name: shubhkart-server
Runtime: Node
Region: Choose your preferred region
Branch: main
Root Directory: Server
Build Command: npm install
Start Command: npm start
```

### 3. Environment Variables
Add these environment variables in Render:
```
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shubhkart?retryWrites=true&w=majority
PORT=10000
JWT_SECRET=your-secure-jwt-secret-here
```

### 4. Advanced Settings
- Auto-Deploy: Yes
- Instance Type: Free

## Database Setup (MongoDB Atlas):

### 1. Create MongoDB Atlas Account
- Go to https://www.mongodb.com/atlas
- Create free cluster
- Create database user
- Get connection string

### 2. Update Connection String
Replace the MONGO_URI with your actual Atlas connection string:
```
mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/shubhkart?retryWrites=true&w=majority
```

## Client Deployment (Separate - Use Vercel):

### 1. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# In your Client directory
cd Client
vercel --prod
```

### 2. Environment Variables for Client
```
VITE_API_URL=https://your-server-name.onrender.com
```

## Troubleshooting:

### Common Issues:
1. **Root Directory**: Make sure it's set to "Server" (case sensitive)
2. **MongoDB URI**: Use MongoDB Atlas, not localhost
3. **CORS**: Update your server's CORS settings with your client URL
4. **Port**: Use process.env.PORT || 8000 in your server

### Files to Check:
- `Server/package.json` exists and has start script
- `Server/index.js` uses process.env.PORT
- All dependencies are in package.json