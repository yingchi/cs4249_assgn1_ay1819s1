'use strict';

// Location of data files

const menuL1B4File = "./data/menus/menu_depth_1_breadth_4.csv"
const menuL2B4File = "./data/menus/menu_depth_2_breadth_4.csv"
const menuL3B4File = "./data/menus/menu_depth_3_breadth_4.csv"
const menuL1B8File = "./data/menus/menu_depth_1_breadth_8.csv"
const menuL2B8File = "./data/menus/menu_depth_2_breadth_8.csv"
const menuL3B8File = "./data/menus/menu_depth_3_breadth_8.csv"

// Global variables
var menu;
var trialsData = [];
var numTrials = 0;
var currentTrial = 1;
var markingMenuL1B4 = [];
var markingMenuL2B4 = [];
var markingMenuL3B4 = [];
var markingMenuL1B8 = [];
var markingMenuL2B8 = [];
var markingMenuL3B8 = [];
var radialMenuTree = null;
var radialMenuL1B4 = [];
var radialMenuL2B4 = [];
var radialMenuL3B4 = [];
var radialMenuL1B8 = [];
var radialMenuL2B8 = [];
var radialMenuL3B8 = [];
var tracker = new ExperimentTracker();
var markingMenuSubscription = null;
var radialMenuSvg = null;


// Load CSV files from data and return text
function getData(relativePath) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", relativePath, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}


// Loads the CSV data files on page load and store it to global variables
function initExperiment() {

    let userId = localStorage.getItem("cs4249exp.userId");

    let trailsFile = `./data/experiments/set${userId}.csv`;

    // Get Trails
    var data = getData(trailsFile);

    var records = data.split("\n");
    numTrials = records.length - 1;
    for (var i = 1; i <= numTrials; i++) {
        var cells = records[i].split(",");
        var menuType = cells[0].trim();
        var menuDepth = cells[1].trim();
        var menuBreadth = cells[2].trim();
        var inputDevice = cells[3].trim();
        var targetItem = cells[4].trim();
        trialsData[i] = {
            'Menu Type': menuType,
            'Menu Depth': menuDepth,
            'Menu Breadth': menuBreadth,
            'Input Device': inputDevice,
            'Target Item': targetItem
        };
    }

    // Get Menus
    var menuL1B4Data = getData(menuL1B4File);
    var menuL2B4Data = getData(menuL2B4File);
    var menuL3B4Data = getData(menuL3B4File);
    var menuL1B8Data = getData(menuL1B8File);
    var menuL2B8Data = getData(menuL2B8File);
    var menuL3B8Data = getData(menuL3B8File);

    // Format CSV Menu to respective Menu structures
    markingMenuL1B4 = formatMarkingMenuData(menuL1B4Data);
    markingMenuL2B4 = formatMarkingMenuData(menuL2B4Data);
    markingMenuL3B4 = formatMarkingMenuData(menuL3B4Data);
    markingMenuL1B8 = formatMarkingMenuData(menuL1B8Data);
    markingMenuL2B8 = formatMarkingMenuData(menuL2B8Data);
    markingMenuL3B8 = formatMarkingMenuData(menuL3B8Data);
    radialMenuL1B4 = formatRadialMenuData(menuL1B4Data);
    radialMenuL2B4 = formatRadialMenuData(menuL2B4Data);
    radialMenuL3B4 = formatRadialMenuData(menuL3B4Data);
    radialMenuL1B8 = formatRadialMenuData(menuL1B8Data);
    radialMenuL2B8 = formatRadialMenuData(menuL2B8Data);
    radialMenuL3B8 = formatRadialMenuData(menuL3B8Data);

    //Start the first trial
    nextTrial();
}

// Wrapper around nextTrial() to prevent click events while loading menus
function loadNextTrial(e) {
    e.preventDefault();
    nextTrial();

}

