const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express();
const port = Number(process.env.PORT || 3001)
const pageRoutes = require('./routes/pageRoutes');
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.use('/', pageRoutes);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send('Không thể tải dữ liệu sản phẩm. Hãy kiểm tra cấu hình MySQL.');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})