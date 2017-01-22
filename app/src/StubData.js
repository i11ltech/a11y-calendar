import CalendarUtility from './CalendarUtility.js'

var todayDate = CalendarUtility.getToday();
var assignmentDays = [];
assignmentDays[0] = CalendarUtility.formatToMonthDayYearFormat(todayDate.clone().add(-2, "d"));
assignmentDays[1] = CalendarUtility.formatToMonthDayYearFormat(todayDate.clone().add(-10, "d"));
assignmentDays[2] = CalendarUtility.formatToMonthDayYearFormat(todayDate.clone().add(-30, "d"));
assignmentDays[3] = CalendarUtility.formatToMonthDayYearFormat(todayDate.clone().add(1, "d"));
assignmentDays[4] = CalendarUtility.formatToMonthDayYearFormat(todayDate.clone().add(10, "d"));
assignmentDays[5] = CalendarUtility.formatToMonthDayYearFormat(todayDate.clone().add(20, "d"));
assignmentDays[6] = CalendarUtility.formatToMonthDayYearFormat(todayDate.clone().add(31, "d"));
assignmentDays[7] = CalendarUtility.formatToMonthDayYearFormat(todayDate.clone().add(40, "d"));

var StubData = {
  data:{
      [assignmentDays[0]] : [
        {
          "item_id": "1a",
          "title": "Quiz 1",
          "startDate": assignmentDays[0],
          "dueDate": "2018-08-31T03:59:01Z",
          "points": 5,
          "openLink": "#/"
        },
        {
          "item_id": "1b",
          "title": "Chapter 2 Homework",
          "subtitle": "Progression Questions",
          "startDate": assignmentDays[0],
          "dueDate": "2018-08-31T03:59:01Z",
    	    "points": 10,
          "openLink": "#/"
        },
        {
          "item_id": "1c",
          "title": "Chapter 3 In-Class Assignment",
          "subtitle": "Progression Questions",
          "startDate": assignmentDays[0],
          "dueDate": "2018-08-31T03:59:01Z",
          "points": 20,
          "openLink": "#/"
        },
        {
          "item_id": "1d",
          "title": "Chapter 6 LearningCurve Activity",
          "subtitle": "Formative Assessment",
          "startDate": assignmentDays[0],
          "dueDate": "2018-08-31T03:59:01Z",
          "points": 10,
          "openLink": "#/"
        }
      ],
      [assignmentDays[1]] : [
        {
          "item_id": "2a",
          "title": "Quiz 2",
          "startDate": assignmentDays[1],
          "dueDate": "2018-08-18T03:59:01Z",
          "points": 10,
          "openLink": "#/"
        }
      ],
      [assignmentDays[2]] : [
        {
          "item_id": "3a",
          "title": "Chapter 3 LearningCurve Activity",
          "subtitle": "Formative Assessment",
          "startDate": assignmentDays[2],
          "dueDate": "2018-12-01T04:59:01Z",
          "points": 10,
          "openLink": "#/"
        }
      ],
      [assignmentDays[3]] : [
        {
          "item_id": "4a",
          "title": "RNA Transcription",
          "startDate": assignmentDays[3],
          "dueDate": "2018-05-31T03:59:01Z",
          "points": 4,
          "openLink": "#/"
        },
        {
          "item_id": "4b",
          "title": "Simulation Activity",
          "startDate": assignmentDays[3],
          "dueDate": "2018-05-31T03:59:01Z",
          "points": 4,
          "openLink": "#/"
        }
      ],
      [assignmentDays[4]] : [
        {
          "item_id": "5a",
          "title": "Simulation Activity: RNA Translation",
          "startDate": assignmentDays[4],
          "dueDate": "2018-05-26T03:59:01Z",
          "points": 10,
          "openLink": "#/"
        },
        {
          "item_id": "6a",
          "title": "An Overview of Metabolism",
          "startDate": assignmentDays[4],
          "dueDate": "2018-05-26T03:59:01Z",
          "points": 8,
          "openLink": "#/"
        }
      ],
      [assignmentDays[5]] : [
        {
          "item_id": "7a",
          "title": "Protein evolution and the origin of new proteins",
          "startDate": assignmentDays[5],
          "dueDate": "2018-06-02T03:59:01Z",
          "points": 2,
          "openLink": "#/"
        }
      ],
      [assignmentDays[6]] : [
        {
          "item_id": "8a",
          "title": "The Endomembrane System",
          "startDate": assignmentDays[6],
          "dueDate": "2018-06-16T03:59:01Z",
          "points": 7,
          "openLink": "#/"
        }
      ],
      [assignmentDays[7]] : [
        {
          "item_id": "9a",
          "title": "Building And Storing memories",
          "startDate": assignmentDays[7],
          "dueDate": "2018-06-16T03:59:01Z",
          "points": 7,
          "openLink": "#/"
        }
      ]
    }
};

module.exports = StubData;