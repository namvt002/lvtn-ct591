const query = require("../lib/query");
const db = require("../db");
const sql = require("../db");

module.exports = function (app) {
    app.post("/noidungbaihoc", async (req, res) => {
        const _data = req.body;

        let arrNoiDung = [];
        _data.map((data)=>{
            arrNoiDung.push([
                data.ndbh_idbh,
                data.ndbh_tieude,
                data.ndbh_mota,
                data.ndbh_code
            ])
        })
        const qr = ` INSERT INTO noi_dung_bai_hoc(ndbh_idbh, ndbh_tieude, ndbh_mota, ndbh_code) VALUES ? `;
        await sql.query(qr, [arrNoiDung]);
        return res.status(200).send("Thêm thành công!");
    });

    app.get("/noidungbaihoc", async (req, res) => {
        let qr = ` 
            SELECT * FROM noi_dung_bai_hoc JOIN bai_hoc ON noi_dung_bai_hoc.ndbh_idbh = bai_hoc.bh_id GROUP BY bai_hoc.bh_id 
        `
        if (req.query.search) {
            qr += ` WHERE noi_dung_bai_hoc.ndbh_tieude like '%${req.query.search}%' 
                            or bai_hoc.bh_ten like '%${req.query.search}%'
                `;
        }
        sql.query(qr, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(data);
        });
    });

    app.get("/noidungbaihoc/:id", async (req, res) => {
        const {id} = req.params;
        const qr_ndbkt = `
            SELECT * FROM noi_dung_bai_hoc JOIN bai_hoc ON noi_dung_bai_hoc.ndbh_idbh = bai_hoc.bh_id 
            WHERE bai_hoc.bh_id = ?
        `;
        return res.status(200).send(await query(db, qr_ndbkt, id));
    });


    app.delete("/noidungbaihoc", async (req, res) => {
        if (!!req.body.arrID) {
            const arrID = JSON.parse(req.body.arrID);
            await Promise.all(
                arrID.map(async (e) => {
                    let qr = "DELETE FROM noi_dung_bai_hoc where ndbh_id = ?";
                    await sql.query(qr, [e], (err, _) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                })
            );
            return res.status(201).send("Xóa thành công!");
        }
    });

    app.put('/noidungbaihoc/:id', async (req, res) => {
        const {id} = req.params;
        const data = req.body;
        console.log(data)
        const qr_noidung = "DELETE FROM noi_dung_bai_hoc WHERE noi_dung_bai_hoc.ndbh_idbh = ? ";
        await db.query(qr_noidung, id);
        const qr = "INSERT INTO noi_dung_bai_hoc(ndbh_mota, ndbh_code, ndbh_tieude, ndbh_idbh) VALUES ? ";
        let _dapAnArr = [];
        data.map((noidung)=>_dapAnArr.push([
            noidung.ndbh_mota,
            noidung.ndbh_code,
            noidung.ndbh_tieude,
            data[0].ndbh_idbh
        ]))
        sql.query(qr, [_dapAnArr], (err, _) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.status(200).send("Cập nhật thành công!");
        });       
    })
};
