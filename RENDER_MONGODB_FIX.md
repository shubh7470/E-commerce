# Render Deployment Checklist - MongoDB Fix

## Step 1: Verify Render Service Settings

### Build & Deploy Settings:
```
Root Directory: Server
Build Command: npm install
Start Command: npm start
Environment: Node
```

## Step 2: Set Environment Variables (CRITICAL!)

Go to your Render service → Settings → Environment Variables

**Add these EXACTLY (no spaces around =):**

```
MONGO_URI=mongodb+srv://shubh7470:%40Shubham7470@bookurevents.xkjg3wj.mongodb.net/shubhkart?retryWrites=true&w=majority&appName=Bookurevents
PORT=10000
JWT_SECRET=12345
NODE_ENV=production
```

## Step 3: MongoDB Atlas Network Access

1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
3. Or add Render's IP ranges (check Render docs for current IPs)

## Step 4: Verify MongoDB Atlas User

1. Go to Database Access
2. Ensure user `shubh7470` exists
3. Password: `@Shubham7470` (URL encoded as %40Shubham7470)
4. Role: `readWriteAnyDatabase` or custom role with read/write to `shubhkart` database

## Step 5: Deploy

1. Save all environment variables
2. Click "Manual Deploy" → "Deploy latest commit"
3. Monitor logs for connection success

## Common Issues:

❌ **Environment variables not set in Render dashboard**
❌ **Spaces in environment variable values**  
❌ **Wrong MongoDB credentials**
❌ **IP not whitelisted in Atlas**
❌ **Wrong Root Directory (should be 'Server')**

## Success Indicators:

✅ Logs show: "Attempting to connect to MongoDB..."
✅ Logs show: "DB Connected Successfully!"  
✅ No localhost:27017 connection attempts
✅ Server starts without crashes