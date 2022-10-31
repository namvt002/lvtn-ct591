import {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
// material
import {Container} from '@material-ui/core';
// redux
// routes
import {PATH_DASHBOARD} from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {API_BASE_URL} from '../../config/configUrl';
import {getData} from '../../_helper/httpProvider';
import NoiDungBaiHocNewForm from '../../components/_dashboard/noidungbaihoc/NoiDungBaiHocNewForm';
import {useSelector} from 'react-redux';

// ----------------------------------------------------------------------

export default function NoiDungBaiHocCreate() {
    const {themeStretch} = useSettings();
    const {pathname} = useLocation();
    const {id} = useParams();
    const isEdit = pathname.includes('edit');
    const [current, setCurrent] = useState({});
    const [user, setUser] = useState({});

    const {email} = useSelector((state) => state.user.current);

    useEffect(() => {
        (async () => {
            if (isEdit) {
                const _res = await getData(API_BASE_URL + `/noidungbaihoc/${id}`);
                console.log(_res.data, "new form")
                setCurrent(_res.data);
            }
        })();
    }, [id, isEdit, email]);
    return (
        <Page title="Noi dung bai hoc | HYPE">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading={!isEdit ? 'Thêm nội dung bài học' : 'Chỉnh sửa'}
                    links={[
                        {name: 'Quản lý', href: PATH_DASHBOARD.root},
                        {name: 'Nội dung bài học', href: PATH_DASHBOARD.noidungbaihoc.root},
                        {name: !isEdit ? 'Bài học' : id},
                    ]}
                />

                <NoiDungBaiHocNewForm
                    isEdit={isEdit}
                    current={current}
                    id={id}
                />
            </Container>
        </Page>
    );
}
