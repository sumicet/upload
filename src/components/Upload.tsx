import {
    createContext,
    DetailedHTMLProps,
    InputHTMLAttributes,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

export const UploadContext = createContext<{
    inputNode: HTMLInputElement | null;
}>({
    inputNode: null,
});

export function Upload({
    children,
    ...rest
}: {
    children: ReactNode;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputNode, setInputNode] = useState<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!inputRef?.current) return;
        setInputNode(inputRef.current);
    }, []);

    const providerValue = useMemo(() => ({ inputNode }), [inputNode]);

    return (
        <UploadContext.Provider value={providerValue}>
            <div style={{ position: 'relative' }}>
                <input
                    {...rest}
                    ref={inputRef}
                    type='file'
                    style={{
                        ...rest?.style,
                        position: 'absolute',
                        zIndex: 1,
                        pointerEvents: 'none',
                        height: 0,
                        width: 0,
                    }}
                />
                {children}
            </div>
        </UploadContext.Provider>
    );
}
