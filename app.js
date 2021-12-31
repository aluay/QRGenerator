const express = require("express");
const bodyParser = require("body-parser");
const {
  QRCodeStyling
} = require("qr-code-styling-node/lib/qr-code-styling.common.js");
const nodeCanvas = require("canvas");
const {
  JSDOM
} = require("jsdom");

//  Initialize the express app
const app = express();
//  Operation port
const PORT = process.env.PORT || 3000;


//  Select view engine
//  For this project we use EJS
app.use(express.static(__dirname + "/"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//  Render homepage
app.get("/", async (req, res) => {
  res.render("index");
});

//  One function to generate the QR codes
app.post("/generate", async (req, res) => {

  //  Parse the json from the request body
  const modsObject = JSON.parse(req.body.modsJSON);

  //  QR options sent from frontend
  const options = {
    width: parseInt(modsObject.width),
    height: parseInt(modsObject.height),
    margin: parseInt(modsObject.margin),
    data: req.body.data,
    image: req.body.logoSrc,
    dotsOptions: {
      type: modsObject.dotsOptionsType,
      color: modsObject.dotsOptionsSingleColor,
      gradient: modsObject.dotsOptionsGradient
    },
    cornersSquareOptions: {
      type: modsObject.cornersSquareOptionsType,
      color: modsObject.cornersSquareOptionsSingleColor,
      gradient: modsObject.cornersSquareOptionsGradient
    },
    cornersDotOptions: {
      type: modsObject.cornersDotOptionsType,
      color: modsObject.cornersDotOptionsSingleColor,
      gradient: modsObject.cornersDotOptionsGradient
    },
    backgroundOptions: {
      color: modsObject.backgroundOptionsSingleColor,
      gradient: modsObject.backgroundOptionsGradient
    },
    imageOptions: {
      hideBackgroundDots: modsObject.imageOptionsHideBackgroundDots,
      imageSize: modsObject.imageOptionsImageSize,
      margin: modsObject.imageOptionsMargin,
      crossOrigin: "anonymous"
    },
    qrOptions: {
      typeNumber: modsObject.qrOptionsTypeNumber,
      mode: modsObject.qrOptionsMode,
      errorCorrectionLevel: modsObject.qrOptionsErrorCorrectionLevel
    },
  }

  //  Generate the QR Code
  const qrCodeImage = new QRCodeStyling({
    nodeCanvas,
    ...options
  });

  //  Get QR Code raw data and send it back to frontend
  qrCodeImage.getRawData("png").then((buffer) => {
    const bufferToB64 = Buffer.from(buffer).toString("base64");
    const base64 = "data:image/png;base64," + bufferToB64;
    res.send(base64);
  });
});

//  404 redirects to home page
//  I don't think a separate 404 page is required at the moment
//  Maybe in the future?
app.get("*", async (req, res) => {
  //  Render homepage
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});