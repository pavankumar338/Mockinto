# Firebase Firestore Collection Setup Guide

This guide shows you how to create the appointments collection in Firebase Firestore with the exact structure you specified.

## Collection Structure

### Parent Path: `/appointments`
### Document ID: Auto-generated (Firebase will create unique IDs)
### Fields:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `userId` | string | ✅ Yes | Firebase Auth UID of the user |
| `doctor` | string | ✅ Yes | Doctor's name |
| `specialty` | string | ✅ Yes | Medical specialty |
| `date` | string | ✅ Yes | Appointment date (YYYY-MM-DD) |
| `time` | string | ✅ Yes | Appointment time (HH:MM AM/PM) |
| `type` | string | ✅ Yes | Type of appointment |
| `reason` | string | ✅ Yes | Reason for visit |
| `phone` | string | ✅ Yes | Patient's phone number |
| `status` | string | ✅ Yes | Appointment status |
| `notes` | string | ❌ No | Additional notes |
| `createdAt` | timestamp | ✅ Yes | When appointment was created |
| `updatedAt` | timestamp | ✅ Yes | When appointment was last updated |

## Method 1: Create Collection via Firebase Console

### Step 1: Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** in the left sidebar

### Step 2: Create Collection
1. Click **"Start collection"** or **"Create collection"**
2. Enter collection ID: `appointments`
3. Click **"Next"**

### Step 3: Add First Document
1. **Document ID**: Leave empty (Firebase will auto-generate)
2. **Add fields**:
   ```
   Field: userId
   Type: string
   Value: [your-test-user-id]
   
   Field: doctor
   Type: string
   Value: Dr. Sarah Johnson
   
   Field: specialty
   Type: string
   Value: Cardiology
   
   Field: date
   Type: string
   Value: 2024-01-15
   
   Field: time
   Type: string
   Value: 10:00 AM
   
   Field: type
   Type: string
   Value: Consultation
   
   Field: reason
   Type: string
   Value: Annual checkup
   
   Field: phone
   Type: string
   Value: +1234567890
   
   Field: status
   Type: string
   Value: Pending
   
   Field: createdAt
   Type: timestamp
   Value: [current timestamp]
   
   Field: updatedAt
   Type: timestamp
   Value: [current timestamp]
   ```

3. Click **"Save"**

## Method 2: Create Collection via Code

### Step 1: Create the Collection Function

```typescript
// lib/firebase.ts
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';

// Function to create an appointment (this will create the collection if it doesn't exist)
export const createAppointment = async (appointmentData: {
  userId: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  reason: string;
  phone: string;
  status: string;
  notes?: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log('Appointment created with ID:', docRef.id);
    return { id: docRef.id, ...appointmentData };
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};
```

### Step 2: Use the Function

```typescript
// In your component
import { createAppointment } from '../lib/firebase';

const handleCreateAppointment = async () => {
  try {
    const newAppointment = await createAppointment({
      userId: user.uid,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'Consultation',
      reason: 'Annual checkup',
      phone: '+1234567890',
      status: 'Pending',
      notes: 'Patient requested morning appointment'
    });
    
    console.log('Appointment created:', newAppointment);
  } catch (error) {
    console.error('Failed to create appointment:', error);
  }
};
```

## Method 3: Create Collection with Sample Data Script

Create a setup script to initialize the collection with sample data:

```javascript
// setup-appointments.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

const firebaseConfig = {
  // Your Firebase config here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleAppointments = [
  {
    userId: 'user123456789',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: '2024-01-15',
    time: '10:00 AM',
    type: 'Consultation',
    reason: 'Annual heart checkup',
    phone: '+1234567890',
    status: 'Pending',
    notes: 'Patient requested morning appointment'
  },
  {
    userId: 'user123456789',
    doctor: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    date: '2024-01-20',
    time: '02:30 PM',
    type: 'Follow-up',
    reason: 'Skin condition follow-up',
    phone: '+1234567890',
    status: 'Confirmed',
    notes: 'Follow-up for previous treatment'
  }
];

async function createAppointmentsCollection() {
  console.log('Creating appointments collection with sample data...');
  
  for (const appointment of sampleAppointments) {
    try {
      const docRef = await addDoc(collection(db, 'appointments'), {
        ...appointment,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`✅ Appointment created with ID: ${docRef.id}`);
    } catch (error) {
      console.error(`❌ Error creating appointment:`, error);
    }
  }
  
  console.log('✅ Appointments collection setup completed!');
}

createAppointmentsCollection();
```

## Method 4: Using Firebase Admin SDK (Server-side)

If you need to create the collection from a server:

```javascript
// server/firebase-admin.js
const admin = require('firebase-admin');

const serviceAccount = require('./path-to-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function createAppointmentFromServer(appointmentData) {
  try {
    const docRef = await db.collection('appointments').add({
      ...appointmentData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('Appointment created with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
}
```

## Firestore Security Rules

Add these security rules to protect your appointments collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Appointments collection rules
    match /appointments/{appointmentId} {
      // Users can read their own appointments
      allow read: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      
      // Users can create appointments for themselves
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
      
      // Users can update their own appointments
      allow update: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      
      // Users can delete their own appointments
      allow delete: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## Testing the Collection

### 1. Create a Test Component

```typescript
// components/AppointmentCreator.tsx
'use client'
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createAppointment } from '../lib/firebase';

const AppointmentCreator = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    type: '',
    reason: '',
    phone: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;

    setLoading(true);
    try {
      await createAppointment({
        userId: user.uid,
        ...formData,
        status: 'Pending'
      });
      alert('Appointment created successfully!');
      setFormData({
        doctor: '',
        specialty: '',
        date: '',
        time: '',
        type: '',
        reason: '',
        phone: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to create appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Doctor Name"
        value={formData.doctor}
        onChange={(e) => setFormData({...formData, doctor: e.target.value})}
        required
        className="w-full p-2 border rounded"
      />
      {/* Add other form fields similarly */}
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {loading ? 'Creating...' : 'Create Appointment'}
      </button>
    </form>
  );
};

export default AppointmentCreator;
```

### 2. Verify in Firebase Console

1. Go to Firebase Console → Firestore Database
2. Navigate to the `appointments` collection
3. You should see your created documents with the correct structure

## Common Issues and Solutions

### Issue 1: Collection not appearing
**Solution**: Collections are created automatically when you add the first document. Make sure you're adding a document to the collection.

### Issue 2: Permission denied
**Solution**: Check your Firestore security rules and ensure they allow the operation you're trying to perform.

### Issue 3: Invalid field types
**Solution**: Make sure all field types match what's expected. Use `serverTimestamp()` for timestamp fields.

### Issue 4: Missing required fields
**Solution**: Ensure all required fields are provided when creating documents.

## Best Practices

1. **Always validate data** before saving to Firestore
2. **Use TypeScript interfaces** to ensure type safety
3. **Handle errors gracefully** with try-catch blocks
4. **Use security rules** to protect your data
5. **Test thoroughly** in development before deploying
6. **Monitor usage** in Firebase Console to avoid hitting limits 