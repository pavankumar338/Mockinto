# Firebase Authentication Setup

## Prerequisites

1. Install Firebase dependencies:
```bash
npm install firebase
```

## Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google sign-in provider
   - Add your domain to authorized domains

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Getting Firebase Config

1. In Firebase Console, go to Project Settings
2. Scroll down to "Your apps" section
3. Click on the web app (</>) icon
4. Copy the configuration object
5. Replace the values in your `.env.local` file

## Features Implemented

- Google Sign-in with popup
- User authentication state management
- Automatic user profile display (name, email, photo)
- Sign out functionality
- Responsive design for mobile and desktop
- Loading states during authentication

## Usage

The authentication is now integrated into your Navbar component. Users can:
- Sign in with Google
- See their profile information
- Sign out
- Access authentication state throughout the app using the `useAuth` hook

## Next Steps

You can extend this by:
- Adding email/password authentication
- Implementing protected routes
- Adding user profile management
- Storing additional user data in Firestore 