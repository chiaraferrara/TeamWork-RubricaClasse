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


//---------------METODO DI VISUALIZZAZIONE REGISTRO---------------------

const showStudent = () => {
  const studentListContainer = document.querySelector('.studentlistcontainer');
  studentListContainer.innerHTML = '';
if(studentListContainer){
  const storedStudent = JSON.parse(localStorage.getItem('students')) || [];;
  storedStudent.forEach((student, index) => {    
    const studentContainer = document.createElement('div');
    studentContainer.classList.add('accordion-item');

    const studentHeader = document.createElement('h2');
    studentHeader.classList.add('accordion-header');

    const studentButton = document.createElement('button');
    studentButton.setAttribute('class', 'accordion-button studentBtn');
    studentButton.setAttribute('id', 'studentBtn');
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

    studentContainer.appendChild(studentHeader);
    studentCollapse.appendChild(studentBody);
    studentHeader.appendChild(studentButton);
    studentListContainer.appendChild(studentContainer);
    // },
    document.getElementById('studentBtn').addEventListener('click', function () {
      while (studentBody.firstChild) {
        studentBody.removeChild(studentBody.firstChild);
      }

      const emailInput = document.createElement('input');
      emailInput.setAttribute('type', 'email');
      emailInput.setAttribute('placeholder', 'Enter email');
      emailInput.value = student.email;
      emailInput.setAttribute('disabled', true);

      const nameLabel = document.createElement('strong');
      nameLabel.textContent = 'Name: ';

      const nameInput = document.createElement('input');
      nameInput.setAttribute('type', 'text');
      nameInput.setAttribute('placeholder', 'Enter name');
      nameInput.value = student.name;
      nameInput.setAttribute('disabled', true);

      const lastNameLabel = document.createElement('strong');
      lastNameLabel.textContent = 'Last Name: ';

      const lastNameInput = document.createElement('input');
      lastNameInput.setAttribute('type', 'text');
      lastNameInput.setAttribute('placeholder', 'Enter last name');
      lastNameInput.value = student.lastName;
      lastNameInput.setAttribute('disabled', true);

      const emailLabel = document.createElement('strong');
      emailLabel.textContent = 'Email: ';

      const emailSpan = document.createElement('input');
      emailSpan.textContent = student.email;
      emailSpan.setAttribute('type', 'email');
      emailSpan.value = student.email;
      emailSpan.setAttribute('disabled', true);

      const phoneLabel = document.createElement('strong');
      phoneLabel.textContent = 'Phone: ';

      const phoneSpan = document.createElement('input');
      phoneSpan.textContent = student.tel;
      phoneSpan.value = student.tel;
      phoneSpan.setAttribute('disabled', true);
      phoneSpan.setAttribute('type', 'tel');

      const buttonGroup = document.createElement('div');
      buttonGroup.setAttribute('class', 'btn-group');
      buttonGroup.setAttribute('role', 'group');
      buttonGroup.setAttribute('aria-label', 'Basic example');

      const editStudentBtn = document.createElement('button');
      editStudentBtn.textContent = 'Edit';
      editStudentBtn.setAttribute('class', 'btn btn-primary');
      editStudentBtn.setAttribute('id', `editStudentBtn_${index}`);

      const deleteStudentBtn = document.createElement('button');
      deleteStudentBtn.textContent = 'Delete';
      deleteStudentBtn.setAttribute('class', 'btn btn-danger');
      deleteStudentBtn.setAttribute('id', `deleteStudentBtn`);

      studentBody.appendChild(document.createElement('br'));

      studentBody.appendChild(nameLabel);
      studentBody.appendChild(nameInput);
      studentBody.appendChild(document.createElement('br'));

      studentBody.appendChild(lastNameLabel);
      studentBody.appendChild(lastNameInput);
      studentBody.appendChild(document.createElement('br'));
      studentBody.appendChild(emailLabel);
      studentBody.appendChild(emailSpan);
      studentBody.appendChild(document.createElement('br'));
      studentBody.appendChild(phoneLabel);
      studentBody.appendChild(phoneSpan);
      studentBody.appendChild(document.createElement('br'));
      studentBody.appendChild(buttonGroup);
      buttonGroup.appendChild(editStudentBtn);
      buttonGroup.appendChild(deleteStudentBtn);
      studentContainer.appendChild(studentCollapse);

      studentListContainer.appendChild(studentContainer);

      deleteStudentBtn.addEventListener('click', function () {
        deleteStudent(student.id);
        studentContainer.remove();
      });
      document.getElementById(`editStudentBtn_${index}`).addEventListener('click', function () {
        phoneSpan.removeAttribute('disabled');
        emailSpan.removeAttribute('disabled');
        nameInput.removeAttribute('disabled');
        lastNameInput.removeAttribute('disabled');
        editStudentBtn.setAttribute('disabled', true);
        studentButton.setAttribute('disabled', true);
        const saveEditBtn = document.createElement('button');
        saveEditBtn.setAttribute('class', 'btn btn-primary');
        saveEditBtn.setAttribute('id', 'saveEditBtn');
        saveEditBtn.textContent = 'Save';

        const closeBtn = document.createElement('button');
        closeBtn.setAttribute('class', 'btn btn-secondary');
        closeBtn.setAttribute('id', 'closeBtn');
        closeBtn.textContent = 'Close';

        buttonGroup.appendChild(saveEditBtn);
        buttonGroup.appendChild(closeBtn);

        document.getElementById('saveEditBtn').addEventListener('click', function () {
          const newName = nameInput.value;
          const newLastName = lastNameInput.value;
          const newMail = emailSpan.value;
          const newTel = phoneSpan.value;
          updateStudent(student.id, newName, newLastName, newMail, newTel);
          studentButton.textContent = `${newName} ${newLastName}`;
          document.getElementById('closeBtn').click();
        });
        document.getElementById('closeBtn').addEventListener('click', function () {
          // location.reload();
          phoneSpan.setAttribute('disabled', true);
          emailSpan.setAttribute('disabled', true);
          nameInput.setAttribute('disabled', true);
          lastNameInput.setAttribute('disabled', true);
          editStudentBtn.removeAttribute('disabled');
          studentButton.removeAttribute('disabled');
          const accordionItem = document.getElementById(`collapse${index}`);
          const bsCollapse = new bootstrap.Collapse(accordionItem);
          bsCollapse.hide();
        });
      });
    });
});
} else{
  console.log('errore...')
}
}

