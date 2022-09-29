function listVenue(data) {
    var games = data.results
    var venues = []
    games.forEach(game => {
        if (game.details.league === "NHL") {
            venues.push(game.venue.city)

        }

    });
    return venues;
}

function listGames(data) {
    var games = data.results
    var scoreCard = $("#scoreCard")
    games.forEach((game, i) => {
        console.log(game)
        console.log(game, i)
        if (game.details.league === "NHL") {
            var gameDiv = $("<div>")
            var gameTitle = $("<div>")
            var gameWeather = $("<div>")
            gameWeather[0].id = i
            gameTitle.text(game.summary)
            searchCity(game.venue.city, i)
            gameDiv.append(gameTitle);
            gameDiv.append(gameWeather)
            console.log(gameWeather)
            scoreCard.append(gameDiv);
        }
    });
}

function listScores(data) {
    var games = data.results
    var scoreCard = $("#scoreCard")
    games.forEach(game => {
        if (game.details.league === "NHL" && game.scoreboard) {
            var gameUl = $("<ul>")
            var gameLiAway = $("<li>")
            var gameLiHome = $("<li>")
            console.log(game)
            gameLiAway.text(game.scoreboard.score.away)
            gameUl.append(gameLiAway);
            console.log(awayScore)
            gameLiHome.text(game.scoreboard.score.home)
            gameUl.append(gameLiHome);
            scoreCard.append(gameUl)
        }
    });
}

function listWeather(data, i) {
    var weather = data.list
    console.log(weather)
    var scoreCard = $("#scoreCard")
    weather.forEach(venue => {
            // var weatherUl = $("<ul>")
            var weatherLi = $("<li>")
            var temp = venue.main.temp
            // var tempF = Math.floor(1.8*(temp-273) + 32)
            weatherLi.text(Math.floor(temp))
            // weatherUl.append(weatherLi);
            $("#" + i).text(Math.floor(temp));
            console.log($("#" + i))
    });
}


function saveScores(data) {

}

var settingsScores = {
    "async": true,
    "crossDomain": true,
    "url": "https://sportspage-feeds.p.rapidapi.com/teams?league=NFL",
    "method": "GET",
    "headers": {
        "X-RapidAPI-Key": "7446481de7mshc58650d6922c359p14ec79jsn0f72b55d1a1b",
        "X-RapidAPI-Host": "sportspage-feeds.p.rapidapi.com"
    }
};

$.ajax(settingsScores).done(function (response) {
    console.log(response);
    console.log(response.venue)
});


function searchCity(city, i) {

    var request = $.ajax({
        url: 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=29629d07a798cd81165a6be24018b444',
        method: "GET",
        success: function (response) {
            getCityWeather(response[0].lat, response[0].lon, i)
            return 
        }
    });
}

function getCityWeather(lat, lon, i) {
    console.log(lat, lon)
    var request = $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=7&appid=29629d07a798cd81165a6be24018b444`,
        method: "GET",
        success: function (response) {
            console.log(response.list)
            listWeather(response, i)
            return response.list
        
        }
    })
}



var request = $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather",
    method: "GET",
    data: { id: '2172797', appid: '29629d07a798cd81165a6be24018b444' },
    success: function (response) {
        console.log(response)
    }
});




var settingsGames = {
    "async": true,
    "crossDomain": true,
    "url": "https://sportspage-feeds.p.rapidapi.com/games",
    "method": "GET",
    "headers": {
        "X-RapidAPI-Key": "7446481de7mshc58650d6922c359p14ec79jsn0f72b55d1a1b",
        "X-RapidAPI-Host": "sportspage-feeds.p.rapidapi.com"
    }
};

$.ajax(settingsGames).done(function (response) {
    console.log(response);

    var venues = listVenue(response)
    console.log(venues)
    listGames(response)
    listScores(response)
    // for (let index = 0; index < venues.length; index++) {
    //     searchCity(venues[index])
        
        
    // }
    //listWeather()
});