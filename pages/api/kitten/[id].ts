import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    //const { startWeight, finalWeight, selectedKitten, selectedTime } = req.body;

    const session = await getSession({ req });

    const kittenId = req.query.id;

    const { kittenName, kittenDescription, kittenLitter, image, kittenBirthday } = req.body;

    if (req.method === 'GET') {
        const kitten = await prisma.kitten.findUnique({
            where: { id: Number(kittenId) }
        });
        const litters = await prisma.litter.findMany({
            select: {
                name: true,
                id: true
            }
        });
        res.json({ litters: litters, kitten: kitten });
    } else if (req.method === 'PUT') {
        if (session) {
            const result = await prisma.kitten.update({
                where: { id: Number(kittenId) },
                data: {
                    name: kittenName,
                    content: kittenDescription,
                    litter: { connect: { id: kittenLitter?.value } },
                    image: image,
                    birthdate: kittenBirthday
                }
            });
            res.status(200);
            res.json(result);
        } else {
            res.status(403);
            res.end();
        }
    } else {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
}
