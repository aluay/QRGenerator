//  Tabs handler
//  Switches between tabs and changes the color of the activated tab
function openTab(tabName, activeTab) {
  let tab = document.getElementsByClassName("tab");
  let button = document.getElementsByClassName("tButton");
  let selectedTab = document.getElementById(tabName);
  let active = document.getElementById(activeTab);
  for (let i = 0; i < tab.length; i++) {
    tab[i].style.display = "none";
    button[i].style.backgroundColor = "var(--superLightGrayColor)";
  }
  selectedTab.style.display = "block";
  active.style.backgroundColor = "var(--lightGrayColor)";
}

//  Character counter
//  Counts the characters and changes the counter background to red
//  when there's only 200 characters left
function countChar(val) {
  const count = document.getElementById("counterDiv");
  var len = val.value.length;
  if (len >= 1200) {
    val.value = val.value.substring(0, 1200);
  } else {
    $('#count').text(1200 - len);
  }
  if (val.value.length >= 1000) {
    count.classList.remove("countLessThan");
    count.classList.add("countMoreThan");
  }
  if (val.value.length < 1000) {
    count.classList.remove("countMoreThan");
    count.classList.add("countLessThan");
  }
};

//  Control the accordion
let acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

//  Get all the mods from input fields
function getMods() {
  const modSection = document.getElementById("modSection");
  const inputElements = modSection.querySelectorAll("input, select");
  const mods = {};
  let dotsOptionsGradient = {};
  let cornersSquareOptionsGradient = {};
  let cornersDotOptionsGradient = {};
  let backgroundOptionsGradient = {};

  //  Create object out of the input elements and their values
  for (const input of inputElements) {
    mods[input.name] = input.value;
  }

  //  Modify the generated object based on selections
  for (const property in mods) {
    //  Dots options section
    if (mods.dotsOptionsColorType === 'gradient') {
      delete mods.dotsOptionsSingleColor;
      dotsOptionsGradient = {
        type: mods.dotsOptionsGradientSelect,
        rotation: mods.dotsOptionsGradientRotation / 180 * Math.PI,
        colorStops: [{
          offset: 0,
          color: mods.dotsOptionsGradientColorOne
        }, {
          offset: 1,
          color: mods.dotsOptionsGradientColorTwo
        }]
      }
      mods.dotsOptionsGradient = dotsOptionsGradient;
    } else {
      delete mods.dotsOptionsGradientSelect;
      delete mods.dotsOptionsGradientColorOne;
      delete mods.dotsOptionsGradientColorTwo;
      delete mods.dotsOptionsGradientRotation;
    }

    //  Corner square options section
    if (mods.cornersSquareOptionsColorType === 'gradient') {
      delete mods.cornersSquareOptionsSingleColor;
      cornersSquareOptionsGradient = {
        type: mods.cornersSquareOptionsGradientSelect,
        rotation: mods.cornersSquareOptionsGradientRotation / 180 * Math.PI,
        colorStops: [{
          offset: 0,
          color: mods.cornersSquareOptionsGradientColorOne
        }, {
          offset: 1,
          color: mods.cornersSquareOptionsGradientColorTwo
        }]
      }
      mods.cornersSquareOptionsGradient = cornersSquareOptionsGradient;
    } else {
      delete mods.cornersSquareOptionsGradientSelect;
      delete mods.cornersSquareOptionsGradientColorOne;
      delete mods.cornersSquareOptionsGradientColorTwo;
      delete mods.cornersSquareOptionsGradientRotation;
    }

    //  Corner dots options section
    if (mods.cornersDotOptionsColorType === 'gradient') {
      delete mods.cornersDotOptionsSingleColor;
      cornersDotOptionsGradient = {
        type: mods.cornersDotOptionsGradientSelect,
        rotation: mods.cornersDotOptionsGradientRotation / 180 * Math.PI,
        colorStops: [{
          offset: 0,
          color: mods.cornersDotOptionsGradientColorOne
        }, {
          offset: 1,
          color: mods.cornersDotOptionsGradientColorTwo
        }]
      }
      mods.cornersDotOptionsGradient = cornersDotOptionsGradient;
    } else {
      delete mods.cornersDotOptionsGradientSelect;
      delete mods.cornersDotOptionsGradientColorOne;
      delete mods.cornersDotOptionsGradientColorTwo;
      delete mods.cornersDotOptionsGradientRotation;
    }

    // Background options section
    if (mods.backgroundOptionsColorType === 'gradient') {
      delete mods.backgroundOptionsSingleColor;
      backgroundOptionsGradient = {
        type: mods.backgroundOptionsGradientSelect,
        rotation: mods.backgroundOptionsGradientRotation / 180 * Math.PI,
        colorStops: [{
          offset: 0,
          color: mods.backgroundOptionsGradientColorOne
        }, {
          offset: 1,
          color: mods.backgroundOptionsGradientColorTwo
        }]
      }
      mods.backgroundOptionsGradient = backgroundOptionsGradient;
    } else {
      delete mods.backgroundOptionsGradientSelect;
      delete mods.backgroundOptionsGradientColorOne;
      delete mods.backgroundOptionsGradientColorTwo;
      delete mods.backgroundOptionsGradientRotation;
    }
  }
  //  Return the finalized mods object
  return mods;
}

