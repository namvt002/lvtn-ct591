import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {useSnackbar} from 'notistack5';
import {useCallback} from 'react';
import {Form, FormikProvider, useFormik} from 'formik';
// material
import {styled} from '@material-ui/core/styles';
import {LoadingButton} from '@material-ui/lab';
import {
    Card,
    FormControlLabel,
    Grid,
    Icon,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@material-ui/core';
// utils
// routes
//
import {QuillEditor} from '../../editor';
import {UploadMultiFile} from '../../upload';
import { postData, putData} from '../../../_helper/httpProvider';
import {API_BASE_URL, URL_PUBLIC_IMAGES} from '../../../config/configUrl';
import {MIconButton} from '../../@material-extend';
import closeFill from '@iconify/icons-eva/close-fill';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({theme}) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

KhoaHocNewForm.propTypes = {
    isEdit: PropTypes.bool,
    currentProduct: PropTypes.object,
};

export default function KhoaHocNewForm({isEdit, currentProduct}) {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const NewProductSchema = Yup.object().shape({
        kh_ten: Yup.string().required('Vui lòng nhập tên khóa học'),
        kh_makh: Yup.string().required('Vui lòng nhập mã khóa học'),
        kh_mota: Yup.string(),
        kh_hinhanh: Yup.array(),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            kh_ten: currentProduct?.kh_ten || '',
            kh_makh: currentProduct?.kh_makh || '',
            kh_mota: currentProduct?.kh_mota || '',
            kh_hinhanh:
                currentProduct?.kh_hinhanh?.map(
                    (e) => `${URL_PUBLIC_IMAGES + e.akh_hinh}`,
                ) || [],
            active: Boolean(currentProduct?.active) || true,
            kh_hinhanh_old: currentProduct?.kh_hinhanh || [],
        },
        validationSchema: NewProductSchema,
        onSubmit: async (values, {setSubmitting, resetForm, setErrors}) => {
            let _values = {...values};
            try {
                const formDt = new FormData();
                if (values.kh_hinhanh.length > 0) {
                    values.kh_hinhanh.map((value) => {
                        return formDt.append('kh_hinhanh', value);
                    });
                }
                formDt.append('data', JSON.stringify(_values));
                if (isEdit) {
                    await putData(
                        API_BASE_URL + `/khoahoc/${currentProduct.kh_id}`,
                        formDt,
                        {
                            'content-type': 'multipart/form-data',
                        },
                    );
                } else {
                    await postData(API_BASE_URL + '/khoahoc/create', formDt, {
                        'content-type': 'multipart/form-data',
                    });
                    resetForm();
                }
                enqueueSnackbar(!isEdit ? 'Thêm thành công' : 'Cập nhật thành công', {
                    variant: 'success',
                });
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

    const {
        errors,
        values,
        touched,
        handleSubmit,
        setFieldValue,
        getFieldProps,
    } = formik;
    console.log(values);

    const handleDrop = useCallback(
        (acceptedFiles) => {
            setFieldValue(
                'kh_hinhanh',
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    }),
                ),
            );
        },
        [setFieldValue],
    );

    const handleRemoveAll = () => {
        setFieldValue('kh_hinhanh', []);
    };

    const handleRemove = (file) => {
        const filteredItems = values.kh_hinhanh.filter((_file) => _file !== file);
        setFieldValue('kh_hinhanh', filteredItems);
    };

    return (
        <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Card sx={{p: 3}}>
                            <Stack spacing={3}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            {...getFieldProps('active')}
                                            checked={values.active}
                                        />
                                    }
                                    label="Trạng thái (Ẩn/hiện)"
                                    sx={{mb: 2}}
                                />
                                <TextField
                                    fullWidth
                                    label="Mã khóa học"makht
                                    {...getFieldProps('kh_makh')}
                                    error={Boolean(touched.kh_makh && errors.kh_makh)}
                                    helperText={touched.kh_makh && errors.kh_makh}
                                />
                                <TextField
                                    fullWidth
                                    label="Tên khóa học"
                                    {...getFieldProps('kh_ten')}
                                    error={Boolean(touched.kh_ten && errors.kh_ten)}
                                    helperText={touched.kh_ten && errors.kh_ten}
                                />
                                

                                <div>
                                    <LabelStyle>Mô tả</LabelStyle>
                                    <QuillEditor
                                        simple
                                        id="product-description"
                                        value={values.kh_mota}
                                        placeholder="Mô tả ..."
                                        onChange={(val) => setFieldValue('kh_mota', val)}
                                    />
                                </div>

                                <div>
                                    <LabelStyle>Thêm hình ảnh</LabelStyle>
                                    <UploadMultiFile
                                        showPreview
                                        maxSize={3145728}
                                        accept="image/*"
                                        files={values.kh_hinhanh}
                                        onDrop={handleDrop}
                                        onRemove={handleRemove}
                                        onRemoveAll={handleRemoveAll}
                                        error={Boolean(touched.kh_hinhanh && errors.kh_hinhanh)}
                                    />
                                </div>
                            </Stack>
                        </Card>
                        <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                            >
                                {!isEdit ? 'Thêm khóa học' : 'Lưu'}
                        </LoadingButton>
                    </Grid>
{/* 
                    <Grid item xs={12} md={6}>
                        <Stack spacing={3}>
                            <Card sx={{p: 3}}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            {...getFieldProps('active')}
                                            checked={values.active}
                                        />
                                    }
                                    label="Trạng thái (Ẩn/hiện)"
                                    sx={{mb: 2}}
                                />

                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Mã sản phẩm"
                                        {...getFieldProps('kh_makh')}
                                        error={Boolean(touched.kh_makh && errors.kh_makh)}
                                        helperText={touched.kh_makh && errors.kh_makh}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Chiều dài"
                                        {...getFieldProps('sp_chieudai')}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Chiều rộng"
                                        {...getFieldProps('sp_chieurong')}
                                    />

                                    <Autocomplete
                                        freeSolo
                                        value={values.sp_idnxb}
                                        onChange={(event, newValue) => {
                                            setFieldValue('sp_idnxb', newValue);
                                        }}
                                        options={nxbList?.map((option) => ({
                                            nxb_id: option.nxb_id,
                                            nxb_ten: option.nxb_ten,
                                        }))}
                                        renderInput={(params) => (
                                            <TextField label="Nhà xuất bản" {...params} />
                                        )}
                                        getOptionLabel={(option) => option.nxb_ten || ''}
                                    />

                                    <Autocomplete
                                        freeSolo
                                        value={values.sp_idtg}
                                        onChange={(event, newValue) => {
                                            setFieldValue('sp_idtg', newValue);
                                        }}
                                        options={tacgiaList?.map((option) => ({
                                            tg_id: option.tg_id,
                                            tg_ten: option.tg_ten,
                                        }))}
                                        renderInput={(params) => (
                                            <TextField label="Tác giả" {...params} />
                                        )}
                                        getOptionLabel={(option) => option.tg_ten || ''}
                                    />

                                    <Autocomplete
                                        freeSolo
                                        value={values.sp_idtl}
                                        onChange={(event, newValue) => {
                                            setFieldValue('sp_idtl', newValue);
                                        }}
                                        options={tlList?.map((option) => ({
                                            tl_id: option.tl_id,
                                            tl_ten: option.tl_ten,
                                        }))}
                                        renderInput={(params) => (
                                            <TextField label="Thể loại" {...params} />
                                        )}
                                        getOptionLabel={(option) => option.tl_ten || ''}
                                    />
                                    <Autocomplete
                                        freeSolo
                                        value={values.sp_idnn}
                                        onChange={(event, newValue) => {
                                            setFieldValue('sp_idnn', newValue);
                                        }}
                                        options={nnList?.map((option) => ({
                                            nn_id: option.nn_id,
                                            nn_ten: option.nn_ten,
                                        }))}
                                        renderInput={(params) => (
                                            <TextField label="Ngôn ngữ" {...params} />
                                        )}
                                        getOptionLabel={(option) => option.nn_ten || ''}
                                    />
                                </Stack>
                            </Card>
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                            >
                                {!isEdit ? 'Thêm khóa học' : 'Lưu'}
                            </LoadingButton>
                        </Stack>
                    </Grid> */}
                </Grid>
            </Form>
        </FormikProvider>
    );
}
