$(document).ready(function() {
});

function printDiv(divName) {
    var printContents = document.getElementById(divName).outerHTML;
    var originalContents = document.body.outerHTML;
    document.body.outerHTML = printContents;
    window.print();
    document.body.outerHTML = originalContents;
}