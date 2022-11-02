import React from 'react';
import './index.css';


const Home = () => {
	return (
		< >
			<div className="home_wrapper">
				<div className="sidebar_content">
					<div className="sidebar_content_introduc introduc_bg">
						<h1 className="sidebar_title"><span >Learn</span>Code</h1>
						<h3 className="sidebar_h3">Củng cố kiến thức cơ bản nhất về ngôn ngữ lập trình</h3>
						<h4 className="introduc_question">
							<a href="">
								Bạn không biết bắt đầu từ đâu?
							</a>
						</h4>
					</div>
					<svg className="design_shape" viewBox="0 0 100 100" preserveAspectRatio="none">
						<path className="design_shape_cl" id="wavepath" d="M0,0  L110,0C35,150 35,0 0,100z" fill="#282A35"></path>
					</svg>
					{/* HTML */}
					<div className="home_sidebar_content html_bg" style={{ marginTop: "-10px" }} >
						<div className="home_content_lg"  >
							<div className="home_content_lg_l  languages_l_col" style={{ padding: "3%" }}>
								<h1 className="languages_title" style={{ paddingBottom: "30px" }}>HTML</h1>
								<p style={{ fontSize: "16px", fontWeight: "500" }}>Ngôn ngữ xây dựng các trang web</p>
								<a className="cl_learn_lg btn_lg" href="/" style={{ marginBottom: "5px" }}>Học HTML</a>
								<br></br>
								<a className="btn_lg cl_reference" href="/" style={{ marginBottom: "5px" }}>Tài liệu HTML</a>

							</div>
							<div className="home_content_lg_r r16" style={{ padding: "3%", bgcolor: '#D9EEE1 !important' }}>
								<div className="html_wd" style={{ padding: "16px" }} >
									<h3>Ví dụ HTML:</h3>
									<div className="ct_html_ex" style={{ height: "250px" }}>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>&lt;</span>
											!DOCTYPE
											<span style={{ color: 'red' }}>html</span>
											<span style={{ color: 'midnightblue' }}>&gt;</span>
										</div>

										<br></br>

										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>&lt;</span>
											<span>html</span>
											<span style={{ color: 'midnightblue' }}>&gt;</span>
										</div>

										<br></br>

										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>&lt;</span>
											<span>title</span>
											<span style={{ color: 'midnightblue' }}>&gt;</span>
											<span style={{ color: 'black' }}>HTML Tutorial</span>
											<span style={{ color: 'midnightblue' }}>&lt;</span>
											<span>/title</span>
											<span style={{ color: 'midnightblue' }}>&gt;</span>
										</div>

										<br></br>

										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>&lt;</span>
											<span>body</span>
											<span style={{ color: 'midnightblue' }}>&gt;</span>
										</div>

										<br></br>
										<br></br>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>&lt;</span>
											<span>h1</span>
											<span style={{ color: 'midnightblue' }}>&gt;</span>
											<span style={{ color: 'black' }}>This is a heading</span>
											<span style={{ color: 'midnightblue' }}>&lt;</span>
											<span>/h1</span>
											<span style={{ color: 'midnightblue' }}>&gt;</span>
										</div>

										<br></br>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>&lt;</span>
											<span>p</span>
											<span style={{ color: 'midnightblue' }}>&gt;</span>
											<span style={{ color: 'black' }}>This is a paragraph.</span>
											<span style={{ color: 'midnightblue' }}>&lt;</span>
											<span>/p</span>
											<span style={{ color: 'midnightblue' }}>&gt;</span>
										</div>

										<br></br> <br></br>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>&lt;</span>
											<span>/body</span>
											<span style={{ color: 'midnightblue' }}>&gt;</span>
										</div>
										<br></br>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>&lt;</span>
											<span>/html</span>
											<span style={{ color: 'midnightblue' }}>&gt;</span>
										</div>
									</div>
									<a className="btn_try" href="/" style={{ marginBottom: "5px" }}>Click Để Thử</a>

								</div>
							</div>

						</div>
					</div>

					{/* CSS */}
					<div className="home_sidebar_content css_bg" style={{ marginTop: "-10px" }} >
						<div className="home_content_lg">
							<div className="home_content_lg_l  languages_l_col" style={{ padding: "3%" }}>
								<h1 className="languages_title" style={{ paddingBottom: "30px" }}>CSS</h1>
								<p style={{ fontSize: "16px", fontWeight: "500" }}>Ngôn ngữ định dạng tạo kiểu trang web</p>
								<a className="cl_learn_lg btn_lg" href="/" style={{ marginBottom: "5px" }}>Học CSS</a>
								<br></br>
								<a className="btn_lg css_reference" href="/" style={{ marginBottom: "5px" }}>Tài liệu CSS</a>

							</div>
							<div className="home_content_lg_r r16" style={{ padding: "3%", bgcolor: '#D9EEE1 !important' }}>
								<div className="html_wd" style={{ padding: "16px" }} >
									<h3>Ví dụ CSS:</h3>
									<div className="ct_html_ex" style={{ height: "250px" }}>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											body
											<span style={{ color: 'black', paddingLeft: '10px' }}> &#123;</span>
											<br></br>
											<span style={{ color: 'red', paddingLeft: '20px' }}>background-color
												<span style={{ color: 'black' }}> :</span>
												<span style={{ color: 'midnightblue', paddingLeft: '10px' }}>lightblue</span>
												<span style={{ color: 'black' }}> ;</span>
											</span>
											<br></br>
											<span style={{ color: 'black' }}> &#125;</span>
										</div>

										<br></br> <br></br>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											h1
											<span style={{ color: 'black', paddingLeft: '10px' }}> &#123;</span>
											<br></br>
											<span style={{ color: 'red', paddingLeft: '20px' }}>color
												<span style={{ color: 'black' }}> :</span>
												<span style={{ color: 'midnightblue', paddingLeft: '10px' }}>white</span>
												<span style={{ color: 'black' }}> ;</span>
											</span>
											<br></br>
											<span style={{ color: 'red', paddingLeft: '20px' }}>text-aligin
												<span style={{ color: 'black' }}> :</span>
												<span style={{ color: 'midnightblue', paddingLeft: '10px' }}>center</span>
												<span style={{ color: 'black' }}> ;</span>
											</span>
											<br></br>
											<span style={{ color: 'black' }}> &#125;</span>
										</div>

										<br></br> <br></br>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											p
											<span style={{ color: 'black', paddingLeft: '10px' }}> &#123;</span>
											<br></br>
											<span style={{ color: 'red', paddingLeft: '20px' }}>font-family
												<span style={{ color: 'black' }}> :</span>
												<span style={{ color: 'midnightblue', paddingLeft: '10px' }}>verdana</span>
												<span style={{ color: 'black' }}> ;</span>
											</span>
											<br></br>
											<span style={{ color: 'black' }}> &#125;</span>
										</div>




									</div>
									<a className="btn_try" href="/" style={{ marginBottom: "5px" }}>Click Để Thử</a>

								</div>
							</div>
						</div>
					</div>

					{/* JAVASCRIPT */}
					<div className="home_sidebar_content jscr_bg" style={{ marginTop: "-10px" }} >
						<div className="home_content_lg">
							<div className="home_content_lg_l  languages_l_col" style={{ padding: "3%" }}>
								<h1 className="languages_title" style={{ paddingBottom: "30px" }}>JAVASCRIPT</h1>
								<p style={{ fontSize: "16px", fontWeight: "500" }}>Ngôn ngữ cho các trang web lập trình</p>
								<a className="cl_learn_lg btn_lg" href="/" style={{ marginBottom: "5px" }}>Học JavaScript</a>
								<br></br>
								<a className="btn_lg jscr_reference" href="/" style={{ marginBottom: "5px" }}>Tài liệu JavaScript</a>

							</div>
							<div className="home_content_lg_r r16" style={{ padding: "3%", bgcolor: '#D9EEE1 !important' }}>
								<div className="html_wd" style={{ padding: "16px" }} >
									<h3>Ví dụ JavaScript:</h3>
									<div className="ct_html_ex" style={{ height: "250px" }}>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>&#60;</span>
											button
											<span style={{ color: 'red' }}> &ensp;onlick</span>
											<span style={{ color: 'midnightblue' }}>="myFunction()"&#62;</span>
											<span style={{ color: 'black' }}> Click Me! </span>
											<span style={{ color: 'midnightblue' }}>&#60;</span>
											/button
											<span style={{ color: 'midnightblue' }}>&#62;</span>
										</div>

										<br></br> <br></br><br></br>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>&#60;</span>
											script
											<span style={{ color: 'midnightblue' }}>&#62;</span>
										</div>
										<br></br>

										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>function</span>
											<span style={{ color: 'black', paddingLeft: '10px' }}>myFunction()&ensp;&#123;</span>
										</div>

										<br></br>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>let&ensp;</span>
											<span style={{ color: 'black' }}>&ensp;x = document.getElementById&#40;</span>
											"demo"
											<span style={{ color: 'black' }}>&#41;</span>
										</div>
										<br></br>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'black' }}>x.style.fontSize = </span>
											"25px"
											<span style={{ color: 'black' }}>;</span>
										</div>
										<br></br>

										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'black' }}>x.style.color = </span>
											"red"
											<span style={{ color: 'black' }}>;</span>
										</div>
										<br></br>
										<span style={{ color: 'black' }}>&#125;</span>
										<br></br>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>&#60;</span>
											/script
											<span style={{ color: 'midnightblue' }}>&#62;</span>
										</div>
									</div>
									<a className="btn_try" href="/" style={{ marginBottom: "5px" }}>Click Để Thử</a>

								</div>
							</div>
						</div>
					</div>

					{/* SQL */}
					<div className="home_sidebar_content sql_bg" style={{ marginTop: "-10px" }} >
						<div className="home_content_lg">
							<div className="home_content_lg_l  languages_l_col" style={{ padding: "3%" }}>
								<h1 className="languages_title" style={{ paddingBottom: "30px" }}>SQL</h1>
								<p style={{ fontSize: "16px", fontWeight: "500" }}>Ngôn ngữ truy cập cơ sở dữ liệu</p>
								<a className="cl_learn_lg btn_lg" href="/" style={{ marginBottom: "5px" }}>Học SQL</a>
								<br></br>
								<a className="btn_lg jscr_reference" href="/" style={{ marginBottom: "5px" }}>Tài liệu SQL</a>

							</div>
							<div className="home_content_lg_r r16" style={{ padding: "3%", bgcolor: '#D9EEE1 !important' }}>
								<div className="html_wd" style={{ padding: "16px" }} >
									<h3>Ví dụ SQL:</h3>
									<div className="ct_html_ex" style={{ height: "250px" }}>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>SELECT
												<span style={{ color: 'black' }}> * </span>
												FROM
												<span style={{ color: 'black' }}>Customer</span>
											</span>
										</div>
										<br></br>
										<div className="wrapper-content_lg" style={{ display: 'inline-block', color: 'brown' }}>
											<span style={{ color: 'midnightblue' }}>
												WHERE
												<span style={{ color: 'black' }}> Country= </span>
												<span style={{ color: 'red' }}>'Mexico'</span>
												<span style={{ color: 'black' }}> ; </span>
											</span>

										</div>

									</div>
									<a className="btn_try" href="/" style={{ marginBottom: "5px" }}>Click Để Thử</a>

								</div>
							</div>
						</div>
					</div>

					{/* COURSES */}
					<div className="home_courses course_bg">
						<div style={{ margin: "auto" }}>
							{/* LEARNPHP */}
							<div className="home_courses_content course_col" style={{ padding: "2% 3%" }}>
								<div className="home_course_items course_col_l" style={{ backgroundColor: "#FFC0C7" }}>
									<h2 style={{ fontSize: "45px", fontWeight: "700" }} >PHP</h2>
									<h5 className="home_coures_items_title" style={{ height: "50px" }}>
										Ngôn ngữ lập trình máy chủ web
									</h5>
									<a className="btn_learn_course" href="/" style={{ marginBottom: "5px" }}>Học PHP</a>
								</div>
							</div>
							{/* LEARNPython */}
							<div className="home_courses_content course_col" style={{ padding: "2% 3%" }}>
								<div className="home_course_items course_col_l" style={{ backgroundColor: "#FFF4A3" }}>
									<h2 style={{ fontSize: "45px", fontWeight: "700" }} >Python</h2>
									<h5 className="home_coures_items_title" style={{ height: "50px" }}>
										Một ngôn ngữ lập trình phổ biến
									</h5>
									<a className="btn_learn_course" href="/" style={{ marginBottom: "5px" }}>Học Python</a>
								</div>
							</div>

							{/* LEARNJava */}
							<div className="home_courses_content course_col" style={{ padding: "2% 3%" }}>
								<div className="home_course_items course_col_l" style={{ backgroundColor: "#F3ECEA" }}>
									<h2 style={{ fontSize: "45px", fontWeight: "700" }} >Java</h2>
									<h5 className="home_coures_items_title" style={{ height: "50px" }}>
										Một ngôn ngữ lập trình
									</h5>
									<a className="btn_learn_course" href="/" style={{ marginBottom: "5px" }}>Học Java</a>
								</div>
							</div>

							{/* LEARN C++ */}
							<div className="home_courses_content course_col" style={{ padding: "2% 3%" }}>
								<div className="home_course_items course_col_l" style={{ backgroundColor: "#D9EEE1" }}>
									<h2 style={{ fontSize: "45px", fontWeight: "700" }} >C++</h2>
									<h5 className="home_coures_items_title" style={{ height: "50px" }}>
										Một ngôn ngữ lập trình
									</h5>
									<a className="btn_learn_course" href="/" style={{ marginBottom: "5px" }}>Học C++</a>
								</div>
							</div>


						</div>
					</div>

					{/* CODE Editor */}
					<div className="home_code_editor" style={{ padding: "30px 3px 85px 3px" }}>
						<div className="code_editor_content">
							<h1 style={{ fontSize: "65px", fontWeight: "700" }}>Code Editor</h1>
							<h4 style={{ marginTop: "25px" }}>
								Với việc chỉnh sửa code trực tuyến, bạn có thể chỉnh sửa code và xem kết quả trong trình duyệt của bạn
							</h4>
							<div className="code_editor_container">
								<div className="code_editor_container_row">
									<div className="code_editor_container_col" style={{ width: "20%", marginLeft: "-60px" }}>
										<span className="code_editor_dot" style={{ backgroundColor: "#ED594A" }}></span>
										<span className="code_editor_dot" style={{ backgroundColor: "#FDD800" }}></span>
										<span className="code_editor_dot" style={{ backgroundColor: "#5AC05A" }}></span>
									</div>
									<div className="code_editor_container_col" style={{ width: "80%" }} >
										<input type="text" className="code_editor_address" value="www.learncode.com"></input>
									</div>
								</div>
								<div className="code_editor_coding" style={{ display: "block" }}>
									
									<img src="https://www.w3schools.com/codeeditor.gif" className="code_editor_img_coding" style={{paddingTop: "20px"}} />
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
		
	)
}

export default Home