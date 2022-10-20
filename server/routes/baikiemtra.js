const sql = require("../db");

module.exports = function (app) {
    app.get("/baikiemtras", async (req, res) => {
        let qr = "SELECT * FROM `bai_kiem_tra` LEFT JOIN khoa_hoc ON bai_kiem_tra.bkt_idkh = khoa_hoc.kh_id ";
        if (req.query.search) {
            qr += `WHERE bai_kiem_tra.bkt_ten like '%${req.query.search}%' or khoa_hoc.kh_ten like '%${req.query.search}%'`;
        }
        sql.query(qr, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(data);
        });
    });

    app.post("/baikiemtra/active", async (req, res) => {
        const {id, active} = req.body;
        if (!id) return res.status(404).send("No content");
        const qr = "UPDATE bai_kiem_tra SET active = ? where bkt_id = ?";
        sql.query(qr, [active, id], (err, _) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.status(200).send("Cập nhật thành công");
        });
    });

    app.get("/baikiemtra/:id", async (req, res) => {
        const {id} = req.params;
        if (!id) return res.status(404).send(null);
        const qr = " SELECT * FROM bai_kiem_tra where bkt_id = ?";
        await sql.query(qr, id, (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(data);
        });
    });

    app.put("/baikiemtra/:id/edit", async (req, res) => {
        const {id} = req.params;
        const data = req.body;
        const qr = "UPDATE bai_kiem_tra SET ? WHERE bkt_id = ?";
        sql.query(qr, [data, id], (err, _) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send("Cập nhật thành công!");
        });
    });

    app.post("/baikiemtra/create", async (req, res) => {
        const data = req.body;
        const qr_exist = "SELECT * FROM bai_kiem_tra where bkt_ten = ?";

        await sql.query(qr_exist, data.bkt_ten, async (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.length !== 0) return res.status(500).send("Tên đã tồn tại");
            const qr = "INSERT INTO bai_kiem_tra SET ?";
            await sql.query(qr, data);
            return res.status(200).send("Thêm thành công!");
        });
    });

    app.delete("/baikiemtra/delete", async (req, res) => {
        if (!!req.body.arrID) {
            const arrID = JSON.parse(req.body.arrID);
            await Promise.all(
                arrID.map(async (e) => {
                    let qr = "DELETE FROM bai_kiem_tra where bkt_id = ?";
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
