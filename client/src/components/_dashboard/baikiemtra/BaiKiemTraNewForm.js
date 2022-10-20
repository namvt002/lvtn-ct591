import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {useSnackbar} from 'notistack5';
import {Form, FormikProvider, useFormik} from 'formik';
// material
import {LoadingButton} from '@material-ui/lab';
import {
    Box,
    Card,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from '@material-ui/core';
// utils
// routes
//
import {getData, postData, putData} from '../../../_helper/httpProvider';
import {API_BASE_URL} from '../../../config/configUrl';
import {Icon} from '@iconify/react';
import {MIconButton} from '../../@material-extend';
import closeFill from '@iconify/icons-eva/close-fill';
import {useEffect, useState} from 'react';

// ----------------------------------------------------------------------

BaiKiemTraNewForm.propTypes = {
    isEdit: PropTypes.bool,
    current: PropTypes.object,
    id: PropTypes.string,
    setEdit: PropTypes.func,
    setLoad: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function BaiKiemTraNewForm({isEdit, current, setEdit, setLoad}) {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [danhmucList, setDanhmucList] = useState();

    useEffect(() => {
        (async () => {
            const res = await getData(API_BASE_URL + '/khoahocs');
            setDanhmucList(res.data);
            // console.log(res.data);
        })();
    }, []);

    const NewSchema = Yup.object().shape({
        bkt_ten: Yup.string().required('Vui lòng nhập tên bài bài kiểm tra'),
        bkt_idkh: Yup.string().required('Vui lòng chọn khóa học'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            bkt_ten: current?.bkt_ten || '',
            bkt_idkh: current?.bkt_idkh || '',
        },
        validationSchema: NewSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                if (isEdit) {
                    await putData(API_BASE_URL + `/baikiemtra/${current.id}/edit`, values);
                    if (setEdit) setEdit({isEdit: false, current: {}});
                } else {
                    await postData(API_BASE_URL + `/baikiemtra/create`, values);
                    resetForm();
                }
                if (setLoad) setLoad((e) => e + 1);
                enqueueSnackbar(
                    !isEdit ? 'Thêm bài kiểm tra thành công' : 'Cập nhật thành công!',
                    {
                        variant: 'success',
                    },
                );
            } catch (error) {
                console.error(error);
                enqueueSnackbar(error.response.data, {
                    variant: 'error',
                    action: (key) => (
                        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                            <Icon icon={closeFill}/>
                        </MIconButton>
                    ),
                });
            }
        },
    });
    const {errors, touched, handleSubmit, getFieldProps, values} = formik;

    return (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Card sx={{p: 3}}>
                            <Stack spacing={3}>
                                <FormControl>
                                    <InputLabel id="dm-select">Khóa học</InputLabel>
                                    <Select
                                        error={Boolean(touched.bkt_idkh && errors.bkt_idkh)}
                                        labelId="dm-select"
                                        label="Khóa học"
                                        {...getFieldProps('bkt_idkh')}
                                        values={values.bh_idkh}
                                    >
                                        {danhmucList?.map((dm) => (
                                            <MenuItem key={dm.kh_id} value={dm.kh_id}>
                                                {dm.kh_ten}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.bkt_ten && errors.bkt_ten && (
                                        <>
                                            <FormHelperText error>{errors.bkt_idkh}</FormHelperText>
                                        </>
                                    )}
                                </FormControl>
                                <TextField
                                    fullWidth
                                    label="Tên bài kiểm tra"
                                    {...getFieldProps('bkt_ten')}
                                    error={Boolean(touched.bkt_ten && errors.bkt_ten)}
                                    helperText={touched.bkt_ten && errors.bkt_ten}
                                />
                                <Box
                                    sx={{mt: 3, display: 'flex', justifyContent: 'flex-end'}}
                                >
                                    <LoadingButton type="submit" variant="contained">
                                        {!isEdit ? 'Thêm' : 'Lưu'}
                                    </LoadingButton>
                                </Box>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    );
}
