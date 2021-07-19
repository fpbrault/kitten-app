import React from 'react';
import AwsS3 from '@uppy/aws-s3';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import ImageEditor from '@uppy/image-editor';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/image-editor/dist/style.css';
import { Props } from 'react';

const ImageUpload: React.FC<Props> = (props) => {
    const uppy = Uppy<Uppy.StrictTypes>({
        autoProceed: false,
        allowMultipleUploads: false,
        debug: true,
        restrictions: {
            maxNumberOfFiles: 1,
            minNumberOfFiles: 1,
            allowedFileTypes: ['image/*', '.jpg', '.jpeg', '.png', '.gif']
        },
        infoTimeout: 5000
    }).use(AwsS3, {
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
    });

    uppy.on('upload-success', (file, data) => {
        props.setImage(data.uploadURL);
    });

    uppy.use(ImageEditor, {
        id: 'ImageEditor',
        quality: 0.8,
        cropperOptions: {
            viewMode: 1,
            background: false,
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
    });

    uppy.on('complete', (result) => {
        console.log('Upload complete! We’ve uploaded these files:', result.successful);
    });
    return (
        <>
            <Dashboard
                uppy={uppy}
                width={1000}
                height={500}
                theme={'light'}
                plugins={['ImageEditor']}
            />
        </>
    );
};

export default ImageUpload;
