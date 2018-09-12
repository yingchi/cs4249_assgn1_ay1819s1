# CS4249 Assignment 1
This repository contains the interface and instrumentation to perform an empirical evaluation of Marking Menus and Radial Menus. 

## Project Structure
```
├── css              
    ├── external           
    ├── experiment.css       
    ├── index.css          *   # stylesheet for index.html 
    ├── questionnaire.css  *   # stylesheet for pre_qn.html and post_qn.html
├── js              
    ├── external          
    ├── experiment.js    
    ├── experiment-tracker.js
├── data           
    ├── experiments        *   # contains arrangement of trials
        ├── set1.csv       *   # arrangement for participant 1
        ├── set2.csv       *   # arrangement for participant 2
        ...
    ├── menus              *   # contains menu items information for different depth and breadth
        ├── menu_depth_1_breadth_4.csv * 
        ├── menu_depth_1_breadth_8.csv *
        ├── menu_depth_2_breadth_4.csv *
        ├── menu_depth_2_breadth_8.csv *
        ├── menu_depth_3_breadth_4.csv *
        ├── menu_depth_3_breadth_8.csv *
├── index.html             *   # the first landing page, will record the participant ID
├── instruction.html       *   # show instructions
├── pre_qn.html            *   # pre_questionnaire form
├── experiment.html  
├── post_qn.html           *   # post_questionnaire form
 
```

Files/paths followed with "*" are the new parts added upon the base structure provided by the assignment.

