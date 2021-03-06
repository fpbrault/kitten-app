import React from 'react';
import AwsS3 from '@uppy/aws-s3';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import ImageEditor from '@uppy/image-editor';
import Webcam from '@uppy/webcam';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/image-editor/dist/style.css';
import ImageCompressor from 'uppy-plugin-image-compressor';
import '@uppy/webcam/dist/style.css';
interface ChildProps {
    changeImageUrl: (url: string) => void;
}

const ImageUpload: React.FC<ChildProps> = ({ changeImageUrl }) => {
    const uppy = Uppy<Uppy.StrictTypes>({
        autoProceed: false,
        allowMultipleUploads: true,
        debug: false,
        restrictions: {
            maxNumberOfFiles: 1,
            minNumberOfFiles: 1,
            allowedFileTypes: ['image/*', '.jpg', '.jpeg', '.png', '.gif', '.zip']
        },
        infoTimeout: 5000
    })
        .use(ImageCompressor, {
            // Options from Compressor.js https://github.com/fengyuanchen/compressorjs#options, just don’t set `success` or `error`
        })
        .use(AwsS3, {
            limit: 1,
            getUploadParameters(file) {
                // Send a request to our PHP signing endpoint.
                return fetch('/api/upload', {
                    method: 'post',
                    // Send and receive JSON.
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        filename: file.name,
                        contentType: file.type
                    })
                })
                    .then((response) => {
                        // Parse the JSON response.
                        return response.json();
                    })
                    .then((data) => {
                        // Return an object in the correct shape.
                        return {
                            method: data.method,
                            url: data.url,
                            fields: data.fields,
                            // Provide content type header required by S3
                            headers: {
                                'Content-Type': file.type
                            }
                        };
                    });
            }
        })
        .use(Webcam, {
            modes: ['picture']
        })
        .on('upload-success', (file, data) => {
            changeImageUrl(data.uploadURL);
        })
        .use(ImageEditor, {
            id: 'ImageEditor',
            quality: 0.8,
            cropperOptions: {
                viewMode: 1,
                background: true,
                autoCropArea: 1,
                responsive: true
            },
            actions: {
                revert: true,
                rotate: true,
                granularRotate: true,
                flip: true,
                zoomIn: true,
                zoomOut: true,
                cropSquare: true,
                cropWidescreen: true,
                cropWidescreenVertical: true
            }
        })
        .on('complete', (result) => {
            console.log('Upload complete! We’ve uploaded these files:', result.successful);
        });
    return (
        <>
            <Dashboard
                uppy={uppy}
                width={1000}
                height={500}
                theme={'light'}
                plugins={['ImageEditor', 'Webcam']}
            />
        </>
    );
};

export default ImageUpload;
