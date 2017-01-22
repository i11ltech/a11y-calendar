import React  from 'react';
import CalendarUtility from '../../CalendarUtility.js'
import $ from 'jquery';

var AssignmentModal = React.createClass({
    getInitialState:function(){
        return {
            show : false,
            assignment : '',
            arrowStyle : "arrow-right-modal",
            styles: {
                top: 0,
                left: 0
            }
        }
    },
    setModalPosition : function(data){
        const topOffset = 127;
        let dayName = CalendarUtility.formatToDayName(data.assignment.startDate);
        let rightOffset = 12;
        let arrowStyle = "arrow-right-modal";

        if(data.view == "month" && (dayName == "Fri" || dayName == "Sat")){
            rightOffset = -445;
            arrowStyle = "arrow-left-modal";
        } 

        this.setState({ 
            show: true,  
            assignment: data.assignment,
            arrowStyle: arrowStyle,
            styles: {
              top: (data.pos.top - topOffset),
              left: (data.pos.right + rightOffset)
            }
        }); 
    },
    componentDidMount : function(){
        var self = this;

        $(document).off('assignmentModalHide').on('assignmentModalHide', function(e){
            self.setState({ show: false });
        });

        $(document).off('assignmentModalShow').on('assignmentModalShow', function(e,payLoad){
            self.setModalPosition(payLoad);
        }); 

        $(document).off('assignmentModalMove').on('assignmentModalMove', function(e,payLoad){
            if(self.state.show && self.state.assignment.item_id == payLoad.assignment.item_id){
                self.setModalPosition(payLoad);
            }
        });                
    },  
    render:function(){
        var classes = this.state.show ? 'absolutewrapper active' : 'absolutewrapper ';
        var points = this.state.assignment ? (this.state.assignment.points + " points") : "" ;
        var duedate = this.state.assignment ? CalendarUtility.formatToDayMonthTimeFormat(this.state.assignment.dueDate) : "";
        return ( 
            <div className="calendarModalContainer" ref="calendarModalContainer">
                <div className={classes} style={this.state.styles}>
                    <div className="modelContent" aria-atomic="true">
                        <div>
                            <div className="itemTitle">
                                {this.state.assignment.title}
                            </div>
                            <div className="itemPoints">
                                    {points}  
                            </div>            
                            <div className="itemDate">                
                                    <div>Due Date:</div>
                                    <div> {duedate} </div>
                            </div>
                        </div>
                        <div className="modalLinks">
                          <a href={this.state.assignment.openLink}>Open</a>
                        </div>
                    </div>
                    <div className={this.state.arrowStyle}></div>
                </div>
            </div>
         );
    }
});

module.exports = AssignmentModal;
