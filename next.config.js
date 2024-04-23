module.exports = {
    images: {
        domains: ['vignette1.wikia.nocookie.net', 'unsplash.com', "via.placeholder.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
                port: '',
                pathname: '/*',
            },
            {
                protocol: 'http',
                hostname: 'vignette1.wikia.nocookie.net',
                port: '',
                pathname: '/*',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/*',
            },
            {
                protocol: 'https',
                hostname: 'unsplash.com',
                port: '',
                pathname: '*',
            },
        ],
       
    },
}