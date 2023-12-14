/** @format */

const registers = [];
class Register {
  constructor(subject) {
    //prendiamo studenti, lezioni e materia dal local storage o array vuoto se non sono presenti.
    this.countid = JSON.parse(localStorage.getItem('countid')) || 1; //Diamo 1 se non è presente il valore come default.
    this.students = JSON.parse(localStorage.getItem('students') || []); //array vuoto se non esistono studenti.
    this.lectures = JSON.parse(localStorage.getItem('lectures')) || [];
    this.subject = subject;
  }

  //--------------------METODI REGISTRO--------------------

  createRegister(subject) {
    //prendo l'array dei corsi e trovo l'ultimo elemento per incrememntare l'id di 1
    const lastRegister = registers[registers.length - 1];
    const lastRegisterId = lastRegister ? lastRegister.id : 0; // ?, se la condizione è vera restituirà l'id del registro precedente.
    //altrimenti restituisce 0.
    const register = {
      id: lastRegisterId + 1, //incrementa di 1
      subject: subject,
      grades: [],
    };
    registers.push(register);
    console.log(registers);
    this.saveOnLocalStorage();
  }

  updateRegister(registerId, newName) {}

  assignGrade(id, registerId, value, date, subject) {
    const student = this.students.find(student => student.id === id);
    if (student) {
      student.grade.push({
        grade: value,
        date: date,
        subject: subject,
      });

      const registro = registers.find(register => register.id === registerId);
      if (registro) {
        register.grades.push({
          grade: value,
          date: date,
        });
      }
      this.saveOnLocalStorage();
    }
  }

  connectStudentToRegister() {}

  deleteRegister() {}
  //--------------------METODI STUDENTE---------------------------
  addStudent(name, lastName) {
    const lastStudent = this.students[this.students.length - 1]; //prendiamo l'ultimo studente
    const lastStudentId = lastStudent ? lastStudent.id : 0; //leggere riga 18 per spiegazione.
    //oggetto studente
    const student = {
      id: lastStudentId + 1, //incremento dell'id alla creazione
      name: name,
      lastName: lastName,
      grades: [],
      attendance: true,
    };
    this.students.push(student);
    console.log(this.studenti);
    this.saveOnLocalStorage();
    return student;
  }

  getStudentList() {
    return this.students;
  }

  updateStudent(id, newName, newlastName) {
    const student = this.students.find(student => student.id === id);
    if (student) {
      this.student.name = newName;
      this.student.lastName = newlastName;
      this.saveOnLocalStorage();
    }
  }

  deleteStudent(id) {
    const index = this.students.findIndex(student => student.id === id);
    if (index !== -1) {
      //se index !=== -1 indica che lo studente è stato trovato nell'array
      this.students.splice(index, 1);
      this.saveOnLocalStorage();
    }
  }

  //-------------------METODI LEZIONI-----------------------------
  createLesson(id, date, topic) {}

  deleteLesson({ id, idRegister, idStudent }) {}

  //--------------------SALVATAGGIO NEL LOCAL STORAGE----------------
  saveOnLocalStorage() {
    localStorage.setItem('students', JSON.stringify(this.students));
    localStorage.setItem('countid', this.countid);
    localStorage.setItem('lectures', JSON.stringify(this.lectures));
    localStorage.setItem('registers', JSON.stringify(registers));
  }
}
