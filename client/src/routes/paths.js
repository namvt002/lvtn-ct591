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
    productDetail: '/product-detail'
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
        app: path(ROOTS_DASHBOARD, '/app'),
        ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
        analytics: path(ROOTS_DASHBOARD, '/analytics'),
        banking: path(ROOTS_DASHBOARD, '/banking'),
        booking: path(ROOTS_DASHBOARD, '/booking'),
    },
    mail: {
        root: path(ROOTS_DASHBOARD, '/mail'),
        all: path(ROOTS_DASHBOARD, '/mail/all'),
    },
    chat: {
        root: path(ROOTS_DASHBOARD, '/chat'),
        new: path(ROOTS_DASHBOARD, '/chat/new'),
        conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey'),
    },
    calendar: path(ROOTS_DASHBOARD, '/calendar'),
    kanban: path(ROOTS_DASHBOARD, '/kanban'),
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
    phieunhap: {
        root: path(ROOTS_DASHBOARD, '/phieunhap'),
        new: path(ROOTS_DASHBOARD, '/phieunhap/new'),
    },
    giamgia: {
        root: path(ROOTS_DASHBOARD, '/giamgia'),
    },
    khuyenmai: {
        root: path(ROOTS_DASHBOARD, '/khuyenmai')
    },
    nhaxuatban: {
        root: path(ROOTS_DASHBOARD, '/nhaxuatban'),
        new: path(ROOTS_DASHBOARD, '/nhaxuatban/new'),
    },
    nhacungcap: {
        root: path(ROOTS_DASHBOARD, '/nhacungcap'),
        new: path(ROOTS_DASHBOARD, '/nhacungcap/new'),
    },
    danhmuc: {
        root: path(ROOTS_DASHBOARD, '/danhmuc'),
    },
    tacgia: {
        root: path(ROOTS_DASHBOARD, '/tacgia'),
    },
    theloai: {
        root: path(ROOTS_DASHBOARD, '/theloai'),
    },
    ngonngu: {
        root: path(ROOTS_DASHBOARD, '/ngonngu'),
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
