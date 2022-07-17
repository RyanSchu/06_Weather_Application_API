# 06_Weather_Application_API

### User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```
Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

```


### pseudocode

```
On render
  *header
  *something that takes in user input on click
  *form with text input and button with event listener
  *buttons in local storage
  *


event listener does 5 things in order

1. clears any existing content out of the card

2. executes an api call to weather api that returns current and future weather conditions (see acceptance criteria for details)

3. renders that information to the page

4. saves the city name as a button that executes 1 & 2 & 3

5. the list of citys that are buttons should then be saved to local storage
```

alternatively the api data could be stored in local storage and just rerendered each time, but I'll think about it

