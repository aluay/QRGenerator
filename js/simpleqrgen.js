//  Tabs handler
// Switches between tabs and changes the color of the activated tab
function openTab(tabName, activeTab) {
    let tab = document.getElementsByClassName("tab");
    let button = document.getElementsByClassName('tButton');
    let selectedTab = document.getElementById(tabName);
    let active = document.getElementById(activeTab);
    for (let i = 0; i < tab.length; i++) {
        tab[i].style.display = "none";
        button[i].style.backgroundColor = "var(--darkBGColor)";
        button[i].style.border = "solid 1px var(--grayColor)";
    }
    active.style.backgroundColor = "var(--surfaceColor)";
    active.style.border = "solid 1px transparent";
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
textarea.onkeyup = function() {
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
$("#textQR").keyup(function(event) {
    event.preventDefault();
    const qrData = $("#textInput").val();
    //  Stop form submission if qrData is empty
    if (qrData) {
        sendToGenerator(qrData);
    } else {
        return false;
    }
});

//  URL qr generator
//  Format the input and sends it to the server
$("#urlQR").keyup(function(event) {
    event.preventDefault();
    const qrData = $("#urlInput").val();
    //  Stop form submission if qrData is empty
    if (qrData) {
        sendToGenerator(qrData);
    } else {
        return false;
    }
});

//  WiFi qr generator
//  Format the input and sends it to the server
$("#wifiQR").on("keyup change", function() {
    const qrData = `WIFI:S:${$("#wifiInput").val()};T:${$("#wifiEncryption").val()};P:${$("#wifiPasswordInput").val()};;`;
    //  Stop form submission if qrData is empty
    if (qrData) {
        sendToGenerator(qrData);
    } else {
        return false;
    }
});

//  SMS qr generator
//  Format the input and sends it to the server
$("#smsQR").keyup(function() {
    const qrData = `SMSTO:${$("#phoneNumber").val()}:${$("#messageToSend").val()}`;
    //  Stop form submission if qrData is empty
    if (qrData) {
        sendToGenerator(qrData);
    } else {
        return false;
    }
});

//  Email qr generator
//  Format the input and sends it to the server
$("#emailQR").keyup(function() {
    const qrData = `mailto:${$("#emailAddress").val()}?subject=${$("#subject").val()}&body=${$("#emailToSend").val()}`
        //  Stop form submission if qrData is empty
    if (qrData) {
        sendToGenerator(qrData);
    } else {
        return false;
    }
});

//  Phone qr generator
//  Format the input and sends it to the server
$("#phoneQR").keyup(function(event) {
    event.preventDefault();
    const qrData = `tel:${$("#phone").val()}`;
    //  Stop form submission if qrData is empty
    if (qrData) {
        sendToGenerator(qrData);
    } else {
        return false;
    }
});

//  vCard qr generator
//  Format the input and sends it to the server
$("#vcardQR").keyup(function(event) {
    event.preventDefault();
    //  VERY long const since the vCard format has lots of details
    const qrData = `BEGIN:VCARD\nVERSION:3\nN:${$("#lastName").val()};${$("#firstName").val()}\nORG:${$("#org").val()}\nTITLE:${$("#workTitle").val()}\nURL:${$("#website").val()}\nEMAIL;TYPE=INTERNET:${$("#email").val()}\nTEL;CELL:${$("#personalPhoneNumber").val()}\nTEL;WORK;VOICE:${$("#workPhoneNumber").val()}\nADR:;;${$("#streetAddress").val()};${$("#city").val()};${$("#state").val()};${$("#zipcode").val()};${$("#country").val()}\nEND:VCARD`;
    if (qrData) {
        sendToGenerator(qrData);
    } else {
        return false;
    }
});

//  One method that gets called by jQuery code above
//  It takes the data and sends it to the generator
const sendToGenerator = async(qrData) => {
    $.ajax({
        global: false,
        type: "POST",
        url: "/generate",
        dataType: "html",
        data: {
            qrData
        },
        success: function(result) {
            //  update the img element SRC to show newly generated QR code
            $("#qrImg").attr("src", result);
        },
        error: function(request, status, error) {
            console.log(error);
        },
    });
}