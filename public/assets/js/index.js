var todayDate_string;
var latest_name_string = "";

var clientInfo = {
    Name: "",
    Date: "",
    Birthday: "",
    Age: "1",
    Height: "1",
    Weight: "3",
    GenderB: "",
    GenderC: "",
    Ethnicity: "",
    Birthplace: "",
    Fitness: "",
    Stress: "",
    FavouriteWorkouts: [],
    FinalScore: 0,
};

const comments = [
    [79.99, "Time to start being more aware, make the appropriate adjustments."],
    [91.99, "Not bad see where you can make some tweaks to your food, exercise and or stress"],
    [100, "Congratulations! Respect!! You’re in the flow zone!"],
];

const res = clientInfo;

const pointsList = [
    [
        5, 15, 20, [5, 15, 20, 0],
    ],
    [0, 5, 10, 15],
    [0, 5, 20, 10],
    [0, 5, 20, 10],
    [0, 5, 10, 15],
    [-5, 0],
    [0, -5, -10, -15],
    [-5, 0],
    [15, 0],
    [],
    [0, 5, 10, 15],
    [0, 5, 10, 15],
    [10, 0],
    [0, 5, 10, 15],
    [20, 0],
    [0, 10, 20],
    [10, 0],
    [-10, 0],
    [20, 0],
    [15, 0],
];

const dailyTips = [
    "Only do workouts you enjoy.",
    "Keep your workout intensity around 80% or aim for a heart rate of 150 - 169 beats per minute.",
    "Remember to stretch.",
    "Stay away from foods that lower energy levels or make you feel bloated or sluggish.",
    "Eat until you are 80% full.",
    "Aim to consume 2-3 servings of fruits and vegetables per day."
]

//// First Page Modal

var firstModal = document.getElementById('first-mymodal');

function firstModalClose() {
    console.log("Close First Modal");
    firstModal.classList.remove('show-mymodal');
}

function firstModalShow() {
    console.log("Show First Modal");
    let i1 = Math.floor(Math.random() * 6);
    let i2 = Math.floor(Math.random() * 6);
    while (i1 === i2) {
        i2 = Math.floor(Math.random() * 6);
    }
    document.getElementById("first-modal-msg1").innerText = dailyTips[i1];
    document.getElementById("first-modal-msg2").innerText = dailyTips[i2];
    firstModal.classList.add('show-mymodal');
    setTimeout(() => document.querySelector('.mymodal-content button').focus(), 1000);
}

function windowOnClick(event) {
    if (event.target === firstModal) {
        firstModalClose();
    }
}

window.addEventListener("click", windowOnClick);
$(document).ready(firstModalShow());


var dropDownArrows = document.querySelectorAll('.text-field select+span::before');
for (let i = 0; i < dropDownArrows.length; i++) {
    dropDownArrows[i].click(function () {
        // dropDownArrows[i]::after 
    });
}

//// Alert Modal 

var alertModal = document.getElementById('alert-mymodal');

function alertModalClose() {
    console.log("Close Alert Modal");
    alertModal.classList.remove('show-mymodal');
}

function alertModalShow(text) {
    console.log("Show Alert Modal", "text=" + text);
    document.querySelector("#alert-mymodal p").innerHTML = text;
    alertModal.classList.add('show-mymodal');
    setTimeout(() => document.querySelector('.mymodal-content button').focus(), 1000);
}

function windowOnClick(event) {
    if (event.target === alertModal) {
        alertModalClose();
    }
}

window.addEventListener("click", windowOnClick);


//// Last Page Modal

var lastModal = document.getElementById('last-mymodal');

function lastModalClose() {
    console.log("Close Last Modal");
    clearMyInputs();
    lastModal.classList.remove('show-mymodal');
}

function lastModalShow() {
    console.log(clientInfo.FinalScore);
    PostToServerAndModalClose();
    // console.log("Show Last Modal");
    // document.querySelector('#last-mymodal-name').innerText = clientInfo.Name;
    // document.querySelector('#score_in_modal').innerText = clientInfo.FinalScore;
    // for (let i = 0; i < 3; i++) {
    //     if (clientInfo.FinalScore <= comments[i][0]) {
    //         document.querySelector("#last-comment").innerText = comments[i][1];
    //         break;
    //     }
    // }
    // lastModal.classList.add('show-mymodal');
    // setTimeout(() => document.querySelector('.mymodal-content button').focus(), 1000);
}

function getActiveIDs(query) {
    const checking = $(query);

    const inputsChecked = checking.map(function () {
        if ($(this).hasClass('active')) {
            return true;
        } else {
            return false;
        }
    }).get();

    let ret = [];
    for (let i = 0; i < inputsChecked.length; i++) {
        if (inputsChecked[i]) {
            ret.push(i);
        }
    }
    return ret;
}

