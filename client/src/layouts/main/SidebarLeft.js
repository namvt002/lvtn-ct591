import { Box, Fab } from '@material-ui/core';
import {
  AddIcCallRounded,
  HomeRepairServiceOutlined,
  LibraryAdd,
  QuizRounded,
  RateReview,
} from '@material-ui/icons';
import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { PATH_PAGE } from 'src/routes/paths';

export default function SidebarLeft() {
  return (
    <div className="sidebar_left">
      <div className="sidebar_left_wrapper">
        <div>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab className="btn_add" color="primary" aria-label="add">
              <AddIcCallRounded />
            </Fab>
          </Box>
        </div>
        <ul className="sidebar_list">
          <li>
            <Link
              to={PATH_PAGE.profile}
              className="sidebar_items"
            >
              <HomeRepairServiceOutlined />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to={PATH_PAGE.profile}
              className="sidebar_items"
            >
              <LibraryAdd />
              <span>Khóa Học</span>
            </Link>
          </li>
          <li>
            <a className="sidebar_items">
              <QuizRounded />
              <span>Trắc Nghiệm Nhanh</span>
            </a>
          </li>
          <li>
            <a className="sidebar_items">
              <RateReview />
              <span>Blog</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
