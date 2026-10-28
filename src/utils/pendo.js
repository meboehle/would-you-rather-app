// Sends a Pendo Track Event if the Pendo agent is loaded.
// Tracking failures must never break the app flow.
export function trackEvent (name, properties) {
  try {
    if (window.pendo && typeof window.pendo.track === 'function') {
      window.pendo.track(name, properties)
    }
  } catch (e) {
    // Ignore tracking errors
  }
}
