class GradeTable {
  constructor(tableElement) {
    this.tableElement = tableElement
  }
  updateGrades(grades) {
    var tBody = this.tableElement.querySelector('tbody');
    while (tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
    }
    grades.forEach(function(el) {
      var td1 = document.createElement('td');
      td1.textContent = el.name;
      var td2 = document.createElement('td');
      td2.textContent = el.course;
      var td3 = document.createElement('td');
      td3.textContent = el.grade;
      var tr = document.createElement('tr');
      tr.append(td1, td2, td3);
      tBody.append(tr);
    })
  }
  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade
  }
  renderGradeRow(data, deleteGrade) {
    var td1 = document.createElement('td');
    td1.textContent = data.name;
    var td2 = document.createElement('td');
    td2.textContent = data.course;
    var td3 = document.createElement('td');
    td3.textContent = data.grade;
    var td4 = document.createElement('td');
    var button = document.createElement('button');
    button.textContent = 'DELETE';
    button.className = 'btn btn-success'
    td4.append(button);
    var tr = document.createElement('tr');
    tr.append(td1, td2, td3, td4);
    tBody.append(tr);
    button.addEventListener('click', this.deleteGrade(data.id));
    return tr;
  }
}
