import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
//import CustomLink from '../components/CustomLink';
import Layout from '../components/Layout';
import { postFilePaths, POSTS_PATH } from '../lib/mdxUtils';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
    //a: CustomLink,
    // It also works with dynamically-imported components, which is especially
    // useful for conditionally loading components for certain routes.
    // See the notes in README.md for more details.
    //TestComponent: dynamic(() => import('../components/TestComponent')),
    Head
};

export default function PostPage({ source, frontMatter }) {
    return (
        <Layout pageTitle={'Les Petits Chatons - ' + frontMatter.title}>
            <div className="min-h-screen hero bg-base-200">
                <div className="flex flex-col items-center py-16 mt-16 text-center lg:pb-16 hero-content lg:flex-row-reverse lg:text-left">
                    {/*                     <img
                        src="https://i.imgur.com/VKnq1Ak.png"
                        alt="hero-image"
                        className="max-w-xs rounded-lg shadow-2xl md:max-w-md"
                    /> */}

                    <div className="max-w-lg">
                        {/* <h1 className="mb-5 text-5xl font-bold text-center">{frontMatter.title}</h1> */}
                        {frontMatter.description ? (
                            <p className="description">{frontMatter.description}</p>
                        ) : null}
                        <p className="mb-5">
                            <div className="prose-sm prose text-center sm:prose lg:prose-lg">
                                <MDXRemote {...source} components={components} />
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps = async ({ params }) => {
    const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
    const source = fs.readFileSync(postFilePath);

    const { content, data } = matter(source);

    const mdxSource = await serialize(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: []
        },
        scope: data
    });

    return {
        props: {
            source: mdxSource,
            frontMatter: data
        }
    };
};

export const getStaticPaths = async () => {
    const paths = postFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }));

    return {
        paths,
        fallback: false
    };
};
