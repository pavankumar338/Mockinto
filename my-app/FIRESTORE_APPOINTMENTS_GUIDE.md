# Firebase Firestore Appointments Guide

This guide explains how to create and manage appointments collections for specific users in Firebase Firestore.

## Collection Structure

### Appointments Collection
```
appointments/
├── {documentId}/
│   ├── userId: string (Firebase Auth UID)
│   ├── doctor: string
│   ├── specialty: string
│   ├── date: string (YYYY-MM-DD)
│   ├── time: string (HH:MM AM/PM)
│   ├── type: string
│   ├── reason: string
│   ├── phone: string
│   ├── status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'
│   ├── notes?: string
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp
```

### User Profiles Collection
```
userProfiles/
├── {documentId}/
│   ├── userId: string (Firebase Auth UID)
│   ├── displayName: string
│   ├── email: string
│   ├── phone?: string
│   ├── dateOfBirth?: string
│   ├── emergencyContact?: string
│   ├── emergencyPhone?: string
│   ├── insuranceProvider?: string
│   ├── insuranceNumber?: string
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp
```

## How It Works

### 1. User Authentication
When a user signs in with Google Auth, they get a unique `uid` from Firebase Authentication.

### 2. Data Filtering by User ID
All appointments are stored in a single `appointments` collection, but each document contains a `userId` field that links it to a specific user.

### 3. Querying User-Specific Data
To get appointments for a specific user, we use Firestore queries with the `where` clause:

```typescript
// Get all appointments for user with ID "user123"
const q = query(
  collection(db, 'appointments'), 
  where('userId', '==', 'user123'), 
  orderBy('date', 'asc')
);
```

## Available Functions

### Creating Appointments
```typescript
// Add a new appointment for a specific user
const newAppointment = await addAppointment({
  userId: user.uid,
  doctor: 'Dr. Sarah Johnson',
  specialty: 'Cardiology',
  date: '2024-01-15',
  time: '10:00 AM',
  type: 'Consultation',
  reason: 'Annual checkup',
  phone: '+1234567890',
  status: 'Pending'
});
```

### Fetching User Appointments
```typescript
// Get all appointments for a user
const appointments = await getUserAppointments(user.uid);

// Get appointments by status
const pendingAppointments = await getUserAppointmentsByStatus(user.uid, 'Pending');

// Get appointments with pagination
const { appointments, lastDoc, hasMore } = await getUserAppointmentsPaginated(user.uid, 10);
```

### Updating Appointments
```typescript
// Update appointment status
await updateAppointment(appointmentId, {
  status: 'Confirmed',
  notes: 'Appointment confirmed by doctor'
});

// Cancel an appointment
await cancelAppointment(appointmentId, 'Patient requested cancellation');
```

### Deleting Appointments
```typescript
// Delete an appointment
await deleteAppointment(appointmentId);
```

## Security Rules

Add these Firestore security rules to ensure users can only access their own data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Appointments - users can only read/write their own appointments
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // User profiles - users can only read/write their own profile
    match /userProfiles/{profileId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Medical records - users can only read/write their own records
    match /medicalRecords/{recordId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Best Practices

### 1. Always Include User ID
Every document should include the `userId` field to link it to the authenticated user.

### 2. Use Timestamps
Include `createdAt` and `updatedAt` fields for tracking document changes.

### 3. Validate Data
Always validate data before saving to Firestore:
```typescript
if (!user?.uid) {
  throw new Error('User not authenticated');
}
```

### 4. Handle Errors
Wrap Firestore operations in try-catch blocks:
```typescript
try {
  await addAppointment(appointmentData);
} catch (error) {
  console.error('Error creating appointment:', error);
  // Handle error appropriately
}
```

### 5. Use Indexes for Complex Queries
For queries with multiple `where` clauses and `orderBy`, you may need to create composite indexes in the Firebase Console.

## Example Usage in Components

```typescript
// In your React component
const Dashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      // Fetch user-specific appointments
      getUserAppointments(user.uid)
        .then(setAppointments)
        .catch(console.error);
    }
  }, [user?.uid]);

  const handleBookAppointment = async (appointmentData) => {
    if (!user?.uid) return;
    
    try {
      await addAppointment({
        ...appointmentData,
        userId: user.uid
      });
      // Refresh appointments list
      const updatedAppointments = await getUserAppointments(user.uid);
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error('Failed to book appointment:', error);
    }
  };

  return (
    <div>
      {appointments.map(appointment => (
        <div key={appointment.id}>
          <h3>{appointment.doctor}</h3>
          <p>{appointment.date} at {appointment.time}</p>
          <span>{appointment.status}</span>
        </div>
      ))}
    </div>
  );
};
```

## Testing the Setup

1. **Sign in with Google Auth**
2. **Create an appointment** - it will be saved with your user ID
3. **View your appointments** - only your appointments will be displayed
4. **Update appointment status** - changes will be reflected immediately
5. **Delete appointments** - only your appointments can be deleted

## Troubleshooting

### Common Issues:

1. **Permission Denied**: Check Firestore security rules
2. **Missing Index**: Create composite indexes for complex queries
3. **User Not Authenticated**: Ensure user is signed in before accessing data
4. **Data Not Loading**: Check if `userId` field is correctly set

### Debug Tips:

1. Check browser console for error messages
2. Verify user authentication status
3. Confirm Firestore rules are properly configured
4. Test queries in Firebase Console 