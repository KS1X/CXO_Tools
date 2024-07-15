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

function generateBarcode(line) {

    JsBarcode("#barcode", line, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true
    })
}

function printDiv(div) {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(div.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}