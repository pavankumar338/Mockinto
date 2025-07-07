#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔥 Firebase Setup Helper');
console.log('========================\n');

console.log('To complete your Google authentication setup, follow these steps:\n');

console.log('1. 📦 Install Firebase:');
console.log('   npm install firebase\n');

console.log('2. 🌐 Create Firebase Project:');
console.log('   - Go to https://console.firebase.google.com/');
console.log('   - Create a new project or select existing');
console.log('   - Enable Google Authentication in Authentication > Sign-in method\n');

console.log('3. 🔧 Get Configuration:');
console.log('   - Go to Project Settings > Your apps');
console.log('   - Click Web icon (</>)');
console.log('   - Register your app');
console.log('   - Copy the configuration object\n');

console.log('4. 📝 Create .env.local file:');
console.log('   Create a .env.local file in your project root with:\n');

const envTemplate = `NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id`;

console.log(envTemplate);
console.log('\n5. 🚀 Test:');
console.log('   npm run dev');
console.log('   - Open your app');
console.log('   - Click Sign In');
console.log('   - Complete Google authentication\n');

console.log('📚 For detailed instructions, see GOOGLE_AUTH_SETUP.md');
console.log('❓ For troubleshooting, see the troubleshooting section in the setup guide\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file found!');
} else {
  console.log('⚠️  .env.local file not found. Please create it with your Firebase config.');
}

// Check if firebase is installed
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  if (packageJson.dependencies && packageJson.dependencies.firebase) {
    console.log('✅ Firebase dependency found!');
  } else {
    console.log('⚠️  Firebase dependency not found. Run: npm install firebase');
  }
} 