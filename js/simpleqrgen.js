//  Tabs handler
// Switches between tabs and changes the color of the activated tab
function openTab(tabName, activeTab) {
  let tab = document.getElementsByClassName("tab");
  let button = document.getElementsByClassName("tButton");
  let selectedTab = document.getElementById(tabName);
  let active = document.getElementById(activeTab);
  for (let i = 0; i < tab.length; i++) {
    tab[i].style.display = "none";
    button[i].style.backgroundColor = "var(--darkBGColor)";
  }
  active.style.backgroundColor = "var(--surfaceColor)";
  selectedTab.style.display = "block";
}

//  Character counter
// Counts the characters and changes the counter background to red
//  when there's only 200 characters left
const textarea = document.getElementById("textInput");
const length = textarea.getAttribute("maxlength");
const count = document.getElementById("counterDiv");
const counterDiv = document.getElementById("counterDiv");
count.innerHTML = length;
textarea.onkeyup = function () {
  count.innerHTML = length - this.value.length;
  if (this.value.length >= 1000) {
    count.classList.remove("countLessThan");
    count.classList.add("countMoreThan");
  }
  if (this.value.length < 1000) {
    count.classList.remove("countMoreThan");
    count.classList.add("countLessThan");
  }
};

//  Text qr generator
//  Format the input and sends it to the server
$("#textQR, #modSection").on("keyup change", function (event) {
  event.preventDefault();
  const qrSizeSlider = $("#qrSizeSlider").val();
  const QRPatternColor = $("#QRPatternColor").text($("#QRPatternColor")).val();
  const QRBGColor = $("#QRBGColor").text($("#QRBGColor")).val();
  const qrData = $("#textInput").val();
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, QRBGColor, QRPatternColor, qrSizeSlider);
  } else {
    return false;
  }
});

//  URL qr generator
//  Format the input and sends it to the server
$("#urlQR, #modSection").on("keyup change", function (event) {
  event.preventDefault();
  const qrSizeSlider = $("#qrSizeSlider").val();
  const QRPatternColor = $("#QRPatternColor").text($("#QRPatternColor")).val();
  const QRBGColor = $("#QRBGColor").text($("#QRBGColor")).val();
  const qrData = $("#urlInput").val();
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, QRBGColor, QRPatternColor, qrSizeSlider);
  } else {
    return false;
  }
});

//  WiFi qr generator
//  Format the input and sends it to the server
$("#wifiQR, #modSection").on("keyup change", function (event) {
  event.preventDefault();
  const qrSizeSlider = $("#qrSizeSlider").val();
  const QRPatternColor = $("#QRPatternColor").text($("#QRPatternColor")).val();
  const QRBGColor = $("#QRBGColor").text($("#QRBGColor")).val();
  const qrData = `WIFI:S:${$("#wifiInput").val()};T:${$(
    "#wifiEncryption"
  ).val()};P:${$("#wifiPasswordInput").val()};;`;
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, QRBGColor, QRPatternColor, qrSizeSlider);
  } else {
    return false;
  }
});

//  Crypto qr generator
//  Format the input and sends it to the server
$("#cryptoQR, #modSection").on("keyup change", function (event) {
  event.preventDefault();
  const qrSizeSlider = $("#qrSizeSlider").val();
  const QRPatternColor = $("#QRPatternColor").text($("#QRPatternColor")).val();
  const QRBGColor = $("#QRBGColor").text($("#QRBGColor")).val();
  const qrData = `${$("#cryptoList").val()}:${$(
    "#cryptoAddress"
  ).val()}?amount=${$("#cryptoAmount").val()}&message=${$(
    "#cryptoMessage"
  ).val()}`;
  console.log(qrData);
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, QRBGColor, QRPatternColor, qrSizeSlider);
  } else {
    return false;
  }
});

