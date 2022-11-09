import { Box, Card, Grid, Stack, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, URL_PUBLIC_IMAGES } from 'src/config/configUrl';
import { getData } from 'src/_helper/httpProvider';
import { styled } from '@material-ui/core/styles';
import './khoahoc.css';
import { PATH_PAGE } from 'src/routes/paths';

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

export default function Course() {
  const [khoaHoc, setKhoaHoc] = useState([]);
  //   const linkTo = `${PATH_PAGE.productDetail}/${sp_id}`;

  useEffect(() => {
    (async () => {
      const res = await getData(API_BASE_URL + '/khoahocs');
      setKhoaHoc(res.data);
      console.log(res.data, 'homeeeeeeeeeeeeee');
    })();
  }, []);
  return (
    <>
      <div className="wrapper_course" style={{ margin: '100px 10px' }}>
        <div className="nav">
          <div className="title">
            <h1 className="title_course"> Khóa học</h1>
            <div className="content">
              <p>
                Các khóa học được thiết kế phù hợp cho cả người mới, nhiều khóa
                học hấp dẫn, chất lượng, nội dung dễ hiểu.
              </p>
            </div>
          </div>
          <div className="container_course">
            <div className="course_basic">
              <div className="course_basic_title">
                <h2 className="course_basic_title_content">Khóa học cơ bản</h2>
              </div>
              <div className="course_body">
                <div className="modal_row" style={{margin: '10px'}}>
                  <Grid container spacing={3}>
                    {khoaHoc.map((data, idx) => (
                      <Grid key={idx} item xs={12} md={3}>
                        <Card>
                          <Link
                            // to={linkTo}
                            color="inherit"
                            // component={RouterLink}
                            style={{ textDecoration: 'none' }}
                          >
                            <Box sx={{ pt: '100%', position: 'relative' }}>
                              <ProductImgStyle
                                alt={data.kh_ten}
                                src={
                                  URL_PUBLIC_IMAGES +
                                  data?.kh_hinhanh[0]?.akh_hinh
                                }
                              />
                            </Box>

                            <Stack spacing={2} sx={{ p: 3 }}>
                              <Typography variant="h6" noWrap>
                                Khóa học về: {data.kh_ten}
                              </Typography>
                            </Stack>
                          </Link>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}