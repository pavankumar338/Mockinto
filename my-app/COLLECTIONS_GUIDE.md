# Firebase Firestore Collections Guide

## Overview

Collections in Firebase Firestore are like folders that organize your data. Each collection contains documents (records) that share a similar structure.

## Collections Structure for Healthcare App

### 1. `appointments` Collection

**Purpose**: Store all user appointments

**Document Structure**:
```javascript
{
  userId: "user123",                    // Firebase Auth UID
  doctor: "Dr. Sarah Johnson",          // Doctor's name
  specialty: "Cardiology",              // Medical specialty
  date: "2024-01-15",                   // Appointment date (YYYY-MM-DD)
  time: "10:00 AM",                     // Appointment time
  type: "Follow-up",                    // Appointment type
  reason: "Heart checkup",              // Reason for visit
  phone: "+1234567890",                 // Patient phone
  status: "Pending",                    // Status: Pending, Confirmed, Cancelled
  createdAt: timestamp,                 // Auto-generated timestamp
  updatedAt: timestamp                  // Auto-generated timestamp
}
```

**Example Document**:
```javascript
{
  id: "appointment_001",
  userId: "abc123def456",
  doctor: "Dr. Michael Chen",
  specialty: "Dermatology",
  date: "2024-01-20",
  time: "2:30 PM",
  type: "Consultation",
  reason: "Skin rash evaluation",
  phone: "+1234567890",
  status: "Confirmed",
  createdAt: "2024-01-10T10:30:00Z",
  updatedAt: "2024-01-10T10:30:00Z"
}
```

### 2. `medicalRecords` Collection

**Purpose**: Store user medical records and test results

**Document Structure**:
```javascript
{
  userId: "user123",                    // Firebase Auth UID
  type: "Blood Test Results",           // Record type
  date: "2024-01-10",                   // Record date
  status: "Available",                  // Status: Available, Pending
  fileUrl: "https://...",               // Optional: File URL
  description: "Complete blood count",  // Optional: Description
  createdAt: timestamp,                 // Auto-generated timestamp
  updatedAt: timestamp                  // Auto-generated timestamp
}
```

**Example Document**:
```javascript
{
  id: "record_001",
  userId: "abc123def456",
  type: "X-Ray Report",
  date: "2024-01-08",
  status: "Available",
  fileUrl: "https://storage.googleapis.com/medical-files/xray_001.pdf",
  description: "Chest X-Ray for respiratory evaluation",
  createdAt: "2024-01-08T14:20:00Z",
  updatedAt: "2024-01-08T14:20:00Z"
}
```

### 3. `userProfiles` Collection

**Purpose**: Store additional user information beyond Firebase Auth

**Document Structure**:
```javascript
{
  userId: "user123",                    // Firebase Auth UID
  displayName: "John Doe",              // User's full name
  email: "john@example.com",            // User's email
  phone: "+1234567890",                 // Primary phone
  dateOfBirth: "1990-01-01",            // Date of birth
  emergencyContact: "Jane Doe",         // Emergency contact name
  emergencyPhone: "+1234567891",        // Emergency contact phone
  insuranceProvider: "Blue Cross",      // Insurance provider
  insuranceNumber: "BC123456789",       // Insurance number
  createdAt: timestamp,                 // Auto-generated timestamp
  updatedAt: timestamp                  // Auto-generated timestamp
}
```

**Example Document**:
```javascript
{
  id: "profile_001",
  userId: "abc123def456",
  displayName: "Sarah Wilson",
  email: "sarah.wilson@email.com",
  phone: "+1234567890",
  dateOfBirth: "1985-03-15",
  emergencyContact: "Mike Wilson",
  emergencyPhone: "+1234567891",
  insuranceProvider: "Aetna",
  insuranceNumber: "AET123456789",
  createdAt: "2024-01-01T09:00:00Z",
  updatedAt: "2024-01-10T16:30:00Z"
}
```

### 4. `doctors` Collection

