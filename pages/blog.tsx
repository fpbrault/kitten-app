import React from 'react';
import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
    const feed = await prisma.post.findMany({
        where: {
            published: true,
            type: 'blog'
        },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
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
        <Layout>
            <div className="overflow-auto bg-gray-100 h-95vh ">
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
