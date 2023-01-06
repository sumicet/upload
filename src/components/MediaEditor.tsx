import { DetailedHTMLProps, ImgHTMLAttributes, useRef } from 'react';

export function MediaEditor(
    props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { src } = props;

    const handleLoad = () => {
        console.log('loaded');
        if (!src) return;

        const img = new Image();
        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 1000, 0);
        };
        img.src = src;
    };

    console.log(canvasRef?.current);

    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Hide the canvas */}
            <canvas
                ref={canvasRef}
                style={{ position: 'absolute', pointerEvents: 'none', opacity: 0 }}
            />
            <img {...props} src={canvasRef?.current?.toDataURL()} onLoad={handleLoad} />
        </div>
    );
}
