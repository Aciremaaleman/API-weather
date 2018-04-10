var $sectionGeneralWeather = $('#containerGeneralWeather');
var $sectionWeekWeather = $('#containerWeekWeather');

navigator.geolocation.getCurrentPosition(success,error);

function success(position){
    var latitude = position.coords.latitude;
    console.log(latitude);
    var longitude = position.coords.longitude;
    console.log(longitude);
    // we declarate two var in which we kept the url´s of the api Dark sky to obtain the data
    var celsious = "units=ca"
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var urlDs = "https://api.darksky.net/forecast/885ac8d68d3dab075ea49d27a278456e/" + latitude + ',' + longitude  + '/?' + celsious;
    request(proxy, urlDs)
}

function error() {
    console.log('error');
}

// we declarate ajax to make the request of the api dark sky
function request (proxy,urlDs){
    $.ajax({
        url: proxy + urlDs,
        
    }).done(handleResponse).fail(handleFailure)
}

// we declarate one var in which we kept the url of the api Flickr to obtain the data
var flickerAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=9e3bc1f1f9a8c60205c0add263c5c8a5&per_page=10&format=json&nojsoncallback=1";

// we declarate ajax to make the request of the api Flickr
$.ajax ({
    url: flickerAPI,
    
}).done(function( data ) {
    // console.log(data);
    var photo = data.photos.photo[1].id;
    // console.log(photo);
    handleResponsePhoto(photo)
}).fail(handleFailurePhoto)

// we declarate the first function of the first request to enter the data of the api dark sky to obtain the information we need
function handleResponse(data) {
    // console.log('exito');
    // console.log(data);
    var $dataWeather = data.currently;
    // console.log($dataWeather);
    var $dataWeek = data.daily.data;
    // console.log($dataWeek);
    getGeneralInfo($dataWeather);
    getWeekInfo($dataWeek);
};

// we create the function that we declarate in the handleResponse function whit the parameter that contains the data 
// In this function we obtain the characteristics of the weather
function getGeneralInfo($dataWeather) {
    // console.log($dataWeather);
    // var $icon = $dataWeather.summary;
    // console.log($icon);
    var $grades = $dataWeather.temperature.toFixed(0);
    // console.log($grades);
    var $humid = $dataWeather.humidity;
    // console.log($humid);
    var $wind = $dataWeather.windSpeed;
    // console.log($wind);
    var $pressure = $dataWeather.pressure;
    // console.log($pressure);
    var $uv = $dataWeather.uvIndex;
    // console.log($uv);

    paintGeneralInfo($grades, $humid, $wind, $pressure, $uv);
}

// we create the second function that we declarate in the handleResponse function whit the parameter that contains the data
// In this function we obtain the degrees minimum and maximum of the week
function getWeekInfo($dataWeek) {
    var $day1MaxGrades = $dataWeek[0].apparentTemperatureHigh.toFixed(0);
    // console.log($day1MaxGrades);
    var $day1MinGrades = $dataWeek[0].apparentTemperatureLow.toFixed(0);
    // console.log($day1MinGrades);
    var $day2MaxGrades = $dataWeek[1].apparentTemperatureHigh.toFixed(0);
    // console.log($day2MaxGrades);
    var $day2MinGrades = $dataWeek[1].apparentTemperatureLow.toFixed(0);
    // console.log($day2MinGrades);
    var $day3MaxGrades = $dataWeek[2].apparentTemperatureHigh.toFixed(0);
    // console.log($day3MaxGrades);
    var $day3MinGrades = $dataWeek[2].apparentTemperatureLow.toFixed(0);
    // console.log($day3MinGrades);
    var $day4MaxGrades = $dataWeek[3].apparentTemperatureHigh.toFixed(0);
    // console.log($day4MaxGrades);
    var $day4MinGrades = $dataWeek[3].apparentTemperatureLow.toFixed(0);
    // console.log($day4MinGrades);
    var $day5MaxGrades = $dataWeek[4].apparentTemperatureHigh.toFixed(0);
    // console.log($day5MaxGrades);
    var $day5MinGrades = $dataWeek[4].apparentTemperatureLow.toFixed(0);
    // console.log($day5MinGrades);
    var $day6MaxGrades = $dataWeek[5].apparentTemperatureHigh.toFixed(0);
    // console.log($day6MaxGrades);
    var $day6MinGrades = $dataWeek[5].apparentTemperatureLow.toFixed(0);
    // console.log($day6MinGrades);
    var $day7MaxGrades = $dataWeek[6].apparentTemperatureHigh.toFixed(0);
    // console.log($day7MaxGrades);
    var $day7MinGrades = $dataWeek[6].apparentTemperatureLow.toFixed(0);
    // console.log($day7MinGrades);

    paintWeekInfo($day1MaxGrades, $day1MinGrades, $day2MaxGrades, $day2MinGrades, $day3MaxGrades, $day3MinGrades, $day4MaxGrades, $day4MinGrades, $day5MaxGrades, $day5MinGrades, $day6MaxGrades, $day6MinGrades, $day7MaxGrades, $day7MinGrades);
}

