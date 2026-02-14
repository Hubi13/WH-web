/**
 * Environment Configuration
 * Centralizes access to environment variables to ensure type safety
 * and prevent accidental exposure of secrets.
 */

interface EnvConfig {
  API_URL: string;
  MODE: string;
  IS_DEV: boolean;
}

const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // @ts-ignore: Vite specific env access
  const value = import.meta.env[key];
  return value !== undefined ? String(value) : defaultValue;
};

export const config: EnvConfig = {
  // @ts-ignore
  API_URL: getEnvVar('VITE_API_URL'),
  // @ts-ignore
  MODE: getEnvVar('MODE', 'production'),
  // @ts-ignore
  IS_DEV: getEnvVar('DEV', 'false') === 'true',
};

/**
 * Validates that no sensitive keys are accidentally exposed.
 * Run this during app initialization if needed.
 */
export const validateEnv = () => {
  // @ts-ignore: Vite specific env access
  const unsafeKeys = Object.keys(import.meta.env || {}).filter(key => 
    key.startsWith('SECRET_') || key.startsWith('PRIVATE_')
  );
  
  if (unsafeKeys.length > 0) {
    console.warn('Security Warning: Potential secrets exposed in client bundle:', unsafeKeys);
  }
};