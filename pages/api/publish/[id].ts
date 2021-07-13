import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';

// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req });

    if (session) {
        const postId = req.query.id;
        const post = await prisma.post.update({
            where: { id: Number(postId) },
            data: { published: true }
        });
        res.json(post);
    } else {
        res.status(403);
        res.end();
    }
}
