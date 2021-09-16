import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import prisma from '../../../lib/prisma';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
    // https://next-auth.js.org/configuration/providers
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    adapter: Adapters.Prisma.Adapter({ prisma }),
    secret: process.env.SECRET,

    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {
        signIn: async (user, account, profile) => {
            console.log(profile.email);
            console.log(profile.email === 'fpbrault@gmail.com');
            if (
                (account.provider === 'github' && profile.login === 'fpbrault') ||
                profile.email === 'fpbrault@gmail.com' ||
                profile.email === 'kathryn.grce@gmail.com'
            ) {
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        },
        async jwt(token, user) {
            // Add access_token to the token right after signin

            if (user?.role) {
                token.role = user.role;
            }
            return token;
        },

        /*         async session(session, token) {
            if (token.role == 'admin') {
                session.user.role = 'admin';
            } else if (token.role == 'editor') {
                session.user.role = 'editor';
            } else {
                session.user.role = 'user';
            }
            if (!session || !session.user) {
                return Promise.resolve(session);
            }
            return Promise.resolve(session);
        }, */

        /**
         * @param  {string} url      URL provided as callback URL by the client
         * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
         * @return {string}          URL the client will be redirect to
         */
        redirect: async () => {
            return process.env.NEXTAUTH_URL;
        }
    }
});