// Move to next trai and record events
function nextTrial() {

    if (currentTrial <= numTrials) {

        if (currentTrial % 12 === 0) {
            window.alert("How about having a 10-second break?")
        }

        var menuType = trialsData[currentTrial]['Menu Type'];
        var menuDepth = trialsData[currentTrial]['Menu Depth'];
        var menuBreadth = trialsData[currentTrial]['Menu Breadth'];
        var inputDevice = trialsData[currentTrial]['Input Device'];
        var targetItem = trialsData[currentTrial]['Target Item'];

        document.getElementById("trialNumber").innerHTML = String(currentTrial) + "/" + String(numTrials);
        document.getElementById("menuType").innerHTML = menuType;
        document.getElementById("menuDepth").innerHTML = menuDepth;
        document.getElementById("menuBreadth").innerHTML = menuBreadth;
        document.getElementById("inputDevice").innerHTML = inputDevice;
        document.getElementById("targetItem").innerHTML = targetItem;
        document.getElementById("selectedItem").innerHTML = "&nbsp;";
        // Set IV3 state over here

        tracker.newTrial();
        tracker.trial = currentTrial;
        tracker.menuType = menuType;
        tracker.menuDepth = menuDepth;
        tracker.menuBreadth = menuBreadth;
        tracker.inputDevice = inputDevice;
        tracker.targetItem = targetItem;

        if (menuType === "Marking") {

            initializeMarkingMenu();
            if (menuBreadth == 4) {
                if (menuDepth == 1) {
                    menu = MarkingMenu(markingMenuL1B4, document.getElementById('marking-menu-container'));
                }
                else if (menuDepth == 2) {
                    menu = MarkingMenu(markingMenuL2B4, document.getElementById('marking-menu-container'));
                } else if (menuDepth == 3) {
                    menu = MarkingMenu(markingMenuL3B4, document.getElementById('marking-menu-container'));
                }
            }
            else {
                if (menuDepth == 1) {
                    menu = MarkingMenu(markingMenuL1B8, document.getElementById('marking-menu-container'));
                }
                else if (menuDepth == 2) {
                    menu = MarkingMenu(markingMenuL2B8, document.getElementById('marking-menu-container'));
                } else if (menuDepth == 3) {
                    menu = MarkingMenu(markingMenuL3B8, document.getElementById('marking-menu-container'));
                }
            }

            markingMenuSubscription = menu.subscribe((selection) => markingMenuOnSelect(selection));

        } else if (menuType === "Radial") {

            initializeRadialMenu();
            if (menuBreadth == 4) {
                if (menuDepth == 1) {
                    menu = createRadialMenu(radialMenuL1B4);
                }
                else if (menuDepth == 2) {
                    menu = createRadialMenu(radialMenuL2B4);
                } else if (menuDepth == 3) {
                    menu = createRadialMenu(radialMenuL3B4);
                }
            }
            else {
                if (menuDepth == 1) {
                    menu = createRadialMenu(radialMenuL1B8);
                }
                else if (menuDepth == 2) {
                    menu = createRadialMenu(radialMenuL2B8);
                } else if (menuDepth == 3) {
                    menu = createRadialMenu(radialMenuL3B8);
                }
            }
        }

        currentTrial++;
    } else {

        var nextButton = document.getElementById("nextButton");
        nextButton.innerHTML = "Done";
        tracker.toCsv();
        window.location.href = "post_qn.html";
    }
}


/*Functions related to MarkingMenu*/

// Reconstructs marking menu container
function initializeMarkingMenu() {

    //Unload Radial Menu
    var radialMenuContainer = document.getElementById('radial-menu-container');
    if (radialMenuContainer != null) {
        radialMenuContainer.parentNode.removeChild(radialMenuContainer);
    }

    // Load Marking Menu
    var interactionContainer = document.getElementById('interaction-container');
    if (markingMenuSubscription != null) {
        markingMenuSubscription.unsubscribe();
    }
    var markingMenuContainer = document.getElementById('marking-menu-container');
    if (markingMenuContainer == null) {
        interactionContainer.innerHTML += "<div id=\"marking-menu-container\" style=\"height:100%;width:100%\" onmousedown=\"markingMenuOnMouseDown()\" oncontextmenu=\"preventRightClick(event)\"></div>";
    }
}

//Formats csv menu data in the structure accepted by radial menu
// Assumes menu csv is sorted by Id and Parent both Ascending
function formatMarkingMenuData(data) {
    var records = data.split("\n");
    var numRecords = records.length;
    var menuItems = {}

    // Parse through the records and create individual menu items
    for (var i = 1; i < numRecords; i++) {
        var items = records[i].split(',');
        var id = items[0].trim();
        var label = items[2].trim();
        menuItems[id] = {
            'name': label,
            'children': []
        };
    }

    for (var i = numRecords - 1; i >= 1; i--) {
        var items = records[i].split(',');
        var id = items[0].trim();
        var parent = items[1].trim();
        if (parent === '0') {
            continue;
        } else {
            var children = menuItems[parent]['children'];
            children.push(menuItems[id]);
            delete menuItems[id]
            menuItems[parent]['children'] = children;
        }
    }

    var menuItemsList = [];
    for (var key in menuItems) {
        menuItemsList.push(menuItems[key]);
    }
    return menuItemsList;
}

