
import React from 'react/addons';
import StubData from 'StubData.js'
import ListViewWidget from 'listView/listViewWidget.jsx';

describe('suite of tests for the List view of the Calendar', () => {
  let TestUtils = React.addons.TestUtils;

  function mount(Component, props) {
    return TestUtils.renderIntoDocument(<Component { ...props } />);
  }

  function shallow(Component, props) {
    let renderer = TestUtils.createRenderer();
    renderer.render(<Component {...props} />);
    return renderer.getRenderOutput();
  }

  it('should render the List view of the calendar', () => {
    const bar = shallow(ListViewWidget, {assignments: ''});
    expect(bar.type).toBe('div');
    expect(bar.props.className).toBe('listViewCalendar');
  });

  it("renders 2 child elements(the list calendar & popup modal)", () => {
    let component = mount(ListViewWidget, {assignments: ''});
    let renderedDom =  React.findDOMNode(component);
    expect(renderedDom.children.length).toEqual(2);
  });

  it("renders each week in a table, should have at least 4 weeks in the month", () => {
    let component = mount(ListViewWidget, {assignments: ''});
    let list = TestUtils.findRenderedDOMComponentWithClass(component, "listCalendarGrid");
    let numberOfWeeks = list.getDOMNode().querySelectorAll("table").length;
    expect(numberOfWeeks).toBeGreaterThan(3);
  });
 
  it("renders the assignments from stubbed data", () => {
    let component = mount(ListViewWidget, {assignments: StubData.data});
    let numberOfAssignments = component.getDOMNode().querySelectorAll(".assignmentRow").length;
    expect(numberOfAssignments).toBeGreaterThan(2);
  });

});