// In this function we paint the jumbotron of bootstrap whith the information that we obtained in the function getGeneralInfo
function paintGeneralInfo($grades, $humid, $wind, $pressure, $uv) {
    var $row = $('<div />');
    var $col = $('<div />');
    var $jumbotronDiv = $('<div />');
    // var $iconWeather = $('<icon />');
    var $h1Grades = $('<h1 />');
    var $parragraphHumid = $('<p />');
    var $parragraphWind = $('<p />');
    var $parragraphPressure = $('<p />');
    var $parragraphUv = $('<p />');
    var $a = $('<a />');

    $row.addClass('row');
    $col.addClass('col-sm-12');
    $jumbotronDiv.addClass('jumbotron jumbotronStyle');
    // $iconWeather.addClass('')
    $h1Grades.addClass('display-4');
    $parragraphHumid.addClass('lead parragraph');
    $parragraphWind.addClass('lead parragraph');
    $parragraphPressure.addClass('lead parragraph');
    $parragraphUv.addClass('lead parragraph');
    $a.addClass('btn btn-primary btn-lg buttonStyle');

    // $iconWeather.text($icon);
    $h1Grades.text($grades + '°');
    $parragraphHumid.text('Humidity ' + $humid + ' %');
    $parragraphWind.text('Wind ' + $wind + ' m/s');
    $parragraphPressure.text('Pressure ' + $pressure + ' hPa');
    $parragraphUv.text('Uv Index ' + $uv);
    $a.text('Predicción');
    $a.attr('href', './views/week.html')

    $row.append($col);
    $col.append($jumbotronDiv);
    // $jumbotronDiv.append($iconWeather);
    $jumbotronDiv.append($h1Grades);
    $jumbotronDiv.append($parragraphHumid);
    $jumbotronDiv.append($parragraphWind);
    $jumbotronDiv.append($parragraphPressure);
    $jumbotronDiv.append($parragraphUv);
    $jumbotronDiv.append($a);

    $sectionGeneralWeather.append($row);

}

// In this function we paint the jumbotron of bootstrap whith the information that we obtained in the function getWeekInfo
function paintWeekInfo($day1MaxGrades, $day1MinGrades, $day2MaxGrades, $day2MinGrades, $day3MaxGrades, $day3MinGrades, $day4MaxGrades, $day4MinGrades, $day5MaxGrades, $day5MinGrades, $day6MaxGrades, $day6MinGrades, $day7MaxGrades, $day7MinGrades) {
    var $rowWeek = $('<div />');
    var $colWeek = $('<div />');
    var $jumbotronDivWeek = $('<div />');
    //     // var $iconWeather = $('<img />');
    var $day1 = $('<p />');
    var $day2 = $('<p />');
    var $day3 = $('<p />');
    var $day4 = $('<p />');
    var $day5 = $('<p />');
    var $day6 = $('<p />');
    var $day7 = $('<p />');
    var $a = $('<a />');

    $rowWeek.addClass('row');
    $colWeek.addClass('col-sm-12');
    $jumbotronDivWeek.addClass('jumbotron jumbotronStyle');
    //     // // $iconWeather.addClass('')
    $day1.addClass('lead parragraph');
    $day2.addClass('lead parragraph');
    $day3.addClass('lead parragraph');
    $day4.addClass('lead parragraph');
    $day5.addClass('lead parragraph');
    $day6.addClass('lead parragraph');
    $day7.addClass('lead parragraph');
    $a.addClass('btn btn-primary btn-lg buttonStyle');

    $day1.text('Monday ' + $day1MaxGrades + '°' + ' - ' + $day1MaxGrades + '°');
    $day2.text('Tuesday ' + $day2MaxGrades + '°' + ' - ' + $day2MaxGrades + '°');
    $day3.text('Wednesday ' + $day3MaxGrades + '°' + ' - ' + $day3MaxGrades + '°');
    $day4.text('Thursday ' + $day4MaxGrades + '°' + ' - ' + $day4MaxGrades + '°');
    $day5.text('Friday ' + $day5MaxGrades + '°' + ' - ' + $day5MaxGrades + '°');
    $day6.text('Saturday ' + $day6MaxGrades + '°' + ' - ' + $day6MaxGrades + '°');
    $day7.text('Sunday ' + $day7MaxGrades + '°' + ' - ' + $day7MaxGrades + '°');
    $a.attr('href', '../index.html');
    $a.text('Regresar');

    $rowWeek.append($colWeek);
    $colWeek.append($jumbotronDivWeek);
    $jumbotronDivWeek.append($day1);
    $jumbotronDivWeek.append($day2);
    $jumbotronDivWeek.append($day3);
    $jumbotronDivWeek.append($day4);
    $jumbotronDivWeek.append($day5);
    $jumbotronDivWeek.append($day6);
    $jumbotronDivWeek.append($day7);
    $jumbotronDivWeek.append($a);

    $sectionWeekWeather.append($rowWeek);
}


// in this function enter to the data of the api Flickr
function handleResponsePhoto(photo) {
    console.log('exito');
    console.log(photo);
    
}

// In this function the first request sends a console.log if exist a problem
function handleFailure() {
    console.log('error');
};

// In this function the second request sends a console.log if exist a problem
function handleFailurePhoto() {
    console.log('error');
};