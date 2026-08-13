# Vercel Deployment Guide

This guide outlines the steps to deploy **The Dive Village Frontend** to Vercel.

---

## ⚠️ Important: Large Video Asset Warning (Hobby Plan Limit)

The project includes a large 360° interactive video file:
`Frontend/src/assets/VID_20260525_095921_00_220.mp4` (~172.6 MB)

*   **Vercel Hobby Plan Limit:** Vercel free accounts have a strict **100 MB** source/deployment size limit. Attempting to deploy the repository with this file will result in a build failure due to size restrictions.
*   **Vercel Pro/Enterprise:** If you are using a paid Vercel plan, you can deploy as-is.

### Recommended Hobby Plan Workaround
If you are deploying on a Hobby plan, upload the video file to an external hosting provider (e.g., **Vercel Blob**, **Cloudinary**, **AWS S3**, or similar) and replace the local import with a remote URL:

1. Upload `Frontend/src/assets/VID_20260525_095921_00_220.mp4` to your hosting provider.
2. Modify [`Frontend/src/components/InteractiveVideoSphere.jsx`](file:///c:/Users/lenovo-1/Documents/GitHub/TheDiveVillage-Frontend/Frontend/src/components/InteractiveVideoSphere.jsx):
   ```diff
   -import videoFile from '../assets/VID_20260525_095921_00_220.mp4'
   +const videoFile = "https://your-cdn-url.com/path-to-video.mp4"
   ```
3. Modify [`Frontend/src/components/VideoSphereBackground.jsx`](file:///c:/Users/lenovo-1/Documents/GitHub/TheDiveVillage-Frontend/Frontend/src/components/VideoSphereBackground.jsx):
   ```diff
   -import videoFile from '../assets/VID_20260525_095921_00_220.mp4'
   +const videoFile = "https://your-cdn-url.com/path-to-video.mp4"
   ```
4. Delete the local video file from your repository to bring the deployment size well under the 100 MB limit.

---

## Deployment Methods

You can deploy the app using either of the following methods:

### Method A: Zero-Config Deployment (Recommended)
This repository is configured with NPM workspaces and a root-level `vercel.json` file.
1. Connect your GitHub repository to Vercel.
2. Select the repository root directory as the deployment root (this is the default).
3. Vercel will automatically read the root configuration, install dependencies via workspaces, build the React app, and deploy the build outputs.

### Method B: Subdirectory Deployment (Alternative)
If you prefer to configure Vercel to build only the `Frontend` subdirectory directly:
1. Connect your repository to Vercel.
2. In the Vercel project configuration, set **Root Directory** to `Frontend`.
3. Vercel will build the frontend using the nested configurations, utilizing the SPA routing configuration defined in [`Frontend/vercel.json`](file:///c:/Users/lenovo-1/Documents/GitHub/TheDiveVillage-Frontend/Frontend/vercel.json).

---

## Environment Variables to Configure

To make sure Firebase features and API calls function correctly, add the following environment variables in your Vercel Dashboard under **Project Settings > Environment Variables**:

| Variable Name | Description / Value |
| :--- | :--- |
| `VITE_API_BASE_URL` | Base URL of your backend API (e.g. `https://api.thedivevillage.com`) |
| `VITE_DIVE_VIDEO_URL` | (Optional) CDN/Storage URL for the large 360° video (highly recommended to bypass LFS bandwidth and lag) |
| `VITE_FIREBASE_API_KEY` | Your Firebase project API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Your Firebase Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | Your Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Your Firebase Storage Bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your Firebase Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | Your Firebase App ID |

---

## Troubleshooting SPA 404 Pages
Since this is a client-side Single Page Application (SPA), loading sub-routes (e.g., `/shop`, `/dashboard`) directly or refreshing them would normally return a `404 Not Found` error. 

The configurations we added in `vercel.json` and `Frontend/vercel.json` automatically handle this by rewriting all requests back to `/index.html`, allowing `react-router` to resolve the route. No further action is required.
