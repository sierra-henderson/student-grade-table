class App {
  constructor(gradeTable, pageHeader, gradeForm) {
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
  }
  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades);
    var total = 0;
    grades.forEach(function(el) {
      total += el.grade;
    })
    var average = Math.round(total / grades.length);
    if (isNaN(average)) {
      average = "N/A"
    }
    this.pageHeader.updateAverage(average);
  }
  getGrades() {
    $.ajax({
      method: "GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      data: "none",
      headers:
      {
        "X-Access-Token": "J0aNGWGc"
      },
      success: this.handleGetGradesSuccess,
      fail: this.handleGetGradesError
    })
  }
  start() {
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
  }
  createGrade(name, course, grade) {
    $.ajax({
      method: "POST",
      url: "https://sgt.lfzprototypes.com/api/grades",
      data: {
        "name": name,
        "course": course,
        "grade": grade
        },
      headers:
      {
        "X-Access-Token": "J0aNGWGc"
      },
      success: this.handleCreateGradeSuccess,
      fail: this.handleCreateGradeError
    })
  }
  handleCreateGradeError(error) {
    console.error(error)
  }
  handleCreateGradeSuccess() {
    this.getGrades()
  }
  deleteGrade(id) {
    $.ajax({
      method: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      data: "none",
      headers:
      {
        "X-Access-Token": "J0aNGWGc"
      },
      success: this.handleDeleteGradeSuccess,
      fail: this.handleDeleteGradeError
    })
  }
  handleDeleteGradeError(error) {
    console.error(error)
  }
  handleDeleteGradeSuccess() {
    this.getGrades()
  }
}
