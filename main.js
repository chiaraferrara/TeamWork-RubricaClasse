/** @format */

const registers = [];
let students = [];
// class Register {
//   constructor() {
//     //prendiamo studenti, lezioni e materia dal local storage o array vuoto se non sono presenti.
//     this.countid = JSON.parse(localStorage.getItem('countid')) || 1; //Diamo 1 se non è presente il valore come default.
//     this.students = JSON.parse(localStorage.getItem('students') || []); //array vuoto se non esistono studenti.
//     this.lectures = JSON.parse(localStorage.getItem('lectures')) || [];
//     this.subject = subject;
//   }

//--------------------METODI REGISTRO--------------------

const createRegister = () => {
  const subject = document.getElementById('subjectInput').value;
  //prendo l'array dei corsi e trovo l'ultimo elemento per incrememntare l'id di 1

  const storedRegisters = JSON.parse(localStorage.getItem('registers')) || [];
  const lastRegister = storedRegisters.length>0 ? storedRegisters[storedRegisters.length -1 ] : null;
  const lastRegisterId = lastRegister ? lastRegister.id + 1 : 1; // ?, se la condizione è vera restituirà l'id del registro precedente.
  //altrimenti restituisce 0.
  const register = {
    id: lastRegisterId,
    subject: subject,
    grades: [],
    studentslist: [],
    lectures: [],
  };
 storedRegisters.push(register);
  console.log(registers);
  localStorage.setItem('registers', JSON.stringify(storedRegisters));
  return register;
};

const updateRegister = (registerId, newName) => {
  const register = this.registers(register => register.id == registerId);
  if (register) {
    register.name = newName;
    saveOnLocalStorage();
  }
};

const assignGrade = (id, registerId, value, date, subject) => {
  const student = students.find(student => student.id === id);
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
    saveOnLocalStorage();
  }
};

const addStudentstoSubject = id => {
  var students = JSON.parse(localStorage.getItem('students'));
  const studentIdtoAdd = document.getElementById('studentsId');
  const student = students.find(s => s.id === studentIdtoAdd);
  register.studentslist.push(student);
};

//voglio che questo metodo prenda l'id del registro come parametro e faccia il push di tutti gli studenti nell'array del registro in questione
const connectStudentToRegister = registerId => {
  const registro = registers.find(register => register.id === registerId);

  if (registro) {
    students.forEach(student => registro.studentslist.push(student.id));
    saveOnLocalStorage();
  }
};

const deleteRegister = id => {
  const index = registers.findIndex(register => register.id === id);
  if (index !== -1) {
    registers.splice(index, 1);
  }
  saveOnLocalStorage();
};
//--------------------METODI STUDENTE---------------------------
const addStudent = () => {
  const name = document.getElementById('NameInput').value;
  const lastName = document.getElementById('LastNameInput').value;
  const email = document.getElementById('EmailInput').value;
  const tel = document.getElementById('PhoneNumberInput').value;

  const storedStudents = JSON.parse(localStorage.getItem('students')) || []; 
  const lastStudent = storedStudents.length > 0 ? storedStudents[storedStudents.length - 1] : null;
  const lastStudentId = lastStudent ? lastStudent.id + 1 : 1;

  const student = {
    id: lastStudentId,
    name: name,
    lastName: lastName,
    email: email,
    tel: tel,
    grades: [],
    attendance: false,
  };
  storedStudents.push(student);
  localStorage.setItem('students', JSON.stringify(storedStudents));

  return student;
};


const getStudentList = () => {
  return students;
};

const updateStudent = (id, newName, newlastName) => {
  const student = students.find(student => student.id === id);
  if (student) {
    student.name = newName;
    student.lastName = newlastName;
    saveOnLocalStorage();
  }
};

const deleteStudent = id => {
  const index = students.findIndex(student => student.id === id);
  if (index !== -1) {
    //se index !=== -1 indica che lo studente è stato trovato nell'array
    students.splice(index, 1);
    saveOnLocalStorage();
  }
};

//-------------------METODI LEZIONI-----------------------------
const createLesson = (id, date, topic) => {
  const registro = registers.find(register => register.id === id);

  if (registro) {
    const newLesson = {
      id: Date.now(), //timestamp corrente come identificatore
      date: date,
      topic: topic,
      attendees: students.map(student => student.id),
    };

    registro.lectures.push(newLesson);
    saveOnLocalStorage();
  }
};

const deleteLesson = ({ id, idRegister }) => {
  const registro = registers.find(register => register.id === idRegister);

  if (registro) {
    const index = registro.lectures.findIndex(lesson => lesson.id === id);

    if (index !== -1) {
      registro.lectures.splice(index, 1);
      saveOnLocalStorage();
    }
  }
};

const removeAttendance = (lessonId, studentId, idRegister) => {
  const registro = registers.find(register => register.id === idRegister);

  if (registro) {
    const lesson = registro.lectures.find(lecture => lecture.id === lessonId);

    if (lesson) {
      const index = lesson.attendees.indexOf(studentId);
      if (index !== -1) {
        lesson.attendees.splice(index, 1);
        saveOnLocalStorage();
      }
    }
  }
};

const markAttendance = (lessonId, studentId, idRegister) => {
  const registro = registers.find(register => register.id === idRegister);

  if (registro) {
    const lesson = registro.lectures.find(lecture => lecture.id === lessonId);

    if (lesson) {
      if (!lesson.attendees.includes(studentId)) {
        lesson.attendees.push(studentId);
        saveOnLocalStorage();
      }
    }
  }
};
//--------------------SALVATAGGIO NEL LOCAL STORAGE----------------
const saveOnLocalStorage = () => {
  localStorage.setItem('students', JSON.stringify(students));
  localStorage.setItem('lectures', JSON.stringify(this.lectures)); 
  localStorage.setItem('registers', JSON.stringify(registers));
};