function getActiveID(query) {
    const checking = $(query);

    const inputsChecked = checking.map(function () {
        if ($(this).hasClass('active')) {
            return true;
        } else {
            return false;
        }
    }).get();

    const ret = inputsChecked.indexOf(true);
    return ret;
}

function calculateMyScore() {
    let rlt = 0;
    for (let i = 0; i < 20; i++) {
        let add = 0;
        if (i == 0) {
            let query = '.radio-group-1 li';
            let id = getActiveID(query);
            if (id < 3) {
                add = pointsList[i][id];
            } else {
                let subquery = '.radio-group-1-s li';
                let j = getActiveID(subquery);
                add = pointsList[i][id][j];
            }
        } else if (i == 9) {
            continue;
        } else {
            let query = `.radio-group-${(i + 1)} li`;
            let id = getActiveID(query);
            add = pointsList[i][id];
        }
        if (add > 0) rlt += add;
        else rlt += add * 2;
    }
    rlt = Math.round(rlt / 0.0245) / 100;
    if (rlt < 0) rlt = 0;
    res.FinalScore = rlt;
    return rlt;
}

function getFormattedDate(query) {
    // Get the selected date from Datepicker
    const selectedDate = $(query).datepicker('getDate');

    // Extract year, month, and day components
    const year = selectedDate.getFullYear();
    let month = selectedDate.getMonth() + 1; // Month starts from 0
    let day = selectedDate.getDate();

    // Add leading zeros if month/day is a single digit
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    // Construct the date string in "yyyy-mm-dd" format
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

function getPersonalInfo1() {
    res.Name = $('#nameText').val();
    res.Age = $('#ageNumber').val();
    res.Birthday = getFormattedDate('#birthDate');
    res.Date = getFormattedDate('#todayDate');
    res.GenderB = $('#genderAtBirthSelect').val();
    res.GenderC = $('#currentGenderSelect').val();
    res.Ethnicity = $('#ethnicityText').val();
    res.Birthplace = $('#birthplaceText').val();
}

function setPersonalInfo1(info) {
    // This only changes the UI
    // Name is skipped.
    $('#ageNumber').val(info.Age);
    $('#birthDate').datepicker('setDate', info.Birthday);
    $('#todayDate').datepicker('setDate', todayDate_string);
    $('#genderAtBirthSelect').val(info.GenderB || "Male");
    $('#currentGenderSelect').val(info.GenderC || "Male");
    $('#ethnicityText').val(info.Ethnicity || "-- Select --");
    $('#birthplaceText').val(info.Birthplace);
}

function getPersonalInfo2() {
    res.Height = $('#heightnumber').val();
    res.Weight = $('#weightnumber').val();
    res.Fitness = $('#fitnessLevelSelect').val();
    res.Stress = $('#stressLevelSelect').val();
    res.FavouriteWorkouts = getActiveIDs(".opti-list>ul>li");
}

function setPersonalInfo2(info) {
    // This only changes the UI
    $('#heightnumber').val(info.Height);
    $('#weightnumber').val(info.Weight);
    $('#fitnessLevelSelect').val(info.Fitness || "Beginner");
    $('#stressLevelSelect').val(info.Stress || "-1- “Feel Amazing”");
    // Assuming you have a function named setActiveIDs to set active workout IDs
    setActiveIDs_workout(info.FavouriteWorkouts);
}

function setActiveIDs_workout(lst) {
    query_string = ".opti-list>ul>li";
    let id = 0;
    $(query_string).map(function () {
        $(this).removeClass('active');
        if (lst && lst.indexOf(id) > -1) {
            $(this).addClass('active');
        }
        id++;
    })
}

function initializeRadioGroup(query) {
    // Uncheck all radio buttons
    var radioButtons = document.querySelectorAll(`${query} input[type="radio"]`);
    radioButtons.forEach(function (radioButton) {
        radioButton.checked = false;
    });
    // Remove the `active` class from all li elements except the first one
    var liElements = document.querySelectorAll(`${query} li`);
    liElements.forEach(function (li, index) {
        if (index === 0) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }
    });
    // Check the first radio button
    var firstRadio = document.querySelector(`${query} input[type="radio"]`);
    firstRadio.checked = true;
}

function clearMyInputs() {
    Object.keys(clientInfo).forEach(key => {
        delete clientInfo[key];
    })
    $('#nameText').val("");
    setPersonalInfo1(res);
    setPersonalInfo2(res);
    $("input[type=text], input[type=number]").map(function () {
        // console.log($(this), this.value);
        $(this).prop('value', '');
    });

    // Initialize the radio button groups.
    for (let i = 1; i <= 20; i++) {
        let query;
        if (i == 10) continue;
        //
        query = `.radio-group-${i}`;
        initializeRadioGroup(query);
        // if i == 1
        if (i == 1) {
            query = ".radio-group-1-s";
            initializeRadioGroup(query);
            document.querySelector(".conditional").style = "display: none;";
        }
    }

    activePanelNum = 0;
    setActiveStep(0);
    setActivePanel(0);
}

