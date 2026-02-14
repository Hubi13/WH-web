/**
 * Security Utilities
 * Implements input sanitization, validation, and client-side rate limiting.
 */

// Allow Unicode letters (\p{L}), numbers (\p{N}), and safe punctuation.
// Removes potential XSS vectors and control characters.
export const sanitizeString = (str: string, maxLength: number = 255): string => {
  if (!str) return '';
  try {
    // Modern browsers: support Unicode property escapes
    return str.replace(/[^\p{L}\p{N}@.\s\-_]/gu, '').slice(0, maxLength);
  } catch (e) {
    // Fallback for older environments
    return str.replace(/[^a-zA-Z0-9@.\s\-_ąćęłńóśźżĄĆĘŁŃÓŚŹŻáéíóúÁÉÍÓÚñÑ]/g, '').slice(0, maxLength);
  }
};

export const validateEmail = (email: string): boolean => {
  // Strict email regex enforcing standard format
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email) && email.length <= 254;
};

export const debounce = (func: Function, wait: number) => {
  let timeout: any;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Client-side Rate Limiter with Persistence
 * Uses LocalStorage to enforce limits across page reloads.
 */
class RateLimiter {
  private storageKey: string;

  constructor(storageKey = 'rhome_security_limit') {
    this.storageKey = storageKey;
  }

  private getRecord(key: string): number[] {
    try {
      const data = localStorage.getItem(`${this.storageKey}_${key}`);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private setRecord(key: string, timestamps: number[]) {
    try {
      localStorage.setItem(`${this.storageKey}_${key}`, JSON.stringify(timestamps));
    } catch {
      // Fail silently if storage is blocked
    }
  }

  /**
   * Checks if an action is allowed based on rate limits.
   * @param key Unique identifier for the action (e.g., 'newsletter_submit')
   * @param limit Max allowed attempts
   * @param windowMs Time window in milliseconds
   */
  isAllowed(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    let timestamps = this.getRecord(key);
    
    // Filter out timestamps older than the window
    timestamps = timestamps.filter(timestamp => now - timestamp < windowMs);
    
    if (timestamps.length >= limit) {
      // Update record to prune old entries even if blocked
      this.setRecord(key, timestamps);
      return false;
    }
    
    timestamps.push(now);
    this.setRecord(key, timestamps);
    return true;
  }
}

export const globalRateLimiter = new RateLimiter();
