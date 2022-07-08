"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("./core/table");
// Sample Data
const students = [
    { "Name": "John", "Surname": "Doe", "Grades": [{ "Grade": 10, "CourseId": 20 }] },
    { "Name": "Ellie", "Surname": "Bellie", "Grades": [{ "Grade": 19, "CourseId": 12 }] },
    { "Name": "Albert", "Surname": "Einstein", "Grades": [{ "Grade": 7, "CourseId": 20 }] },
    { "Name": "Patryk", "Surname": "Kulik", "Grades": [{ "Grade": 9, "CourseId": 20 }] },
    { "Name": "Beau", "Surname": "Gutlich", "Grades": [{ "Grade": 10, "CourseId": 15 }] },
];
// Initializing Table
const data = (0, table_1.Table)(students);
// Select
const select1 = data.Select("Name");
const select2 = select1.Select("Surname");
// Include
const include1 = select2.Include("Grades", q => q.Select("CourseId", "Grade"));
const include2 = select2.Include("Grades", q => q.Select("CourseId"));
// Print Select and Include
//console.table(select1.Result)
//console.table(select2.Result)
//console.table(include1.Result[0].Grades[0].CourseId)
//console.table(JSON.stringify(include1.Result,null,1)) //To show Include
//console.table(include2.Result)
//console.table(JSON.stringify(include2.Result,null,1)) //To show Include
//Initializing Lazy Table
const lazy = (0, table_1.LazyTable)();
// Lazy Select
const lazySelect1 = lazy.Select("Name");
const lazySelect2 = lazySelect1.Select("Surname");
// Lazy Include
const lazyInclude1 = lazySelect2.Include("Grades", a => a.Select("CourseId", "Grade"));
const lazyInclude2 = lazySelect2.Include("Grades", a => a.Select("CourseId"));
// Print Lazy Select and Include
//console.table(lazySelect1.From(data))
//console.table(lazySelect2.From(data))
//console.table(lazyInclude1.From(data)[0].Grades[0])
console.table(lazyInclude1.From(data)[0].Grades[0].Grade);
//console.table(JSON.stringify(lazyInclude1.From(data),null,1))
console.table(lazyInclude2.From(data)[0].Grades);
console.table(lazyInclude2.From(data)[0].Grades[0].CourseId);
//console.table(JSON.stringify(lazyInclude2.From(data),null,1))
