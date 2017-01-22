import React  from 'react';
import $ from 'jquery';
import CalendarUtility from '../CalendarUtility.js';
import AssignmentModal from '../calTasks/modal/assignmentModal.jsx';
import AssignmentsGroup from '../calTasks/assignmentsGroup.jsx';

 
var MonthViewWidget = React.createClass({
    getInitialState: function() {
        return {
            month: CalendarUtility.getBoxedMonth(CalendarUtility.getToday())
        };
    },
    showPreviousMonth: function() {
        var month = CalendarUtility.getBoxedPrevMonth();                    
        this.setState({ month: month });
    },    
    showNextMonth: function() {
        var month = CalendarUtility.getBoxedNextMonth();
        this.setState({ month: month });
    },
    showCurrentMonth: function() {
        var month = CalendarUtility.getBoxedMonth(CalendarUtility.getToday());
        this.setState({ month: month });
    },
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    },
    render: function() {
        //hide if the assignment modal is open
        ///GrandCentral.trigger('assignmentModalHide');        
        return (
            <div className="monthViewCalendar">
                <div tabIndex="0" role="group" className="calWidget" aria-activedescendant="rw_1_calendar__month_8-7">
                    <div className="navigationBar">
                        <div className="calendarNavigateBack" onClick={this.showPreviousMonth}>
                            <div className="prevButton fa fa-angle-up"></div>
                        </div> 
                        <div className="calendarNavigateNext" onClick={this.showNextMonth}>
                            <span className="nxtButton fa fa-angle-down"></span>
                        </div>                             
                        <div className="currentSelection">{CalendarUtility.getMonthDisplay()}</div>
                        <div id="todayLink" onClick={this.showCurrentMonth} className="todaySelector">Today</div>
                    </div>
                    <table tabIndex="0" className="monthCalendarGrid" aria-labelledby="rw_1_calendar_label" role="grid" >
                        <rc.dayNames />
                        <rc.weeks  assignments={this.props.assignments} month={this.state.month}/>
                    </table>
                </div>
                <AssignmentModal />
            </div>
        );
    }
});

var rc = {};

rc.dayNames = React.createClass({
    render: function() {
        return  (
            <thead>
                <tr role="row" className="weekRow">
                  <th className="weekCell"><span className="cellContent">Sunday</span></th>
                  <th className="weekCell"><span className="cellContent">Monday</span></th>
                  <th className="weekCell"><span className="cellContent">Tuesday</span></th>
                  <th className="weekCell"><span className="cellContent">Wednesday</span></th>
                  <th className="weekCell"><span className="cellContent">Thursday</span></th>
                  <th className="weekCell"><span className="cellContent">Friday</span></th>
                  <th className="weekCell"><span className="cellContent">Saturday</span></th>
                </tr>
            </thead>
        );
    }
});

rc.weeks = React.createClass({
    render: function() {                
        var weeks = [];                        
        for(var j = 0; j < this.props.month.length ; j++){
            weeks.push(<rc.weekRow assignments={this.props.assignments} weekdays={this.props.month[j]} />);
        }
        return (<tbody>{weeks}</tbody>);
    }
});

rc.weekRow = React.createClass({
    handleModalClose : function(){
        //GrandCentral.trigger('assignmentModalHide');
        $(document).trigger('assignmentModalHide');
    },
    render: function() {
                var week = [];
                var date = this.props.date;
                var assignmentsArr = this.props.assignments;
                var todayDate = CalendarUtility.getToday();
                for (var i = 0; i < 7; i++) {
                    var day = this.props.weekdays[i];
                    var currDayCell = CalendarUtility.formatToMonthDayYearFormat(day.date);
                    var todayCell = (todayDate.unix() == day.date.unix()) ? "weekCell todayCell" : "weekCell ";
                    var assignmentsCell="";                    
                    if(assignmentsArr && assignmentsArr[currDayCell]){
                        assignmentsCell = <AssignmentsGroup assignments={assignmentsArr[currDayCell]}/> ;
                    }                          

                    week.push(
                            <td onClick={this.handleModalClose} className={todayCell} role="gridcell" aria-selected="false" 
                                        aria-label=""  >  
                                    <div aria-labelledby="" className="cellContent">
                                        <div className="rwCellDay"> {day.dayIndex} </div>
                                        {assignmentsCell}
                                    </div>
                            </td>
                    );
                }
                return ( 
                    <tr role="row" className="weekRow">
                        {week}
                    </tr> 
                );                        
    }
});
 
module.exports = MonthViewWidget;