import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {useSnackbar} from 'notistack5';
import {Form, FormikProvider, useFormik} from 'formik';
// material
import {LoadingButton} from '@material-ui/lab';
import {
    Autocomplete,
    Box,
    Card,
    Grid,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@material-ui/core';
//
import {useEffect, useState} from 'react';
import {Icon} from '@iconify/react';
import { MIconButton } from '../../@material-extend';
import closeFill from '@iconify/icons-eva/close-fill';

// import {MIconButton} from '../../@material-extend';
// import closeFill from '@iconify/icons-eva/close-fill';
import {getData, postData, putData} from "../../../_helper/httpProvider";
import {API_BASE_URL} from "../../../config/configUrl";
import {styled} from '@material-ui/core/styles';
import {QuillEditor} from '../../editor';

//----------------code editor
import Editor from "@monaco-editor/react";
import Code from '../Code';

const LabelStyle = styled(Typography)(({theme}) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------
NoiDungBaiHocNewForm.propTypes = {
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object,
    id: PropTypes.string,
    user: PropTypes.object,
};
// ----------------------------------------------------------------------

export default function NoiDungBaiHocNewForm({isEdit, current, id, user}) {
    // console.log("edit", current)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [baihoc, setBaiHoc] = useState([]);
    const [noidungbaihoc, setNoidungbaihoc] = useState([])
  
    useEffect(() => {
        (async () => {
            const _baihoc = await getData(API_BASE_URL + '/baihocs');
            setBaiHoc(_baihoc.data);
            if(isEdit && current.length > 0){
                setNoidungbaihoc(current?.map(e => 
                    ({
                        ndbh_idbh: e.bh_id,
                        ndbh_tieude: e.ndbh_tieude,
                        ndbh_mota: e.ndbh_mota,
                        ndbh_code: e.ndbh_code,
                    })
                ))
            }
        })();
    }, [isEdit, current]);

    const NewNoiDungBaiHocSchema = Yup.object().shape({
        ndbh_idbh: Yup.object().required('Vui lòng chọn bài học'),
        ndbh_tieude: Yup.string().required('Vui lòng nhập tiêu đề bài học'),
        ndbh_mota: Yup.string().required('Vui lòng nhập mô tả'),
        ndbh_code: Yup.string().required('Vui lòng code mẫu'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            ndbh_idbh:'',
            ndbh_tieude: '',
            ndbh_mota:  '',
            ndbh_code:  '',
            ndbh_idbh: current[0]?.bh_ten ? {
                bh_id: current[0]?.bh_id,
                bh_ten: current[0]?.bh_ten,
            } : '',
        },
        validationSchema: NewNoiDungBaiHocSchema,
        onSubmit: async (values, {setFieldValue}) => {
            setNoidungbaihoc((pre) => [
                ...pre,
                {
                  ndbh_idbh: values.ndbh_idbh.bh_id,
                  ndbh_tieude: values.ndbh_tieude,
                  ndbh_mota: values.ndbh_mota,
                  ndbh_code: values.ndbh_code,
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
        resetForm
    } = formik;

    function handleEditorChange(value, event) {
        setFieldValue('ndbh_code', value)
    }
    const handleSubmitPN = async () => {
        if (noidungbaihoc.length === 0) {
            enqueueSnackbar('Chưa có nội dung bài học!', {
                variant: 'error',
                action: (key) => (
                    <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                        <Icon icon={closeFill}/>
                    </MIconButton>
                ),
            });
            return;
        }

        try {
            values.ndbh_idbh = values.ndbh_idbh.bh_id
            if (isEdit) {
                await putData(API_BASE_URL + '/noidungbaihoc/' + current[0]?.ndbh_idbh, noidungbaihoc);
            } else {
                await postData(API_BASE_URL + '/noidungbaihoc', noidungbaihoc);
                setNoidungbaihoc([])
                setFieldValue('ndbh_code', '')
                resetForm();
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
                    <Grid item xs={12} md={6}>
                        <Card sx={{p: 3}}>
                            <Stack spacing={3}>
                                <Grid container spacing={{xs: 3, sm: 2}}>
                                    <Grid item xs={12} md={12}>
                                        <Autocomplete
                                            freeSolo
                                            value={values.ndbh_idbh}
                                            onChange={(event, newValue) => {
                                                setFieldValue('ndbh_idbh', newValue || '');
                                            }}
                                            options={baihoc?.map((option) => ({
                                                bh_id: option.bh_id,
                                                bh_ten: option.bh_ten,
                                            }))}
                                            renderInput={(params) => (
                                                <TextField
                                                    label="Chọn bài học"
                                                    {...params}
                                                    error={Boolean(touched.ndbh_idbh && errors.ndbh_idbh)}
                                                    helperText={touched.ndbh_idbh && errors.ndbh_idbh}
                                                />
                                            )}
                                            getOptionLabel={(option) => option.bh_ten || ''}
                                        />
                                    </Grid>
                                </Grid>
                                <div>
                                    <LabelStyle>Mô tả</LabelStyle>
                                    <QuillEditor
                                        simple
                                        id="product-description"
                                        value={values.ndbh_mota}
                                        placeholder="Mô tả ..."
                                        onChange={(val) => setFieldValue('ndbh_mota', val)}
                                    />
                                </div>
                            </Stack>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{p: 3}}>
                            <Stack spacing={3}>
                                <Grid container spacing={{xs: 3, sm: 2}}>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            label="Tiêu đề bài học"
                                            {...getFieldProps('ndbh_tieude')}
                                            error={Boolean(touched.ndbh_tieude && errors.ndbh_tieude)}
                                            helperText={touched.ndbh_tieude && errors.ndbh_tieude}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={{xs: 3, sm: 2}}>
                                    <Grid item xs={12} md={12}>
                                        <div >
                                            <LabelStyle>Code </LabelStyle>
                                            <Editor
                                                width="96%"
                                                height="300px"
                                                defaultLanguage="html"
                                                value={values.ndbh_code}
                                                theme='vs-dark'
                                                onChange={handleEditorChange}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>

                                <Box
                                    sx={{mt: 3, display: 'flex', justifyContent: 'flex-end'}}
                                >
                                    {/* dau cong */}
                                     <IconButton type="submit">
                                                <Icon icon="akar-icons:circle-plus"/>
                                            </IconButton>
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
                            {noidungbaihoc.length > 0 && (
                                <Box padding={4}>
                                    <Typography variant="h3" align="center">
                                        {values.ndbh_idbh.bh_ten}
                                    </Typography>
                                    <Card>
                                        
                                        {noidungbaihoc.map((noidung, idx) => (
                                            // <Box >
                                                <Typography key={idx} padding={4}>
                                                    <IconButton
                                                        onClick={() => {
                                                            let _newNoiDungBaiHoc = noidungbaihoc.filter(
                                                                (b) => !(b.ndbh_idbh === noidung.ndbh_idbh && b.ndbh_tieude === noidung.ndbh_tieude),
                                                            );
                                                            setNoidungbaihoc(_newNoiDungBaiHoc);
                                                        }}
                                                    >
                                                        <Icon icon="ep:remove-filled" color="#F44336"/>
                                                    </IconButton>
                                                    <Typography variant="h3">
                                                        {noidung.ndbh_tieude}
                                                    </Typography>
                                                    <div dangerouslySetInnerHTML={{__html: noidung.ndbh_mota}}/>
                                                    <Code code={noidung.ndbh_code} language="html" />
                                                </Typography>
                                        ))}
                                    </Card>
                                </Box>
                            )}
                        </Card>
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    );
}
