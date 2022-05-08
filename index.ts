// FROM LESSONS
interface Fun<input,output>{
    (_:input) : output,
    then<finalOutput>(postProcess:Fun<output, finalOutput>) : Fun<input,finalOutput>
}

const then = <input, intermediateOutput, output>(
    first:Fun<input,intermediateOutput>,second:Fun<intermediateOutput,output>) : Fun<input,output> =>
    fun((input:input) => second(first(input))
)

const fun = <input,output>(f:(_:input) => output) : Fun<input,output> => {
    const fDecorated = f as Fun<input,output>
    fDecorated.then = function<finalOutput>(this:Fun<input, output>, postProcess:Fun<output, finalOutput>) : Fun<input,finalOutput> {
    return then(this, postProcess)
    }
    return fDecorated
}

/*
DATA EXAMPLE
VALID QUERY
students.Select("Name", "Surname").Include("Grades", q => q.Select("Grade", "CourseId" ))

INVALID QUERY (No Address in Grades)
students.Select("Name", "Surname").Include("Grades", q => q.Select("Grade", "Address" ))
*/

//DATA TO TEST WITH
let students: { Name:string, Surname:string, Grades:[{ Grade:number, CourseId:number }] }[] = [
  { "Name": "John", "Surname": "Doe", "Grades":[{ "Grade": 10, "CourseId":20}]},
  { "Name": "Ellie", "Surname": "Bellie", "Grades":[{ "Grade": 5, "CourseId":20}]},
  { "Name": "Albert", "Surname": "Einstein", "Grades":[{ "Grade": 7, "CourseId":20}]},
  { "Name": "Patryk", "Surname": "Kulik", "Grades":[{ "Grade": 9, "CourseId":20}]}
];

console.log(students.map(t => [t.Name,t.Surname,t.Grades[0].CourseId]))

