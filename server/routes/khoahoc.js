const db = require("../db");
const multer = require("multer");
const bodyParser = require("body-parser");
const query = require("../lib/query");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

let upload = multer({ storage: storage , limits: {
  fileSize: 100000000
}});

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.post("/khoahoc/create", upload.array("kh_hinhanh", 10), async (req, res) => {
    let { data } = req.body;
    console.log(data)
    data = JSON.parse(data);
    delete data.kh_hinhanh_old;
    const qr_sp = "SELECT * FROM khoa_hoc WHERE kh_makh = ?";
    await db.query(qr_sp, data.kh_makh, async (err, result) => {
      if (err) {
        console.log(err)
        return
      } ;
      if (result.length !== 0)
        return res.status(500).send("Mã khóa học đã tồn tại");
      else {
        delete data.kh_hinhanh;
        const qr = "INSERT INTO khoa_hoc SET ?";
        let id_sp = "";
        let values = [];

        await db.query(qr, data, async (err, rs) => {
          if(err){
            console.log(err);
            return
          }
          id_kh = rs.insertId;
          if (req.files.length > 0) {
            const qr_ha = "INSERT INTO anh_khoa_hoc(akh_hinh, akh_idkh) VALUES ?";
            req.files.map((file) => {
              values.push([file.filename, id_kh]);
            });
            await db.query(qr_ha, [values], (err, results) => {
              if (err) console.log(err);
            });
          }
        });

        return res.status(200).send("Thêm thành công");
      }
    });
  });

  app.get("/khoahocs", async (req, res) => {
    let qr = `
    SELECT 
        *
    FROM khoa_hoc
    `;
    if (req.query.search) {
      qr += ` WHERE kh_makh like '%${req.query.search}%' or 
                  kh_ten like '%${req.query.search}%' 
      `;
    }
    const _khoahocs = await query(db, qr);
    await Promise.all(
      _khoahocs.map(async (khoahoc, idx) => {
        _hinhanh = await query(
          db,
          "SELECT * FROM anh_khoa_hoc WHERE akh_idkh = ?",
          khoahoc.kh_id
        );
        _khoahocs[idx].kh_hinhanh = _hinhanh;
      })
    );
    res.status(200).send(_khoahocs);
  });

  app.post("/khoahoc/active", async (req, res) => {
      const {id, active} = req.body;
      console.log(req.body);
      if (!id) return res.status(404).send("No content");
      const qr = "UPDATE khoa_hoc SET active = ? where kh_id = ?";
      sql.query(qr, [active, id], (err, _) => {
          if (err) {
              console.log(err);
              return res.status(500).send(err);
          }
          return res.status(200).send("Cập nhật thành công");
      });
  });


  //lay khoa hoc theo id sp
  app.get("/khoahoc/:id", async (req, res) => {
    const { id } = req.params;
    let qr = `
    SELECT 
        *
        FROM khoa_hoc
            WHERE kh_id = ?;
    `;
    const _khoahocs = await query(db, qr, id);
    _hinhanh = await query(db, "SELECT * FROM anh_khoa_hoc WHERE akh_idkh = ?", id);
    if (_khoahocs.length > 0) _khoahocs[0].kh_hinhanh = _hinhanh;
    res.status(200).send(_khoahocs[0]);
  });

  app.put("/khoahoc/:id", upload.array("kh_hinhanh", 10), async (req, res) => {
    const id = req.params.id;
    upload.array("kh_hinhanh", 10);
    let { data } = req.body;
    data = JSON.parse(data);
    if (req.files.length > 0) {
      await query(db, "DELETE FROM anh_khoa_hoc WHERE akh_idkh = ?", id);
      const qr_ha = "INSERT INTO anh_khoa_hoc(akh_hinh, akh_idkh) VALUES ?";
      let values = [];
      req.files.map((file) => {
        values.push([file.filename, id]);
      });
      await db.query(qr_ha, [values], (err, results) => {
        if (err) console.log(err);
      });
    } else {
      let results = await query(
        db,
        "SELECT * FROM anh_khoa_hoc WHERE akh_idkh = ?",
        id
      );
    //   console.log(results.length, data.sp_hinhanh);
      if (results.length !== data.kh_hinhanh.length) {
        await query(db, "DELETE FROM anh_khoa_hoc WHERE akh_idkh = ?", id);
        let values = [];
        // console.log(data.sp_hinhanh);
        data.kh_hinhanh.map((e) => {
          values.push([e.replace("http://localhost:4000/public/", ""), id]);
        });
        const qr_ha1 = "INSERT INTO anh_khoa_hoc(akh_hinh, akh_idkh) VALUES ?";
        await db.query(qr_ha1, [values], (err, results) => {
          if (err) console.log(err);
        });
      }
    }
    delete data.kh_hinhanh;
    delete data.kh_hinhanh_old;
    await db.query(
      "UPDATE khoa_hoc SET ? WHERE kh_id = ?",
      [data, id],
      (err, results) => {
        if (err) console.log(err);
      }
    );
    return res.status(200).send("Cập nhật thành công");
  });

  app.delete("/khoahoc/delete", async (req, res) => {
    if (!!req.body.arrID) {
      const arrID = JSON.parse(req.body.arrID);
      await Promise.all(
        arrID.map(async (e) => {
          let qr_sp = "DELETE FROM khoa_hoc where kh_id = ?";
          await db.query(qr_sp, [e], (err, _) => {
            if (err) {
              console.log(err);
            }
          });

          let qr_ha = "DELETE FROM anh_khoa_hoc where akh_idkh = ?";
          await db.query(qr_ha, [e], (err, _) => {
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