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
      studentslist: [],
      lectures: [],
    };
    registers.push(register);
    console.log(registers);
    this.saveOnLocalStorage();
  }

  updateRegister(registerId, newName) {
    const register = this.registers(register => register.id == registerId);
    if (register) {
      register.name = newName;
      this.saveOnLocalStorage();
    }
  }

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
        registro.grades.push({
          grade: value,
          date: date,
        });
      }
      this.saveOnLocalStorage();
    }
  }
  //voglio che questo metodo prenda l'id del registro come parametro e faccia il push di tutti gli studenti nell'array del registro in questione
  connectStudentToRegister(registerId) {
    const registro = registers.find(register => register.id === registerId);

    if (registro) {
      this.students.forEach(student => registro.studentslist.push(student.id));
      this.saveOnLocalStorage();
    }
  }

  deleteRegister(id) {
    const index = registers.findIndex(register => register.id === id);
    if (index !== -1) {
      registers.splice(index, 1);
    }
    this.saveOnLocalStorage();
  }
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
      attendance: false,
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
      student.name = newName;
      student.lastName = newlastName;
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
  createLesson(id, date, topic) {
    const registro = registers.find(register => register.id === id);

    if (registro) {
      const newLesson = {
        id: Date.now(), //timestamp corrente come identificatore
        date: date,
        topic: topic,
        attendees: this.students.map(student => student.id),
      };

      registro.lectures.push(newLesson);
      this.saveOnLocalStorage();
    }
  }

  deleteLesson({ id, idRegister }) {
    const registro = registers.find(register => register.id === idRegister);

    if (registro) {
      const index = registro.lectures.findIndex(lesson => lesson.id === id);

      if (index !== -1) {
        registro.lectures.splice(index, 1);
        this.saveOnLocalStorage();
      }
    }
  }

  removeAttendance(lessonId, studentId, idRegister) {
    const registro = registers.find(register => register.id === idRegister);

    if (registro) {
      const lesson = registro.lectures.find(lecture => lecture.id === lessonId);

      if (lesson) {
        const index = lesson.attendees.indexOf(studentId);
        if (index !== -1) {
          lesson.attendees.splice(index, 1);
          this.saveOnLocalStorage();
        }
      }
    }
  }

  markAttendance(lessonId, studentId, idRegister) {
    const registro = registers.find(register => register.id === idRegister);

    if (registro) {
      const lesson = registro.lectures.find(lecture => lecture.id === lessonId);

      if (lesson) {
        if (!lesson.attendees.includes(studentId)) {
          lesson.attendees.push(studentId);
          this.saveOnLocalStorage();
        }
      }
    }
  }
  //--------------------SALVATAGGIO NEL LOCAL STORAGE----------------
  saveOnLocalStorage() {
    localStorage.setItem('students', JSON.stringify(this.students));
    localStorage.setItem('countid', this.countid);
    localStorage.setItem('lectures', JSON.stringify(this.lectures));
    localStorage.setItem('registers', JSON.stringify(registers));
  }
}
