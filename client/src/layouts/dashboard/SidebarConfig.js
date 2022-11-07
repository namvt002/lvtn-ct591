// routes
import {PATH_DASHBOARD} from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
    <SvgIconStyle
        src={`/static/icons/navbar/${name}.svg`}
        sx={{width: '100%', height: '100%'}}
    />
);

const ICONS = {
    user: getIcon('ic_user'),
    role: getIcon('ic_role'),
    tacgia: getIcon('ic_new'),
    danhmuc: getIcon('ic_category'),
    ngonngu: getIcon('ic_translate'),
    book: getIcon('ic_book'),
    phieunhap: getIcon('ic_addbook'),
    giamgia: getIcon('ic_discount')
};

const sidebarConfig = [
    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
        items: [
            // MANAGEMENT : USER
            {
                title: 'user',
                path: PATH_DASHBOARD.user.list,
                icon: ICONS.user,
            },
            {
                title: 'Quyền',
                path: PATH_DASHBOARD.role.root,
                icon: ICONS.role,
            },
            {
                title: 'Khóa học',
                path: PATH_DASHBOARD.khoahoc.root,
                icon: ICONS.book,
            },
            {
                title: 'Bài học',
                path: PATH_DASHBOARD.baihoc.root,
                icon: ICONS.danhmuc,
            },
            {
                title: 'Nội dung bài học',
                path: PATH_DASHBOARD.noidungbaihoc.root,
                icon: ICONS.phieunhap,
            },
            {
                title: 'Bài kiểm tra',
                path: PATH_DASHBOARD.baikiemtra.root,
                icon: ICONS.tacgia,
            },
            {
                title: 'Câu hỏi',
                path: PATH_DASHBOARD.cauhoi.root,
                icon: ICONS.phieunhap,
            },
        ],
    },
];

export default sidebarConfig;
