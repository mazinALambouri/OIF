import ReactGA from 'react-ga4';

// Initialize Google Analytics with your measurement ID
export const initGA = (measurementId) => {
  if (typeof window !== 'undefined') {
    ReactGA.initialize(measurementId);
  }
};

// Track page views
export const logPageView = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname + window.location.search;
    ReactGA.send({ hitType: 'pageview', page: path });
    console.log(`Logging pageview for ${path}`);
  }
};

// Track events
export const logEvent = (category, action, label, value) => {
  if (typeof window !== 'undefined') {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
    console.log(`Logging event: ${category}, ${action}, ${label}, ${value}`);
  }
};

// Track exceptions
export const logException = (description, fatal = false) => {
  if (typeof window !== 'undefined') {
    ReactGA.exception({
      description,
      fatal
    });
    console.log(`Logging exception: ${description}, fatal: ${fatal}`);
  }
}; 