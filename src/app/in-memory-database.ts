import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from './pages/students/shared/student.model';

export class InMemoryDatabase implements InMemoryDbService {
	createDb() {
		const students: Student[] = [
            { id: 1, name: 'João', birth: "19/7/2019" } as Student,
            { id: 2, name: 'Maria', birth: "21/7/2019" } as Student,
            { id: 3, name: 'Nicolas', birth: "23/7/2019" } as Student,
            { id: 4, name: 'Alice', birth: "25/7/2019" } as Student,
            { id: 5, name: 'Caroline', birth: "26/8/2019" } as Student,
            { id: 6, name: 'Leonardo', birth: "19/9/2019" } as Student,
            { id: 7, name: 'Patrick', birth: " 2/1/2019" } as Student,
            { id: 8, name: 'Carlos', birth: "19/5/2019" } as Student,
            { id: 9, name: 'Laura', birth: "19/7/2019" } as Student
		  ]

		return { students };
	}
}
