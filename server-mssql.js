const express = require("express");
const sql = require("mssql");
const app = express();
const cors = require("cors");

app.use(cors());

const config = {
  user: "sa_blog",
  password: "123456Abc@",
  server: "localhost",
  port: 1433,
  database: "blogweb",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Task 2: GET API Modules
app.get("/api/modules", async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT * FROM modules");
    res.json(result.recordset);
  } catch (err) {
    console.error("Lỗi kết nối DB:", err.message); // In lỗi ra terminal của server để bạn xem
    res.status(500).json({ error: err.message }); // Trả về JSON thay vì Text
  }
});

// Task 3: GET API Lessons theo Module ID
app.get("/api/lessons/:moduleId", async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("modId", sql.Int, req.params.moduleId)
      .query("SELECT * FROM lessons WHERE module_id = @modId");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => {
  console.log("Server đang chạy tại http://localhost:3000");
});
