export * from './evaluate/countMatches';
export * from './filesystem/fileExists';
export declare const evaluate: {
    countMatches: (content: string, search: string) => number;
    fileExists: (filePath: string) => boolean;
};
export declare const evaluateBrowser: {
    countMatches: (content: string, search: string) => number;
};