//  Text qr generator
//  Format the input before sending it to the server
const textQRFunction = async () => {
  const mods = getMods();
  const data = $("#textInput").val();
  //  Stop form submission if data is empty
  if (data) {
    sendToGenerator(data, mods);
  } else {
    return false;
  }
}

//  URL qr generator
//  Format the input before sending it to the server
const urlQRFunction = async () => {
  const mods = getMods();
  const data = $("#urlInput").val();
  //  Stop form submission if data is empty
  if (data) {
    sendToGenerator(data, mods);
  } else {
    return false;
  }
}

//  vCard qr generator
//  Format the input before sending it to the server
const vcardQRFunction = async () => {
  const mods = getMods();
  //  VERY long const since the vCard format has lots of details
  const data = `BEGIN:VCARD\nVERSION:3\nN:${$("#lastName").val()};${$(
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
  if (data) {
    sendToGenerator(data, mods);
  } else {
    return false;
  }
}

//  WiFi qr generator
//  Format the input before sending it to the server
const wifiQRFunction = async () => {
  const mods = getMods();
  const data = `WIFI:S:${$("#wifiInput").val()};T:${$(
    "#wifiEncryption"
  ).val()};P:${$("#wifiPasswordInput").val()};;`;
  //  Stop form submission if data is empty
  if (data) {
    sendToGenerator(data, mods);
  } else {
    return false;
  }
}

//  SMS qr generator
//  Format the input before sending it to the server
const smsQRFunction = async () => {
  const mods = getMods();
  const data = `SMSTO:${$("#phoneNumber").val()}:${$(
    "#messageToSend"
  ).val()}`;
  //  Stop form submission if data is empty
  if (data) {
    sendToGenerator(data, mods);
  } else {
    return false;
  }
}

//  Email qr generator
//  Format the input before sending it to the server
const emailQRFunction = async () => {
  const mods = getMods();
  const data = `mailto:${$("#emailAddress").val()}?subject=${$(
    "#subject"
  ).val()}&body=${$("#emailToSend").val()}`;
  //  Stop form submission if data is empty
  if (data) {
    sendToGenerator(data, mods);
  } else {
    return false;
  }
}

//  Phone qr generator
//  Format the input before sending it to the server
const phoneQRFunction = async () => {
  const mods = getMods();
  const data = `tel:${$("#phone").val()}`;
  //  Stop form submission if data is empty
  if (data) {
    sendToGenerator(data, mods);
  } else {
    return false;
  }
}

//  Crypto qr generator
//  Format the input before sending it to the server
const cryptoQRFunction = async () => {
  const mods = getMods();
  const data = `${$("#cryptoList").val()}:${$(
    "#cryptoAddress"
  ).val()}?amount=${$("#cryptoAmount").val()}&message=${$(
    "#cryptoMessage"
  ).val()}`;
  //  Stop form submission if data is empty
  if (data) {
    sendToGenerator(data, mods);
  } else {
    return false;
  }
}

//  Sends data and mods to the server
const sendToGenerator = async (data, mods) => {
  const modsJSON = JSON.stringify(mods);
  const logoImg = document.getElementById("logo");

  if (logoImg.files && logoImg.files[0]) {
    const reader = new FileReader();
    reader.readAsDataURL(logoImg.files[0]);
    reader.onloadend = function () {
      const logoSrc = reader.result;
      $.ajax({
        global: false,
        type: "POST",
        url: "/generate",
        dataType: "html",
        data: {
          data,
          modsJSON,
          logoSrc
        },
        success: async (result) => {
          //  Update the img element SRC to show newly generated QR code
          $("#qrImgDownload").attr("href", result);
          $("#qrImgDownload").css("display", "block");
          $("#qrImg").attr("src", result);
        },
        error: function (request, status, error) {
          console.log(error);
        },
      });
    }
  } else {
    const logoSrc = null;
    $.ajax({
      global: false,
      type: "POST",
      url: "/generate",
      dataType: "html",
      data: {
        data,
        modsJSON,
        logoSrc
      },
      success: async (result) => {
        //  Update the img element SRC to show newly generated QR code
        $("#qrImgDownload").attr("href", result);
        $("#qrImgDownload").css("display", "block");
        $("#qrImg").attr("src", result);
      },
      error: function (request, status, error) {
        console.log(error);
      },
    });
  }
};

//  Handle single and gradient selections
function dotsOptionsSwitchColorType() {
  const dotsOptionsColorType = document.getElementById("dotsOptionsColorType").value;
  if (dotsOptionsColorType === 'gradient') {
    //  Hide single
    document.getElementById("dotsOptionSingleWrapper").style.visibility = 'hidden';
    document.getElementById("dotsOptionSingleWrapper").style.height = '0';

    //  Show gradient
    document.getElementById("dotsOptionGradientWrapper").style.visibility = 'visible';
    document.getElementById("dotsOptionGradientWrapper").style.height = "auto";
  } else {
    //  Show single
    document.getElementById("dotsOptionSingleWrapper").style.visibility = 'visible';
    document.getElementById("dotsOptionSingleWrapper").style.height = 'auto';

    //  Hide gradient
    document.getElementById("dotsOptionGradientWrapper").style.visibility = 'hidden';
    document.getElementById("dotsOptionGradientWrapper").style.height = '0';
  }
}

//  Handle single and gradient selections
function cornersSquareOptionsSwitchColorType() {
  const cornersSquareOptionsColorType = document.getElementById("cornersSquareOptionsColorType").value;
  if (cornersSquareOptionsColorType === 'gradient') {
    //  Hide single
    document.getElementById("cornersSquareOptionsSingleWrapper").style.visibility = 'hidden';
    document.getElementById("cornersSquareOptionsSingleWrapper").style.height = '0';

    //  Show gradient
    document.getElementById("cornersSquareOptionsGradientWrapper").style.visibility = 'visible';
    document.getElementById("cornersSquareOptionsGradientWrapper").style.height = "auto";
  } else {
    //  Show single
    document.getElementById("cornersSquareOptionsSingleWrapper").style.visibility = 'visible';
    document.getElementById("cornersSquareOptionsSingleWrapper").style.height = 'auto';

    //  Hide gradient
    document.getElementById("cornersSquareOptionsGradientWrapper").style.visibility = 'hidden';
    document.getElementById("cornersSquareOptionsGradientWrapper").style.height = '0';
  }
}

//  Handle single and gradient selections
function cornersDotOptionsSwitchColorType() {
  const cornersDotOptionsColorType = document.getElementById("cornersDotOptionsColorType").value;
  if (cornersDotOptionsColorType === 'gradient') {
    //  Hide single
    document.getElementById("cornersDotOptionsSingleWrapper").style.visibility = 'hidden';
    document.getElementById("cornersDotOptionsSingleWrapper").style.height = "0"
    //  Show gradient
    document.getElementById("cornersDotOptionsGradientWrapper").style.visibility = 'visible';
    document.getElementById("cornersDotOptionsGradientWrapper").style.height = "auto";
  } else {
    //  Show single
    document.getElementById("cornersDotOptionsSingleWrapper").style.visibility = 'visible';
    document.getElementById("cornersDotOptionsSingleWrapper").style.height = 'auto';
    //  Hide gradient
    document.getElementById("cornersDotOptionsGradientWrapper").style.visibility = 'hidden';
    document.getElementById("cornersDotOptionsGradientWrapper").style.height = '0';
  }
}

//  Handle single and gradient selections
function backgroundOptionsSwitchColorType() {
  const backgroundOptionsColorType = document.getElementById("backgroundOptionsColorType").value;
  if (backgroundOptionsColorType === 'gradient') {
    //  Hide single
    document.getElementById("backgroundOptionsSingleWrapper").style.visibility = 'hidden';
    document.getElementById("backgroundOptionsSingleWrapper").style.height = "0"
    //  Show gradient
    document.getElementById("backgroundOptionsGradientWrapper").style.visibility = 'visible';
    document.getElementById("backgroundOptionsGradientWrapper").style.height = "auto";
  } else {
    //  Show single
    document.getElementById("backgroundOptionsSingleWrapper").style.visibility = 'visible';
    document.getElementById("backgroundOptionsSingleWrapper").style.height = 'auto';
    //  Hide gradient
    document.getElementById("backgroundOptionsGradientWrapper").style.visibility = 'hidden';
    document.getElementById("backgroundOptionsGradientWrapper").style.height = '0';
  }
}

//  Show logo preview
logo.onchange = evt => {
  const [file] = logo.files
  if (file) {
    logoPreview.src = URL.createObjectURL(file)
  }
}

//  Clear logo from file input
function clearLogo() {
  document.getElementById("logo").value = "";
  document.getElementById("logoPreview").src = "";
}

// //  Dark mode toggle
const toggleSwitch = document.querySelector('.darkModeDiv input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}
toggleSwitch.addEventListener('change', switchTheme, false);


//  Load gif on load and set dark mode icon
window.onload = function () {
  const MIN = 1;
  const MAX = 10;
  const DELTA = MAX - MIN;
  const initialRandom = Math.random();
  const multiplied = initialRandom * DELTA;
  const floored = Math.floor(multiplied);
  const gifNumber = floored + MIN;
  document.getElementById("qrImg").src = `/assets/image/preGif${gifNumber}.gif`;
}