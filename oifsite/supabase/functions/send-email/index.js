// Follow this setup guide to integrate the Deno language server into your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Deno is a global object in the Deno runtime environment
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// SMTP configuration - to be populated during runtime
const SMTP_CONFIG = {
  hostname: 'smtp.gmail.com',
  port: 587,
  username: '',
  password: '',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Try to get credentials from environment
    try {
      // For Supabase Edge Functions
      SMTP_CONFIG.username = process.env.SMTP_USERNAME || '';
      SMTP_CONFIG.password = process.env.SMTP_PASSWORD || '';
    } catch (e) {
      console.log("Could not access environment variables via process.env");
    }

    // Parse request body
    const { to, from, subject, message } = await req.json();

    // Validate required fields
    if (!to || !from || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate SMTP credentials are set
    if (!SMTP_CONFIG.username || !SMTP_CONFIG.password) {
      console.error('SMTP credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not properly configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Configure SMTP client
    const client = new SmtpClient();
    
    // Connect to SMTP server
    await client.connectTLS({
      hostname: SMTP_CONFIG.hostname,
      port: SMTP_CONFIG.port,
      username: SMTP_CONFIG.username,
      password: SMTP_CONFIG.password,
    });

    // Send email
    await client.send({
      from: from,
      to: to,
      subject: subject,
      content: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
    });

    // Close connection
    await client.close();

    // Return success response
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error response
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}); 