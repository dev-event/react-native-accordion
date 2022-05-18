declare function _exports(api: any): {
    presets: string[];
    plugins: (string | (string | {
        extensions: string[];
        alias: {
            [x: string]: string;
        };
    })[])[];
};
export = _exports;
