import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { startWeight, finalWeight, selectedKitten, selectedTime } = req.body;

    const session = await getSession({ req });

    if (req.method === 'GET') {
        const kittens = await prisma.kitten.findMany({
            select: {
                name: true,
                id: true,
                datapoints: true
            },
            orderBy: {
                id: 'asc'
            }
        });
        res.json(kittens);
    } else if (req.method === 'POST') {
        if (session) {
            const result = await prisma.kittenDataPoint.create({
                data: {
                    startWeight: startWeight,
                    finalWeight: finalWeight,
                    kitten: { connect: { id: selectedKitten?.value } },
                    time: selectedTime
                }
            });
            res.json(result);
        } else {
            res.status(403);
            res.end();
        }
    } else {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
}
