import React from 'react';
import { getProviders, signIn } from 'next-auth/client';
import Link from 'next/link';
import { ReactElement } from 'react-markdown';
import { Provider } from 'next-auth/providers';

type Providers = {
    providers: Provider;
};

export default function SignIn({ providers }: Providers): ReactElement {
    return (
        <div className="flex flex-col justify-center min-h-screen bg-charcoal sm:py-12">
            <div className="p-10 mx-auto xs:p-0 md:w-full md:max-w-md">
                <h1 className="mb-5 text-4xl font-bold text-center text-white">
                    Orphan Kitten Rescue
                </h1>

                <div className="p-5">
                    <div className="grid grid-cols-1 gap-4">
                        {Object.values(providers).map((provider) => (
                            <div key={provider.name}>
                                <button
                                    type="button"
                                    className="transition duration-200 bg-gainsboro hover:bg-pastel-pink focus:bg-pastel-pink text-black w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                                    onClick={() => signIn(provider.id)}>
                                    Sign in with {provider.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="py-5">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="text-center sm:text-left whitespace-nowrap">
                            <Link href="/">
                                <button className="px-5 py-4 mx-5 text-sm font-normal text-black transition duration-200 rounded-lg cursor-pointer hover:bg-gainsboro focus:outline-none focus:bg-gainsboro">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="inline-block w-4 h-4 align-text-top">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
                                    <span className="inline-block ml-1">Back to home page</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    const providers = await getProviders();
    return {
        props: { providers }
    };
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async () => {
  return {
    providers: await getProviders()
  }
}
*/
