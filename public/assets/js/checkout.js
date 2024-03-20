const urlParams = new URLSearchParams(window.location.search);
var current_name = urlParams.get('name');
var current_score = urlParams.get('score');
var current_date = urlParams.get('date');
const current_date_string = current_date;
console.log('Information from index.html:', current_name, current_score, current_date);

function getDate(dateString) {
    return new Date(dateString);
}

function getUSDateString(date, fullYear = false) {
    // Get day, month, and year components
    var day = date.getDate();
    var month = date.getMonth() + 1; // Adding 1 because months are zero-based
    var year = date.getFullYear();
    if (!fullYear) {
        year = date.getYear();
        year %= 100;
    }

    // Format day and month to have leading zeros if necessary
    var formattedDay = (day < 10 ? '0' : '') + day;
    var formattedMonth = (month < 10 ? '0' : '') + month;
    var formattedYear = (year < 10 ? '0' : '') + year;

    // Construct the desired string format
    var formattedDate = formattedMonth + '/' + formattedDay + '/' + formattedYear;
    return formattedDate;
}

function getDay(currentDate) {
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentDayName = daysOfWeek[currentDate.getDay()];
    return currentDayName;
}

function getLastDayOfWeek(currentDate) {
    var currentDayOfWeek = currentDate.getDay();

    // Calculate the difference in days to reach Saturday (the last day of the week)
    var daysUntilSaturday = 6 - currentDayOfWeek;

    // Add the remaining days to currentDate's date to get to the last day of the week
    var lastDayOfWeek = new Date(currentDate);
    lastDayOfWeek.setDate(currentDate.getDate() + daysUntilSaturday);
    return lastDayOfWeek;
}

function update_current_week_data(res) {
    let elem = document.getElementById("current-weak-history");
    let inner_html = ""
    res.forEach(one => {
        let date_string = getUSDateString(getDate(one.Date));
        let final_score = Math.round(one.FinalScore);
        inner_html += `<p>${date_string} - ${final_score}%</p>`;
    })
    elem.innerHTML = inner_html;
}

function update_current_week() {
    // current Week info
    let lastDayOfWeek = getLastDayOfWeek(current_date)
    let lastDayOfWeek_string = getUSDateString(lastDayOfWeek);
    document.getElementById("week-ending-text").innerText = `Week Ending ${lastDayOfWeek_string}`;

    $.ajax({
        url: `/checkout/weekinfo/${current_date_string}/${current_name}`,
        type: "GET",
        success: function (response) {
            // Handle successful response
            update_current_week_data(response);
        },
        error: function (xhr, status, error) {
            // Handle error response
            console.error('Request failed with status:', status);
        }
    });
}

$(function () {
    // Name
    document.getElementById("current_name").innerText = `HEY ${current_name},`;

    // Day - Date
    current_date = getDate(current_date)
    let currentDayName = getDay(current_date);
    let currentDateUSString = getUSDateString(current_date, true);
    document.getElementById("sub-middle-day-date").innerHTML = `${currentDayName}<br>${currentDateUSString}`;

    // Score
    document.getElementById("circlechart").setAttribute("data-percentage", current_score);
    $('.circlechart').circlechart();

    // update week info
    update_current_week();

    // when click 'button-to-history'
    const toHistoryButton = document.querySelectorAll("#button-to-history p");
    toHistoryButton.forEach((element) => element.addEventListener('click', function () {
        window.location.href = 'history.html?name=' + encodeURIComponent(current_name);
    }))
})