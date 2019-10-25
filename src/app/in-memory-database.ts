import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from './pages/students/shared/student.model';

export class InMemoryDatabase implements InMemoryDbService {
	createDb() {
		const students: Student[] = [
            { id: 1, name: 'João', course: 'Sistemas de Informação' } as Student,
            { id: 2, name: 'Maria', course: 'Sistemas de Informação' } as Student,
            { id: 3, name: 'Nicolas', course: 'Sistemas de Informação' } as Student,
            { id: 4, name: 'Alice', course: 'Sistemas de Informação' } as Student,
            { id: 5, name: 'Caroline', course: 'Sistemas de Informação' } as Student,
            { id: 6, name: 'Leonardo', course: 'Sistemas de Informação' } as Student,
            { id: 7, name: 'Patrick', course: 'Sistemas de Informação' } as Student,
            { id: 8, name: 'Carlos', course: 'Sistemas de Informação' } as Student,
            { id: 9, name: 'Laura', course: 'Sistemas de Informação' } as Student
		  ]

		return { students };
	}
}