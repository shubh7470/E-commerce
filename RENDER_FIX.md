# Create New Render Service - Step by Step

## 1. Delete Current Service (if needed)
- Go to your current service in Render dashboard
- Settings → Danger Zone → Delete Service

## 2. Create New Web Service
- Dashboard → New + → Web Service
- Connect Repository: `shubh7470/E-commerce`

## 3. Configure New Service
```
Name: shubhkart-server-new
Runtime: Node
Region: Oregon (US West) or your preference
Branch: main
Root Directory: Server
Build Command: npm install  
Start Command: npm start
```

## 4. Environment Variables
Add these one by one:
```
NODE_ENV = production
MONGO_URI = mongodb+srv://username:password@cluster.mongodb.net/shubhkart
PORT = 10000
JWT_SECRET = your-secret-key-here
```

## 5. Deploy
- Click "Create Web Service"
- Wait for deployment to complete

## MongoDB Atlas Setup (if not done)
1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Replace in MONGO_URI above

## Verify Root Directory
The key is making sure Root Directory = "Server" (without quotes)
This tells Render to look in the Server folder for package.json