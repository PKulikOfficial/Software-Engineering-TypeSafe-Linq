export interface grades {
    Grade: number,
    CourseId: number
}

export interface student {
    Name: string,
    Surname: string,
    Grades: Array<grades>
}

export interface table<T> {
    data : T
}
