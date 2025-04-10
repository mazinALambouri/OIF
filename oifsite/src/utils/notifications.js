// Notification utilities for livestream functionality
import OmanLogo from '../assets/img/Oman.png';

// Singleton instance to ensure only one notification system runs across the app
let notificationIntervalId = null;
let isSetupInProgress = false;

/**
 * Check if notification permission is already granted
 * @returns {boolean} True if notifications are enabled
 */
export const checkNotificationPermission = () => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return false;
  }
  
  return Notification.permission === 'granted';
};

/**
 * Request notification permission from user
 * @returns {Promise<boolean>} True if permission granted
 */
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return false;
  }
  
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Check livestream status and send notification if live
 */
export const checkAndNotifyLivestream = async () => {
  try {
    // Get Supabase client from the app
    const { supabase } = await import('../supabaseClient');
    
    // Fetch livestream data from Supabase
    const { data, error } = await supabase
      .from('livestream')
      .select('*')
      .single();
      
    if (error) throw error;
    
    // Get previous livestream status from localStorage
    const previousStatus = localStorage.getItem('livestreamStatus') || 'inactive';
    
    // Determine if the stream is currently active based on is_live flag
    const currentStatus = data && data.is_live === true ? 'active' : 'inactive';
    
    // If stream just went live (was inactive before but active now)
    if (previousStatus === 'inactive' && currentStatus === 'active') {
      new Notification('Livestream Started', {
        body: 'Our event livestream has started. Click to watch now!',
        icon: OmanLogo
      });
    }
    
    // Update status in localStorage
    localStorage.setItem('livestreamStatus', currentStatus);
    
  } catch (error) {
    console.error('Error checking livestream status:', error);
  }
};

/**
 * Setup periodic checks for livestream status
 * @returns {boolean} True if setup was successful
 */
export const setupLivestreamNotifications = () => {
  // Don't proceed if setup is already in progress
  if (isSetupInProgress) {
    return false;
  }

  // Don't proceed if interval is already set
  if (notificationIntervalId !== null) {
    return true;
  }
  
  // Don't proceed if notifications aren't permitted
  if (!checkNotificationPermission()) {
    return false;
  }
  
  try {
    isSetupInProgress = true;
    
    // Check immediately
    checkAndNotifyLivestream();
    
    // Then check every 5 minutes
    notificationIntervalId = setInterval(checkAndNotifyLivestream, 5 * 60 * 1000);
    
    isSetupInProgress = false;
    return true;
  } catch (error) {
    console.error("Error setting up notifications:", error);
    isSetupInProgress = false;
    return false;
  }
};

/**
 * Clean up notification interval
 */
export const cleanupLivestreamNotifications = () => {
  if (notificationIntervalId !== null) {
    clearInterval(notificationIntervalId);
    notificationIntervalId = null;
  }
};

/**
 * Check if notifications are currently active
 * @returns {boolean} True if notifications are active
 */
export const isNotificationsActive = () => {
  return notificationIntervalId !== null;
}; 