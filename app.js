const express = require("express");
const bp = require("body-parser");
const QRCode = require("qrcode");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/"));
app.set("view engine", "ejs");
app.use(bp.urlencoded({
    extended: false
}));
app.use(bp.json());

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/", async (req, res) => {
    const input = req.body.input;
    const qrOptions = {
        errorCorrectionLevel: 'H',
        margin: 0.5,
        width: 500,
        height: 500,
        color: {
            dark: "#000000",
            light: "#FFFFFF"
        }
    }

    QRCode.toDataURL(input, qrOptions, (err, src) => {
        if (err) res.send("Something went wrong!");
        res.render("index", {
            src
        })

    })
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})