function moveToHistoryPage() {
    const information = latest_name_string;
    window.location.href = 'history.html?name=' + encodeURIComponent(information);
}

function PostToServerAndModalClose() {
    $.ajax({
        url: 'one_result',
        type: 'POST',
        data: JSON.stringify(clientInfo),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            window.location.href = `checkout.html?name=${encodeURIComponent(latest_name_string)}&score=${encodeURIComponent(clientInfo.FinalScore)}&date=${encodeURIComponent(clientInfo.Date)}`;
            // lastModalClose();
            // moveToHistoryPage();
            // alertModalShow("Success!");
        },
        error: function (data) {
            alertModalShow(data.toString());
        }
    })
}

// Select Dropdown
$("html").on("click", function () {
    $(".select .dropdown").hide();
});
$(".select").on("click", function (event) {
    event.stopPropagation();
});
$(".select .select-control").on("click", function () {
    $(this).parent().next().toggle();
});
$(".select .dropdown li").on("click", function () {
    $(this).parent().toggle();
    var text = $(this).attr("rel");
    $(this).parent().prev().find("div").text(text);
});

// date picker
$(".datepicker input").datepicker({
    // clearBtn: true,
    format: "yyyy-mm-dd",
    startDate: "1900-01-01",
});

$(".step-box-content").on("click", function () {
    $(".step-box-content").removeClass("active");
    $(this).addClass("active");
});

for (let i = 1; i <= 20; i++) {
    if (i == 10) {
        continue;
    }
    let query_string = `.radio-group-${i} li`;
    // let input_string = query_string + " input"
    $(query_string).on("click", function () {
        $(query_string).removeClass("active");
        $(this).addClass("active");
        // $(input_string + "[type=radio]").each(function () {
        //     $(this).prop('checked', false);
        // });
        // $(this).attr('checked', true);
    });
    if (i == 1) {
        let query_string = `.radio-group-${i}-s li`;
        $(query_string).on("click", function () {
            $(query_string).removeClass("active");
            $(this).addClass("active");
        });
    }
}

$(".opti-list ul li").on("click", function (e) {
    $(this)
        .find("input[type=checkbox]")
        .prop("checked", !$(this).find("input[type=checkbox]").prop("checked"));

    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
    } else {
        $(this).addClass("active");
    }
});

$("input[type=checkbox]").click(function (e) {
    e.stopPropagation();
    return true;
});

$(".plan-icon-text").on("click", function () {
    $(this).find("input[type=radio]").prop("checked", true);
    $(".plan-icon-text").removeClass("active");
    $(this).addClass("active");
});

//multi form ===================================
//DOM elements
const DOMstrings = {
    stepsBtnClass: "multisteps-form__progress-btn",
    stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
    stepsBar: document.querySelector(".multisteps-form__progress"),
    stepsForm: document.querySelector(".multisteps-form__form"),
    stepFormPanelClass: "multisteps-form__panel",
    stepFormPanels: document.querySelectorAll(".multisteps-form__panel"),
    stepPrevBtnClass: "js-btn-prev",
    stepPrevBtnClass_add: "fa-arrow-left",
    stepNextBtnClass: "js-btn-next",
    stepNextBtnClass_add: "fa-arrow-right",
};

//remove class from a set of items
const removeClasses = (elemSet, className) => {
    elemSet.forEach((elem) => {
        elem.classList.remove(className);
    });
};

//return exect parent node of the element
const findParent = (elem, parentClass) => {
    let currentNode = elem;

    while (!currentNode.classList.contains(parentClass)) {
        currentNode = currentNode.parentNode;
    }

    return currentNode;
};

