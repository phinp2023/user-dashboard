declare interface Props extends PropsAny {
    children?: React.ReactNode | React.ReactNodeArray;
    key?: string | number | null | undefined;
    className?: string | undefined;
    style?: React.CSSProperties;
    setLoading?: (state: boolean) => void;
    disabled?: boolean;
    onClick?: (event: unknown) => void;
    onContextMenu?: (event: React.MouseEvent<Element, MouseEvent>) => void,
    hidden?: boolean;
}