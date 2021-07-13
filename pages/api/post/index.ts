import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/client';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { title, content, type, kitten, image } = req.body;

    const session = await getSession({ req });

    if (session) {
        const result =
            kitten !== ''
                ? await prisma.post.create({
                      data: {
                          title: title,
                          content: content,
                          type: type.value,
                          kitten: { connect: { id: kitten?.value } },
                          author: { connect: { email: session?.user?.email } },
                          image: image
                      }
                  })
                : await prisma.post.create({
                      data: {
                          title: title,
                          content: content,
                          type: type.value,
                          author: { connect: { email: session?.user?.email } },
                          image: image
                      }
                  });
        res.json(result);
    } else {
        res.status(403);
        res.end();
    }
}