//get active button step number
const getActiveStep = (elem) => {
    return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

//set all steps before clicked (and clicked too) to active
const setActiveStep = (activeStepNum) => {
    //remove active state from all the state
    removeClasses(DOMstrings.stepsBtns, "js-active");
    removeClasses(DOMstrings.stepsBtns, "current");

    //set picked items to active
    DOMstrings.stepsBtns.forEach((elem, index) => {
        if (index <= activeStepNum) {
            elem.classList.add("js-active");
            $(elem).addClass(index);
        }
        if (index == activeStepNum) {
            elem.classList.add("current");
        }
    });
};

//get active panel
const getActivePanel = () => {
    let activePanel;

    DOMstrings.stepFormPanels.forEach((elem) => {
        if (elem.classList.contains("js-active")) {
            activePanel = elem;
        }
    });

    return activePanel;
};

//open active panel (and close unactive panels)
const setActivePanel = (activePanelNum) => {
    const animation = $(DOMstrings.stepFormPanels, "js-active").attr(
        "data-animation"
    );

    //remove active class from all the panels
    removeClasses(DOMstrings.stepFormPanels, "js-active");
    removeClasses(DOMstrings.stepFormPanels, animation);
    removeClasses(DOMstrings.stepFormPanels, "animate__animated");

    //show active panel
    DOMstrings.stepFormPanels.forEach((elem, index) => {
        if (index === activePanelNum) {
            elem.classList.add("js-active");
            // stepFormPanels
            elem.classList.add("animate__animated", animation);

            setTimeout(function () {
                removeClasses(
                    DOMstrings.stepFormPanels,
                    "animate__animated",
                    animation
                );
            }, 1200);

            setFormHeight(elem);
        }
    });
};

//set form height equal to current panel height
const formHeight = (activePanel) => {
    const activePanelHeight = activePanel.offsetHeight;

    DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
};

const setFormHeight = () => {
    const activePanel = getActivePanel();

    formHeight(activePanel);
};

// //STEPS BAR CLICK FUNCTION
// DOMstrings.stepsBar.addEventListener("click", (e) => {
//     //check if click target is a step button
//     const eventTarget = e.target;

//     if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
//         return;
//     }

//     //get active button step number
//     const activeStep = getActiveStep(eventTarget);

//     //set all steps before clicked (and clicked too) to active
//     // setActiveStep(activeStep);

//     //open active panel
//     // setActivePanel(activeStep);
// });

//PREV/NEXT BTNS CLICK
DOMstrings.stepsForm.addEventListener("click", (e) => {
    const eventTarget = e.target;

    //check if we clicked on `PREV` or NEXT` buttons
    if (
        !(
            eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) ||
            eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`) ||
            eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass_add}`) ||
            eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass_add}`)
        )
    ) {
        return;
    }

    //find active panel
    const activePanel = findParent(
        eventTarget,
        `${DOMstrings.stepFormPanelClass}`
    );

    let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(
        activePanel
    );

    //set active step and active panel onclick
    if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) ||
        eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass_add}`)) {
        activePanelNum--;

        setActiveStep(activePanelNum);
        setActivePanel(activePanelNum);
    } else if (
        eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`) ||
        eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass_add}`)
    ) {
        var form = $("#wizard");
        form.validate();

        var parent_fieldset = $(".multisteps-form__panel.js-active");
        var next_step = true;

        parent_fieldset.find(".required").each(function () {
            next_step = false;
            var form = $(".required");
            form.validate();
            $(this).addClass("custom-select is-invalid");
        });

        if (next_step === true || form.valid() === true) {
            if (activePanelNum == 0) {
                // Information 1 input ended.
                getPersonalInfo1();
                latest_name_string = res.Name;
            }
            else if (activePanelNum == 1) {
                // Information 2 input ended.
                getPersonalInfo2();
            }
            if (activePanelNum == 4) {
                // lastModalShow(); return;
                // clearMyInputs();    // Just for debugging.
            }
            if (activePanelNum == 21) {  // 21
                // End of the Check in.
                const myResult = calculateMyScore();
                lastModalShow();
            } else {
                if (window.innerWidth >= 1200 && activePanelNum > 0) {
                    $("html, body").animate(
                        {
                            scrollTop: 0,
                        },
                        600
                    );
                }
                activePanelNum++;
                setActiveStep(activePanelNum);
                setActivePanel(activePanelNum);
            }
        }
    }
});

//SETTING PROPER FORM HEIGHT ONLOAD
window.addEventListener("load", setFormHeight, true);

//SETTING PROPER FORM HEIGHT ONRESIZE
window.addEventListener("resize", setFormHeight, true);
////////////////////////////////////////////////// ====================================== //////////////////////////////////////////////////////

function nameChanged(newName) {
    $.ajax({
        url: `/info/${newName}`,
        type: "GET",
        success: function (response) {
            // Handle successful response
            console.log(response);
            setPersonalInfo1(response)
            setPersonalInfo2(response)
        },
        error: function (xhr, status, error) {
            // Handle error response
            console.error('Request failed with status:', status);
        }
    })
}

$(function () {
    // Get current date in "yyyy-mm-dd" format
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zeros if month/day is a single digit
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    // Construct the date string in "yyyy-mm-dd" format
    const dateString = `${year}-${month}-${day}`;

    // Set the current date to Datepicker
    $("#todayDate").datepicker('setDate', dateString);
    todayDate_string = dateString;

    const viewHistoryButton = document.getElementById('viewHistoryButton');

    viewHistoryButton.addEventListener('click', function () {
        console.log('View History button clicked');
        // Add your view history functionality here
        moveToHistoryPage();
    });

    const nameText = document.getElementById("nameText");
    nameText.addEventListener('input', function () {
        console.log("Name changed to: ", this.value);
        nameChanged(this.value);
    })

    // just for the first case:
});
