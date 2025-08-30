let resultElement = document.querySelector("#result h1");
let result = 0;
let firstVal = null;
let secondVal = null;
let selectedOperation = null;
let calculated = null;
const operations = ["+", "-", "*", "/"];

//When chaning the result use the .textContent property instead of innetHTML.

let buttons = document.getElementsByClassName("button-style");

function resetVariables(){
    result = 0.0;
    firstVal = null;
    secondVal = null;
    selectedOperation = null;
    calculated = null;
    resultElement.textContent = "0.0";
}

function performCalculation() {
    if (selectedOperation === "/" && secondVal === 0) {
        alert("Cannot divide by Zero");
        resetVariables();
        return;
    }

    switch (selectedOperation) {
        case "+":
            result = firstVal + secondVal;
            break;
        case "-":
            result = firstVal - secondVal;
            break;
        case "*":
            result = firstVal * secondVal;
            break;
        case "/":
            result = firstVal / secondVal;
            break;
    }

    firstVal = null;
    resultElement.textContent = result;
    secondVal = null;
    selectedOperation = null;
}


document.addEventListener("keydown", (event) => {
    if (event.key === "Escape"){
        resetVariables();
        return ;
    } else if (event.key === "Backspace"){
        if (resultElement.textContent.length <= 1){
            resultElement.textContent = "0.0";
            return;
        }
        resultElement.textContent = resultElement.textContent.substring(0, resultElement.textContent.length - 1);
    }

    if (operations.includes(event.key)){
        selectedOperation = event.key;
    }

    if (firstVal == null && selectedOperation != null){
        firstVal = Number(resultElement.textContent);
            resultElement.textContent = "0.0";
    } else if (secondVal == null && selectedOperation != null){
        secondVal = Number(resultElement.textContent);
    }
    if ((firstVal != null) && (secondVal != null) && (selectedOperation != null) && (event.key === "=" || event.key === "Enter")){
        secondVal = Number(resultElement.textContent);
        performCalculation();
        calculated = true;
        return ;
    }
        if (calculated){
            calculated = null;
            return ;
        }
    if (resultElement.textContent === "0.0")
            resultElement.textContent = "";
    for (let i = 0; i < buttons.length; i++){
        if ((buttons[i].textContent == event.key) && !(operations.includes(event.key) || event.key === "="))
            resultElement.textContent += event.key;
    }
});

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
        const key = buttons[i].textContent;

        if (buttons[i].value === "esc") {
            resetVariables();
            return;
        }

        if (buttons[i].value === "back") {
            if (resultElement.textContent.length <= 1) {
                resultElement.textContent = "0.0";
                return;
            }
            resultElement.textContent = resultElement.textContent.slice(0, -1);
            return;
        }

        if (operations.includes(key)) {
            selectedOperation = key;
        }

        if (firstVal == null && selectedOperation != null) {
            firstVal = Number(resultElement.textContent);
            resultElement.textContent = "0.0";
        } else if (secondVal == null && selectedOperation != null) {
            secondVal = Number(resultElement.textContent);
        }

        if ((firstVal != null) && (secondVal != null) && (selectedOperation != null) && key === "=") {
            secondVal = Number(resultElement.textContent);
            performCalculation();
            calculated = true;
            return;
        }

        if (calculated){
            calculated = null;
            return ;
        }
        if (!operations.includes(key) && key !== "=") {
            if (resultElement.textContent === "0.0") resultElement.textContent = "";
            resultElement.textContent += key;
        }
    });
}

