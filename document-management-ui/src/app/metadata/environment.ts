export const environment = {
    apiBaseUrl: 'https://sticky-jaine-vikas25019-206460d0.koyeb.app',
    socketUrl: 'http://localhost:8080',
    endpoints: {
        user: {
            base:'/user',
            profile: '/user/profile',
            delete: '/user/delete'
        },
        auth: {
            login: '/auth/login',
            signup: '/auth/signup',
            validateToken: '/auth/validate-token'
        },
        document: {
            base: '/document',
            delete: '/document/delete',
        },
        upload: {
           base: '/upload'
        }
    },
};
