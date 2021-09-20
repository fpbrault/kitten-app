import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import MiniPost, { PostProps } from '../components/MiniPost';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
    const feed = await prisma.post.findFirst({
        where: {
            published: true
        },
        orderBy: [
            {
                createdAt: 'desc'
            }
        ],
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
    feed: PostProps;
};

const Blog: React.FC<Props> = (props) => {
    return (
        <Layout pageTitle="Les Petits Chatons">
            <div className="min-h-screen hero bg-base-200">
                <div className="flex flex-col items-center pb-32 text-center lg:pb-0 hero-content lg:flex-row-reverse lg:text-left">
                    {/*                     <img
                        src="https://i.imgur.com/VKnq1Ak.png"
                        alt="hero-image"
                        className="max-w-xs rounded-lg shadow-2xl md:max-w-md"
                    /> */}
                    <div className="pt-24 mx-4 bg-base-200">
                        <div className="post indicator">
                            <div className="indicator-item indicator-center badge badge-secondary">
                                Nouveau!
                            </div>
                            <MiniPost post={props.feed} />
                        </div>
                    </div>
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold">Les Petits Chatons</h1>
                        <p className="mb-5">
                            Les Petits Chatons est un couple dédié à rendre le monde meilleur pour
                            les plus petits chatons! Notre mission est de donner à chaque chaton une
                            chance de s'épanouir et d'avoir une vie bien remplie!
                        </p>
                        <Link href="/about">
                            <button className="mr-2 btn btn-secondary">A propos</button>
                        </Link>
                        <Link href="/blog">
                            <button className="mr-2 btn btn-secondary">Blog</button>
                        </Link>
                        <Link href="/kittens">
                            <button className="mr-2 btn btn-secondary">Nos Chatons</button>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Blog;
