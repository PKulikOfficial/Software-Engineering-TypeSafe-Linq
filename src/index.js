"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("./core/table");
// Sample Data
const students = [
    { "Name": "John", "Surname": "Doe", "Grades": [{ "Grade": 10, "CourseId": 20 }, { "Grade": 15, "CourseId": 25 }] },
    { "Name": "Ellie", "Surname": "Bellie", "Grades": [] },
    { "Name": "Albert", "Surname": "Einstein", "Grades": [{ "Grade": 7, "CourseId": 20 }] },
    { "Name": "Patryk", "Surname": "Kulik", "Grades": [{ "Grade": 9, "CourseId": 20 }] },
    { "Name": "Beau", "Surname": "Gutlich", "Grades": [{ "Grade": 10, "CourseId": 15 }] },
];
const data = (0, table_1.Table)(students);
// Normal Select
const select1 = data.Select("Name");
const select2 = select1.Select("Surname");
const select3 = select2.Include("Grades", q => q.Select("Grade", "CourseId"));
//const 
console.log(select2.Result);
console.log(select3.Result);
// Lazy Select
const lazy = (0, table_1.LazyTable)();
const testlazy1 = lazy.Select("Name");
const testlazy2 = testlazy1.Select("Surname");
const testlazy3 = testlazy1.Include("Grades", a => a.Select("Grade", "CourseId"));
console.log(testlazy1.From(data));
console.log(testlazy2.From(data));
console.log(testlazy3.From(data));
