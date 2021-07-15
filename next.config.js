const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

if (process.env.DISABLE_PWA == 'TRUE') {
    module.exports = {
        images: {
            domains: ['pyxis.nymag.com']
        }
    };
} else {
    module.exports = withPWA({
        pwa: {
            dest: 'public',
            runtimeCaching
        }
    });
}
