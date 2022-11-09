const query = require("../lib/query");
const db = require("../db");
const sql = require("../db");

module.exports = function (app) {
    app.post("/cauhoi", async (req, res) => {
        let _data = req.body;
        const qr_cauhoi = "INSERT INTO cau_hoi(ch_noidung, ch_dapan, ch_dapandung, ch_idbkt) VALUES ?";
        let _dapAnArr = [];
        _data.cauhoi.map((data)=>_dapAnArr.push([
            data.cauhoi,
            data.dapan,
            data.correct,
          _data.ch_idbkt
        ]))
        await db.query(qr_cauhoi, [_dapAnArr], async (err, _rs_ch) => {
            if (err) {
                console.log(err);
            }
            return res.status(200).send("Thêm thành công");
        });
    });

    app.get("/cauhois", async (req, res) => {
        let qr_pn = `
            SELECT * FROM bai_kiem_tra JOIN khoa_hoc ON bai_kiem_tra.bkt_idkh = khoa_hoc.kh_id 
        `;
        if(req.query.search){
            qr_pn += `
               AND bai_kiem_tra.bkt_ten like '%${req.query.search}%'
            `
        }
        let _arrBKT = await query(db, qr_pn);
        await Promise.all(
            _arrBKT.map(async(data, index)=>{
                let qr_cauhoi = `
                    SELECT * FROM cau_hoi WHERE cau_hoi.ch_idbkt = ?
                `;
              _arrBKT[index].cauhoi = await query(db, qr_cauhoi, data.bkt_id);
            })
        )
        

        return res.status(200).send(_arrBKT);
    });

    app.get("/cauhoi/:id", async (req, res) => {
        const {id} = req.params;
        const qr_pn = `
            SELECT * FROM bai_kiem_tra JOIN khoa_hoc ON bai_kiem_tra.bkt_idkh = khoa_hoc.kh_id WHERE bai_kiem_tra.bkt_id = ?
        `;
        let _arrBKT = await query(db, qr_pn, id);
        await Promise.all(
            
            _arrBKT.map(async(data, index)=>{
                let qr_cauhoi = `
                    SELECT * FROM cau_hoi WHERE cau_hoi.ch_idbkt = ?
                `;
              _arrBKT[index].cauhoi = await query(db, qr_cauhoi, data.bkt_id);
            })
        )
        

        return res.status(200).send(_arrBKT[0]);
    });

    app.put("/cauhoi", async (req, res) => {
        let _data = req.body;
        const qr_cauhoi = "DELETE FROM cau_hoi WHERE cau_hoi.ch_idbkt = ? ";
        const qr_cauhoi_insert = "INSERT INTO cau_hoi(ch_noidung, ch_dapan, ch_dapandung, ch_idbkt) VALUES ? ";
        let _dapAnArr = [];
        await _data.cauhoi.map((data)=>_dapAnArr.push([
            data.cauhoi,
            data.dapan,
            !!data.correct ? true : false,
          _data.ch_idbkt
        ]));
        await query(db, qr_cauhoi, _data.ch_idbkt);
        await query(db, qr_cauhoi_insert, [_dapAnArr]);
        return res.status(200).send("Thêm thành công");

    });


    // app.get("/cauhoi/:id", async (req, res) => {
    //     const {id} = req.params;
    //     const qr_pn = `
                
    //     `;
    //     return res.status(200).send(await query(db, qr_pn, id));
    // });


    app.delete("/cauhoi", async (req, res) => {
        if (!!req.body.arrID) {
            const arrID = JSON.parse(req.body.arrID);
            await Promise.all(
                arrID.map(async (e) => {
                    let qr = "DELETE FROM cau_hoi where ch_id = ?";
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
};
