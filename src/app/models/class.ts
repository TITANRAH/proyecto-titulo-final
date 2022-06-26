import { Student } from './students';
export class Class {
    id: number;
    date_start: string;
    date_end: string;
    id_student: number;
    price: number;
    student? : Student;
}