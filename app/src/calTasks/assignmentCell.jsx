import React  from 'react';
import CalendarUtility from '../CalendarUtility.js'
import $ from 'jquery';

var AssignmentCell =  React.createClass({

    handleResize: function(e) {        
        var el = React.findDOMNode(this.refs.assignment);
        this.pos = CalendarUtility.getOffset(el);
        $(document).trigger('assignmentModalMove',{"assignment":this.props.assignment,"pos":this.pos});
    },
    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
    },    
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.handleResize);
    },
    handleModalOpen: function(event){
        event.stopPropagation();
        var el = React.findDOMNode(this.refs.assignment);
        this.pos = CalendarUtility.getOffset(el);
        $(document).trigger('assignmentModalShow',{"assignment":this.props.assignment,"pos":this.pos,"view":"month"});        
    },                
    render: function() {
        var assignment = this.props.assignment;
        return (
            <div ref="assignment" className="calAssignments"> 
                <div onClick={this.handleModalOpen} >{assignment.title}</div>
            </div>
        );
    }    

});

module.exports = AssignmentCell;