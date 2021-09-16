import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { litterName, litterDescription } = req.body;

    const session = await getSession({ req });
    if (req.method === 'POST') {
        if (session) {
            const result = await prisma.litter.create({
                data: {
                    name: litterName,
                    description: litterDescription
                }
            });
            res.status(200);
            res.json(result);
        } else {
            res.status(403);
            res.statusMessage = 'Access Denied';
            res.end();
        }
    } else {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
}
