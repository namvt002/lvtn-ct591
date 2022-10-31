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
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@material-ui/core';
//
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import { MIconButton } from '../../@material-extend';
import closeFill from '@iconify/icons-eva/close-fill';
import { getData, postData, putData } from '../../../_helper/httpProvider';
import { API_BASE_URL } from '../../../config/configUrl';

// ----------------------------------------------------------------------
CauHoiNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  id: PropTypes.string,
  user: PropTypes.object,
};
// ----------------------------------------------------------------------

export default function CauHoiNewForm({ isEdit, current, id, user }) {
  console.log('aaaaaaaaaaaa', current);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [baikiemtra, setBaiKiemTra] = useState([]);
  const [dapAn, setDapan] = useState(
    current.cauhoi
      ? current?.cauhoi.map((e) => ({
          cauhoi: e.ch_noidung,
          dapan: e.ch_dapan,
          correct: e.ch_dapandung,
        }))
      : [],
  );

  useEffect(() => {
    (async () => {
      const _baiKiemTra = await getData(API_BASE_URL + '/baikiemtras');
      setBaiKiemTra(_baiKiemTra.data);
    })();
  }, [isEdit, current]);

  const NewPhieuNhapSchema = Yup.object().shape({
    ch_idbkt: Yup.object().required('Vui lòng chọn bài kiểm tra'),
    ch_noidung: Yup.string().required('Vui nhập nội dung câu hỏi'),
    ch_dapan: Yup.string().required('Vui nhập nội dung đáp án'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ch_dapan: '',
      ch_dapandung: false,
      ch_noidung: current?.ch_noidung || '',
      ch_idbkt: current?.bkt_id
        ? {
            bkt_id: current?.bkt_id,
            bkt_ten: current?.bkt_ten,
          }
        : '',
    },
    validationSchema: NewPhieuNhapSchema,
    onSubmit: async (values, { setFieldValue }) => {
      setDapan((pre) => [
        ...pre,
        {
          cauhoi: values.ch_noidung,
          dapan: values.ch_dapan,
          correct: values.ch_dapandung,
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
  const handleSubmitPN = async () => {
    if (dapAn.length === 0) {
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

    console.log(values);

    let _values = {};
    _values.ch_idbkt = values.ch_idbkt.bkt_id;
    _values.cauhoi = dapAn;

    try {
      if (isEdit) {
        await putData(
          API_BASE_URL + '/cauhoi',
          _values,
        );
      } else {
        await postData(API_BASE_URL + '/cauhoi', _values);
        setDapan([]);
      }
      enqueueSnackbar(!isEdit ? 'Thêm thành công' : 'Cập nhật thành công', {
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
                      value={values.ch_noidung}
                      onChange={(e) => {
                        setFieldValue('ch_noidung', e.target.value);
                      }}
                      error={Boolean(touched.ch_noidung && errors.ch_noidung)}
                      helperText={touched.ch_noidung && errors.ch_noidung}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 1, sm: 1 }}
                    >
                      <TextField
                        fullWidth
                        label="Đán án câu hỏi"
                        value={values.ch_dapan}
                        onChange={(e) => {
                          setFieldValue('ch_dapan', e.target.value);
                        }}
                        error={Boolean(touched.ch_dapan && errors.ch_dapan)}
                        helperText={touched.ch_dapan && errors.ch_dapan}
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.ch_dapandung}
                            {...getFieldProps('ch_dapandung')}
                          />
                        }
                        label="Đáp án đúng"
                        sx={{ width: '150px' }}
                      ></FormControlLabel>
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
              {dapAn.length > 0 && (
                <Box padding={4}>
                  <Box p={4}>
                    <Typography variant="h3" align="center">
                      {values.ch_idbkt.bkt_ten}
                    </Typography>
                  </Box>

                  {dapAn.length > 0 &&
                    [...new Set(dapAn.map((e) => e.cauhoi))]
                      .map((e) => ({
                        ...dapAn.filter((e1) => e1.cauhoi === e),
                      }))
                      .map((e2, idx) => (
                        <Box key={idx}>
                          <Typography>

                            <IconButton
                              onClick={() => {
                                let _newDapAn = dapAn.filter(
                                  (da) =>
                                    da.cauhoi !==
                                    Object.entries(e2)[0][1].cauhoi,
                                );
                                setDapan(_newDapAn);
                              }}
                            >
                              <Icon icon="ep:remove-filled" color="#F44336" />
                            </IconButton>
                            <b>Câu hỏi {idx + 1}: </b>
                            {Object.entries(e2)[0][1].cauhoi}
                          </Typography>
                          <Box px={8}>
                            <ol type="A">
                              {Object.entries(e2).map((e3, idx2) => (
                                <Typography
                                  component="li"
                                  color={!!e3[1].correct ? 'red' : ''}
                                  key={idx2}
                                >
                                  {e3[1].dapan}
                                </Typography>
                              ))}
                            </ol>
                          </Box>
                          <Divider sx={{py: 2}} />

                        </Box>
                      ))}
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
