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
    grades.forEach(el => this.renderGradeRow(el, this.deleteGrade))
    var noGrades = document.getElementById('noGrades')
    if (grades.length === 0) {
      noGrades.classList.remove('d-none')
    } else {
      noGrades.className = 'd-none';
    }
  }
  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade
  }
  renderGradeRow(data, deleteGrade) {
    var tBody = this.tableElement.querySelector('tbody');
    var td1 = document.createElement('td');
    td1.textContent = data.name;
    var td2 = document.createElement('td');
    td2.textContent = data.course;
    var td3 = document.createElement('td');
    td3.textContent = data.grade;
    var td4 = document.createElement('td');
    var button = document.createElement('button');
    button.textContent = 'DELETE';
    button.className = 'btn btn-danger'
    td4.append(button);
    var tr = document.createElement('tr');
    tr.append(td1, td2, td3, td4);
    tBody.append(tr);
    button.addEventListener('click', function() {
      deleteGrade(data.id)
    });
    return tr;
  }
}
