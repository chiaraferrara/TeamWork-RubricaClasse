/** @format */
const urlParams = new URLSearchParams(window.location.search);
const registerId = urlParams.get('id');

//ci consente di aggiungere gli studenti manualmente

const getSelectedStudents = () => {
  const studentList = document.querySelectorAll('input[name="student"]:checked');
  const registersData = JSON.parse(localStorage.getItem('registers')) || [];

  const registerData = registersData.find(register => register.id === parseInt(registerId));

  registerData.studentslist = Array.isArray(registerData.studentslist) ? registerData.studentslist : [];

  studentList.forEach(student => {
    registerData.studentslist.push(student.value);
  });

  localStorage.setItem('registers', JSON.stringify(registersData));

  console.log('Students:', studentList);
};

const deleteStudent = studentId => {
  const registersData = JSON.parse(localStorage.getItem('registers')) || [];

  const registerData = registersData.find(register => register.id === parseInt(registerId));
  console.log(registerData);

  const studentIndex = registerData.studentslist.indexOf(studentId);

  registerData.studentslist.splice(studentIndex, 1);
  localStorage.setItem('registers', JSON.stringify(registersData));
  console.log('eliminato');
  console.log(registerData);
};

const createLesson = (id, date, topic, absent) => {
  const registro = registers.find(register => register.id === id);

  if (registro) {
    const newLesson = {
      id: Date.now(), //timestamp corrente come identificatore
      date: date,
      topic: topic,
      absent: students.map(student => student.id),
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

document.addEventListener('DOMContentLoaded', function () {
  //prendo l'id
  const urlParams = new URLSearchParams(window.location.search);
  const registerId = urlParams.get('id');

  const registersData = JSON.parse(localStorage.getItem('registers')) || [];
  const allstudentssData = JSON.parse(localStorage.getItem('students')) || [];

  const registerData = registersData.find(register => register.id === parseInt(registerId));

  if (!registerData) {
    console.error(`Non trovato ${registerId}`);
    return;
  }

  document.title = `${registerData.subject}`;

  console.log(registerData);

  const subjectElement = document.getElementById('subject');

  if (subjectElement) {
    subjectElement.textContent = `Registro di ${registerData.subject}`;
  }

  const addStModalBody = document.getElementById('addStBody');

  allstudentssData.forEach(student => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-label';
    checkbox.id = `student_${student.id}`;
    checkbox.name = 'student';
    checkbox.value = student.id;
    checkbox.textContent = `${student.name} ${student.lastName}`;

    const label = document.createElement('label');
    label.htmlFor = `student_${student.id}`;
    label.appendChild(document.createTextNode(`${student.name} ${student.lastName}`));

    addStModalBody.appendChild(checkbox);
    addStModalBody.appendChild(label);
    addStModalBody.appendChild(document.createElement('br'));
  });

  const studentListContainer = document.getElementById('studentListContainer');
  studentListContainer.innerHTML = '';

  const studentListtitle = document.createElement('h4');
  studentListtitle.innerText = 'Students: ';
  studentListContainer.appendChild(studentListtitle);

  registerData.studentslist.forEach(studentId => {
    const student = allstudentssData.find(s => s.id === parseInt(studentId));
    if (student) {
      const listGroupul = document.createElement('ul');
      listGroupul.setAttribute('class', 'list-group');
      const listItem = document.createElement('li');
      listItem.setAttribute('class', 'list-group-item');
      listItem.textContent = `${student.name} ${student.lastName}`;

      const dltBtn = document.createElement('button');
      dltBtn.setAttribute('class', 'btn btn-link dltBtn');
      const dltImg = document.createElement('img');
      dltImg.src = 'assets/delete.svg';

      listGroupul.appendChild(listItem);
      listItem.appendChild(dltBtn);
      dltBtn.appendChild(dltImg);

      dltBtn.addEventListener('click', function () {
        console.log('eliminazione....');
        // const studentIndex = registerData.studentslist.indexOf(student.id);
        try {
          deleteStudent(studentId);
        } catch (error) {
          console.log(error);
        }
      });

      studentListContainer.appendChild(listGroupul);
    }
  });

  const checkAbsentContainer = document.getElementById('checkabsent');

  registerData.studentslist.forEach(student => {
    student = allstudentssData.find(s => s.id === parseInt(studentId));
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input';
    checkbox.id = `student_${student.id}`;
    checkbox.value = student.id;

    const label = document.createElement('label');
    label.className = 'form-check-label';
    label.htmlFor = `student_${student.id}`;
    label.appendChild(document.createTextNode(`${student.name} ${student.lastName}`));

    const divCheck = document.createElement('div');
    divCheck.className = 'form-check';
    divCheck.appendChild(checkbox);
    divCheck.appendChild(label);
    checkAbsentContainer.appendChild(divCheck);
  });
});
