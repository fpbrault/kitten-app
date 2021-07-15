import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';

// DELETE /api/kittenDataPost/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req });

    if (session) {
        const kittenDataPointId = req.query.id;
        if (req.method === 'DELETE') {
            const kittenDataPoint = await prisma.kittenDataPoint.delete({
                where: { id: Number(kittenDataPointId) }
            });
            res.json(kittenDataPoint);
        } else {
            throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
        }
    } else {
        res.status(403);
        res.end();
    }
}
