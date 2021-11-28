const express = require("express");
const bp = require("body-parser");
const QRCode = require("qrcode");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/"));
app.set("view engine", "ejs");
app.use(
  bp.urlencoded({
    extended: false,
  })
);
app.use(bp.json());

//  Render the index page
app.get("/", async (req, res) => {
  res.render("index");
});

//  One function to generate the QR codes
app.post("/generate", async (req, res) => {
  //  QR options
  //  By default the colors are black for the pattern and white for the background
  const qrBGColor = req.body.qrBGColor;
  const qrPatternColor = req.body.qrPatternColor;
  const qrOptions = {
    errorCorrectionLevel: "H",
    margin: 0.5,
    width: 1000,
    height: 1000,
    color: {
      dark: qrPatternColor,
      light: qrBGColor,
    },
  };
  //  encode the data to a base64 string
  QRCode.toDataURL(req.body.qrData, qrOptions, (err, src) => {
    if (err) res.send("Something went wrong!");
    const img = Buffer.from(src);
    //  Send the image back to the frontend
    res.send(img);
  });
});

//  404 redirects to home page
//  I don't think a separate 404 page is required at the moment
//  Maybe in the future?
app.get("*", function (req, res) {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
