# Firestore Index Setup Guide

## Issue: Missing Composite Index

You're getting this error because Firestore requires a composite index for queries that filter by `userId` and order by `date`.

## Solution: Create the Required Index

### Method 1: Click the Link in the Error (Recommended)

1. **Click the link** in your error message:
   ```
   https://console.firebase.google.com/v1/r/project/resumebuilder-d5560/firestore/indexes?create_composite=Clhwcm9qZWN0cy9yZXN1bWVidWlsZGVyLWQ1NTYwL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9hcHBvaW50bWVudHMvaW5kZXhlcy9fEAEaCgoGdXNlcklkEAEaCAoEZGF0ZRABGgwKCF9fbmFtZV9fEAE
   ```

2. **Sign in** to Firebase Console if prompted

3. **Review the index** and click **"Create index"**

4. **Wait for the index to build** (this may take a few minutes)

### Method 2: Manual Index Creation

If the link doesn't work, create the index manually:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** → **Indexes** tab
4. Click **"Create index"**
5. Fill in the details:
   - **Collection ID**: `appointments`
   - **Fields to index**:
     - `userId` (Ascending)
     - `date` (Ascending)
   - **Query scope**: Collection
6. Click **"Create index"**

## Required Indexes for Your App

Based on your queries, you'll need these indexes:

### 1. Appointments Collection
```
Collection: appointments
Fields:
- userId (Ascending)
- date (Ascending)
```

### 2. Medical Records Collection
```
Collection: medicalRecords
Fields:
- userId (Ascending)
- date (Descending)
```

### 3. User Profiles Collection
```
Collection: userProfiles
Fields:
- userId (Ascending)
```

## Alternative: Simplify Queries (Temporary Fix)

If you want to test without creating indexes, you can temporarily modify the queries to not use `orderBy`: 