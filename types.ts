export interface grades {
    Grade: number,
    CourseId: number
}

export interface student {
    Name: string,
    Surname: string,
    Grades: Array<grades>
}