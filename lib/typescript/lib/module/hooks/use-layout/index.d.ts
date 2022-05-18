export default useLayout;
declare function useLayout(defaultHeight: any): ({
    height: any;
    width: number;
    measured: boolean;
} | ((e: any) => void))[];
