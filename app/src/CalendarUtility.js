/*
	Wrapper functions around moment.js to get appropriate day/week/month/year of calendar  
*/ 

import moment from 'moment';

var CalendarUtility = ( function() {

	var dayOfMonth;

	// Returns today's date
	function getToday(){
		return (moment().startOf("day")).clone();
	}
	
	//given the day, go back by 1 boxed month
	function getBoxedPrevMonth(){
		var prevMonthsDay = dayOfMonth.clone().add(-1, "M");
		return this.getBoxedMonth(prevMonthsDay);
	}

	//given the day, go forward by 1 boxed month
	function getBoxedNextMonth(){
		var nxtMonthsDay = dayOfMonth.clone().add(1, "M");
		return this.getBoxedMonth(nxtMonthsDay);
	}

	//return current month in 'Month Year' format
	function getMonthDisplay(){
		return dayOfMonth.format("MMMM YYYY");
	}

	//given the day, go forward by 1 week
	function getNextWeek(day){
		return day.clone().add(1, "w");
	}

	//given the day, go forward by 1 day
	function getNextDay(day){
		return day.clone().add(1, "d");
	}

	//given the day, go to start of boxed month and get the day of first sunday
	function getBoxedFirstSunday(month){
		return month.clone().startOf("month").add("w" -1).day("Sunday");
	}

	//given the day, get the month index
	function getMonthIndex(date){
		return date.month();
	}

	//given the date return array of day numbers
	function getWeekDays(date){
		var weekDays = [];
		var day;
		for (var i = 0; i < 7; i++) {
			var weekDay = { "dayIndex": "", "date": ""};
			day = date.date();
			//Prepend month name for 1st day of month
		    weekDay.dayIndex =  (day == 1 ? (date.format("MMMM")+" "+day) : day);
		    weekDay.date = date;
		    weekDays.push(weekDay);
		    date = getNextDay(date);                       
		}	
		return weekDays;	
	}

	//return 2 dimentional array of days of given date's month 
	function getBoxedMonth(day){
		dayOfMonth = day;
		var weeks = [],
		     done = false,
		     date = getBoxedFirstSunday(day),
		     monthIndex = getMonthIndex(date),
		     count = 0;
		     
		 while (!done) {
		     weeks.push(getWeekDays(date));
		     date = getNextWeek(date);  
		     done = count++ > 2 && monthIndex !== getMonthIndex(date);
		     monthIndex = getMonthIndex(date);
		 }
		 return weeks;
	}

	//return given date in 'dddd, MMMM Do [at] h:mm' format
	function formatToDayMonthTimeFormat(date){
		return moment(date).format("dddd, MMMM Do [at] h:mm A") ;
	}

	//return given date in 'MMM DD' format
	function formatToMonthDayFormat(date){
		return moment(date).format("MMM DD");
	}

	//return given date in 'MMMM-DD-YYYY' format
	function formatToMonthDayYearFormat(date){
		return moment(date).format("MMMM-DD-YYYY");
	}

	//return given date in 'ddd, MMM DD' format
	function formatToDayNameMonthDayFormat(date){
		return moment(date).format("ddd, MMM DD");
	}

	function formatToDayName(date){
		return moment(date).format("ddd");
	}

	//return given date in 'hh:mm A z' format
	function formatToHourMinZoneFormat(date){
		var mtDate = moment(date);
		var dtString = mtDate.toDate().toString();
		var tz = dtString.substring(dtString.indexOf('(')+1, dtString.indexOf(')'));
		return mtDate.format("hh:mm A ")+tz;
	}								

	//return the given element's position including the scroll movement
	function getOffset(el) {
	  el = el.getBoundingClientRect();
	  return {
	    left: el.left + window.scrollX,
	    top: el.top + window.scrollY,
	    right: el.right
	  }
	}

	// Publicly Exposed Functions
    return {
    	getMonthDisplay: getMonthDisplay,
        getToday: getToday,
        getBoxedPrevMonth: getBoxedPrevMonth,
        getBoxedNextMonth: getBoxedNextMonth,
        getBoxedMonth: getBoxedMonth,
        formatToDayMonthTimeFormat: formatToDayMonthTimeFormat,
        formatToMonthDayFormat: formatToMonthDayFormat,
        formatToMonthDayYearFormat: formatToMonthDayYearFormat,
        formatToDayNameMonthDayFormat: formatToDayNameMonthDayFormat,
        formatToHourMinZoneFormat: formatToHourMinZoneFormat,
        formatToDayName: formatToDayName,
        getOffset: getOffset
    };

} )();

module.exports = CalendarUtility;