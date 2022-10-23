const sliders = document.querySelectorAll("input[type='range']");
sliders.forEach(function(slider){
    slider.addEventListener("input",calculateTip);
});

const billInput = document.getElementById("Billtotal");
billInput.addEventListener("change",calculateTip);

function calculateTip(){
    let billamount = parseFloat(billInput.value);
    let tipPercent = document.getElementById("Tip").value;
    

    billInput.value = billamount.toFixed(2);

    let totalTip = parseFloat((billamount * (tipPercent/100)).toFixed(2));
    let total = parseFloat((billamount + totalTip).toFixed(2));


    document.getElementById("TipPercentage").textContent = `${tipPercent}%`;
    document.getElementById("TipAmount").textContent = `\$ ${totalTip}`;
    document.getElementById("TotalBillwithTip").textContent = `\$ ${total}`;

}
calculateTip();