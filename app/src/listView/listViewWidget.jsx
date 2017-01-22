import React  from 'react';
import $ from 'jquery';
import CalendarUtility from '../CalendarUtility.js'
import AssignmentModal from '../calTasks/modal/assignmentModal.jsx'

var ListViewWidget = React.createClass({
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
    handleModalClose : function(){
        $(document).trigger('assignmentModalHide');
    },    
    render: function() {
        //hide if the assignment modal is open
        //this.handleModalClose();   
        debugger;     
        return (
            <div className="listViewCalendar">
                <div tabindex="0" role="group" className="calWidget" onClick={this.handleModalClose} aria-activedescendant="rw_1_calendar__month_8-7">
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
                    <div tabindex="0" className="listCalendarGrid" aria-labelledby="rw_1_calendar_label" role="grid" >
                            <rc.listWeeks  assignments={this.props.assignments} month={this.state.month}/>
                    </div>
                </div>
                <AssignmentModal />
            </div>
        );
    }
});

var rc = {};

rc.listWeeks = React.createClass({
    render: function() {                
        var weeks = [];                        
        for(var j = 0; j < this.props.month.length ; j++){
            weeks.push(<rc.weekTable assignments={this.props.assignments} weekdays={this.props.month[j]} />);
        }
        return (<div className="weekTablesContainer">{weeks}</div>);
    }
});

rc.weekTable = React.createClass({
    render: function() {
            var weekAssignments = [];
            var date = this.props.date;
            var assignmentsArr = this.props.assignments;
            var todayDate = CalendarUtility.getToday();
            var monthName = CalendarUtility.formatToMonthDayFormat(this.props.weekdays[0].date);
            var hasMultiAssignments = false;

            for (var i = 0; i < 7; i++) {
                var day = this.props.weekdays[i];
                var currDayCell = CalendarUtility.formatToMonthDayYearFormat(day.date);
                var assignmentsCells = [];
                var assignmentsCell = ""; 
                var prevCellDate = "";
                if(assignmentsArr && assignmentsArr[currDayCell]){
                    assignmentsCells = assignmentsArr[currDayCell];

                    if(weekAssignments.length > 0){
                        hasMultiAssignments = true;
                    }

                    for(var j=0 ; j < assignmentsCells.length ; j++){                            
                        assignmentsCell = assignmentsCells[j];
                        var cellDate = CalendarUtility.formatToDayNameMonthDayFormat(assignmentsCell.dueDate); 
                        var cellTime = CalendarUtility.formatToHourMinZoneFormat(assignmentsCell.dueDate);
                        weekAssignments.push(
                            <rc.listWeekRow dueDate={cellDate != prevCellDate ? cellDate : ""} 
                                dueTime={cellTime} hasMultiAssignments={hasMultiAssignments} assignment={assignmentsCell} />
                        );                            
                        prevCellDate = cellDate;
                    }
                } 
            }

            if(weekAssignments.length == 0){
                weekAssignments.push(
                    <tr>
                       <td className="cellPad"></td> 
                       <td className="cellPad">There are no assignments due this week.</td>
                       <td className="cellPad"></td>                                  
                   </tr>                     
                );
            }
            return ( 
                <table className="monthsWeek"> 
                    <thead>                   
                    <tr>
                        <th className="weekHeader cellDate">WEEK OF {monthName}</th>
                        <th className="weekHeader cellTime"></th>
                        <th className="weekHeader cellTitle"></th> 
                    </tr>
                    </thead>
                    <tbody>{weekAssignments}</tbody>
                </table>
            );                        
    }
});
 
rc.listWeekRow =  React.createClass({
    handleModalOpen: function(event){
        event.stopPropagation();
        var el = React.findDOMNode(this.refs.assignment);
        var pos = CalendarUtility.getOffset(el);
        $(document).trigger('assignmentModalShow',{"assignment":this.props.assignment,"pos": pos,"view":"list"});
    }, 
    render: function() {
        return(
            <tr className={this.props.hasMultiAssignments ? "multiAssignmentsRow" : "assignmentRow"}>
                <td className="cellPad">{this.props.dueDate}</td>
                <td className="cellPad">{this.props.dueTime}</td> 
                <td className="cellPad titleSpan" onClick={this.handleModalOpen} ><span ref="assignment">{this.props.assignment.title}</span></td>
            </tr>
        );
    }
});

module.exports = ListViewWidget;
