# Supabase Setup for Livestream Notifications

To enable livestream notifications, your Supabase database needs to have the correct structure. This guide will help you set up or modify your `livestream` table.

## Required Structure

The `livestream` table should have at least these fields:

- `id` (UUID or Integer): Primary key
- `youtube_url` (Text): URL of the YouTube livestream
- `is_active` (Boolean): Whether the livestream is currently active

## Setting Up in Supabase

1. Log in to your Supabase account at https://app.supabase.com
2. Navigate to your project
3. Go to the SQL Editor
4. Use one of the following SQL commands:

### If the `livestream` table doesn't exist yet:

```sql
CREATE TABLE livestream (
  id SERIAL PRIMARY KEY,
  youtube_url TEXT,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Optional: Add a sample row
INSERT INTO livestream (youtube_url, is_active)
VALUES ('https://www.youtube.com/watch?v=YOUR_VIDEO_ID', false);
```

### If the `livestream` table already exists but doesn't have the `is_active` field:

```sql
-- Add the is_active column
ALTER TABLE livestream
ADD COLUMN is_active BOOLEAN DEFAULT FALSE;
```

## Using the Table

To update the livestream status:

1. Go to Supabase Table Editor
2. Find your `livestream` table
3. Edit the record to:
   - Add the YouTube URL when a livestream is scheduled
   - Set `is_active` to `true` when the livestream starts
   - Set `is_active` to `false` when the livestream ends

## Testing Notifications

Once set up:

1. Visit your website
2. Click the "Get Notifications" button in the livestream section
3. Accept the browser notification permission
4. In Supabase, set the `is_active` field to `true`
5. Wait for up to 5 minutes (the checking interval)
6. You should receive a notification about the active livestream

## Troubleshooting

- Make sure your browser supports notifications
- Ensure you've granted notification permissions
- Check browser console for any errors
- Verify that the `livestream` table has the correct structure
- Make sure the `is_active` field is set to `true` when testing 