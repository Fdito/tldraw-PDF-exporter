function createButton(){
    var span = document.createElement('span')
    span.innerHTML = '<span data-state="closed" dir="ltr"><button id="TD-PrimaryTools-PDFexport" class="c-eyvddw c-eyvddw-dFXbZW-variant-primary c-eyvddw-ivYAPe-bp-mobile c-eyvddw-biWXHT-cv c-eyvddw-dJbHNS-cv c-eyvddw-jsHxGT-cv"><div class="c-lkmCgW"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M88 264C114.5 264 136 285.5 136 312C136 338.5 114.5 360 88 360H72V400C72 404.4 68.42 408 64 408C59.58 408 56 404.4 56 400V272C56 267.6 59.58 264 64 264H88zM120 312C120 294.3 105.7 280 88 280H72V344H88C105.7 344 120 329.7 120 312zM168 272C168 267.6 171.6 264 176 264H200C222.1 264 240 281.9 240 304V368C240 390.1 222.1 408 200 408H176C171.6 408 168 404.4 168 400V272zM184 280V392H200C213.3 392 224 381.3 224 368V304C224 290.7 213.3 280 200 280H184zM336 264C340.4 264 344 267.6 344 272C344 276.4 340.4 280 336 280H296V328H336C340.4 328 344 331.6 344 336C344 340.4 340.4 344 336 344H296V400C296 404.4 292.4 408 288 408C283.6 408 280 404.4 280 400V272C280 267.6 283.6 264 288 264H336zM204.1 0C216.8 0 229.1 5.057 238.1 14.06L369.9 145.9C378.9 154.9 384 167.2 384 179.9V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64C0 28.65 28.65 0 64 0L204.1 0zM64 496H320C346.5 496 368 474.5 368 448V179.9C368 178.6 367.9 177.3 367.8 176H248C225.9 176 208 158.1 208 136V16.24C206.7 16.08 205.4 16 204.1 16H64C37.49 16 16 37.49 16 64V448C16 474.5 37.49 496 64 496V496zM226.7 25.37C225.9 24.5 224.1 23.68 224 22.93V136C224 149.3 234.7 160 248 160H361.1C360.3 159 359.5 158.1 358.6 157.3L226.7 25.37z"></path></svg></div></button></span>'
    document.querySelector("#TD-PrimaryTools").appendChild(span)
}
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = mm + '_' + dd + '_' + yyyy;
createButton()
setInterval(() => {
    if (!document.querySelector("#TD-PrimaryTools-PDFexport") && document.querySelector("#TD-PrimaryTools")){
        createButton()
    } else {
        return false
    }
}, 1);
document.getElementById('TD-PrimaryTools-PDFexport').addEventListener('click', exportpdf)
document.getElementById('TD-PrimaryTools-PDFexport').addEventListener('contextmenu', function (ev) {
    ev.preventDefault();
    capturepages()
    return false;
}
)
setInterval(() => {
    if (document.querySelector("#__next > div > div").classList == 'c-jOyZnp t-ljGyqI') {
        document.getElementById('canvas').style.background = '#212529'
    } else {
        document.getElementById('canvas').style.background = ''
    }
}, 1);

function exportpdf() {
    window.jsPDF = window.jspdf.jsPDF;
    let src = document.getElementById('canvas');
    html2canvas(src).then(function (canvas) {
        const imgData = canvas.toDataURL();
        var height = canvas.height
        var width = canvas.width
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [width, height],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(today+'.pdf');
    });
    console.clear()
}
var imagecaptureddata = [
]
var hasEscListener = false
function capturepages() {
    let src = document.getElementById('canvas');
    html2canvas(src).then(function (canvas) {
        var imagedata = {};
        const Base64 = canvas.toDataURL();
        imagedata.data = Base64
        let size = [];
        let width = canvas.width
        let height = canvas.height
        let imgsize = {
            width,
            height,
        };
        imagedata.size = imgsize;
        imagecaptureddata.push(imagedata)
    });
    if (hasEscListener == false) {
        document.addEventListener('keydown', function handler(event) {
            if (event.key === "Escape") {
                generatepdf()
            }
        });
        hasEscListener = true
    } else {
        return false
    }
    console.clear()
    return false
}

function generatepdf() {
    if (imagecaptureddata === []) {
        return false
    } else {
        window.jsPDF = window.jspdf.jsPDF;
        let width = imagecaptureddata[0].size.width
        let height = imagecaptureddata[0].size.height
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [width, height],
        });
        pdf.addImage(imagecaptureddata[0].data, 'PNG', 0, 0, width, height);
        for (let i = 1; i < imagecaptureddata.length; i++) {
            let width = imagecaptureddata[i].size.width
            let height = imagecaptureddata[i].size.height
            pdf.addPage({
                orientation: 'landscape',
                unit: 'px',
                format: [width, height],
            })
            pdf.addImage(imagecaptureddata[i].data, 'PNG', 0, 0, width, height);

        }
        pdf.save(today+'.pdf');
        console.clear()
    };
}
