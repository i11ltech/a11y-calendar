React months/weeks-list view calendar
=====================================
A calendar with month view and list view built in React. A JSON object of events can be given as props to the month-view-widget & list-view-widget.

 #### TODO: Add accessibility.

 #### DEMO: [__Demo_Link__](https://a11y-calendar.herokuapp.com/)
 
Month view:
  - Displays the month in a grid style.
  - Click on up/down arrow to navigate the months.
  - Days with events will displayed with each event nested inside the day.
  - Click on an event to display the details in a popup
  - If the event falls on friday or saturday the popup is displayed on left else on right side of the cell.

Weeks-List view:
  - Displays the month as a list of weeks in a single column. 
  - Click on up/down arrow to navigate the months.
  - Only the days which has events will be listed.
  - Click on an event to display the details in a popup

## Run examples locally
* Clone this repository
* Retrieve dependencies: `npm install`
* Build: `gulp build` 
* Start: Go to the build folder and load the index.html
* Test: `gulp test` 