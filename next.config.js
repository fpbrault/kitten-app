/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

if (process.env.DISABLE_PWA == 'TRUE') {
    module.exports = {
        eslint: {
            // Warning: Dangerously allow production builds to successfully complete even if
            // your project has ESLint errors.
            ignoreDuringBuilds: true
        }
    };
} else {
    module.exports = withPWA({
        pwa: {
            dest: 'public',
            runtimeCaching
        },
        eslint: {
            // Warning: Dangerously allow production builds to successfully complete even if
            // your project has ESLint errors.
            ignoreDuringBuilds: true
        }
    });
}
