// ----------------------------------------------------------------------

function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
    register: path(ROOTS_AUTH, '/register'),
    registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    verify: path(ROOTS_AUTH, '/verify'),
    forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
};

export const PATH_PAGE = {
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    pricing: '/pricing',
    payment: '/payment',
    about: '/about-us',
    contact: '/contact-us',
    faqs: '/faqs',
    page404: '/404',
    page500: '/500',
    components: '/components',
    profile: '/profile',
    product: '/product',
    shopcart: '/shopcart',
    productDetail: '/product-detail',
    khoahoc: '/khoahoc'
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,   
    user: {
        root: path(ROOTS_DASHBOARD, '/user'),
        profile: path(ROOTS_DASHBOARD, '/user/profile'),
        cards: path(ROOTS_DASHBOARD, '/user/cards'),
        list: path(ROOTS_DASHBOARD, '/user/list'),
        newUser: path(ROOTS_DASHBOARD, '/user/new'),
        editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
        account: path(ROOTS_DASHBOARD, '/user/account'),
    },
    role: {
        root: path(ROOTS_DASHBOARD, '/role'),
        newRole: path(ROOTS_DASHBOARD, '/role/new'),
    },
    book: {
        root: path(ROOTS_DASHBOARD, '/book'),
        new: path(ROOTS_DASHBOARD, '/book/new'),
    },
    khoahoc: {
        root: path(ROOTS_DASHBOARD, '/khoahoc'),
        new: path(ROOTS_DASHBOARD, '/khoahoc/new'),
    },
    baihoc: {
        root: path(ROOTS_DASHBOARD, '/baihoc'),
    },
    noidungbaihoc: {
        root: path(ROOTS_DASHBOARD, '/noidungbaihoc'),
        new: path(ROOTS_DASHBOARD, '/noidungbaihoc/new'),
    },
    baikiemtra: {
        root: path(ROOTS_DASHBOARD, '/baikiemtra'),
    },
    cauhoi: {
        root: path(ROOTS_DASHBOARD, '/cauhoi'),
        new: path(ROOTS_DASHBOARD, '/cauhoi/new'),
    },
    
    danhmuc: {
        root: path(ROOTS_DASHBOARD, '/danhmuc'),
    },
    
   
   
    blog: {
        root: path(ROOTS_DASHBOARD, '/blog'),
        posts: path(ROOTS_DASHBOARD, '/blog/posts'),
        post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
        postById: path(
            ROOTS_DASHBOARD,
            '/blog/post/apply-these-7-secret-techniques-to-improve-event',
        ),
        newPost: path(ROOTS_DASHBOARD, '/blog/new-post'),
    },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
