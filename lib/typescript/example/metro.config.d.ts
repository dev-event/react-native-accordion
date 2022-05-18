export const projectRoot: string;
export const watchFolders: string[];
export namespace resolver {
    const blacklistRE: any;
    const extraNodeModules: {};
}
export namespace transformer {
    function getTransformOptions(): Promise<{
        transform: {
            experimentalImportSupport: boolean;
            inlineRequires: boolean;
        };
    }>;
}