//  SMS qr generator
//  Format the input and sends it to the server
$("#smsQR, #modSection").on("keyup change", function (event) {
  event.preventDefault();
  const qrSizeSlider = $("#qrSizeSlider").val();
  const QRPatternColor = $("#QRPatternColor").text($("#QRPatternColor")).val();
  const QRBGColor = $("#QRBGColor").text($("#QRBGColor")).val();
  const qrData = `SMSTO:${$("#phoneNumber").val()}:${$(
    "#messageToSend"
  ).val()}`;
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, QRBGColor, QRPatternColor, qrSizeSlider);
  } else {
    return false;
  }
});

//  Email qr generator
//  Format the input and sends it to the server
$("#emailQR, #modSection").on("keyup change", function (event) {
  event.preventDefault();
  const qrSizeSlider = $("#qrSizeSlider").val();
  const QRPatternColor = $("#QRPatternColor").text($("#QRPatternColor")).val();
  const QRBGColor = $("#QRBGColor").text($("#QRBGColor")).val();
  const qrData = `mailto:${$("#emailAddress").val()}?subject=${$(
    "#subject"
  ).val()}&body=${$("#emailToSend").val()}`;
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, QRBGColor, QRPatternColor, qrSizeSlider);
  } else {
    return false;
  }
});

//  Phone qr generator
//  Format the input and sends it to the server
$("#phoneQR, #modSection").on("keyup change", function (event) {
  event.preventDefault();
  const qrSizeSlider = $("#qrSizeSlider").val();
  const QRPatternColor = $("#QRPatternColor").text($("#QRPatternColor")).val();
  const QRBGColor = $("#QRBGColor").text($("#QRBGColor")).val();
  const qrData = `tel:${$("#phone").val()}`;
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, QRBGColor, QRPatternColor, qrSizeSlider);
  } else {
    return false;
  }
});

//  vCard qr generator
//  Format the input and sends it to the server
$("#vcardQR, #modSection").on("keyup change", function (event) {
  event.preventDefault();
  const qrSizeSlider = $("#qrSizeSlider").val();
  const QRPatternColor = $("#QRPatternColor").text($("#QRPatternColor")).val();
  const QRBGColor = $("#QRBGColor").text($("#QRBGColor")).val();
  //  VERY long const since the vCard format has lots of details
  const qrData = `BEGIN:VCARD\nVERSION:3\nN:${$("#lastName").val()};${$(
    "#firstName"
  ).val()}\nORG:${$("#org").val()}\nTITLE:${$("#workTitle").val()}\nURL:${$(
    "#url"
  ).val()}\nEMAIL;TYPE=INTERNET:${$("#email").val()}\nTEL;CELL:${$(
    "#personalPhoneNumber"
  ).val()}\nTEL;WORK;VOICE:${$("#workPhoneNumber").val()}\nADR:;;${$(
    "#streetAddress"
  ).val()};${$("#city").val()};${$("#state").val()};${$("#zipcode").val()};${$(
    "#country"
  ).val()}\nEND:VCARD`;
  if (qrData) {
    sendToGenerator(qrData, QRBGColor, QRPatternColor, qrSizeSlider);
  } else {
    return false;
  }
});

//  One method that gets called by jQuery code above
//  It takes the data and sends it to the generator
const sendToGenerator = async (qrData, qrBGColor, qrPatternColor, qrSize) => {
  $.ajax({
    global: false,
    type: "POST",
    url: "/generate",
    dataType: "html",
    data: {
      qrData,
      qrBGColor,
      qrPatternColor,
      qrSize
    },
    success: function (result) {
      //  update the img element SRC to show newly generated QR code
      $("#qrImgDownload").attr("href", result);
      $("#qrImgDownload").css("display", "block");
      $("#qrImg").attr("src", result);
      $(".qrColorsDiv").css("display", "block");
    },
    error: function (request, status, error) {
      console.log(error);
    },
  });
};

//  Slider Code
//  Simple and it works
const slider = document.getElementById("qrSizeSlider");
const output = document.getElementById("qrSizeValue");
output.innerHTML = slider.value;
output.innerHTML = "1000 x 1000"
slider.oninput = function () {
  output.innerHTML = this.value + " x " + this.value;
}