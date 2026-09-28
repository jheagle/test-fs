/**
 * Log out an object in a nicely formatted way.
 * @param object - The object (or any value) to log.
 * @param label - A label printed alongside the object, to identify this log call.
 * @param outputType - Which console method to use ('debug'|'error'|'log'|'warn'), or 'string' to
 * return a formatted string instead of logging.
 * @param forceOutputType - If true, use specified output regardless of environment.
 * @returns The formatted string when outputType is 'string' (or forced to it); otherwise
 * undefined, since the object is logged directly to the console.
 */
export declare const logObject: (object: any, label?: string, outputType?: "debug" | "error" | "log" | "string" | "warn", forceOutputType?: boolean) => string | void;
