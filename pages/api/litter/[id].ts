import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';

// DELETE /api/post/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req });

    if (session) {
        const postId = req.query.id;
        if (req.method === 'DELETE') {
            const post = await prisma.post.delete({
                where: { id: Number(postId) }
            });
            res.json(post);
        } else {
            throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
        }
    } else {
        res.status(403);
        res.end();
    }
}
