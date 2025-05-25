# 🚨 Vercel Deployment Troubleshooting for CORS Error

**Problem**: Frontend at `https://barber-store-ai.vercel.app` is still calling the WRONG backend URL (`https://barber-store.onrender.com`) for Socket.IO, causing CORS errors.

This guide focuses on ensuring your Vercel deployment uses the correct environment variables.

## Step 1: Verify Vercel Project Settings

1.  **Go to Vercel**: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2.  **Select the Correct Project**: Ensure you are in the settings for the Vercel project that corresponds to the domain `https://barber-store-ai.vercel.app`.
3.  **Navigate to Environment Variables**:
    *   Click on the **"Settings"** tab for your project.
    *   In the sidebar, click on **"Environment Variables"**.
4.  **Confirm `REACT_APP_BACKEND_API_URL`**:
    *   **Variable Name**: `REACT_APP_BACKEND_API_URL`
    *   **Value**: Should be **exactly** `https://barber-store-ai.onrender.com` (no trailing slash).
    *   **Environments**: Ensure this variable is available to the **Production Environment**. It should also be available to "Preview" and "Development" environments if you use Vercel previews.
    *   **Screenshot**: If possible, take a screenshot of this configuration page for verification.

## Step 2: Force a New Redeploy (No Cache & Latest Commit)

1.  **Go to the "Deployments" Tab** for your project on Vercel.
2.  **Trigger a New Deployment from Git**: Instead of just clicking "Redeploy" on an old deployment, try to trigger a deployment based on the latest Git commit to ensure Vercel pulls the absolute latest code.
    *   You might see a "Deploy" button or an option to create a new deployment linked to your Git branch (e.g., `main` or `master`).
3.  **During Deployment Configuration (if prompted, or when clicking "Redeploy" on a specific commit):**
    *   **⚠️ CRITICAL**: Ensure any option like **"Use existing Build Cache"** is **UNCHECKED**.
4.  **Monitor the Build**: Watch the build logs for this new deployment on Vercel.
    *   Look for any messages related to environment variables (e.g., "Found environment variable REACT_APP_BACKEND_API_URL").
    *   Note any warnings or errors during the build process.

## Step 3: Verify Deployed Commit

1.  Once the new deployment is "Ready", click on it to view its details.
2.  **Check the "Source" Information**: Vercel usually shows which Git commit was used for this deployment. Verify that this commit is the one where you removed the `proxy` from `package.json` and made other recent changes.

## Step 4: Test Thoroughly

1.  **Wait a few minutes** for DNS changes to propagate fully (though usually quick for Vercel updates).
2.  **Clear Browser Cache & Hard Reload**:
    *   Open `https://barber-store-ai.vercel.app`.
    *   Windows/Linux: `Ctrl + Shift + R`
    *   Mac: `Cmd + Shift + R`
3.  **Use Incognito/Private Window**: This helps rule out persistent browser caching.
4.  **Check Developer Tools (Network Tab)**:
    *   Filter for `socket.io` requests.
    *   **Verify the Request URL**: It **MUST** be `https://barber-store-ai.onrender.com/socket.io/...`.
    *   Check the console for any CORS errors.

## Step 5: If Still Failing - Check Frontend Code for Hardcoded URLs

This is less likely with Create React App if you're using `process.env.REACT_APP_BACKEND_API_URL`, but as a last resort:

```powershell
# In your local project terminal:
cd "c:\My Project\barber-store-AI\frontend\user\src"
Select-String -Path ".\*" -Pattern "barber-store.onrender.com" -Recurse

cd "c:\My Project\barber-store-AI\frontend\staff\src"
Select-String -Path ".\*" -Pattern "barber-store.onrender.com" -Recurse
```
This will search for any accidental hardcoding of the wrong URL in your source files.

## Step 6: Backend Check (Render Deployment)

Ensure your backend on Render (`https://barber-store-ai.onrender.com`) is running the latest code, which includes the updated CORS settings in `backend/index.js`:

```javascript
// backend/index.js - corsOptions should include:
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://barber-store-ai.vercel.app', // Your Vercel frontend
    'https://barber-store-ai-user.vercel.app',
    'https://barber-store-ai-staff.vercel.app',
    // ... any other necessary production frontend URLs
    // The temporary line for 'https://barber-store.onrender.com' can be removed from here
    // once the frontend consistently calls the correct 'barber-store-ai.onrender.com' URL.
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};
```
If you made changes to `backend/index.js` for CORS, ensure the backend service on Render was also redeployed.

**Focus on verifying Vercel's build and environment variable handling first, as the error message points to the frontend initiating the request to the wrong address.**
