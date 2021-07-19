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
import { useSession } from 'next-auth/client';
import ImageUpload from '../components/Uploader';
import HeartsLoader from '../components/HeartsLoader';

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
    const [session] = useSession();

    if (!session) {
        return (
            <Layout>
                <div className="max-w-4xl p-8 m-auto mt-24">
                    <div>You need to be authenticated to view this page.</div>
                </div>
            </Layout>
        );
    }
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');
    const [kitten, setKitten] = useState('');
    let [uploaderVisible, setUploaderVisible] = useState(false);
    let [loading, setLoading] = useState(false);
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

    const changeImageUrl = (url: string): void => {
        setImage(url);
    };

    const kittenOptions = props.kittens.map((x) => ({ value: x.id, label: x.name }));
    return (
        <Layout>
            <div className="max-w-4xl p-8 m-auto mt-24">
                <form onSubmit={submitData}>
                    <div className="text-2xl font-bold text-blue-700">New Draft</div>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        type="text"
                        value={title}
                        id="title"
                    />
                    <Select
                        onChange={(e) => setType(e)}
                        defaultValue={typeOptions[1]}
                        placeholder="Post Type"
                        options={typeOptions}
                        value={type}
                    />
                    {type['value'] == 'kitten' ? (
                        <Select
                            className="pt-3"
                            onChange={(e) => setKitten(e)}
                            defaultValue={kittenOptions[1]}
                            placeholder="Kitten Name"
                            options={kittenOptions}
                            value={kitten}
                        />
                    ) : null}

                    <input
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Image"
                        type="text"
                        value={image}
                    />
                    <input
                        className="font-thin text-black transition-colors bg-transparent hover:text-blue-700"
                        type="button"
                        value="Upload an image?"
                        onClick={() => setUploaderVisible(true)}
                    />
                    {uploaderVisible ? (
                        <>
                            <div className="max-w-4xl py-2 m-auto">
                                <ImageUpload changeImageUrl={changeImageUrl} />
                            </div>
                        </>
                    ) : null}
                    <div className="py-4">
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
                    </div>
                    {loading ? (
                        <HeartsLoader />
                    ) : (
                        <div className="btn-group">
                            <input
                                disabled={!content || !title}
                                className="btn btn-primary"
                                type="submit"
                                value="Create"
                            />
                            <a className="btn" href="#" onClick={() => Router.push('/')}>
                                or Cancel
                            </a>{' '}
                        </div>
                    )}
                </form>
            </div>
        </Layout>
    );
};

export default Draft;
