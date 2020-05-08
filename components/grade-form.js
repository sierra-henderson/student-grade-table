class GradeForm {
  constructor(formElement, gradeID) {
    this.formElement = formElement;
    this.gradeID = gradeID;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetSubmit = this.handleReset.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit);
    this.formElement.addEventListener('reset', this.handleReset);
  }
  onSubmit(createGrade, updateGrade) {
    this.createGrade = createGrade;
    this.updateGrade = updateGrade;
  }
  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var name = formData.get('Name');
    var grade = formData.get('Grade');
    var course = formData.get('Course');
    if (event.target.children[3].getAttribute("id") === 'update') {
      this.updateGrade(name, course, grade, this.gradeID);
      this.handleReset()
    } else {
      this.createGrade(name, course, grade);
      event.target.reset();
    }
  }
  handleReset(event) {
    if (event) {
      event.preventDefault();
    }
    var inputs = document.querySelectorAll('input');
    inputs.forEach(el => {
      el.value = "";
    })
  }
}
