import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack5';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Autocomplete,
  Box,
  Card,
  Grid,
  IconButton,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Checkbox,
} from '@material-ui/core';
//
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import { MIconButton } from '../../@material-extend';
import closeFill from '@iconify/icons-eva/close-fill';
import { getData, postData, putData } from '../../../_helper/httpProvider';
import { API_BASE_URL } from '../../../config/configUrl';
import { fCurrency } from '../../../_helper/formatCurrentCy';

// ----------------------------------------------------------------------
CauHoiNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  id: PropTypes.string,
  user: PropTypes.object,
};
// ----------------------------------------------------------------------

export default function CauHoiNewForm({ isEdit, current, id, user }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [books, setBooks] = useState([]);
  const [baikiemtra, setBaiKiemTra] = useState([]);
  const [listBooks, setListBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const _books = await getData(API_BASE_URL + '/books');
      setBooks(_books.data);
      const _bkt = await getData(API_BASE_URL + '/baikiemtras');
      setBaiKiemTra(_bkt.data);
      console.log(_bkt.data, 'BKT');
      if (isEdit && current.length > 0) {
        current.map((b) => {
          return setListBooks((preState) => [
            ...preState,
            {
              ctpn_masp: b.sp_masp,
              ctpn_idsp: b.ctpn_idsp,
              ctpn_tensp: b.sp_ten,
              ctpn_gia: b.ctpn_gia,
              ctpn_soluong: b.ctpn_soluong,
            },
          ]);
        });
      }
    })();
  }, [isEdit, current]);

  const NewPhieuNhapSchema = Yup.object().shape({
    fullname: Yup.string().required('Vui lòng nhập họ tên'),
    pn_idncc: Yup.object().required('Vui lòng chọn nhà cung cấp'),
    ctpn_idsp: Yup.object().required('Vui lòng chọn sách'),
    ctpn_soluong: Yup.number()
      .min(1, 'Số lượng không hợp lệ')
      .positive('Số lượng không hợp lệ')
      .integer('Số lượng không hợp lệ')
      .required('Vui lòng nhập số lượng'),
    ctpn_gia: Yup.number()
      .min(1, 'Giá không hợp lệ')
      .required('Vui lòng nhập giá'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ch_noidung: current?.ch_noidung || '',
      ch_idbkt: current[0]?.bkt_id
        ? {
            bkt_id: current[0]?.bkt_id,
            bkt_ten: current[0]?.bkt_ten,
          }
        : '',
    },
    validationSchema: NewPhieuNhapSchema,
    onSubmit: async (values, { setFieldValue }) => {
      let check = false;
      // eslint-disable-next-line array-callback-return
      listBooks.map((b) => {
        if (b.ctpn_masp === values.ctpn_idsp.sp_masp) check = true;
      });
      if (check) {
        enqueueSnackbar('Sách đã có trong phiếu nhập!', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
        return;
      }
      setListBooks((preState) => [
        ...preState,
        {
          ctpn_masp: values.ctpn_idsp.sp_masp,
          ctpn_idsp: values.ctpn_idsp.sp_id,
          ctpn_tensp: values.ctpn_idsp.sp_ten,
          ctpn_gia: values.ctpn_gia,
          ctpn_soluong: values.ctpn_soluong,
        },
      ]);
    },
  });
  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue,
  } = formik;
  console.log(errors, values);
  const handleSubmitPN = async () => {
    if (listBooks.length === 0) {
      enqueueSnackbar('Chưa có câu hỏi!', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      });
      return;
    }
    let _values = {};
    _values.pn_idncc = values.pn_idncc.ncc_id;
    _values.pn_idnv = values.pn_idnv;
    _values.pn_tongtien = listBooks.reduce(
      (total, item) => item.ctpn_soluong * item.ctpn_gia + total,
      0,
    );
    _values.sanpham = listBooks;
    console.log(current);
    try {
      if (isEdit) {
        await putData(
          API_BASE_URL + '/phieunhap/' + current[0]?.pn_id,
          _values,
        );
      } else {
        await postData(API_BASE_URL + '/phieunhap', _values);
        setListBooks([]);
      }
      enqueueSnackbar(!isEdit ? 'Thêm thành công[' : 'Cập nhật thành công', {
        variant: 'success',
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Grid container spacing={{ xs: 3, sm: 2 }}>
                  <Grid item xs={12} md={12}>
                    <Autocomplete
                      freeSolo
                      value={values.ch_idbkt}
                      onChange={(event, newValue) => {
                        setFieldValue('ch_idbkt', newValue || '');
                      }}
                      options={baikiemtra?.map((option) => ({
                        bkt_id: option.bkt_id,
                        bkt_ten: option.bkt_ten,
                      }))}
                      renderInput={(params) => (
                        <TextField
                          label="Chọn bài kiểm tra"
                          {...params}
                          error={Boolean(touched.ch_idbkt && errors.ch_idbkt)}
                          helperText={touched.ch_idbkt && errors.ch_idbkt}
                        />
                      )}
                      getOptionLabel={(option) => option.bkt_ten || ''}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      label="Nội dung câu hỏi"
                      {...getFieldProps('sp_masp')}
                      error={Boolean(touched.sp_masp && errors.sp_masp)}
                      helperText={touched.sp_masp && errors.sp_masp}
                    />
                  </Grid>
                </Grid>
                <Grid container >
                  <Grid item xs={12} md={12}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 1, sm: 1 }}
                    >
                      <TextField
                        fullWidth
                        label="Đán án câu hỏi"
                        {...getFieldProps('sp_masp')}
                        error={Boolean(touched.sp_masp && errors.sp_masp)}
                        helperText={touched.sp_masp && errors.sp_masp}
                        
                      />
                      <Checkbox
                        // disableRipple
                        // checked={completed}
                        // icon={<Icon icon={radioButtonOffOutline} />}
                        // checkedIcon={<Icon icon={checkmarkCircle2Outline} />}
                        // onChange={handleChangeComplete}
                        // label="Đáp án đúng"
                        
                      /> <div style={{width: "150px",lineHeight: "55px"}}>Đáp án đúng</div>

                      <IconButton type="submit">
                        <Icon icon="akar-icons:circle-plus" />
                      </IconButton>
                    </Stack>
                  </Grid>
                </Grid>

                <Box
                  sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
                >
                  <LoadingButton
                    type="button"
                    variant="contained"
                    onClick={() => handleSubmitPN()}
                  >
                    {!isEdit ? 'Thêm' : 'Lưu'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>
              {listBooks.length > 0 && (
                <Box padding={4}>
                  <Typography variant="h4" align="center">
                    Phiếu nhập
                  </Typography>
                  <Stack spacing={{ xs: 3, sm: 2 }} m={2}>
                    <Typography>
                      Nhân viên: <b>{values.fullname}</b>
                    </Typography>
                    <Typography>
                      Nhà cung cấp: <b>{values.pn_idncc?.ncc_ten}</b>
                    </Typography>
                    <Typography>
                      Tổng tiền:{' '}
                      <b>
                        {fCurrency(
                          listBooks.reduce(
                            (total, item) =>
                              item.ctpn_soluong * item.ctpn_gia + total,
                            0,
                          ),
                        )}
                      </b>
                    </Typography>
                  </Stack>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Mã sản phẩm</TableCell>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Giá</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    {listBooks.map((book, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{book.ctpn_masp}</TableCell>
                        <TableCell>{book.ctpn_tensp}</TableCell>
                        <TableCell>{book.ctpn_soluong}</TableCell>
                        <TableCell>{fCurrency(book.ctpn_gia)}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              let _newBook = listBooks.filter(
                                (b) => b.ctpn_masp !== book.ctpn_masp,
                              );
                              setListBooks(_newBook);
                            }}
                          >
                            <Icon icon="ep:remove-filled" color="#F44336" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </Table>
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
