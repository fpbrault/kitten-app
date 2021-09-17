import React, { ReactNode } from 'react';
import Header from './Header';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/cat.png';
import Head from 'next/head';

type Props = {
    children: ReactNode;
    pageTitle: string;
};

const Layout: React.FC<Props> = (props) => (
    <>
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
            />
            <meta name="description" content="Les Petits Chatons" />
            <meta name="keywords" content="Keywords" />
            <title>{props.pageTitle}</title>

            <meta property="og:url" content="https://lespetitschatons.org/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.pageTitle} key="ogtitle" />
            <meta property="og:description" content="Les Petits Chatons" key="ogdesc" />
            <meta property="og:image" content="https://lespetitschatons.org/cat.png" />
            <meta property="twitter:domain" content="lespetitschatons.org" />
            <meta property="twitter:url" content="https://lespetitschatons.org/" />
            <meta name="twitter:image" content="https://lespetitschatons.org/cat.png" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={props.pageTitle} />
            <meta name="twitter:description" content="Les Petits Chatons" />

            <link rel="manifest" href="/manifest.json" />
            <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
            <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/apple-icon.png"></link>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <meta name="theme-color" content="#317EFB" />
            <link
                href="https://cdn.jsdelivr.net/npm/daisyui@1.10.0/dist/themes.css"
                rel="stylesheet"
                type="text/css"
            />
        </Head>
        <div data-theme="cupcake" className="flex flex-col text-neutral bg-base-200">
            <Header />
            <div className="min-h-screen pt-0">{props.children}</div>

            <footer className="flex flex-col items-center content-center justify-center p-10 text-center footer bg-primary text-primary-content footer-center">
                <div>
                    <Link href="/">
                        <a>
                            <Image src={logo} width={50} height={50} />
                        </a>
                    </Link>
                    <p className="font-bold">Les Petits Chatons</p>
                    <p>© 2021 - Tout Droits Reservés</p>
                </div>
                <div>
                    <div className="grid grid-flow-col gap-4 pt-2">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.instagram.com/lespetitschatonsqc/">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="transition-colors fill-current hover:text-secondary"
                                viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                            </svg>
                        </a>
                        {/*  <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a> */}

                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.facebook.com/lespetitschatonsqc">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="transition-colors fill-current hover:text-secondary"
                                viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    </>
);

export default Layout;
