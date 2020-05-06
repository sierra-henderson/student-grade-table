$.ajax({
  method: "POST",
  url: 'https://sgt.lfzprototypes.com/api/users',
  data: {
    "firstName": "Sierra",
    "lastName": "Henderson",
    "cohort": "c04.20"
  },
  success: function(data) {
    console.log(data)
  },
  fail: function(err) {
    console.log(err);
  }
})