**Purpose**: Store doctor information and availability

**Document Structure**:
```javascript
{
  name: "Dr. Sarah Johnson",            // Doctor's full name
  specialty: "Cardiology",              // Medical specialty
  email: "sarah.johnson@hospital.com",  // Professional email
  phone: "+1234567890",                 // Office phone
  availability: ["Monday", "Wednesday", "Friday"], // Available days
  location: "Building A, Floor 2",      // Office location
  rating: 4.8,                          // Average rating
  experience: "15 years",               // Years of experience
  createdAt: timestamp,                 // Auto-generated timestamp
  updatedAt: timestamp                  // Auto-generated timestamp
}
```

**Example Document**:
```javascript
{
  id: "doctor_001",
  name: "Dr. Emily Rodriguez",
  specialty: "Pediatrics",
  email: "emily.rodriguez@hospital.com",
  phone: "+1234567890",
  availability: ["Tuesday", "Thursday", "Saturday"],
  location: "Building B, Floor 1",
  rating: 4.9,
  experience: "12 years",
  createdAt: "2024-01-01T08:00:00Z",
  updatedAt: "2024-01-15T11:20:00Z"
}
```

### 5. `notifications` Collection

**Purpose**: Store user notifications and reminders

**Document Structure**:
```javascript
{
  userId: "user123",                    // Firebase Auth UID
  type: "appointment_reminder",         // Notification type
  title: "Appointment Reminder",        // Notification title
  message: "Your appointment is tomorrow", // Notification message
  read: false,                          // Read status
  scheduledFor: timestamp,              // When to send notification
  createdAt: timestamp,                 // Auto-generated timestamp
  updatedAt: timestamp                  // Auto-generated timestamp
}
```

**Example Document**:
```javascript
{
  id: "notification_001",
  userId: "abc123def456",
  type: "test_result",
  title: "Test Results Available",
  message: "Your blood test results are now available for review",
  read: false,
  scheduledFor: "2024-01-15T10:00:00Z",
  createdAt: "2024-01-15T09:00:00Z",
  updatedAt: "2024-01-15T09:00:00Z"
}
```

## Collection Management

### Creating Collections

Collections are created automatically when you add the first document:

```javascript
// This creates the 'appointments' collection if it doesn't exist
await addDoc(collection(db, 'appointments'), appointmentData);
```

### Querying Collections

```javascript
// Get all appointments for a user
const q = query(
  collection(db, 'appointments'),
  where('userId', '==', userId),
  orderBy('date', 'asc')
);

// Get medical records with status 'Available'
const q = query(
  collection(db, 'medicalRecords'),
  where('userId', '==', userId),
  where('status', '==', 'Available')
);
```

### Security Rules for Collections

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Appointments - users can only access their own
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Medical Records - users can only access their own
    match /medicalRecords/{recordId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // User Profiles - users can only access their own
    match /userProfiles/{profileId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Doctors - anyone can read, only admins can write
    match /doctors/{doctorId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Notifications - users can only access their own
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Best Practices

### 1. Document IDs
- Let Firebase auto-generate IDs for most documents
- Use meaningful IDs for reference data (e.g., `doctor_001`)

### 2. Data Validation
- Always validate data before saving
- Use TypeScript interfaces for type safety
- Implement client-side and server-side validation

### 3. Indexing
- Create composite indexes for complex queries
- Monitor query performance in Firebase Console

### 4. Security
- Always include `userId` in user-specific documents
- Use security rules to enforce access control
- Never trust client-side data

### 5. Performance
- Use pagination for large collections
- Implement caching for frequently accessed data
- Monitor read/write operations

## Testing Collections

1. **Create test data** in Firebase Console
2. **Test queries** in your application
3. **Monitor performance** in Firebase Console
4. **Verify security rules** work correctly

## Next Steps

- Implement real-time listeners for live updates
- Add file upload functionality for medical records
- Create admin panel for managing doctors
- Implement notification system
- Add data analytics and reporting 