export * from './debugging/logObject';
export declare const debugging: {
    logObject: (object: any, label?: string, outputType?: "debug" | "error" | "log" | "string" | "warn", forceOutputType?: boolean) => string | void;
};
export declare const debuggingBrowser: {
    logObject: (object: any, label?: string, outputType?: "debug" | "error" | "log" | "string" | "warn", forceOutputType?: boolean) => string | void;
};
