import type { LayoutChangeEvent } from 'react-native';
declare const useLayout: (defaultHeight?: number) => readonly [{
    height: number;
    width: number;
    measured: boolean;
}, (e: LayoutChangeEvent) => void];
export default useLayout;
