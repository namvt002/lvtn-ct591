import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
    Box,
  Card,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DialogConfirm from '../../DialogConfirm';

// ----------------------------------------------------------------------
CauHoiMoreMenu.propTypes = {
  id: PropTypes.string,
};

export default function CauHoiMoreMenu({ id, cauHoiDetail }) {
  // console.log(id, "aaaaaaaaaaaaa")
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

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
          to={`${PATH_DASHBOARD.cauhoi.root}/${id}/edit`}
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
          // sx={{color: 'text.secondary'}}
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
              {cauHoiDetail.cauhoi.length > 0 && (
                <Box padding={4}>
                  <Box p={4}>
                    <Typography variant="h3" align="center">
                      {cauHoiDetail.bkt_ten}
                    </Typography>
                    
                  </Box>
                  <Typography variant='body2' align="left" pb={2}>
                       Mã khóa học: <b>{cauHoiDetail.kh_makh}</b>
                    </Typography>
                    
                  {cauHoiDetail.cauhoi.length > 0 &&
                    [...new Set(cauHoiDetail.cauhoi.map((e) => e.ch_noidung))]
                      .map((e) => ({
                        ...cauHoiDetail.cauhoi.filter((e1) => e1.ch_noidung === e),
                      }))
                      .map((e2, idx) => (
                        <Box key={idx}>
                          <Typography>
                            <b>Câu hỏi {idx + 1}: </b>
                            {Object.entries(e2)[0][1].ch_noidung}
                          </Typography>
                          <Box px={5}>
                            <ol type="A">
                              {Object.entries(e2).map((e3, idx2) => (
                                <Typography
                                  component="li"
                                  color={!!e3[1].ch_dapandung ? 'red' : ''}
                                  key={idx2}
                                >
                                  {e3[1].ch_dapan}
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
          </>
        }
      />
    </>
  );
}
