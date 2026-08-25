/* Simple structured console logger with timestamps and icons */
export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`[${new Date().toISOString()}] ℹ️  INFO: ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[${new Date().toISOString()}] ✅ SUCCESS: ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[${new Date().toISOString()}] ⚠️  WARN: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[${new Date().toISOString()}] ❌ ERROR: ${message}`, ...args);
  },
};
