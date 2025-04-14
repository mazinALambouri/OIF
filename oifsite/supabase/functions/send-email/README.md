# Send Email Edge Function

This Supabase Edge Function sends emails from the contact form to the admin email address.

## Setup Instructions

1. Deploy the function to your Supabase project:

```bash
supabase functions deploy send-email
```

2. Set the required environment variables:

```bash
supabase secrets set SMTP_USERNAME=your-email@gmail.com
supabase secrets set SMTP_PASSWORD=your-app-password
```

> Note: If using Gmail, you'll need to create an "App Password" in your Google Account settings.

3. Update the SMTP configuration in the function code if needed:

```javascript
const SMTP_CONFIG = {
  hostname: 'smtp.gmail.com', // Change if using a different email provider
  port: 587,                  // Change if using a different port
  username: '',               // Will be set from environment variables
  password: '',               // Will be set from environment variables
};
```

## Testing the Function

You can test the function using the Supabase dashboard or with curl:

```bash
curl -X POST 'https://your-project-ref.supabase.co/functions/v1/send-email' \
  -H 'Authorization: Bearer your-anon-key' \
  -H 'Content-Type: application/json' \
  -d '{
    "to": "advantageoman@investoman.om",
    "from": "user@example.com",
    "subject": "Test Email",
    "message": "This is a test message"
  }'
```

## Troubleshooting

- Check the Supabase logs for any errors
- Verify that your SMTP credentials are correct
- Make sure your email provider allows sending from the Edge Function 