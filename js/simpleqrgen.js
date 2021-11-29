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
$("#textQR").on("keyup change", function (event) {
  event.preventDefault();
  const textQRPatternColor = $("#textQRPatternColor").text(
    $("#textQRPatternColor")
  );
  const textQRBGColor = $("#textQRBGColor").text($("#textQRBGColor"));
  const qrData = $("#textInput").val();
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, textQRBGColor.val(), textQRPatternColor.val());
  } else {
    return false;
  }
});

//  URL qr generator
//  Format the input and sends it to the server
$("#urlQR").on("keyup change", function (event) {
  event.preventDefault();
  const urlQRPatternColor = $("#urlQRPatternColor").text(
    $("#urlQRPatternColor")
  );
  const urlQRBGColor = $("#urlQRBGColor").text($("#urlQRBGColor"));
  const qrData = $("#urlInput").val();
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, urlQRBGColor.val(), urlQRPatternColor.val());
  } else {
    return false;
  }
});

//  WiFi qr generator
//  Format the input and sends it to the server
$("#wifiQR").on("keyup change", function () {
  const wifiQRPatternColor = $("#wifiQRPatternColor").text(
    $("#wifiQRPatternColor")
  );
  const wifiQRBGColor = $("#wifiQRBGColor").text($("#wifiQRBGColor"));
  const qrData = `WIFI:S:${$("#wifiInput").val()};T:${$(
    "#wifiEncryption"
  ).val()};P:${$("#wifiPasswordInput").val()};;`;
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, wifiQRBGColor.val(), wifiQRPatternColor.val());
  } else {
    return false;
  }
});

//  Crypto qr generator
//  Format the input and sends it to the server
$("#cryptoQR").on("keyup change", function () {
  const cryptoQRPatternColor = $("#cryptoQRPatternColor").text(
    $("#cryptoQRPatternColor")
  );
  const cryptoQRBGColor = $("#cryptoQRBGColor").text($("#cryptoQRBGColor"));
  const qrData = `${$("#cryptoList").val()}:${$(
    "#cryptoAddress"
  ).val()}?amount=${$("#cryptoAmount").val()}&message=${$(
    "#cryptoMessage"
  ).val()}`;
  console.log(qrData);
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, cryptoQRBGColor.val(), cryptoQRPatternColor.val());
  } else {
    return false;
  }
});

//  SMS qr generator
//  Format the input and sends it to the server
$("#smsQR").on("keyup change", function () {
  const smsQRPatternColor = $("#smsQRPatternColor").text(
    $("#smsQRPatternColor")
  );
  const smsQRBGColor = $("#smsQRBGColor").text($("#smsQRBGColor"));
  const qrData = `SMSTO:${$("#phoneNumber").val()}:${$(
    "#messageToSend"
  ).val()}`;
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, smsQRBGColor.val(), smsQRPatternColor.val());
  } else {
    return false;
  }
});

//  Email qr generator
//  Format the input and sends it to the server
$("#emailQR").on("keyup change", function () {
  const emailQRPatternColor = $("#emailQRPatternColor").text(
    $("#emailQRPatternColor")
  );
  const emailQRBGColor = $("#emailQRBGColor").text($("#emailQRBGColor"));
  const qrData = `mailto:${$("#emailAddress").val()}?subject=${$(
    "#subject"
  ).val()}&body=${$("#emailToSend").val()}`;
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, emailQRBGColor.val(), emailQRPatternColor.val());
  } else {
    return false;
  }
});

//  Phone qr generator
//  Format the input and sends it to the server
$("#phoneQR").on("keyup change", function (event) {
  const phoneQRPatternColor = $("#phoneQRPatternColor").text(
    $("#phoneQRPatternColor")
  );
  const phoneQRBGColor = $("#phoneQRBGColor").text($("#phoneQRBGColor"));
  event.preventDefault();
  const qrData = `tel:${$("#phone").val()}`;
  //  Stop form submission if qrData is empty
  if (qrData) {
    sendToGenerator(qrData, phoneQRBGColor.val(), phoneQRPatternColor.val());
  } else {
    return false;
  }
});

//  vCard qr generator
//  Format the input and sends it to the server
$("#vcardQR").on("keyup change", function (event) {
  const vcardQRPatternColor = $("#vcardQRPatternColor").text(
    $("#vcardQRPatternColor")
  );
  const vcardQRBGColor = $("#vcardQRBGColor").text($("#vcardQRBGColor"));
  event.preventDefault();
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
    sendToGenerator(qrData, vcardQRBGColor.val(), vcardQRPatternColor.val());
  } else {
    return false;
  }
});

//  One method that gets called by jQuery code above
//  It takes the data and sends it to the generator
const sendToGenerator = async (qrData, qrBGColor, qrPatternColor) => {
  $.ajax({
    global: false,
    type: "POST",
    url: "/generate",
    dataType: "html",
    data: {
      qrData,
      qrBGColor,
      qrPatternColor,
    },
    success: function (result) {
      //  update the img element SRC to show newly generated QR code
      $("#qrImgDownload").attr("href", result);
      $("#qrImg").attr("src", result);
    },
    error: function (request, status, error) {
      console.log(error);
    },
  });
};
