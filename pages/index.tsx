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
        </Layout>
    );
};

export default Index;
