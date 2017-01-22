import React  from 'react';
import AssignmentCell from './assignmentCell.jsx'

var AssignmentsGroup =  React.createClass({
    render: function() {
        var assignments = this.props.assignments;
        var assignmentsCells = [];
        for(var i=0 ; i < assignments.length ; i++){
            assignmentsCells.push(<AssignmentCell assignment={assignments[i]} />);
        }
        return  (
            <div className="assignmentsCell"> 
            	{assignmentsCells}
            </div>
        );
    }
});

module.exports = AssignmentsGroup;