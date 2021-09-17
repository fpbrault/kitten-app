import React from 'react';
import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
    const feed = await prisma.post.findMany({
        where: {
            published: true
        },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
    return {
        props: { feed }
    };
};

type Props = {
    feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
    return (
        <Layout pageTitle="Les Petits Chatons - Blog">
            <div className="pt-24 mx-4 bg-base-200">
                {props.feed.map((post) => (
                    <div key={post.id} className="post">
                        <Post post={post} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Blog;
