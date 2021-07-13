import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { startWeight, finalWeight, kitten, time } = req.body;

    const session = await getSession({ req });

    if (session) {
        const result = await prisma.kittenDataPoint.create({
            data: {
                startWeight: startWeight,
                finalWeight: finalWeight,
                kitten: { connect: { id: kitten?.value } },
                time: time
            }
        });
        res.json(result);
    } else {
        res.status(403);
        res.end();
    }
}
