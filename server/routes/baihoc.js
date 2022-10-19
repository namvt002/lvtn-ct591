const sql = require("../db");

module.exports = function (app) {
    app.get("/baihocs", async (req, res) => {
        let qr = "SELECT * FROM `bai_hoc` LEFT JOIN khoa_hoc ON bai_hoc.bh_idkh = khoa_hoc.kh_id ";
        if (req.query.search) {
            qr += `WHERE bai_hoc.bh_ten like '%${req.query.search}%' or khoa_hoc.kh_ten like '%${req.query.search}%'`;
        }
        sql.query(qr, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(data);
        });
    });

    app.post("/baihoc/active", async (req, res) => {
        const {id, active} = req.body;
        // console.log(req.body);
        if (!id) return res.status(404).send("No content");
        const qr = "UPDATE bai_hoc SET active = ? where bh_id = ?";
        sql.query(qr, [active, id], (err, _) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.status(200).send("Cập nhật thành công");
        });
    });

    app.get("/baihoc/:id", async (req, res) => {
        const {id} = req.params;
        // console.log(req.params);
        if (!id) return res.status(404).send(null);
        const qr = " SELECT * FROM bai_hoc where bh_id = ?";
        await sql.query(qr, id, (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(data);
        });
    });

    app.put("/baihoc/:id/edit", async (req, res) => {
        const {id} = req.params;
        const data = req.body;
        const qr = "UPDATE bai_hoc SET ? WHERE bh_id = ?";
        sql.query(qr, [data, id], (err, _) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send("Cập nhật thành công!");
        });
    });

    app.post("/baihoc/create", async (req, res) => {
        const data = req.body;
        const qr_exist = "SELECT * FROM bai_hoc where bh_ten = ?";

        await sql.query(qr_exist, data.bh_ten, async (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.length !== 0) return res.status(500).send("Tên đã tồn tại");
            const qr = "INSERT INTO bai_hoc SET ?";
            await sql.query(qr, data);
            return res.status(200).send("Thêm thành công!");
        });
    });

    app.delete("/baihoc/delete", async (req, res) => {
        if (!!req.body.arrID) {
            const arrID = JSON.parse(req.body.arrID);
            await Promise.all(
                arrID.map(async (e) => {
                    let qr = "DELETE FROM bai_hoc where bh_id = ?";
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
