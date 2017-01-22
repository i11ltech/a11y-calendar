
import React from 'react/addons';
import StubData from 'StubData.js'
import MonthViewWidget from 'monthView/monthViewWidget.jsx';

describe('suite of tests for the month view of the calendar', () => {
  let TestUtils = React.addons.TestUtils;

  function mount(Component, props) {
    return TestUtils.renderIntoDocument(<Component { ...props } />);
  }

  function shallow(Component, props) {
    let renderer = TestUtils.createRenderer();
    renderer.render(<Component {...props} />);
    return renderer.getRenderOutput();
  }

  it('renders the month view', () => {
    const bar = shallow(MonthViewWidget, {assignments: ''});
    expect(bar.type).toBe('div');
    expect(bar.props.className).toBe('monthViewCalendar');
  });

  it("renders 2 child elements(the month calendar & popup modal)", () => {
    let component = mount(MonthViewWidget, {assignments: ''});
    let renderedDom =  React.findDOMNode(component);
    expect(renderedDom.children.length).toEqual(2);
  });

  it("renders the weekday names header starting with Sunday & ending with Saturday", () => {
    let component = mount(MonthViewWidget, {assignments: ''});
    let list = TestUtils.findRenderedDOMComponentWithClass(component, "monthCalendarGrid");

    let weekday1 = list.getDOMNode().querySelectorAll("th")[0].innerText;
    expect(weekday1).toEqual("Sunday");

    let weekday7 = list.getDOMNode().querySelectorAll("th")[6].innerText;
    expect(weekday7).toEqual("Saturday");
  });
 
  it("renders the day cells with atleast 28 days", () => {
    let component = mount(MonthViewWidget, {assignments: ''});
    let list = TestUtils.findRenderedDOMComponentWithClass(component, "monthCalendarGrid");
    expect(list.getDOMNode().querySelectorAll(".rwCellDay").length).toBeGreaterThan(27);
  });

});