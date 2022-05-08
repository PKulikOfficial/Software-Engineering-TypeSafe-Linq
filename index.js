"use strict";
const then = (first, second) => fun((input) => second(first(input)));
const fun = (f) => {
    const fDecorated = f;
    fDecorated.then = function (postProcess) {
        return then(this, postProcess);
    };
    return fDecorated;
};
/*
DATA EXAMPLE
VALID QUERY
students.Select("Name", "Surname").Include("Grades", q => q.Select("Grade", "CourseId" ))

INVALID QUERY (No Address in Grades)
students.Select("Name", "Surname").Include("Grades", q => q.Select("Grade", "Address" ))
*/
//DATA TO TEST WITH
let students = [
    { "Name": "John", "Surname": "Doe", "Grades": [{ "Grade": 10, "CourseId": 20 }] },
    { "Name": "Ellie", "Surname": "Bellie", "Grades": [{ "Grade": 5, "CourseId": 20 }] },
    { "Name": "Albert", "Surname": "Einstein", "Grades": [{ "Grade": 7, "CourseId": 20 }] },
    { "Name": "Patryk", "Surname": "Kulik", "Grades": [{ "Grade": 9, "CourseId": 20 }] }
];
console.log(students.map(t => [t.Name, t.Surname, t.Grades[0].CourseId]));
