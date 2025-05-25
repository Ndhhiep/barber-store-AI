# Barber Store Backend - Deployment Guide

## Deploy to Render

### 1. Prerequisites
- GitHub repository with your backend code
- MongoDB Atlas database
- Cloudinary account
- Gmail account with App Password

### 2. Environment Variables Required on Render

Set these environment variables in your Render dashboard:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=The Gentleman's Cut <your_email@gmail.com>
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
FRONTEND_URL=https://your-user-frontend.vercel.app
STAFF_FRONTEND_URL=https://your-staff-frontend.vercel.app
```

### 3. Deploy Steps

1. **Push to GitHub**: Make sure your code is pushed to a GitHub repository

2. **Create Web Service on Render**:
   - Go to https://render.com and sign up/login
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free (or paid plan for better performance)

3. **Set Environment Variables**:
   - In Render dashboard, go to your service → Environment
   - Add all the environment variables listed above

4. **Deploy**:
   - Render will automatically deploy when you push to GitHub
   - First deployment might take 5-10 minutes

### 4. Post-Deployment

1. **Get your backend URL**: Render will provide a URL like `https://your-app-name.onrender.com`

2. **Update frontend .env files**:
   ```
   REACT_APP_BACKEND_API_URL=https://your-app-name.onrender.com
   ```

3. **Test endpoints**:
   - Health check: `https://your-app-name.onrender.com/health`
   - API root: `https://your-app-name.onrender.com/api`

### 5. Important Notes

- **Free Tier Limitations**: 
  - Service sleeps after 15 minutes of inactivity
  - First request after sleep takes 30s-1 minute to wake up
  - 750 hours/month limit

- **Database**: Use MongoDB Atlas (cloud) not local MongoDB

- **CORS**: Make sure your frontend domains are added to CORS origins in `index.js`

- **Monitoring**: Use Render's dashboard to monitor logs and performance

### 6. Troubleshooting

- Check Render logs for deployment errors
- Verify all environment variables are set correctly
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Test database connection string separately

## Local Development

1. Copy `.env.example` to `.env`
2. Fill in your actual values
3. Run `npm install`
4. Run `npm run dev`
