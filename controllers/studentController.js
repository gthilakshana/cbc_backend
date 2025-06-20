import Student from "../models/student.js";

export function getStudents(req, res) {
  Student.find().then((studentList) => {
    res.json({
      list: studentList,
    });
  });
}

export function createStudent(req, res) {
  const student = new Student(req.body);
  student
    .save()
    .then((student) => {
      res.json({
        message: "Student saved successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "Error in saving student",
      });
    });
}

export function deleteStudent(req, res) {
  Student.deleteOne({ name: req.body.name }).then(() => {
    res.json({
      message: "Student deleted successfully",
    });
  });
}
