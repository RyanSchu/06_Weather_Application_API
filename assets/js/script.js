// startup
var form=document.querySelector("form")
var upper=document.querySelector("#upper-half")
var lower=document.querySelector("#lower-half")
var apiKey="ee286a3856523d150fd0f37bdb12a2b8"
var searchHistory=loadLocal()
var buttonList=document.querySelector(".button-list")
// Load Local Storage or create empty array
function loadLocal() {
    if (localStorage.getItem("searchHistory") === null) {
        return []
    } else {
        return JSON.parse(localStorage.getItem("searchHistory"))
    }
}

function renderLocal(array) {
    for (i=0; i < array.length; i ++) {
        console.log(array[i])
        createButton(array[i])
    }
}

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
            // console.log(data)
            if (!searchHistory.includes(userInput.value)) createButton(userInput.value)
            updateLocal(userInput.value)
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
            wipeRow()
            createUpper(data)
            return data
        })
}


// formats unix timestamp
// leveraged from https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
function readableTimeStamp(timestamp){
    let  date = new Date(timestamp * 1000);
    let formatedDate = moment(date)
    return formatedDate
}

// 3. renders that information to the page
function createUpper(data) {
    console.log(data)
    let upper = document.querySelector("#upper-half")
    upperHeader(upper,data)
    upperContent(upper,data)
}

function upperHeader(div,data) {
    let header = document.createElement("h3")
    let img = document.createElement("img")
    img.setAttribute("src",`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`)
    let subHeader = document.createElement("h4")
    let userInput=document.querySelector("input")
    header.textContent = userInput.value + " " + readableTimeStamp(data.current.dt).format("MM/DD/YYYY")
    header.appendChild(img)
    subHeader.textContent = "Current Time: " + readableTimeStamp(data.current.dt).format("hh:mm")
    div.appendChild(header)
    div.appendChild(subHeader)
}


function upperContent(div,data) {
    let ul = document.createElement("ul")
    let temp = document.createElement("li")
    let wind = document.createElement("li")
    let humidity = document.createElement("li")
    let uvi = document.createElement("li")

    temp.textContent= "Temperature: " + kelvinToFarenheit(data.current.temp) + " F"
    wind.textContent = "Wind Speed: " +data.current.wind_speed + " MPH"
    humidity.textContent = "Humidity: " + data.current.humidity + "%"
    uvi.textContent = "UV Index: " + data.current.uvi

    ul.appendChild(temp)
    ul.appendChild(wind)
    ul.appendChild(humidity)
    ul.appendChild(uvi)
    div.appendChild(ul)
}

function kelvinToFarenheit(kelvin) {
    return Math.round(((kelvin - 273.15)*9/5) + 32)
}

function createLower() {

}


// 4. saves the city name as a button that executes 1 & 2 & 3

function createButton(input) {
    let buttonList = document.querySelector(".button-list")
    let button = document.createElement("button")
    button.textContent = input
    button.setAttribute("id",input)
    button.setAttribute("class","secondaryButton")
    buttonList.appendChild(button)
}

// 5. the list of citys that are buttons should then be saved to local storage

function updateLocal(input) {
    console.log(input)
    if (searchHistory.includes(input)){
        return
    }
    searchHistory.unshift(input)
    console.log(searchHistory)
    localStorage.setItem("searchHistory",JSON.stringify(searchHistory))
}

function executePrimaryButton(event) {
    event.preventDefault()
    if (!inputExists()) {return}
    geoCode()
    // getWeather(coords)
    // return
}


function executeSecondaryButton() {
    console.log("hello")
    return
}


renderLocal(searchHistory)
form.addEventListener("submit",executePrimaryButton)
buttonList.onclick = function(event) {
    let target = event.target
    if (target.className != "secondaryButton") return
    executeSecondaryButton()
}