document.addEventListener('DOMContentLoaded', function () {
  students = JSON.parse(localStorage.getItem('students'));
  
  const closeBtnRegister = document.getElementById('closebtnAddRegister');
const closeBtnStudent = document.getElementById('closebtnAddStudent');

  const addSubjectModal = document.querySelector('.addSubjectForm');
  const addSubjectModalFooter = document.querySelector('.modal-footer');
  

  const subjectInput = document.createElement('input');
  addSubjectModal.appendChild(subjectInput);
  subjectInput.setAttribute('id', 'subjectInput');
  subjectInput.setAttribute('class', 'form-control');
  subjectInput.setAttribute('placeholder', 'Subject Name');

  const buttonSubjectInput = document.createElement('button');
  buttonSubjectInput.textContent = 'Add a Subject';
  buttonSubjectInput.setAttribute('class', 'btn btn-primary');
  buttonSubjectInput.setAttribute('id', 'btnSubjectInput');
  addSubjectModalFooter.appendChild(buttonSubjectInput);

  document.getElementById('btnSubjectInput').addEventListener('click', function () {
    createRegister();
    closeBtnRegister.click();
  });

  const addStudentModal = document.querySelector('.addStudentForm');
  const addStudentModalFooter = document.getElementById('modal-student-footer');
  //INPUT DEL NOME
  const studentNameInput = document.createElement('input');
  addStudentModal.appendChild(studentNameInput);
  studentNameInput.setAttribute('id', 'NameInput');
  studentNameInput.setAttribute('class', 'form-control');
  studentNameInput.setAttribute('placeholder', 'Name');

  //INPUT DEL COGNOME
  const studentLastNameInput = document.createElement('input');
  studentLastNameInput.setAttribute('id', 'LastNameInput');
  studentLastNameInput.setAttribute('class', 'form-control');
  studentLastNameInput.setAttribute('placeholder', 'Last Name');
  addStudentModal.appendChild(studentLastNameInput);

  //INPUT DELLA MAIL
  const studentEmailInput = document.createElement('input');
  studentEmailInput.setAttribute('id', 'EmailInput');
  studentEmailInput.setAttribute('class', 'form-control');
  studentEmailInput.setAttribute('type', 'email');
  studentEmailInput.setAttribute('placeholder', 'Email');
  addStudentModal.appendChild(studentEmailInput);

  //INPUT DEL TELEFONO
  const studentPhoneNumberInput = document.createElement('input');
  studentPhoneNumberInput.setAttribute('id', 'PhoneNumberInput');
  studentPhoneNumberInput.setAttribute('class', 'form-control');
  studentPhoneNumberInput.setAttribute('type', 'tel');
  studentPhoneNumberInput.setAttribute('placeholder', 'Phone Number');
  addStudentModal.appendChild(studentPhoneNumberInput);

  const btnAddStudent = document.createElement('button');
  btnAddStudent.textContent = 'Add Student';
  btnAddStudent.setAttribute('id', 'btnAddStudent');
  btnAddStudent.setAttribute('class', 'btn btn-primary');
  addStudentModalFooter.appendChild(btnAddStudent);

  document.getElementById('btnAddStudent').addEventListener('click', function () {
    addStudent();
    closeBtnStudent.click();
  });


  const studentListContainer = document.querySelector('.studentlistcontainer');

  //LISTA DEGLI STUDENTI
  students.forEach((student, index) => {
    const studentContainer = document.createElement('div');
    studentContainer.classList.add('accordion-item');

    const studentHeader = document.createElement('h2');
    studentHeader.classList.add('accordion-header');

    const studentButton = document.createElement('button');
    studentButton.classList.add('accordion-button');
    studentButton.setAttribute('type', 'button');
    studentButton.setAttribute('data-bs-toggle', 'collapse');
    studentButton.setAttribute('data-bs-target', `#collapse${index}`);
    studentButton.setAttribute('aria-expanded', 'true');
    studentButton.setAttribute('aria-controls', `collapse${index}`);
    studentButton.textContent = `${student.name} ${student.lastName}`;

    const studentCollapse = document.createElement('div');
    studentCollapse.classList.add('accordion-collapse', 'collapse');
    studentCollapse.setAttribute('id', `collapse${index}`);
    studentCollapse.setAttribute('data-bs-parent', '#accordionExample');

    const studentBody = document.createElement('div');
    studentBody.classList.add('accordion-body');
    studentBody.innerHTML = `<strong>Email:</strong> ${student.email}<br><strong>Phone:</strong> ${student.tel}`;

    // Append elements to build the student accordion structure
    studentHeader.appendChild(studentButton);
    studentContainer.appendChild(studentHeader);
    studentCollapse.appendChild(studentBody);
    studentContainer.appendChild(studentCollapse);
    
    // Append the student container to the student list container
    studentListContainer.appendChild(studentContainer);
  });




  const registersContainer = document.querySelector('.registerscontainer');

  if (registersContainer) {
    
    const storedRegisters = JSON.parse(localStorage.getItem('registers'));

    storedRegisters.forEach(register => {
    
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.width = '18rem';

     
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = register.subject;


      const redirectButton = document.createElement('a');
      redirectButton.href = `register/${register.id}`; 
      redirectButton.classList.add('btn', 'btn-link');
      
      
      const image = document.createElement('img');
      image.src = 'assets/access.svg'; 
      redirectButton.appendChild(image);


    
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(redirectButton);
      card.appendChild(cardBody);

      registersContainer.appendChild(card);
    });
  }
});
