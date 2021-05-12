import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
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
        }
    });
    return {
        props: { feed }
    };
};

const Index: React.FC = () => {
    return (
        <Layout>
            <div className="page">
                <p className="text-4xl font-bold">Kitten App</p>
                <main></main>
            </div>
            <style jsx>{`
                .post {
                    background: white;
                    transition: box-shadow 0.1s ease-in;
                }

                .post:hover {
                    box-shadow: 1px 1px 3px #aaa;
                }

                .post + .post {
                    margin-top: 2rem;
                }
            `}</style>
        </Layout>
    );
};

export default Index;
