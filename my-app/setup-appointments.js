// Setup script to create appointments collection in Firebase Firestore
// Run this script to initialize your appointments collection with sample data

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample appointments data
const sampleAppointments = [
  {
    userId: 'user123456789', // Replace with actual user ID
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
    userId: 'user123456789', // Replace with actual user ID
    doctor: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    date: '2024-01-20',
    time: '02:30 PM',
    type: 'Follow-up',
    reason: 'Skin condition follow-up',
    phone: '+1234567890',
    status: 'Confirmed',
    notes: 'Follow-up for previous treatment'
  },
  {
    userId: 'user987654321', // Replace with actual user ID
    doctor: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    date: '2024-01-18',
    time: '09:00 AM',
    type: 'Routine Check-up',
    reason: 'Child wellness visit',
    phone: '+1987654321',
    status: 'Confirmed',
    notes: 'Annual pediatric checkup'
  }
];

// Function to create appointments collection
async function createAppointmentsCollection() {
  console.log('🚀 Starting appointments collection setup...\n');
  
  try {
    console.log('📝 Creating sample appointments...');
    
    for (const appointment of sampleAppointments) {
      try {
        const docRef = await addDoc(collection(db, 'appointments'), {
          ...appointment,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        console.log(`✅ Appointment created with ID: ${docRef.id}`);
        console.log(`   Doctor: ${appointment.doctor}`);
        console.log(`   Date: ${appointment.date} at ${appointment.time}`);
        console.log(`   Status: ${appointment.status}\n`);
      } catch (error) {
        console.error(`❌ Error creating appointment:`, error);
      }
    }
    
    console.log('✅ Appointments collection setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Go to Firebase Console → Firestore Database');
    console.log('2. Navigate to the "appointments" collection');
    console.log('3. Verify that the documents were created with the correct structure');
    console.log('4. Update the userId values in this script with actual user IDs from your Firebase Auth');
    console.log('5. Run this script again to create appointments for real users');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

// Function to get user IDs from Firebase Auth
function getActualUserIds() {
  console.log('📋 To get actual user IDs from Firebase Auth:');
  console.log('1. Go to Firebase Console → Authentication → Users');
  console.log('2. Copy the UID of each user');
  console.log('3. Update the userId values in the sampleAppointments array above');
  console.log('4. Run this script again');
}

// Function to create a single appointment
async function createSingleAppointment(appointmentData) {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log(`✅ Single appointment created with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating single appointment:', error);
    throw error;
  }
}

// Export functions for use in other scripts
module.exports = {
  createAppointmentsCollection,
  createSingleAppointment,
  getActualUserIds
};

// Run setup if this script is executed directly
if (require.main === module) {
  createAppointmentsCollection();
} 