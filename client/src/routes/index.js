import {lazy, Suspense} from 'react';
import {Navigate, useLocation, useRoutes} from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import {useSelector} from "react-redux";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {pathname} = useLocation();
    const isDashboard = pathname.includes('/dashboard');

    return (
        <Suspense
            fallback={
                <LoadingScreen
                    sx={{
                        ...(!isDashboard && {
                            top: 0,
                            left: 0,
                            width: 1,
                            zIndex: 9999,
                            position: 'fixed',
                        }),
                    }}
                />
            }
        >
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    const isLogined = !!useSelector(state => state.user.current?.id);
    const isAdmin = useSelector(state => state.user.current?.role) === "ADMIN";

    return useRoutes([
        {
            path: 'auth',
            children: [
                {
                    path: 'login',
                    element: <Login/>,
                },
                {
                    path: 'register',
                    element: <Register/>,
                },
                {path: 'verify', element: <VerifyCode/>},
                {path: 'forgot-password', element: <ForgotPassword/>},
                {path: 'reset-password/:token', element: <ResetPassword/>}
            ],
        },

        // Dashboard Routes
        {
            path: 'dashboard',
            element: isAdmin ? <DashboardLayout/> : <Navigate to='/'/>,
            children: [
                {
                    path: 'user',
                    children: [
                        {
                            path: '',
                            element: <UserList/>,
                        },
                        {path: 'list', element: <UserList/>},
                        {path: 'new', element: <UserCreate/>},
                        {path: ':id/edit', element: <UserCreate/>},
                    ],
                },
                {
                    path: 'book',
                    children: [
                        {
                            path: '',
                            element: <BookList/>,
                        },
                        {
                            path: 'new',
                            element: <BookCreate/>,
                        },
                        {
                            path: ':id/edit',
                            element: <BookCreate/>,
                        },
                    ],
                },
                {
                    path: 'khoahoc',
                    children: [
                        {
                            path: '',
                            element: <KhoaHocList/>,
                        },
                        {
                            path: 'new',
                            element: <KhoaHocCreate/>,
                        },
                        {
                            path: ':id/edit',
                            element: <KhoaHocCreate/>,
                        },
                    ],
                },
                {
                    path: 'baihoc',
                    children: [
                        {
                            path: '',
                            element: <BaiHocList />,
                        },
                    ],
                },
                {
                    path: 'baikiemtra',
                    children: [
                        {
                            path: '',
                            element: <BaiKiemTraList />,
                        },
                    ],
                },
                {
                    path: 'noidungbaihoc',
                    children: [
                        {
                            path: '',
                            element: <NoiDungBaiHocList/>,
                        },
                        {
                            path: 'new',
                            element: <NoiDungBaiHocCreate/>,
                        },
                        {
                            path: ':id/edit',
                            element: <NoiDungBaiHocCreate/>,
                        },
                        {
                            path: ':id/detail',
                            element: <NoiDungBaiHocDetail/>,
                        },
                    ],
                },
                {
                    path: 'cauhoi',
                    children: [
                        {
                            path: '',
                            element: <CauHoiList/>,
                        },
                        {
                            path: 'new',
                            element: <CauHoiCreate/>,
                        },
                        {
                            path: ':id/edit',
                            element: <CauHoiCreate/>,
                        },
                        {
                            path: ':id/detail',
                            element: <CauHoiDetail/>,
                        },
                    ],
                },
                {
                    path: 'phieunhap',
                    children: [
                        {
                            path: '',
                            element: <PhieuNhapList/>,
                        },
                        {
                            path: 'new',
                            element: <PhieuNhapCreate/>,
                        },
                        {
                            path: ':id/edit',
                            element: <PhieuNhapCreate/>,
                        },
                        {
                            path: ':id/detail',
                            element: <PhieuNhapDetail/>,
                        },
                    ],
                },
                {
                    path: 'role',
                    children: [
                        {
                            path: '',
                            element: <RoleList/>,
                        },
                        {
                            path: 'new',
                            element: <RoleCreate/>,
                        },
                        {
                            path: ':id/edit',
                            element: <RoleCreate/>,
                        },
                    ],
                },
                {
                    path: 'nhaxuatban',
                    children: [
                        {
                            path: '',
                            element: <NhaXuatBanList/>,
                        },
                        {
                            path: 'new',
                            element: <NhaXuatBanCreate/>,
                        },
                        {
                            path: ':id/edit',
                            element: <NhaXuatBanCreate/>,
                        },
                    ],
                },
                {
                    path: 'nhacungcap',
                    children: [
                        {
                            path: '',
                            element: <NhaCungCapList/>,
                        },
                        {
                            path: 'new',
                            element: <NhaCungCapCreate/>,
                        },
                        {
                            path: ':id/edit',
                            element: <NhaCungCapCreate/>,
                        },
                    ],
                },
                {
                    path: 'tacgia',
                    children: [
                        {
                            path: '',
                            element: <TacGiaList/>,
                        },
                    ],
                },
                {
                    path: 'danhmuc',
                    children: [
                        {
                            path: '',
                            element: <DanhMucList/>,
                        },
                    ],
                },
                {
                    path: 'theloai',
                    children: [
                        {
                            path: '',
                            element: <TheLoaiList/>,
                        },
                    ],
                },
                {
                    path: 'ngonngu',
                    children: [
                        {
                            path: '',
                            element: <NgonNguList/>,
                        },
                    ],
                }, {
                    path: 'khuyenmai',
                    children: [{
                        path: '',
                        element: <KhuyenMai/>
                    }]
                }
            ],
        },

        // Main Routes
        {
            path: '*',
            element: <LogoOnlyLayout/>,
            children: [
                {path: '500', element: <Page500/>},
                {path: '404', element: <NotFound/>},
                {path: '*', element: <Navigate to="/404" replace/>},
            ],
        },
        {
            path: '/',
            element: <MainLayout/>,
            children: [{
                path: '/',
                element: <HomeLearnCode />
            }, {
                path: 'change-password',
                element: <ChangePassword/>
            }, {
                path: 'profile',
                element: isLogined ? <Profile/> : <Navigate to='/'/>
            }, {
                path: 'product',
                element: <ProductList/>
            }, {
                path: 'shopcart',
                element: <ShopCart/>
            }, {
                path: 'product-detail/:id',
                element: <ProductDetail/>
            }
            ]
        },
        {path: '*', element: <Navigate to="/404" replace/>},
    ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(
    lazy(() => import('../pages/authentication/Register')),
);
const ForgotPassword = Loadable(lazy(() => import('../pages/authentication/ForgotPassword')));

const VerifyCode = Loadable(
    lazy(() => import('../pages/authentication/VerifyCode')),
);

const ChangePassword = Loadable(lazy(() => import('../pages/authentication/ChangePassword')));

const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
//--------------------------------user------------------------------
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));

const UserCreate = Loadable(
    lazy(() => import('../pages/dashboard/UserCreate')),
);

const Profile = Loadable(lazy(() => import('../pages/homepages/Profile')))

//-------------------------role-------------------------------------
const RoleList = Loadable(lazy(() => import('../pages/dashboard/RoleList')));
const RoleCreate = Loadable(
    lazy(() => import('../pages/dashboard/RoleCreate')),
);

//--------------------------nhaxuatban-------------------------------------------
const NhaXuatBanList = Loadable(
    lazy(() => import('../pages/dashboard/NhaXuatBan')),
);
const NhaXuatBanCreate = Loadable(
    lazy(() => import('../pages/dashboard/NXBCreate')),
);

//--------------------------nhacungcap-------------------------------------------
const NhaCungCapList = Loadable(
    lazy(() => import('../pages/dashboard/NhaCungCap')),
);
const NhaCungCapCreate = Loadable(
    lazy(() => import('../pages/dashboard/NCCCreate')),
);
//--------------------------Danh Muc-------------------------------------------
const DanhMucList = Loadable(lazy(() => import('../pages/dashboard/DanhMuc')));
//--------------------------Tác giả-------------------------------------------
const TacGiaList = Loadable(lazy(() => import('../pages/dashboard/TacGia')));
//--------------------------Thể loại-------------------------------------------
const TheLoaiList = Loadable(lazy(() => import('../pages/dashboard/TheLoai')));
//--------------------------BaiHoc-------------------------------------------
const BaiHocList = Loadable(lazy(() => import('../pages/dashboard/BaiHoc')));
//--------------------------Bai kiem tra-------------------------------------------
const BaiKiemTraList = Loadable(lazy(() => import('../pages/dashboard/BaiKiemTra')));
//--------------------------Ngôn ngữ-------------------------------------------
const NgonNguList = Loadable(lazy(() => import('../pages/dashboard/NgonNgu')));
//--------------------------Sách-------------------------------------------
const BookList = Loadable(lazy(() => import('../pages/dashboard/Book')));
const KhoaHocList = Loadable(lazy(() => import('../pages/dashboard/KhoaHoc')));
const ProductList = Loadable(lazy(() => import('../pages/homepages/ShopProduct')));
const HomeLearnCode = Loadable(lazy(() => import('../pages/homepages/HomeLearnCode')));
const ProductDetail = Loadable(lazy(() => import('../pages/homepages/ProductDetail')));
const ShopCart = Loadable(lazy(() => import('../pages/homepages/ShopCart')));
const BookCreate = Loadable(
    lazy(() => import('../pages/dashboard/BookCreate')),
);

const KhoaHocCreate = Loadable(
    lazy(() => import('../pages/dashboard/KhoaHocCreate')),
);


//--------------------------Phiếu nhập-------------------------------------------

const PhieuNhapList = Loadable(
    lazy(() => import('../pages/dashboard/PhieuNhap')),
);

const PhieuNhapCreate = Loadable(
    lazy(() => import('../pages/dashboard/PhieuNhapCreate')),
);

const PhieuNhapDetail = Loadable(
    lazy(() => import('../pages/dashboard/PhieuNhapDetail')),
);

//--------------------------Câu hỏi-------------------------------------------

const CauHoiList = Loadable(
    lazy(() => import('../pages/dashboard/CauHoi')),
);

const CauHoiCreate = Loadable(
    lazy(() => import('../pages/dashboard/CauHoiCreate')),
);

const CauHoiDetail = Loadable(
    lazy(() => import('../pages/dashboard/CauHoiDetail')),
);

//--------------------------Nội dung bài học-------------------------------------------

const NoiDungBaiHocList = Loadable(
    lazy(() => import('../pages/dashboard/NoiDungBaiHoc')),
);

const NoiDungBaiHocCreate = Loadable(
    lazy(() => import('../pages/dashboard/NoiDungBaiHocCreate')),
);

const NoiDungBaiHocDetail = Loadable(
    lazy(() => import('../pages/dashboard/NoiDungBaiHocDetail')),
);

//----------------d-----------------Giam gia--------------------------------------
const KhuyenMai = Loadable(lazy(() => import('../pages/dashboard/KhuyenMai')));
//-------------------------------------------------------------------------------

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
