import { Button, Center, HStack, Image, Square, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Upload, MediaEditor, UploadTrigger } from './components';

const readURL = (file: File): Promise<string | undefined> => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = e => res(e.target?.result as string | undefined);
        reader.onerror = e => rej(e);
        reader.readAsDataURL(file);
    });
};

function App() {
    const [image, setImage] = useState<string | null>(null);

    return (
        <Center bgColor='#242424' color='white' boxSize='100%'>
            <Upload
                onChange={async event => {
                    const file = event.target.files?.[0];
                    if (!file) return;

                    const url = await readURL(file);
                    if (!url) return;
                    setImage(url);
                }}
            >
                <HStack spacing={20}>
                    <UploadTrigger>
                        <Button variant='solid' color='black' onClick={() => console.log('CLICK')}>
                            Upload
                        </Button>
                    </UploadTrigger>

                    <UploadTrigger>
                        <Square
                            size={300}
                            bgColor='#313131'
                            borderRadius={10}
                            cursor='pointer'
                            overflow='hidden'
                        >
                            {image ? <Image src={image || ''} /> : <Text>Drop image here</Text>}
                        </Square>
                    </UploadTrigger>
                </HStack>
            </Upload>

            {image && <MediaEditor src={image} />}
        </Center>
    );
}

export default App;
