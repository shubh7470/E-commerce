# MongoDB Atlas Connection Troubleshooting

## 1. Check Your MongoDB Atlas Dashboard

### Verify Cluster Status:
- Go to https://cloud.mongodb.com
- Check if your cluster `bookurevents` is running
- Make sure it's not paused or sleeping

### Verify Database User:
- Go to Database Access tab
- Ensure user `shubh7470` exists
- Check password is correct: `Shubham7470`
- Make sure user has readWrite permissions

### Verify Network Access:
- Go to Network Access tab  
- Add IP address: `0.0.0.0/0` (allow all IPs)
- Or add your current IP address

## 2. Test Connection String Format

The correct format should be:
```
mongodb+srv://<username>:<password>@<cluster-name>/<database-name>?retryWrites=true&w=majority
```

Your connection string:
```
mongodb+srv://shubh7470:Shubham7470@bookurevents.xkjg3wj.mongodb.net/shubhkart?retryWrites=true&w=majority&appName=Bookurevents
```

## 3. Special Characters in Password

If your password contains special characters, encode them:
- @ → %40
- : → %3A  
- / → %2F
- ? → %3F
- # → %23
- [ → %5B
- ] → %5D
- space → %20

## 4. Common Issues:
- Wrong username/password
- IP not whitelisted
- Cluster paused/sleeping
- Wrong cluster name
- Missing database name
- Special characters not encoded