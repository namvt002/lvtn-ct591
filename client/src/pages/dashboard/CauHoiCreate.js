import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { API_BASE_URL } from '../../config/configUrl';
import { getData } from '../../_helper/httpProvider';
import CauHoiNewForm from '../../components/_dashboard/cauhoi/CauHoiNewForm';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function CauHoiCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes('edit');
  const [current, setCurrent] = useState({});

  const { email } = useSelector((state) => state.user.current);

  useEffect(() => {
    (async () => {
      if (isEdit) {
        const _res = await getData(API_BASE_URL + `/cauhoi/${id}`);
        setCurrent(_res.data);
      }
    })();
  }, [id, isEdit, email]);
  return (
    <Page title="Câu hỏi | Learn Code">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Câu hỏi mới' : 'Chỉnh sửa'}
          links={[
            { name: 'Quản lý', href: PATH_DASHBOARD.root },
            { name: 'Câu hỏi', href: PATH_DASHBOARD.cauhoi.root },
            { name: !isEdit ? 'Câu hỏi' : id },
          ]}
        />

        {current?.cauhoi && (
          <CauHoiNewForm isEdit={isEdit} current={current} id={id} />
        )}
      </Container>
    </Page>
  );
}
