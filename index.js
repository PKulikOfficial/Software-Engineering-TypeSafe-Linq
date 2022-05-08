var then = function (first, second) {
    return fun(function (input) { return second(first(input)); });
};
var fun = function (f) {
    var fDecorated = f;
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
var students = [
    { "Name": "John", "Surname": "Doe", "Grades": [{ "Grade": 10, "CourseId": 20 }] },
    { "Name": "Ellie", "Surname": "Bellie", "Grades": [{ "Grade": 5, "CourseId": 20 }] },
    { "Name": "Albert", "Surname": "Einstein", "Grades": [{ "Grade": 7, "CourseId": 20 }] },
    { "Name": "Patryk", "Surname": "Kulik", "Grades": [{ "Grade": 9, "CourseId": 20 }] }
];
console.log(students.map(function (t) { return [t.Name, t.Surname, t.Grades[0].CourseId]; }));
