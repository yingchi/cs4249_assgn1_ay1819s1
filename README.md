# CS4249 Assignment 1
This repository contains the interface and instrumentation to perform an empirical evaluation of Marking Menus and Radial Menus. 

### Project Structure
```
├── css              
    ├── external           
    ├── experiment.css         ~   # MODIFIED 
    ├── index.css              *   # stylesheet for index.html 
    ├── questionnaire.css      *   # stylesheet for pre_qn.html and post_qn.html
├── js              
    ├── external  
        ├── sunburst-menu.js   ~   # MODIFIED
        ... 
    ├── experiment.js          ~   # MODIFIED
    ├── experiment-tracker.js  ~   # MODIFIED
    ├── jquery-2.2.3.min.js    *   # jquery utility js
├── data           
    ├── experiments            *   # contains arrangement of trials
        ├── set1.csv           *   # arrangement for participant 1
        ├── set2.csv           *   # arrangement for participant 2
        ...
    ├── menus                  *   # contains menu items information for different depth and breadth
        ├── menu_depth_1_breadth_4.csv * 
        ├── menu_depth_1_breadth_8.csv *
        ├── menu_depth_2_breadth_4.csv *
        ├── menu_depth_2_breadth_8.csv *
        ├── menu_depth_3_breadth_4.csv *
        ├── menu_depth_3_breadth_8.csv *
├── index.html                 *   # the first landing page, will record the participant ID
├── consent.html               *   # consent form
├── instruction.html           *   # show instructions
├── pre_qn.html                *   # pre_questionnaire form
├── experiment.html            
├── post_qn.html               *   # post_questionnaire form
 
```

Files/paths followed with "*" are the new parts added.
Files/paths followed with "~" are the parts modified upon the default files provided by the assignment.

### Explanation for new HTML pages
#### index.html
The first landing page for the experiment. This page will collect the "Participant ID" and store it in `localStorage`. This enables us to use the ID later when loading the corresponding arrangement and saving the experiment results

#### consent.html instruction.html
Plain html pages to show the required information

#### pre_qn.html post_qn.html
Two questionnaires to collect user information and subjective ratings / feedback. The data will be sent to my google form response center. 

### Modifications on existing files
#### experiment.js
Added IV and DV names；
Added support for different menu breadth;
Added break alert every 24 trials;

#### experiment-tracker.js
Modify reset attempts tracking for marking menu;
Added tracking for new IV;

#### sunburst-menu.js and experiment.css
Modified the font for Radial menu.
Changed letter from all capital to only capitalising the first for Radial menu.
JUSTIFICATION: It's very hard to read the radial menu compared to the marking menu. So I have made the font size, font family and presentation format consistent.