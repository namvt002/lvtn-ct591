import {Icon} from '@iconify/react';
import {useEffect, useState} from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import {Link as RouterLink} from 'react-router-dom';
// material
import {
    Button,
    Card,
    Checkbox,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography,
} from '@material-ui/core';
// routes
import {PATH_DASHBOARD} from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {getData} from '../../_helper/httpProvider';
import {API_BASE_URL} from '../../config/configUrl';
import NoiDungBaiHocListHead from '../../components/_dashboard/noidungbaihoc/list/NoiDungBaiHocListHead';
import NoiDungBaiHocToolbar from '../../components/_dashboard/noidungbaihoc/list/NoiDungBaiHocToolbar';
import NoiDungBaiHocMoreMenu from '../../components/_dashboard/noidungbaihoc/list/NoiDungBaiHocMoreMenu';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'pn_id', label: 'Mã nội dung bài học', alignRight: false},
    {id: 'pn_idnv', label: 'Tiêu đề bài học', alignRight: false},
    {id: 'pn_tennv', label: 'Bài học', alignRight: false},
    {id: ''},
];

// ----------------------------------------------------------------------

export default function NoiDungBaiHocList() {
    const {themeStretch} = useSettings();
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [_datas, setDatas] = useState([]);
    const [load, setLoad] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const res = await getData(
                    API_BASE_URL + `/noidungbaihoc?search=${filterName}`,
                );
                setDatas(res.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [filterName, load]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = _datas.map((n) => n.pn_id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - _datas.length) : 0;

    const isUserNotFound = _datas.length === 0;

    return (
        <Page title="Nội dung bài học | Learn Code">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Nội dung bài học"
                    links={[
                        {name: 'Quản lý', href: PATH_DASHBOARD.root},
                        {name: 'Nôi dung bài học', href: PATH_DASHBOARD.noidungbaihoc.root},
                        {name: 'Nội dung'},
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_DASHBOARD.noidungbaihoc.new}
                            startIcon={<Icon icon={plusFill}/>}
                        >
                            Nội dung bài học mới
                        </Button>
                    }
                />

                <Card>
                    <NoiDungBaiHocToolbar
                        selected={selected}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                        setLoad={setLoad}
                        setSelected={setSelected}
                    />
                    <Scrollbar>
                        <TableContainer sx={{minWidth: 800}}>
                            <Table>
                                <NoiDungBaiHocListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={_datas.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {_datas
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const {
                                                ndbh_id,
                                                ndbh_tieude,
                                                bh_ten,
                                                bh_id
                                            } = row;
                                            const isItemSelected = selected.indexOf(ndbh_id) !== -1;
                                            return (
                                                <TableRow
                                                    hover
                                                    key={ndbh_id}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    selected={isItemSelected}
                                                    aria-checked={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            onChange={(event) =>
                                                                handleClick(event, ndbh_id)
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        component="th"
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Typography variant="subtitle2" noWrap>
                                                            {ndbh_id}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">{ndbh_tieude}</TableCell>
                                                    <TableCell align="left">{bh_ten}</TableCell>
                                                    <TableCell align="right">
                                                        <NoiDungBaiHocMoreMenu id={bh_id} noidungbaihocDetail={_datas}/>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 53 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                                {isUserNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{py: 3}}>
                                                <SearchNotFound searchQuery={filterName}/>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={_datas.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </Page>
    );
}
