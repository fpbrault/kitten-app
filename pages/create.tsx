import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Router from 'next/router';
import Select from 'react-select';
import { KittenProps } from '../components/Kitten';
import prisma from '../lib/prisma';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

export const getServerSideProps: GetServerSideProps = async () => {
    const kittens = await prisma.kitten.findMany({
        select: {
            name: true,
            id: true
        }
    });
    return {
        props: { kittens }
    };
};

type Props = {
    kittens: KittenProps[];
};

const Draft: React.FC<Props> = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');
    const [kitten, setKitten] = useState('');
    const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = { title, content, type, kitten, image };
            await fetch(`/api/post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            await Router.push('/drafts');
        } catch (error) {
            console.error(error);
        }
    };

    const typeOptions = [
        { value: 'blog', label: 'Blog Post' },
        { value: 'kitten', label: 'Kitten Post' }
    ];

    const kittenOptions = props.kittens.map((x) => ({ value: x.id, label: x.name }));
    console.log(kittenOptions);
    return (
        <Layout>
            <div className="max-w-4xl p-8 m-auto">
                <form onSubmit={submitData}>
                    {JSON.stringify(type == 'kitten')}
                    <h1>New Draft</h1>
                    <input
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        type="text"
                        value={title}
                    />
                    <Select
                        onChange={(e) => setType(e)}
                        defaultValue={typeOptions[1]}
                        placeholder="Post Type"
                        options={typeOptions}
                        value={type}
                    />

                    <Select
                        className="pt-3"
                        onChange={(e) => setKitten(e)}
                        defaultValue={kittenOptions[1]}
                        placeholder="Kitten Name"
                        options={kittenOptions}
                        value={kitten}
                    />
                    <input
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Image"
                        type="text"
                        value={image}
                    />
                    <ReactMde
                        value={content}
                        onChange={setContent}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={(markdown) =>
                            Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
                        }
                        childProps={{
                            writeButton: {
                                tabIndex: -1
                            }
                        }}
                    />
                    <input disabled={!content || !title} type="submit" value="Create" />
                    <a className="back" href="#" onClick={() => Router.push('/')}>
                        or Cancel
                    </a>
                </form>
            </div>
            <style jsx>{`
                .page {
                    background: white;
                    padding: 3rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                input[type='text'],
                textarea {
                    width: 100%;
                    padding: 0.5rem;
                    margin: 0.5rem 0;
                    border-radius: 0.25rem;
                    border: 0.125rem solid rgba(0, 0, 0, 0.2);
                }

                .mde-preview {
                    background: white;
                }
                input[type='submit'] {
                    background: #ececec;
                    border: 0;
                    padding: 1rem 2rem;
                }

                .back {
                    margin-left: 1rem;
                }
            `}</style>
        </Layout>
    );
};

export default Draft;
