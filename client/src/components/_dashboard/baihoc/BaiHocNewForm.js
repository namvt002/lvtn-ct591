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

BaiHocNewForm.propTypes = {
    isEdit: PropTypes.bool,
    current: PropTypes.object,
    id: PropTypes.string,
    setEdit: PropTypes.func,
    setLoad: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function BaiHocNewForm({isEdit, current, setEdit, setLoad}) {
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
        bh_ten: Yup.string().required('Vui lòng nhập bài học'),
        bh_idkh: Yup.string().required('Vui lòng chọn khóa học'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            bh_ten: current?.bh_ten || '',
            bh_idkh: current?.bh_idkh || '',
        },
        validationSchema: NewSchema,
        onSubmit: async (values, {resetForm}) => {
            try {
                if (isEdit) {
                    await putData(API_BASE_URL + `/baihoc/${current.id}/edit`, values);
                    if (setEdit) setEdit({isEdit: false, current: {}});
                } else {
                    await postData(API_BASE_URL + `/baihoc/create`, values);
                    resetForm();
                }
                if (setLoad) setLoad((e) => e + 1);
                enqueueSnackbar(
                    !isEdit ? 'Thêm bài học thành công' : 'Cập nhật thành công!',
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
                                        error={Boolean(touched.bh_idkh && errors.bh_idkh)}
                                        labelId="dm-select"
                                        label="Khóa học"
                                        {...getFieldProps('bh_idkh')}
                                        values={values.bh_idkh}
                                    >
                                        {danhmucList?.map((dm) => (
                                            <MenuItem key={dm.kh_id} value={dm.kh_id}>
                                                {dm.kh_ten}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.bh_ten && errors.bh_ten && (
                                        <>
                                            <FormHelperText error>{errors.bh_idkh}</FormHelperText>
                                        </>
                                    )}
                                </FormControl>
                                <TextField
                                    fullWidth
                                    label="Tên bài học"
                                    {...getFieldProps('bh_ten')}
                                    error={Boolean(touched.bh_ten && errors.bh_ten)}
                                    helperText={touched.bh_ten && errors.bh_ten}
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
