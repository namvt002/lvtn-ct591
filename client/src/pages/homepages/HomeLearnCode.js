import React, { useEffect, useState } from 'react';
import Code from 'src/components/_dashboard/Code';
import { API_BASE_URL } from 'src/config/configUrl';
import { getData } from 'src/_helper/httpProvider';
import './index.css';

const Home = () => {
  const [khoaHoc, setKhoaHoc] = useState([]);
  const colorHome = [
    '#d9eee1',
    '#fff4a3',
    '#D9EEE1',
    '#96d4d4',
    '#F3ECEA',
  ];
  function randomMau(idx){
	if(idx > colorHome.length){
		return colorHome[1];
	}
	return colorHome[idx];
  }
  useEffect(() => {
    (async () => {
      const res = await getData(API_BASE_URL + '/khoahocs');
      setKhoaHoc(res.data);
      console.log(res.data, 'homeeeeeeeeeeeeee');
    })();
  }, []);
  
  return (
    <>
      <div className="home_wrapper">
        <div className="sidebar_content">
          <div className="sidebar_content_introduc introduc_bg">
            <h1 className="sidebar_title">
              <span>Learn</span>Code
            </h1>
            <h3 className="sidebar_h3">
              Củng cố kiến thức cơ bản nhất về ngôn ngữ lập trình
            </h3>
            <h4 className="introduc_question">
              <a href="">Bạn không biết bắt đầu từ đâu?</a>
            </h4>
          </div>
          <svg
            className="design_shape"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              className="design_shape_cl"
              id="wavepath"
              d="M0,0  L110,0C35,150 35,0 0,100z"
              fill="#282A35"
            ></path>
          </svg>
          {/* HTML */}
          {khoaHoc.map((data, index) => (
            <div
              className="home_sidebar_content "
              style={{backgroundColor: randomMau(index) }}
            >
              <div className="home_content_lg ">
                <div
                  className="home_content_lg_l  languages_l_col"
                  style={{ padding: '3%' }}
                >
                  <h1
                    className="languages_title"
                    style={{ paddingBottom: '30px' }}
                  >
                    {data.kh_ten}
                  </h1>
                  <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '10px' }} dangerouslySetInnerHTML={{__html: data.kh_mota}}>

                  </p>
                  <a
                    className="cl_learn_lg btn_lg"
                    href="/"
                    style={{ marginBottom: '5px' }}
                  >
                    Học {data.kh_ten}
                  </a>
                  <br></br>
                  <a
                    className="btn_lg cl_reference"
                    href="/"
                    style={{ marginBottom: '5px' }}
                  >
                    Tài liệu {data.kh_ten}
                  </a>
                </div>
                <div
                  className="home_content_lg_r r16"
                  style={{ padding: '3%', bgcolor: '#D9EEE1 !important' }}
                >
                  <div className="html_wd" style={{ padding: '16px' }}>
                    <h3>Ví dụ {data.kh_ten}:</h3>
                    <div className="ct_html_ex" >
						<div style={{height: '100%'}}>
							<Code code={data.kh_code} language={data.kh_ten} />
						</div>

                    </div>
                    <a
                      className="btn_try"
                      href="/"
                      style={{ marginBottom: '5px' }}
                    >
                      Click Để Thử
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* COURSES */}
          <div className="home_courses course_bg">
            <div style={{ margin: 'auto' }}>
              {/* LEARNPHP */}
              <div
                className="home_courses_content course_col"
                style={{ padding: '2% 3%' }}
              >
                <div
                  className="home_course_items course_col_l"
                  style={{ backgroundColor: '#FFC0C7' }}
                >
                  <h2 style={{ fontSize: '45px', fontWeight: '700' }}>PHP</h2>
                  <h5
                    className="home_coures_items_title"
                    style={{ height: '50px' }}
                  >
                    Ngôn ngữ lập trình máy chủ web
                  </h5>
                  <a
                    className="btn_learn_course"
                    href="/"
                    style={{ marginBottom: '5px' }}
                  >
                    Học PHP
                  </a>
                </div>
              </div>
              {/* LEARNPython */}
              <div
                className="home_courses_content course_col"
                style={{ padding: '2% 3%' }}
              >
                <div
                  className="home_course_items course_col_l"
                  style={{ backgroundColor: '#FFF4A3' }}
                >
                  <h2 style={{ fontSize: '45px', fontWeight: '700' }}>
                    Python
                  </h2>
                  <h5
                    className="home_coures_items_title"
                    style={{ height: '50px' }}
                  >
                    Một ngôn ngữ lập trình phổ biến
                  </h5>
                  <a
                    className="btn_learn_course"
                    href="/"
                    style={{ marginBottom: '5px' }}
                  >
                    Học Python
                  </a>
                </div>
              </div>

              {/* LEARNJava */}
              <div
                className="home_courses_content course_col"
                style={{ padding: '2% 3%' }}
              >
                <div
                  className="home_course_items course_col_l"
                  style={{ backgroundColor: '#F3ECEA' }}
                >
                  <h2 style={{ fontSize: '45px', fontWeight: '700' }}>Java</h2>
                  <h5
                    className="home_coures_items_title"
                    style={{ height: '50px' }}
                  >
                    Một ngôn ngữ lập trình
                  </h5>
                  <a
                    className="btn_learn_course"
                    href="/"
                    style={{ marginBottom: '5px' }}
                  >
                    Học Java
                  </a>
                </div>
              </div>

              {/* LEARN C++ */}
              <div
                className="home_courses_content course_col"
                style={{ padding: '2% 3%' }}
              >
                <div
                  className="home_course_items course_col_l"
                  style={{ backgroundColor: '#D9EEE1' }}
                >
                  <h2 style={{ fontSize: '45px', fontWeight: '700' }}>C++</h2>
                  <h5
                    className="home_coures_items_title"
                    style={{ height: '50px' }}
                  >
                    Một ngôn ngữ lập trình
                  </h5>
                  <a
                    className="btn_learn_course"
                    href="/"
                    style={{ marginBottom: '5px' }}
                  >
                    Học C++
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CODE Editor */}
          <div
            className="home_code_editor"
            style={{ padding: '30px 3px 85px 3px' }}
          >
            <div className="code_editor_content">
              <h1 style={{ fontSize: '65px', fontWeight: '700' }}>
                Code Editor
              </h1>
              <h4 style={{ marginTop: '25px' }}>
                Với việc chỉnh sửa code trực tuyến, bạn có thể chỉnh sửa code và
                xem kết quả trong trình duyệt của bạn
              </h4>
              <div className="code_editor_container">
                <div className="code_editor_container_row">
                  <div
                    className="code_editor_container_col"
                    style={{ width: '20%', marginLeft: '-60px' }}
                  >
                    <span
                      className="code_editor_dot"
                      style={{ backgroundColor: '#ED594A' }}
                    ></span>
                    <span
                      className="code_editor_dot"
                      style={{ backgroundColor: '#FDD800' }}
                    ></span>
                    <span
                      className="code_editor_dot"
                      style={{ backgroundColor: '#5AC05A' }}
                    ></span>
                  </div>
                  <div
                    className="code_editor_container_col"
                    style={{ width: '80%' }}
                  >
                    <input
                      type="text"
                      className="code_editor_address"
                      value="www.learncode.com"
                    ></input>
                  </div>
                </div>
                <div
                  className="code_editor_coding"
                  style={{ display: 'block' }}
                >
                  <img
                    src="https://www.w3schools.com/codeeditor.gif"
                    className="code_editor_img_coding"
                    style={{ paddingTop: '20px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
