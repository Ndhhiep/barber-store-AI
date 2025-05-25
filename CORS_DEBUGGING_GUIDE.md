# CORS and Socket.IO Connection Debugging Guide

## Problem Description
The frontend applications are connecting to the wrong backend URL:
- **Expected URL**: `https://barber-store-ai.onrender.com`  
- **Actual URL being called**: `https://barber-store.onrender.com` 

This causes CORS errors and Socket.IO connection failures.

## Root Cause Analysis

### 1. Proxy Configuration Issue ✅ FIXED
**Problem**: Both frontend `package.json` files had a `proxy` setting pointing to `http://localhost:5000`
```json
"proxy": "http://localhost:5000"  // This was interfering with production URLs
```

**Solution**: Removed proxy settings from both frontend applications
- `frontend/user/package.json` - proxy removed ✅
- `frontend/staff/package.json` - proxy removed ✅

### 2. Environment Variables Status ✅ VERIFIED
Both frontends have correct environment variables:
```
REACT_APP_BACKEND_API_URL=https://barber-store-ai.onrender.com
```

### 3. Backend CORS Configuration ✅ UPDATED
Added temporary CORS origin for debugging:
```javascript
origin: [
  // ... other origins
  'https://barber-store.onrender.com' // Temporary: for debugging
]
```

## Next Steps Required

### 1. Rebuild and Redeploy Frontend Applications
The proxy removal requires rebuilding the frontend applications:

```bash
# User Frontend
cd frontend/user
npm run build

# Staff Frontend  
cd frontend/staff
npm run build
```

### 2. Clear Deployment Cache on Vercel
- Go to Vercel dashboard
- Force redeploy both applications
- Clear any cached builds

### 3. Clear Browser Cache
- Clear browser cache and cookies
- Test in incognito/private mode
- Check Network tab in DevTools for actual URLs being called

### 4. Verify Socket.IO Connection
After redeployment, check:
- Network tab shows correct backend URL
- Socket.IO connects to `https://barber-store-ai.onrender.com/socket.io`
- No CORS errors in console

### 5. Remove Temporary CORS Entry
Once working, remove the temporary CORS entry:
```javascript
// Remove this line after fixing:
'https://barber-store.onrender.com'
```

## Environment Variables Verification

### Backend (.env)
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://...
FRONTEND_URL=https://barber-store-ai-user.vercel.app
STAFF_FRONTEND_URL=https://barber-store-ai-staff.vercel.app
```

### User Frontend (.env)
```
REACT_APP_BACKEND_API_URL=https://barber-store-ai.onrender.com
```

### Staff Frontend (.env)  
```
REACT_APP_BACKEND_API_URL=https://barber-store-ai.onrender.com
```

## Debugging Commands

### Check actual URLs being called:
1. Open browser DevTools
2. Go to Network tab
3. Filter by "socket.io" or "api"
4. Verify requests go to correct domain

### Test backend health:
```bash
curl https://barber-store-ai.onrender.com/health
curl https://barber-store-ai.onrender.com/api
```

### Test CORS:
```bash
curl -H "Origin: https://barber-store-ai-user.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://barber-store-ai.onrender.com/api
```

## Status
- [x] Proxy configuration removed from package.json files
- [x] Backend CORS temporarily updated
- [ ] Frontend applications rebuilt and redeployed
- [ ] Verify correct URLs in browser Network tab
- [ ] Remove temporary CORS entry

## Expected Resolution
After rebuilding frontends without proxy configuration, the applications should connect to the correct backend URL and Socket.IO should work properly.
