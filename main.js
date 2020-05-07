// API Key: "J0aNGWGc"
var header = document.querySelector('header');

var pageHeader = new PageHeader(header);

var tableElement = document.querySelector('table');

var gradeTable = new GradeTable(tableElement)

var form = document.querySelector('form');

var gradeForm = new GradeForm(form);

var app = new App(gradeTable, pageHeader, gradeForm);

app.start();