// Function to start tracking timer on mouse down
function markingMenuOnMouseDown() {

    tracker.startTimer();
}

//Function to start tracking timer on mouse down
function markingMenuOnSelect(selectedItem) {

    tracker.recordSelectedItem(selectedItem.name);
    document.getElementById("selectedItem").innerHTML = selectedItem.name;
}

function preventRightClick(e) {
    e.preventDefault();
}


/*Functions related to RadialMenu*/

// Reconstructs radial menu container
function initializeRadialMenu() {

    // Unload Marking Menu
    if (markingMenuSubscription != null) {
        markingMenuSubscription.unsubscribe();
    }
    var markingMenuContainer = document.getElementById('marking-menu-container');
    if (markingMenuContainer != null) {
        markingMenuContainer.parentNode.removeChild(markingMenuContainer);
    }


    // Reload Radial Menu
    var interactionContainer = document.getElementById('interaction-container');
    var radialMenuContainer = document.getElementById('radial-menu-container');
    if (radialMenuContainer == null) {
        interactionContainer.innerHTML += "<div id=\"radial-menu-container\" style=\"height:100%;width:100%\" oncontextmenu=\"toggleRadialMenu(event)\"></div>";
    }

}

// Create radial menu svg element
function createRadialMenu(radialMenuL) {

    var radialmenuElement = document.getElementById('radialmenu');
    if (radialmenuElement != null) {
        radialmenuElement.parentNode.removeChild(radialmenuElement);
    }


    var w = window.innerWidth;
    var h = window.innerHeight;
    var radialMenuSvgElement = document.getElementById('radial-menu-svg');
    if (radialMenuSvgElement != null) {
        radialMenuSvgElement.parentNode.removeChild(radialMenuSvgElement);
    }
    radialMenuSvg = d3.select("#radial-menu-container").append("svg").attr("width", w).attr("height", h).attr("id", "radial-menu-svg");
    radialMenuTree = radialMenuL;
    return radialMenuSvg;
}

// Toggle radial menu on right click
function toggleRadialMenu(e) {

    if (tracker.startTime == null) {

        if (radialMenuTree != null) {
            menu = module.exports(radialMenuTree, {
                x: e.clientX,
                y: e.clientY
            }, radialMenuSvg);

            // Start timing once menu appears
            tracker.startTimer();
        }
    } else {

        // Record previous item
        tracker.recordSelectedItem(null);

        if (radialMenuTree != null) {
            menu = module.exports(radialMenuTree, {
                x: e.clientX,
                y: e.clientY
            }, radialMenuSvg);

            // Start timing once menu appears
            tracker.startTimer();
        }
    }
    e.preventDefault();
}

//Callback for radialmenu when a leaf node is selected
function radialMenuOnSelect() {

    tracker.recordSelectedItem(this.id);
    var radialmenu = document.getElementById('radialmenu');
    radialmenu.parentNode.removeChild(radialmenu);

    document.getElementById("selectedItem").innerHTML = this.id;
}

//Formats csv menu data in the structure accepted by radial menu
// Assumes menu csv is sorted by Id and Parent both Ascending
function formatRadialMenuData(data) {

    var records = data.split("\n");
    var numRecords = records.length;
    var menuItems = {}


    // Parse through the records and create individual menu items
    for (var i = 1; i < numRecords; i++) {
        var items = records[i].split(',');
        var id = items[0].trim();
        var label = items[2].trim();
        menuItems[id] = {
            'id': label,
            'fill': "#39d",
            'name': label,
            '_children': []
        };
    }

    for (var i = numRecords - 1; i >= 1; i--) {
        var items = records[i].split(',');
        var id = items[0].trim();
        var parent = items[1].trim();
        if (parent === '0') {
            continue;
        } else {
            var _children = menuItems[parent]['_children'];
            if (menuItems[id]['_children'].length == 0) {
                menuItems[id]['callback'] = radialMenuOnSelect;
            }
            _children.push(menuItems[id]);
            delete menuItems[id];
            menuItems[parent]['_children'] = _children;
        }
    }


    var menuItemsList = [];
    for (var key in menuItems) {
        if (menuItems[key]['_children'].length == 0) {
            delete menuItems[key]['_children'];
            menuItems[key]['callback'] = radialMenuOnSelect;
        } else {
            delete menuItems[key]['callback'];
        }
        menuItemsList.push(menuItems[key]);
    }
    return {
        '_children': menuItemsList
    };

}
