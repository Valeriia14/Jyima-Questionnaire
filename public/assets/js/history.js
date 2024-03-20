const urlParams = new URLSearchParams(window.location.search);
var current_name = urlParams.get('name');
console.log('Information from index.html:', current_name);

var currentHeight = 0
var currentCount = 0;
var fields = [
    "Name", "Age", "Date", "FinalScore",
]

function updateTable(trainData_list, createNew = false) {
    let string;
    const length = trainData_list.length;
    var button = document.getElementById('load-more');
    if (length < 10) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
    if (createNew) {
        string = "";
        currentCount = length;
    } else {
        string = document.getElementById("history-body").innerHTML;
        currentCount += length;
    }
    for (let i = 0; i < length; i++) {
        data = trainData_list[i];
        string += "<tr>"
        for (let j = 0; j < 4; j++) {
            string += `<td class="col-${fields[j].toLowerCase()}">${data[fields[j]]}</td>`;
        }
        string += "</tr>"
    }
    document.getElementById("history-body").innerHTML = string;
}

function nameInput_changed(newName) {
    current_name = newName;
    currentCount = 0;
    $.ajax({
        url: '/history',
        type: 'POST',
        data: {
            nameKey: current_name,
            currentKey: currentCount,
        },
        success: function (response) {
            // Successful request, handle response
            console.log("loadnew", response);
            updateTable(response, true);
        },
        error: function (xhr, status, error) {
            // Request failed
            console.error('Request failed with status:', status);
        }
    });
}

function loadMore_Clicked() {
    $.ajax({
        url: '/history',
        type: 'POST',
        data: {
            nameKey: current_name,
            currentKey: currentCount,
        },
        success: function (response) {
            // Successful request, handle response
            console.log("loadmore", response);
            updateTable(response);
        },
        error: function (xhr, status, error) {
            // Request failed
            console.error('Request failed with status:', status);
        }
    })
}

$(function () {
    const nameInput = document.getElementById('name-input');
    nameInput.addEventListener('input', function () {
        const newValue = this.value;
        console.log('Input value changed:', newValue);
        // You can perform any desired actions here when the input value changes
        nameInput_changed(newValue);
    });
    nameInput.value = current_name;
    nameInput_changed(current_name);

    const loadmoreButton = document.getElementById('load-more');
    loadmoreButton.addEventListener('click', function () {
        console.log("load more button clicked");
        loadMore_Clicked();
    });
    const logo = document.getElementById('logo');
    const closeButton = document.getElementById('close-button');

    logo.addEventListener('click', function () {
        console.log('Logo clicked');
        // window.location.href = "/";
        window.history.back();
    });

    closeButton.addEventListener('click', function () {
        console.log('Close button clicked');
        // window.location.href = "/";
        window.history.back();
    });
})