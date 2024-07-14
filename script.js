let btn = document.querySelector(".button");
let qr_code_element = document.querySelector(".qr-code");

btn.addEventListener("click", () => {
  let user_input = document.querySelector("#input_text");
  if (user_input.value != "") {
    if (qr_code_element.childElementCount == 0) {
      generate(user_input);
      inputInfo(user_input);
    } else {
      qr_code_element.innerHTML = "";
      generate(user_input);
      inputInfo(user_input);
    }
  } else {
    alert("Please enter a valid input");
    qr_code_element.style = "display: none";
  }
});

// function append what was inputted below the qr code
function inputInfo(user_input) {
  let info = document.createElement("div");
  info.classList.add("input-info");
  info.innerHTML = `<p style = 
  'outline: none;
  border: none;
  border-radius: 0.5rem;
  padding: 1.5rem 2.5rem;
  margin-bottom: 3rem;
  background-color: #5b92799d;
  background-color: #626567;
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;'>QRCode for: ${user_input.value}</p>`;
  qr_code_element.appendChild(info);
}

function generate(user_input) {
  qr_code_element.style = "";

  var qrcode = new QRCode(qr_code_element, {
    text: `${user_input.value}`,
    width: 180, //128
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  let download = document.createElement("button");
  qr_code_element.appendChild(download);

  let download_link = document.createElement("a");
  download_link.setAttribute("download", "qr_code.png");
  download_link.innerHTML = `Download <i class="fa-solid fa-download"></i>`;

  download.appendChild(download_link);

  let qr_code_img = document.querySelector(".qr-code img");
  let qr_code_canvas = document.querySelector("canvas");

  if (qr_code_img.getAttribute("src") == null) {
    setTimeout(() => {
      download_link.setAttribute("href", `${qr_code_canvas.toDataURL()}`);
    }, 300);
  } else {
    setTimeout(() => {
      download_link.setAttribute("href", `${qr_code_img.getAttribute("src")}`);
    }, 300);
  }
}

generate({
  value: "https://murtuzaalisurti.github.io/qr"
});

function printThis(div) {
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>Print</title>');
  printWindow.document.write('</head><body >');
  printWindow.document.write(div.innerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}