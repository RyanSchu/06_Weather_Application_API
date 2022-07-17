var form=document.querySelector("form")
var upper=document.querySelector("#upper-half")
var lower=document.querySelector("#lower-half")


// 0. Check the user input is valid
function validateInput() {
    var userInput=document.querySelector("input")
    if (!userInput.value) {
        console.log("no value returned")
        return null
    }
    return userInput
}


// 1. clears any existing content out of the card
function clearDisplay() {
    upper.innerHTML=""
    lower.innerHTML=""
}

// 2. executes an api call to weather api that returns current and future weather conditions (see acceptance criteria for details)


// 3. renders that information to the page


// 4. saves the city name as a button that executes 1 & 2 & 3

// 5. the list of citys that are buttons should then be saved to local storage

function executePrimaryButton(event) {
    event.preventDefault()
    if (!validateInput()) {return}
    clearDisplay()


    return
}

form.addEventListener("submit",executePrimaryButton)




function executeSecondaryButton() {
    
    return
}