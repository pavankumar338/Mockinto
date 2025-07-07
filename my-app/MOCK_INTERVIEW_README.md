# Mock Interview Feature

A comprehensive AI-powered mock interview system integrated with Google's Gemini AI, designed specifically for healthcare professionals.

## 🚀 Features

### Core Functionality
- **AI-Powered Interviews**: Dynamic, contextual questions using Gemini AI
- **Role-Specific Sessions**: Choose from 5 different healthcare roles
- **Experience Levels**: Entry, Mid, and Senior level interviews
- **Real-time Feedback**: Get detailed feedback after completing interviews
- **Fallback Mode**: Works without API key using predefined questions

### Healthcare Roles Available
- **Registered Nurse**: Clinical practice, patient care, nursing procedures
- **Medical Doctor**: Medical diagnosis, treatment plans, clinical decision-making
- **Pharmacist**: Medication management, drug interactions, patient counseling
- **Physical Therapist**: Rehabilitation, patient assessment, treatment planning
- **Medical Technician**: Laboratory procedures, equipment operation, data analysis

### User Experience
- **Intuitive Interface**: Clean, professional design with easy navigation
- **Real-time Chat**: Smooth conversation flow with typing indicators
- **Session Management**: Start, pause, and restart interviews
- **Progress Tracking**: Visual indicators for interview progress
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install @google/generative-ai
```

### 2. Configure Environment Variables
Create a `.env.local` file in your project root:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Get Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in and create an API key
3. Copy the key to your `.env.local` file

### 4. Start the Application
```bash
npm run dev
```

## 📱 How to Use

### Starting an Interview
1. Navigate to the "Mock Interview" tab in the dashboard
2. Select your desired healthcare role
3. Choose your experience level
4. Click "Start Mock Interview"

### During the Interview
- **Type your responses** in the input field
- **Press Enter** or click the send button to submit
- **Use the microphone button** for voice input (coming soon)
- **Review the conversation** in real-time

### Completing the Interview
1. Click "End Interview" when finished
2. Wait for AI-generated feedback
3. Review the detailed assessment
4. Start a new interview or review the session

## 🎯 Interview Process

### Typical Flow
1. **Introduction**: AI introduces itself and the interview format
2. **Background Questions**: Motivation, experience, career goals
3. **Scenario-Based Questions**: Real-world healthcare situations
4. **Technical Questions**: Role-specific knowledge and skills
5. **Behavioral Questions**: Teamwork, problem-solving, communication
6. **Closing**: Opportunity for candidate questions
7. **Feedback**: Comprehensive assessment and recommendations

### Question Types
- **Behavioral**: "Tell me about a time when..."
- **Situational**: "What would you do if..."
- **Technical**: Role-specific knowledge questions
- **Motivational**: Career goals and aspirations
- **Problem-solving**: Clinical decision-making scenarios

## 🔧 Customization

### Adding New Roles
1. Update the `roles` array in `components/MockInterview.tsx`
2. Add role labels in `lib/gemini.ts`
3. Customize prompt templates for the new role

### Modifying Questions
Edit the `getFallbackResponse` function in `lib/gemini.ts`:
```typescript
const questions = [
  "Your custom question 1",
  "Your custom question 2",
  // Add more questions
];
```

### Styling
The component uses Tailwind CSS classes. Customize the appearance by modifying:
- Color schemes in the gradient classes
- Spacing and layout in the flex/grid classes
- Typography in the text classes

## 🚨 Troubleshooting

### Common Issues

**"API key not found"**
- Check that `.env.local` exists in project root
- Verify environment variable name is correct
- Restart development server

**Fallback responses only**
- API key not configured or invalid
- Check browser console for errors
- Verify API key format (starts with "AIza...")

**Slow responses**
- Check internet connection
- Monitor API quota usage
- Consider implementing caching

### Error Messages
- **"Gemini API error"**: Check API key validity and quota
- **"Network error"**: Verify internet connection
- **"Rate limit exceeded"**: Wait and try again

## 📊 Performance

### API Limits
- **Free tier**: 15 requests per minute
- **Paid tier**: Higher limits available
- **Response time**: Typically 1-3 seconds

### Optimization Tips
- Implement response caching
- Use fallback mode for testing
- Monitor API usage in Google Cloud Console

## 🔒 Security

### Best Practices
- Never commit API keys to version control
- Use environment variables for sensitive data
- Restrict API keys to specific domains
- Monitor usage for unusual activity

### Data Privacy
- Interview sessions are not stored permanently
- No personal data is sent to external services
- All communication is encrypted

## 🚀 Future Enhancements

### Planned Features
- **Voice Input/Output**: Speech-to-text and text-to-speech
- **Interview Recording**: Save and replay sessions
- **Performance Analytics**: Track improvement over time
- **Custom Scenarios**: Role-specific interview scenarios
- **Multi-language Support**: International healthcare roles

### Technical Improvements
- **Caching**: Reduce API calls for repeated questions
- **Offline Mode**: Enhanced fallback functionality
- **Real-time Collaboration**: Multi-user interview sessions
- **Integration**: Connect with existing HR systems

## 📞 Support

### Getting Help
1. Check the browser console for error messages
2. Verify API key in Google AI Studio playground
3. Review the setup guide in `GEMINI_SETUP.md`
4. Check Google Cloud Console for API usage

### Resources
- [Google AI Studio](https://makersuite.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

### Development
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Testing
- Test with and without API key
- Verify all healthcare roles
- Check responsive design
- Validate accessibility

---

**Note**: This feature requires a valid Gemini API key for full functionality. Without an API key, the system will use predefined questions as a fallback. 