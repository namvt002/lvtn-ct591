import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
    Box,
    Card,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import Code from '../../Code';
import DialogConfirm from '../../DialogConfirm';
import { getData } from 'src/_helper/httpProvider';
import { API_BASE_URL } from 'src/config/configUrl';

// ----------------------------------------------------------------------
NoiDungBaiHocMoreMenu.propTypes = {
  id: PropTypes.string,
};

export default function NoiDungBaiHocMoreMenu({ id }) {

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [noidungbaihocDetail, setNoidungbaihocDetail] = useState([]);

  useEffect(() => {
    (async () => {
        const _baihoc = await getData(API_BASE_URL + `/noidungbaihoc/${id}`);
        setNoidungbaihocDetail(_baihoc.data)
    })();
  }, [id]);

  const handleClickOpenDetail = () => {
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.noidungbaihoc.root}/${id}/edit`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Chỉnh sửa"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setIsOpen(false);
            handleClickOpenDetail();
          }}
        >
          <ListItemIcon>
            <Icon icon="clarity:details-line" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Xem chi tiết"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>

      <DialogConfirm
        open={openDetail}
        handleClose={handleCloseDetail}
        title=" "
        maxWidth="md"
        message={
          <>
            <Card>
              {noidungbaihocDetail.length > 0 && (
                <Box padding={4}>
                  <Typography variant="h3" align="center">
                    {noidungbaihocDetail[0].bh_ten}
                  </Typography>
                    {noidungbaihocDetail.map((noidung, idx) => (
                      // <Box >
                      <Typography key={idx} padding={4}>
                        <Typography variant="h3">
                          {noidung.ndbh_tieude}
                        </Typography>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: noidung.ndbh_mota,
                          }}
                        />
                        <Code code={noidung.ndbh_code} language="html" />
                      </Typography>
                    ))}
                </Box>
              )} 
            </Card>
          </>
        }
      />
    </>
  );
}