const showRegister = () => {
  const registersContainer = document.querySelector('.registerscontainer');
  registersContainer.innerHTML= ''; //rimuove tutto dal container dei registri. così ogni volta che si chiama il metodo non si duplicano
  if (registersContainer) {
    const storedRegisters = JSON.parse(localStorage.getItem('registers')) || [];;

    storedRegisters.forEach(register => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.width = '18rem';

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const cardTitle = document.createElement('input');
      cardTitle.classList.add('card-title');
      cardTitle.setAttribute('id', `subjectTitle_${register.id}`);
      cardTitle.setAttribute('disabled', true);
      cardTitle.textContent = register.subject;
      cardTitle.value = register.subject;

      const breakLine = document.createElement('br');

      const redirectButton = document.createElement('a');
      redirectButton.href = `register.html?id=${register.id}`;
      redirectButton.classList.add('btn', 'btn-link');

      const image = document.createElement('img');
      image.src = 'assets/access.svg';
      redirectButton.appendChild(image);

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(breakLine);
      cardBody.appendChild(redirectButton);
      card.appendChild(cardBody);

      const editSubjectBtn = document.createElement('button');
      editSubjectBtn.setAttribute('class', 'btn-link');
      const editImg = document.createElement('img');
      editImg.src = 'assets/edit.svg';
      editSubjectBtn.appendChild(editImg);

      registersContainer.appendChild(card);
      cardBody.appendChild(editSubjectBtn);

      editSubjectBtn.addEventListener('click', function () {
        cardTitle.removeAttribute('disabled');
        editSubjectBtn.setAttribute('disabled', true);

        const saveSubj = document.createElement('button');
        saveSubj.setAttribute('class', 'btn-link');
        saveSubj.setAttribute('id', 'saveBtnSubject');
        const saveSubjImg = document.createElement('img');
        saveSubjImg.src = 'assets/save.svg';
        saveSubj.appendChild(saveSubjImg);

        cardBody.appendChild(saveSubj);

        document.getElementById('saveBtnSubject').addEventListener('click', function () {
          const newSubjectTitle = document.getElementById(`subjectTitle_${register.id}`).value;
          updateRegister(register.id, newSubjectTitle);
          console.log(newSubjectTitle);

          
          cardTitle.setAttribute('disabled', false);
          editSubjectBtn.removeAttribute('disabled');
          saveSubj.remove();
          newSubjectTitle.textContent = `${register.subject}`;
        });
      });
    });
  }
}




//--------------------METODI REGISTRO--------------------

const createRegister = () => {
  const subject = document.getElementById('subjectInput').value;
  //prendo l'array dei corsi e trovo l'ultimo elemento per incrememntare l'id di 1

  const storedRegisters = JSON.parse(localStorage.getItem('registers')) || [];
  const lastRegister = storedRegisters.length > 0 ? storedRegisters[storedRegisters.length - 1] : null;
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
  showRegister();
  return register;
};

const updateRegister = (registerId, newSubjectName) => {
  const storedRegisters = JSON.parse(localStorage.getItem('registers')) || [];
  const index = storedRegisters.findIndex(register => register.id === registerId);

  if (index !== -1) {
    storedRegisters[index].subject = newSubjectName;
    localStorage.setItem('registers', JSON.stringify(storedRegisters));
    console.log(storedRegisters);
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

const updateStudent = (id, newName, newlastName, newMail, newTel) => {
  const index = students.findIndex(student => student.id === id);
  if (index !== -1) {
    students[index].name = newName;
    students[index].lastName = newlastName;
    students[index].email = newMail;
    students[index].tel = newTel;
    localStorage.setItem('students', JSON.stringify(students));
  }
};

const deleteStudent = id => {
  const index = students.findIndex(student => student.id === id);
  if (index !== -1) {
    //se index !=== -1 indica che lo studente è stato trovato nell'array
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
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
// const saveOnLocalStorage = () => {
//   localStorage.setItem('students', JSON.stringify(students));
//   localStorage.setItem('lectures', JSON.stringify(this.lectures));
//   localStorage.setItem('registers', JSON.stringify(registers));
// };

document.addEventListener('DOMContentLoaded', function () {
  showRegister();
  showStudent();
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

    const subject = document.getElementById('subjectInput').value;
    console.log(subject)

    
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
    showStudent();
  });

 // showRegister();

});
