class App {
  constructor(gradeTable, pageHeader, gradeForm) {
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
    this.gradeArray = null;
    this.handleAllGradesSuccess = this.handleAllGradesSuccess.bind(this);
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.updateGrade = this.updateGrade.bind(this);
    this.handleUpdateGradeError = this.handleUpdateGradeError.bind(this);
    this.handleUpdateGradeSuccess = this.handleUpdateGradeSuccess.bind(this);
  }
  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradeArray = grades;
    this.handleAllGradesSuccess(grades)
  }

  handleAllGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades);
    var total = 0;
    grades.forEach(function (el) {
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
    this.gradeForm.onSubmit(this.createGrade, this.updateGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeTable.onUpdateClick(this.updateForm);
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
  handleCreateGradeSuccess(grade) {
    grade.grade = parseInt(grade.grade)
    this.gradeArray.push(grade)
    this.handleAllGradesSuccess(this.gradeArray);
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
    var index;
    this.gradeArray.forEach((el, i) => {
      if (el.id === id) {
        index = i;
      }
    })
    this.gradeArray.splice(index, 1)
  }

  handleDeleteGradeError(error) {
    console.error(error)
  }

  handleDeleteGradeSuccess() {
    this.handleAllGradesSuccess(this.gradeArray);
  }

  updateForm(data) {
    var name = document.getElementById('studentName')
    var course = document.getElementById('studentCourse')
    var grade = document.getElementById('studentGrade')
    name.value = data.name;
    course.value = data.course;
    grade.value = data.grade;
    this.gradeForm.gradeID = data.id;
    var button = document.querySelector('.btn-success');
    button.textContent = 'Update';
    button.setAttribute("id", "update");
  }

  updateGrade(name, course, grade, id) {
    $.ajax({
      method: "PATCH",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      data: {
        "name": name,
        "course": course,
        "grade": grade
      },
      headers:
      {
        "X-Access-Token": "J0aNGWGc"
      },
      success: this.handleUpdateGradeSuccess,
      fail: this.handleUpdateGradeError
    })
  }

  handleUpdateGradeError(error) {
    console.error(error)
  }

  handleUpdateGradeSuccess(grade) {
    grade.grade = parseInt(grade.grade)
    var gradeID = grade.id;
    var index;
    console.log(this.gradeArray)
    this.gradeArray.forEach((el, i) => {
      if (el.id === grade.id) {
        index = i;
        console.log(index)
      }
    })
    this.gradeArray.splice(index, 1, grade)
    console.log(this.gradeArray)
    this.handleAllGradesSuccess(this.gradeArray);
  }
}
