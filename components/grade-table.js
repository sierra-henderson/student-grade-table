class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }
  updateGrades(grades) {
    var tBody = this.tableElement.querySelector('tbody');
    while (tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
    }
    grades.forEach(el => this.renderGradeRow(el, this.deleteGrade, this.handleUpdate))
    var noGrades = document.getElementById('noGrades')
    if (grades.length === 0) {
      noGrades.classList.remove('d-none');
    } else {
      noGrades.className = 'd-none';
    }
  }
  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade
  }
  onUpdateClick(handleUpdate) {
    this.handleUpdate = handleUpdate;
  }
  renderGradeRow(data, deleteGrade, handleUpdate) {
    var tBody = this.tableElement.querySelector('tbody');
    var td1 = document.createElement('td');
    td1.textContent = data.name;
    var td2 = document.createElement('td');
    td2.textContent = data.course;
    var td3 = document.createElement('td');
    td3.textContent = data.grade;
    var td4 = document.createElement('td');
    td4.setAttribute("id", "icon-right")
    var updateIcon = document.createElement('i');
    updateIcon.className = 'fas fa-edit text-info'
    td4.append(updateIcon);
    var deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash text-danger'
    td4.append(deleteIcon);
    var tr = document.createElement('tr');
    tr.append(td1, td2, td3, td4);
    tBody.append(tr);
    deleteIcon.addEventListener('click', function() {
      deleteGrade(data.id)
    });
    updateIcon.addEventListener('click', function () {
      handleUpdate(data)
    });
    return tr;
  }
}
