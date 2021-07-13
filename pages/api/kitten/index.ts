import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';

// POST /api/kitten
// Required fields in body: name
// Optional fields in body: litter
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { name, litter } = req.body;

    const session = await getSession({ req });
    if (session) {
        const result = await prisma.kitten.create({
            data: {
                name: name,
                litter: { connect: { name: litter } }
            }
        });
        res.json(result);
    } else {
        res.status(403);
        res.end();
    }
}
