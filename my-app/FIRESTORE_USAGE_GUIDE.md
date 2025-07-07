# Firebase Firestore User Data Fetching Guide

This guide explains how to fetch specific user data from Firebase Firestore in your healthcare application.

## Available Functions

### 1. User Profile Functions

```typescript
// Get user profile by user ID (from authentication)
const profile = await getUserProfile(userId);

// Get user profile by document ID
const profile = await getUserProfileById(profileId);
```

### 2. Appointment Functions

```typescript
// Get all appointments for a user
const appointments = await getUserAppointments(userId);

// Get specific appointment by ID
const appointment = await getAppointmentById(appointmentId);
```

### 3. Medical Records Functions

```typescript
// Get all medical records for a user
const medicalRecords = await getUserMedicalRecords(userId);

// Get specific medical record by ID
const medicalRecord = await getMedicalRecordById(recordId);
```

### 4. Generic Document Functions

```typescript
// Get any document by collection name and document ID
const document = await getDocumentById(collectionName, documentId);
```

## Usage Examples

### Option 1: Using the Custom Hook (Recommended)

The `useUserData` hook fetches all user data automatically:

```typescript
import { useUserData } from '../hooks/useUserData';

const MyComponent = () => {
  const { profile, appointments, medicalRecords, loading, error, refreshUserData } = useUserData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Dashboard</h1>
      
      {/* Profile Section */}
      {profile && (
        <div>
          <h2>Profile</h2>
          <p>Name: {profile.displayName}</p>
          <p>Email: {profile.email}</p>
        </div>
      )}

      {/* Appointments Section */}
      <div>
        <h2>Appointments ({appointments.length})</h2>
        {appointments.map(appointment => (
          <div key={appointment.id}>
            <p>Date: {appointment.date}</p>
            <p>Doctor: {appointment.doctor}</p>
          </div>
        ))}
      </div>

      {/* Medical Records Section */}
      <div>
        <h2>Medical Records ({medicalRecords.length})</h2>
        {medicalRecords.map(record => (
          <div key={record.id}>
            <p>Type: {record.type}</p>
            <p>Date: {record.date}</p>
          </div>
        ))}
      </div>

      <button onClick={refreshUserData}>Refresh Data</button>
    </div>
  );
};
```

### Option 2: Fetching Specific Data Types

If you only need specific data types:

```typescript
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, getUserAppointments, getUserMedicalRecords } from '../lib/firebase';

const ProfileComponent = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const userProfile = await getUserProfile(user.uid);
        setProfile(userProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) return <div>Loading profile...</div>;
  
  return (
    <div>
      {profile ? (
        <div>
          <h2>Profile</h2>
          <p>Name: {profile.displayName}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>No profile found</p>
      )}
    </div>
  );
};
```

### Option 3: Fetching Specific Documents by ID

If you have document IDs and want to fetch specific documents:

```typescript
import { getAppointmentById, getMedicalRecordById } from '../lib/firebase';

const SpecificDataComponent = () => {
  const [appointment, setAppointment] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState(null);

  const fetchSpecificData = async () => {
    try {
      // Fetch specific appointment
      const appointmentData = await getAppointmentById('appointment-id-here');
      setAppointment(appointmentData);

      // Fetch specific medical record
      const recordData = await getMedicalRecordById('record-id-here');
      setMedicalRecord(recordData);
    } catch (error) {
      console.error('Error fetching specific data:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchSpecificData}>Fetch Specific Data</button>
      
      {appointment && (
        <div>
          <h3>Appointment Details</h3>
          <p>Date: {appointment.date}</p>
          <p>Doctor: {appointment.doctor}</p>
        </div>
      )}

      {medicalRecord && (
        <div>
          <h3>Medical Record Details</h3>
          <p>Type: {medicalRecord.type}</p>
          <p>Date: {medicalRecord.date}</p>
        </div>
      )}
    </div>
  );
};
```

## Data Structure

### User Profile Data
```typescript
interface UserProfileData {
  id?: string;
  displayName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  createdAt?: any;
  updatedAt?: any;
}
```

### Appointment Data
```typescript
interface AppointmentData {
  id?: string;
  userId: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  reason: string;
  phone: string;
  status: string;
  createdAt?: any;
  updatedAt?: any;
}
```

### Medical Record Data
```typescript
interface MedicalRecordData {
  id?: string;
  userId: string;
  type: string;
  date: string;
  status: string;
  fileUrl?: string;
  description?: string;
  createdAt?: any;
  updatedAt?: any;
}
```

## Error Handling

All functions include proper error handling:

```typescript
try {
  const data = await getUserProfile(userId);
  // Handle success
} catch (error) {
  console.error('Error fetching data:', error);
  // Handle error (show user-friendly message, retry, etc.)
}
```

## Best Practices

1. **Use the custom hook** (`useUserData`) for components that need multiple data types
2. **Fetch specific data** only when you need it to reduce unnecessary API calls
3. **Handle loading states** to provide good user experience
4. **Implement error handling** to gracefully handle failures
5. **Use TypeScript interfaces** for type safety
6. **Cache data** when appropriate to avoid repeated API calls

## Integration with Components

To use these functions in your components, make sure you have:

1. **Authentication Context** set up (already done in your project)
2. **Firebase configuration** properly configured
3. **User authentication** completed before fetching data

The functions automatically use the authenticated user's ID when called from components that use the `useAuth` hook. 