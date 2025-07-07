# Firebase Troubleshooting Guide

## Current Issues

You're experiencing two main problems:
1. **Missing or insufficient permissions** - Firestore security rules blocking access
2. **Missing composite index** - Query requires an index for `userId` and `date` fields

## 🔧 Step-by-Step Fix

### Step 1: Update Firestore Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`resumebuilder-d5560`)
3. Navigate to **Firestore Database** → **Rules** tab
4. Replace the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write their own appointments
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Allow users to read and write their own user profiles
    match /userProfiles/{profileId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Allow users to read and write their own medical records
    match /medicalRecords/{recordId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
  }
}
```

5. Click **"Publish"**

### Step 2: Create Required Indexes

#### Option A: Use the Error Link (Easiest)
1. **Click this link** from your error message:
   ```
   https://console.firebase.google.com/v1/r/project/resumebuilder-d5560/firestore/indexes?create_composite=Clhwcm9qZWN0cy9yZXN1bWVidWlsZGVyLWQ1NTYwL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9hcHBvaW50bWVudHMvaW5kZXhlcy9fEAEaCgoGdXNlcklkEAEaCAoEZGF0ZRABGgwKCF9fbmFtZV9fEAE
   ```
2. Sign in if prompted
3. Click **"Create index"**
4. Wait for the index to build (2-5 minutes)

#### Option B: Manual Index Creation
1. Go to **Firestore Database** → **Indexes** tab
2. Click **"Create index"**
3. Fill in:
   - **Collection ID**: `appointments`
   - **Fields**:
     - `userId` (Ascending)
     - `date` (Ascending)
   - **Query scope**: Collection
4. Click **"Create index"**

### Step 3: Test the Fix

1. **Refresh your app** in the browser
2. **Sign in** with Google Auth
3. **Check the console** - errors should be gone
4. **Try creating an appointment** to test functionality

## 🚨 Temporary Workaround

If you want to test immediately without waiting for indexes, I've already modified the code to:

1. **Remove `orderBy` from queries** temporarily
2. **Sort data in JavaScript** instead
3. **Add better error handling**

This will work immediately but is less efficient than using Firestore indexes.

## 🔍 Debugging Steps

### Check Authentication Status
```javascript
// In browser console
import { auth } from './lib/firebase';
console.log('Current user:', auth.currentUser);
```

### Check Firestore Rules
```javascript
// Test if rules are working
import { db } from './lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

// This should work if rules are correct
const testQuery = await getDocs(collection(db, 'appointments'));
console.log('Test query result:', testQuery.docs.length);
```

### Check Index Status
1. Go to **Firestore Database** → **Indexes**
2. Look for your index in the list
3. Status should be **"Enabled"** (not "Building")

## 📋 Common Issues & Solutions

### Issue: "Missing or insufficient permissions"
**Solution**: Update security rules (Step 1 above)

### Issue: "The query requires an index"
**Solution**: Create the composite index (Step 2 above)

### Issue: "User not authenticated"
**Solution**: Ensure user is signed in before accessing data

### Issue: "Collection doesn't exist"
**Solution**: Create the collection by adding the first document

### Issue: "Invalid field types"
**Solution**: Check that all field types match the expected format

## 🎯 Expected Behavior After Fix

✅ **No more permission errors**  
✅ **No more index errors**  
✅ **Appointments load correctly**  
✅ **User profiles load correctly**  
✅ **Medical records load correctly**  
✅ **Users can only see their own data**  

## 📞 Still Having Issues?

If you're still experiencing problems after following these steps:

1. **Check the Firebase Console** for any error messages
2. **Verify your Firebase config** is correct
3. **Ensure you're using the right project** (`resumebuilder-d5560`)
4. **Check that collections exist** and have data
5. **Verify user authentication** is working properly

The most common cause is either incorrect security rules or missing indexes. Following the steps above should resolve both issues. 