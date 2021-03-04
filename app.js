const amount = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const button = document.getElementById("button");
const clear = document.getElementById("button-clear");
const subContainer = document.getElementById("subContainer");

clear.addEventListener("click", function (e) {
    amount.value = "";
    from.value = "";
    to.value = "";

    e.preventDefault();
})

button.addEventListener("click", convert);

function convert(e) {

    if (amount.value === "" || from.value === "" || to.value === "") {
        alert("Please fill in all the blanks.");
    } else {
        const request = new Request();
        var currFrom;
        request.get(`https://api.exchangeratesapi.io/latest?base=${from.value}`)
            .then(function (currFrom) {
                let converted = amount.value * currFrom.rates[to.value];
                subContainer.innerHTML = "";
                let newChild = document.createElement("div");
                newChild.className = "text-center";
                newChild.textContent = converted;
                newChild.setAttribute("style", "font-size: 24px");
                subContainer.appendChild(newChild);

                amount.value = "";
                from.value = "";
                to.value = "";
            })
            .catch(error => {
                alert("Please type valid currencies.");
            });
    }

    e.preventDefault();
}

document.addEventListener("click", (e) => {
    if (e.target.className === "currency") {
        if (from.value === "") {
            from.value = e.target.textContent;
        } else {
            to.value = e.target.textContent;
        }
    }
})