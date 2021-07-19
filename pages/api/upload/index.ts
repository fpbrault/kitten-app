import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import aws from 'aws-sdk';

// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    aws.config.update({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        region: process.env.REGION,
        signatureVersion: 'v4'
    });

    const session = await getSession({ req });

    if (!session) {
        const s3 = new aws.S3();
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${Date.now().toString()}-${req.body.filename}`,
            ContentType: req.body.contentType
        };

        s3.getSignedUrl('putObject', params, (err, url) => {
            res.status(200).json({
                method: 'put',
                url,
                fields: {}
            });
            res.end();
        });
    } else {
        res.status(403);
        res.end();
    }
}
