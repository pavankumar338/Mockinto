# Gemini AI Setup Guide for Mock Interview Feature

This guide will help you set up Google's Gemini AI API to enable the mock interview feature in your healthcare application.

## Prerequisites

1. A Google Cloud account
2. Access to Google AI Studio or Google Cloud Console
3. Node.js and npm installed

## Step 1: Get Your Gemini API Key

### Option A: Using Google AI Studio (Recommended)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key (it starts with "AIza...")

### Option B: Using Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Gemini API:
   - Go to "APIs & Services" > "Library"
   - Search for "Gemini API"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

## Step 2: Install Dependencies

Run the following command in your project directory:

```bash
npm install @google/generative-ai
```

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Gemini API key:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

**Important**: Replace `your_api_key_here` with the actual API key you obtained in Step 1.

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your application and go to the "Mock Interview" tab
3. Start a mock interview session
4. The AI should now respond with dynamic, contextual questions

## Features

### Mock Interview Capabilities

- **Role-specific interviews**: Choose from different healthcare roles (Nurse, Doctor, Pharmacist, etc.)
- **Experience levels**: Entry, Mid, and Senior level interviews
- **Dynamic questioning**: AI adapts questions based on your responses
- **Professional feedback**: Get detailed feedback after completing the interview
- **Fallback mode**: Works even without API key (uses predefined questions)

### Interview Roles Available

- Registered Nurse
- Medical Doctor
- Pharmacist
- Physical Therapist
- Medical Technician

### Experience Levels

- Entry Level
- Mid Level
- Senior Level

## Troubleshooting

### Common Issues

1. **"API key not found" error**
   - Ensure your `.env.local` file is in the project root
   - Verify the environment variable name is exactly `NEXT_PUBLIC_GEMINI_API_KEY`
   - Restart your development server after adding the environment variable

2. **"Gemini API error" messages**
   - Check if your API key is valid
   - Ensure you have sufficient quota/credits
   - Verify the API is enabled in your Google Cloud project

3. **Fallback responses only**
   - This means the API key is not configured or invalid
   - Check the browser console for error messages
   - Verify your API key format (should start with "AIza...")

### API Quotas and Limits

- Free tier: 15 requests per minute
- Paid tier: Higher limits available
- Monitor usage in Google Cloud Console

## Security Best Practices

1. **Never commit API keys to version control**
   - Ensure `.env.local` is in your `.gitignore` file
   - Use environment variables for all sensitive data

2. **API Key restrictions**
   - Consider restricting your API key to specific domains/IPs
   - Use the minimum required permissions

3. **Rate limiting**
   - Implement client-side rate limiting if needed
   - Monitor API usage to avoid quota exceeded errors

## Customization

### Modifying Interview Questions

You can customize the interview experience by editing the `getFallbackResponse` function in `lib/gemini.ts`:

```typescript
export const getFallbackResponse = (messageCount: number, role: string, level: string): string => {
  // Add your custom questions here
  const questions = [
    "Your custom question 1",
    "Your custom question 2",
    // ... more questions
  ];
  
  const index = Math.min(messageCount - 1, questions.length - 1);
  return questions[index] || questions[questions.length - 1];
};
```

### Adding New Roles

To add new healthcare roles:

1. Update the `roles` array in `components/MockInterview.tsx`
2. Add corresponding labels in the `roleLabels` objects
3. Update the prompt templates in `lib/gemini.ts`

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your API key is working in the Google AI Studio playground
3. Ensure all dependencies are properly installed
4. Check the Google Cloud Console for API usage and errors

## Cost Considerations

- Free tier includes 15 requests per minute
- Additional usage is charged per request
- Monitor your usage in Google Cloud Console
- Consider implementing caching for repeated questions

## Next Steps

Once the basic integration is working, you can enhance the feature with:

1. **Voice input/output**: Integrate speech-to-text and text-to-speech
2. **Interview recording**: Save and replay interview sessions
3. **Performance analytics**: Track improvement over time
4. **Custom scenarios**: Create role-specific interview scenarios
5. **Multi-language support**: Add support for different languages 