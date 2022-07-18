var form=document.querySelector("form")
var upper=document.querySelector("#upper-half")
var lower=document.querySelector("#lower-half")
var apiKey="ee286a3856523d150fd0f37bdb12a2b8"

// 0. Check the user input is valid
function inputExists() {
    let userInput=document.querySelector("input")
    if (!userInput.value) {
        console.log("no value returned")
        return null
    }
    return userInput
}

// 1. clears any existing content out of the card
function wipeRow() {
    upper.innerHTML=""
    lower.innerHTML=""
}

// 2. executes an api call to weather api that geocodes city
function geoCode() {
    let userInput=document.querySelector("input")
    let requestURL=`https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${apiKey}`
    fetch(requestURL) 
        .then(function (response) {
            if (!response.status === 200) {
                // console.log(response)
                return 
            }
            // console.log()
            return response.json()
        })
        .then(function (data) {
            getWeather(coordinates=data.coord)
        })

}

// 2b  executes api call that returns current and future weather conditions (see acceptance criteria for details)
function getWeather(coordinates) {
    let requestURL=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`
    fetch(requestURL) 
        .then(function (response) {
            if (!response.status === 200) {
                return 
            }
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            return data
        })
}


// formats unix timestamp
// leveraged from https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
function readableTimeStamp(timestamp){
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(timestamp * 1000);
    console.log(date)
}

// 3. renders that information to the page



// 4. saves the city name as a button that executes 1 & 2 & 3


// 5. the list of citys that are buttons should then be saved to local storage


function executePrimaryButton(event) {
    event.preventDefault()
    if (!inputExists()) {return}
    geoCode()
    // wipeRow()
    // getWeather(coords)
    // return
}

form.addEventListener("submit",executePrimaryButton)




function executeSecondaryButton() {
    
    return
}