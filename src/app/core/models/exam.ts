import { Course } from "./course";

export class Exam{
    examId: number;
    name: string;
    description: string;
    examImg: ImageBitmap;
    geographyId: number;
    status: number;
    regDate: Date;
    modDate: Date;
    courses: Course[];
}