let btn = document.querySelector(".button");

btn.addEventListener("click", () => {
    let user_input = document.querySelector("#input_text");
    if (user_input.value != "") {
        generateBarcode(user_input.value);
        inputInfo(user_input);
    } else {
        alert("Please enter a valid input");
        qr_code_element.style = "display: none";
    }
});

function generateBarcode(value) {

    JsBarcode("#barcode", value, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true
    })

    let download = document.createElement("button");
    document.querySelector(".barcode").appendChild(download);

    let download_link = document.createElement("a");
    download_link.setAttribute("download", "barcode.png");
    download_link.innerHTML = `Download <i class="fa-solid fa-download"></i>`;
    download.appendChild(download_link);

    let barcode_img = document.querySelector(".barcode img");
    let barcode = document.querySelector(".barcode");

    barcode_img.style = "display: none";
    barcode.style = "display: block";


}