import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../lib/prisma';
import ErrorMessage from '../components/ErrorMessage';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 403;
        return { props: { drafts: [] } };
    }

    const drafts = await prisma.post.findMany({
        where: {
            author: { email: session.user.email },
            published: false
        },
        include: {
            author: {
                select: { name: true }
            }
        }
    });
    return {
        props: { drafts }
    };
};

type Props = {
    drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
    const [session] = useSession();

    if (!session) {
        return <ErrorMessage></ErrorMessage>;
    }

    return (
        <Layout pageTitle="Les Petits Chatons - Drafts">
            {' '}
            <div className="pt-24">
                {props.drafts.map((post) => (
                    <div key={post.id} className="post">
                        <Post post={post} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Drafts;
