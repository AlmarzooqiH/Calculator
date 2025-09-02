let resultElement = document.querySelector("#result h1");
let result = 0;
let firstVal = null;
let secondVal = null;
let selectedOperation = null;
let calculated = null;
let decimalFlag = null;
let isEqualSymbol = null;
const mathOperations = ["+", "-", "*", "/", "="];
const numbers =
[
    "0", "1", "2", "3", "4",
    "5", "6", "7", "8", "9"
];

const specialCharacters = [".", "Enter", "Backspace", "Escape", "+/-", "%","del"];

const everything = [...mathOperations, ...numbers, ...specialCharacters];

//When chaning the result use the .textContent property instead of innetHTML.

let buttons = document.getElementsByClassName("button-style");

function resetVariables(){
    result = 0.0;
    firstVal = null;
    secondVal = null;
    selectedOperation = null;
    calculated = null;
    decimalFlag = null;
    isEqualSymbol = null;
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
        if (resultElement.textContent.length == 0){
            resultElement.textContent = "0.0";
            return;
        }
        resultElement.textContent = resultElement.textContent.substring(0, resultElement.textContent.length - 1);
    }
    if (!everything.includes(event.key))
            return;
    if (mathOperations.includes(event.key)){
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
    
    if (event.key === ".")
        decimalFlag = true;
    if (!decimalFlag && (resultElement.textContent === "0.0"))
            resultElement.textContent = "";
    for (let i = 0; i < buttons.length; i++){
        if ((buttons[i].textContent == event.key) && !(mathOperations.includes(event.key) || event.key === "="))
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
        if (buttons[i].value === "back" || key === "del") {
            if (resultElement.textContent.length === 0){
                resultElement.textContent = "0.0";
                return;
        }
            resultElement.textContent = resultElement.textContent.slice(0, -1);
            return;
        }
        if (key === "+/-"){
            let tmp = -1 * Number(resultElement.textContent);
            resultElement.textContent = tmp;
            return;
        }
        if (key === "%"){
            let tmp = Number(resultElement.textContent) / 100;
            resultElement.textContent = tmp;
            return;
        }
        if (mathOperations.includes(key) && key !== "=") {
            selectedOperation = key;
        }
        if (key === "=")
            isEqualSymbol = true;
        if (firstVal == null && selectedOperation != null) {
            firstVal = Number(resultElement.textContent);
            resultElement.textContent = "";
        } else if (secondVal == null && selectedOperation != null) {
            secondVal = Number(resultElement.textContent);
        }

        if (isEqualSymbol && (firstVal != null) && (secondVal != null) && (selectedOperation != null) && key === "=") {
            secondVal = Number(resultElement.textContent);
            performCalculation();
            calculated = true;
            return;
        }

        if (calculated){
            calculated = null;
            return ;
        }

        if (!mathOperations.includes(key) && key !== "=") {
            if (resultElement.textContent === "0.0" && key !== "0")
                resultElement.textContent = "";
            resultElement.textContent += key;
        }
    });
}

