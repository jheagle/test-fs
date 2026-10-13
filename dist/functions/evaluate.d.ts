export * from './evaluate/countMatches';
export * from './filesystem/fileExists';
export declare let evaluate: {
    countMatches: (content: string, search: string) => number;
    fileExists: (filePath: string) => boolean;
};
export declare let evaluateBrowser: {
    countMatches: (content: string, search: string) => number;
};
