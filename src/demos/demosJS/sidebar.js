/*

sidebar.js
Gabriel Sessions

Purpose: Provide submenu and toggleable functionality to the sidebar on the demo pages


*/

//TODO: Generate main tabs in addition to submenus in this file

const NUM_OF_TABS = 2;
const CONST_TABS = ["Home", "Template Project"];
const VAR_TAB_NAMES = ["1: Simple Buttons", "2: Range Sliders"];

const SUBMENU_PREFIX = "demo";
const SUBMENU_SUFFIX = ["remote.html", "local.html", "documentation.html"];

const TAB_ID_PREFIX = "#demo_";
const TAB_ID_SUFFIX = "_button";

const SUBMENU_ID_PREFIX = "demo_";
const SUBMENU_ID_SUFFIX = "_submenu";

const SUBMENU_HTML_ID = "tabLinks";

const ARROW_ID_PREFIX = "#arrow_";

const MENU_ICON_ID = "#hamburger_menu"
const SIDEBAR_ID = "#sidebar";

const ANIMATION_LENGTH = 400;
const SIDEBAR_HIDDEN_MARGIN = "-16rem"; //Tailwind class w-64
const SIDEBAR_DISPLAY_MARGIN = "0rem";

const UPPER_TAB_IDS = ['#remoteUpperTab', '#localUpperTab', '#documentationUpperTab'];

//Returns the demo number from a demo id string
function demoNumber(demoId) {
    return (demoId.split("_")[1]);
}

function createSidebarElement() {
    const sidebarElement = createElement('div');

    $(sidebarElement).addClass('hidden fixed bg-tufts-blue text-white w-64 space-y-6 py-7 px-2  inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out');
    $(sidebarElement).attr('id', 'sidebar');
    $(sidebarElement).attr('data-toggled', 'false');

}

function createArrayOfTabs() {

    //Creates an array with IDs of all navbar tabs - returns the array when finished appending submenus
    let arrOfTabs = [];

    for (let i = 1; i <= NUM_OF_TABS; i++) {
        arrOfTabs.push(TAB_ID_PREFIX + i + TAB_ID_SUFFIX); //#demo_i_button 
    }

    //Appends submenu links to each tab in the sidebar
    for (let j = 0; j < arrOfTabs.length; j++) {

        let demoNum = demoNumber(arrOfTabs[j]);
        
        let submenu = document.createElement('div');
        submenu.innerHTML = document.getElementById(SUBMENU_HTML_ID).innerHTML;
        submenu.hidden = true;
        
        submenu.id = SUBMENU_ID_PREFIX + demoNum + SUBMENU_ID_SUFFIX; //demo_demoNum_submenu

        //Assigning correct links to each element in the submenu
        //Currently in form "demo1remote.html" for remote files
        for (let k = 0; k < SUBMENU_SUFFIX.length; k++) {
            
            submenu.getElementsByTagName('a')[k].href = SUBMENU_PREFIX + demoNum + SUBMENU_SUFFIX[k]; //demo_demoNum_pageType --> See Submenu Suffix const
            
        }

        //Append after the corresponding main tab
        $(arrOfTabs[j]).after(submenu);
        
    }

    setUpTabToggles(arrOfTabs);


    return arrOfTabs;
}

//When a tab is clicked, the submenu will become unhidden
//Submenu can be rehidden by clicking the parent tab again
function setUpTabToggles (arrOfTabs) {
    for (let i = 0; i < arrOfTabs.length; i++) {

        let demoNum = demoNumber(arrOfTabs[i]);

        $(arrOfTabs[i]).click(function() {

            if ($(arrOfTabs[i]).attr("data-dropdown") == "false") {
                $("#" + SUBMENU_ID_PREFIX + demoNum + SUBMENU_ID_SUFFIX).attr('hidden', false); //Note: no # on SUBMENU_ID_PREFIX

                $(arrOfTabs[i]).attr("data-dropdown", "true");

                changeTabArrowDirection(arrOfTabs[i], true);
            }
            else {
                $("#" + SUBMENU_ID_PREFIX + demoNum + SUBMENU_ID_SUFFIX).attr('hidden', true);

                $(arrOfTabs[i]).attr("data-dropdown", "false");

                changeTabArrowDirection(arrOfTabs[i], false);
            }
            
        });
    }
}

//If status is true, arrow will be rotated to face upward
//If status is false, arrow will be rotated to face downward
function changeTabArrowDirection(tabId, status) {

    let demoNum = demoNumber(tabId);
    if (status) {
        $(ARROW_ID_PREFIX + demoNum).addClass('rotate-180');
    }
    else if ($(ARROW_ID_PREFIX + demoNum).hasClass('rotate-180')) {
        $(ARROW_ID_PREFIX + demoNum).removeClass('rotate-180');
    }
    
}

//When the sidebar icon is clicked, the sidebar is either shown or hidden
function toggleMenu () {
    if ( $(SIDEBAR_ID).hasClass('hidden')) {
        $(SIDEBAR_ID).removeClass('hidden');
        
        moveXAnimation(SIDEBAR_ID, SIDEBAR_DISPLAY_MARGIN);
        
    }
    else {
        setTimeout(() => {
            $(SIDEBAR_ID).addClass('hidden');
        }, ANIMATION_LENGTH);
        
        moveXAnimation(SIDEBAR_ID, SIDEBAR_HIDDEN_MARGIN);
    }
}

//Moves an object left or right with an animation
function moveXAnimation(elementId, px) {
    $(SIDEBAR_ID).animate({
        'marginLeft': px
      }, ANIMATION_LENGTH);
}

//Same as above function w/o animation
function moveX (elementId, px) {
    $(SIDEBAR_ID).animate({
        'marginLeft': px
      });
}

//Assigns correct links to upper nav bar buttons 
function createUpperNav() {

    //Finds name of current file
    const currentPathArr = window.location.pathname.split('/');
    const docName = currentPathArr[currentPathArr.length-1];

    const int = /\d+/;
    const demoNum = docName.match(int);

    for (let i = 0; i < UPPER_TAB_IDS.length; i++) {
        $(UPPER_TAB_IDS[i]).click(() => {
            console.log("hello");
            window.location.href = SUBMENU_PREFIX + demoNum + SUBMENU_SUFFIX[i];
            
        });
    }


}


$(document).ready(() => {

    const sideBarTabs = createArrayOfTabs();

    //Sets up sidebar for initial animation
    moveX(SIDEBAR_ID, SIDEBAR_HIDDEN_MARGIN);

    //When menu icon is clicked, show sidebar
    $(MENU_ICON_ID).click(() => {
        console.log( $(SIDEBAR_ID).hasClass('hidden'));
        toggleMenu();
    });

    createUpperNav();
    
});
