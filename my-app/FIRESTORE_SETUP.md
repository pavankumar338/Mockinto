# Firebase Firestore Setup Guide

## Overview

This guide explains how to set up Firebase Firestore to store user appointment data securely.

## 1. Enable Firestore Database

1. Go to your Firebase Console
2. Select your project
3. In the left sidebar, click on "Firestore Database"
4. Click "Create Database"
5. Choose "Start in test mode" for development (we'll add security rules later)
6. Select a location for your database (choose the closest to your users)

## 2. Security Rules

Replace the default security rules with these secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Appointments collection - users can only access their own appointments
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Medical records collection - users can only access their own records
    match /medicalRecords/{recordId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // User profiles collection - users can only access their own profile
    match /userProfiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 3. Database Structure

### Appointments Collection
```
appointments/{appointmentId}
├── userId: string (user's Firebase UID)
├── doctor: string
├── specialty: string
├── date: string (YYYY-MM-DD format)
├── time: string
├── type: string
├── reason: string
├── phone: string
├── status: string (Pending, Confirmed, Cancelled)
├── createdAt: timestamp
└── updatedAt: timestamp
```

### Medical Records Collection
```
medicalRecords/{recordId}
├── userId: string (user's Firebase UID)
├── type: string
├── date: string
├── status: string (Available, Pending)
├── fileUrl: string (optional - for file uploads)
├── createdAt: timestamp
└── updatedAt: timestamp
```

## 4. Environment Variables

Make sure your `.env.local` file includes all Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 5. Testing the Setup

1. Start your development server: `npm run dev`
2. Sign in with Google authentication
3. Try booking an appointment
4. Check your Firebase Console > Firestore Database to see the data

## 6. Production Considerations

### Security Rules for Production
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // More restrictive rules for production
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.userId
        && request.auth.token.email_verified == true;
      allow create: if request.auth != null 
        && request.auth.uid == request.resource.data.userId
        && request.auth.token.email_verified == true;
    }
  }
}
```

### Data Validation
- Add client-side validation for all form inputs
- Implement server-side validation for critical operations
- Use Firebase Functions for complex business logic

### Backup Strategy
- Set up automated backups in Firebase Console
- Consider exporting data regularly for compliance

## 7. Troubleshooting

### Common Issues

1. **Permission Denied**: Check security rules and user authentication
2. **Data Not Loading**: Verify user UID and collection names
3. **Form Submission Fails**: Check network connectivity and Firebase configuration

### Debug Tips
- Use Firebase Console to monitor database activity
- Check browser console for error messages
- Verify environment variables are loaded correctly

## 8. Next Steps

- Implement real-time updates using Firestore listeners
- Add file upload functionality for medical records
- Implement appointment notifications
- Add admin panel for healthcare providers
- Set up data analytics and reporting 