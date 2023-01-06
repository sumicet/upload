import { DetailedHTMLProps, DragEvent, HTMLAttributes, useContext } from 'react';
import { UploadContext } from './Upload';

export function UploadTrigger(
    props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
    const { inputNode } = useContext(UploadContext);

    const handleClick = () => inputNode?.click();

    const handleBlur = () => inputNode?.blur();

    const handleFocus = () => inputNode?.focus();

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        console.log('DRAG');
        inputNode?.ondrop?.(event);
        event.preventDefault();
    };

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
        console.log('DRAG ENTER');
        inputNode?.ondragenter?.(event);
        event.preventDefault();
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        console.log('DRAG END');
        inputNode?.ondragover?.(event);
        event.preventDefault();
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        console.log('DRAG LEAVE');
        inputNode?.ondragleave?.(event);
        event.preventDefault();
    };

    return (
        <div
            {...props}
            onClick={handleClick}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        />
    );
}
