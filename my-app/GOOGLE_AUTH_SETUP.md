# Google Authentication Setup Guide

## Step 1: Install Firebase Dependencies

```bash
npm install firebase
```

## Step 2: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Enter your project name (e.g., "healthcare-app")
4. Choose whether to enable Google Analytics (recommended)
5. Click "Create project"

## Step 3: Enable Google Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click on **Sign-in method** tab
3. Click on **Google** provider
4. Click **Enable**
5. Add your **Project support email** (your email address)
6. Click **Save**

## Step 4: Configure Authorized Domains

1. In Authentication > Settings > Authorized domains
2. Add your domains:
   - `localhost` (for development)
   - Your production domain (when deployed)
3. Click **Add**

## Step 5: Get Firebase Configuration

1. Go to **Project Settings** (gear icon in top left)
2. Scroll down to **Your apps** section
3. Click the **Web** icon (</>)
4. Register your app:
   - App nickname: "Healthcare Web App"
   - Check "Also set up Firebase Hosting" (optional)
5. Click **Register app**
6. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 6: Create Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Step 7: Test Google Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your app in the browser
3. Click the "Sign In" button
4. You should see a Google sign-in popup
5. Sign in with your Google account
6. You should see your profile information in the navbar

## Troubleshooting

### Common Issues:

1. **"Firebase App named '[DEFAULT]' already exists"**
   - This is normal in development with hot reloading
   - The error can be safely ignored

2. **"popup_closed_by_user" error**
   - User closed the popup before completing sign-in
   - This is normal behavior

3. **"auth/unauthorized-domain" error**
   - Add your domain to authorized domains in Firebase Console
   - For localhost, make sure `localhost` is in the list

4. **"auth/popup-blocked" error**
   - Browser blocked the popup
   - Allow popups for your domain
   - Or use redirect method instead

### Mobile Considerations:

For better mobile experience, you can use redirect instead of popup:

```javascript
// In your component
import { signInWithGoogleRedirect } from '../lib/firebase';

const handleSignIn = async () => {
  try {
    await signInWithGoogleRedirect();
  } catch (error) {
    console.error('Sign in error:', error);
  }
};
```

## Security Best Practices

1. **Environment Variables**: Never commit your `.env.local` file to version control
2. **Domain Restrictions**: Only add necessary domains to authorized domains
3. **API Key Security**: Firebase API keys are safe to expose in client-side code
4. **User Data**: Always validate user data on the server side

## Next Steps

After setting up Google authentication, you can:

1. Add email/password authentication
2. Implement user profile management
3. Add role-based access control
4. Store additional user data in Firestore
5. Set up protected routes

## Support

If you encounter issues:
1. Check Firebase Console for error logs
2. Verify your configuration values
3. Check browser console for JavaScript errors
4. Ensure your domain is authorized 