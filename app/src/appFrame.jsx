import React  from 'react';
import MonthViewWidget from 'monthView/monthViewWidget.jsx';
import ListViewWidget from 'listView/listViewWidget.jsx';
import StubData from 'StubData.js'


var AppFrame = React.createClass({

  getInitialState: function () {
    return {
      selectedOption: 'monthView',
      assignments: StubData.data
    };
  },

  handleOptionChange: function (changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  },

  render: function () {

    var outputArray = [];
    switch(this.state.selectedOption) {
        case 'listView': outputArray.push(<ListViewWidget  assignments={this.state.assignments}/>);    break;
        case 'monthView': outputArray.push(<MonthViewWidget  assignments={this.state.assignments}/>);    break;
    }


    return (
      <div className="container">
        <hr/> 

        <div className="row">
              <span className="chooseRadio"> Choose view type: </span>
              <span className="chooseRadio">
                <label>
                  <input type="radio" value="monthView" checked={this.state.selectedOption === 'monthView'} onChange={this.handleOptionChange} />
                  Month View
                </label>
              </span>
              <span className="chooseRadio">
                <label>
                  <input type="radio" value="listView" checked={this.state.selectedOption === 'listView'} onChange={this.handleOptionChange}/>
                  List View
                </label>
              </span>
        </div>
        <hr/> 
        <div>
          {outputArray}
        </div>

        <hr/> 
        <div id="footer">
          <a href="https://github.com/sankun">Source Code</a>
          <div> </div>
        </div>

      </div>

    );
  }
});
module.exports = AppFrame;
