// Step 1: In the HTML file, create the layout for the elements that will remain static (unchanging).

// Step 2: Create an array of student objects.

const studentsList = [
  {
    firstName: "Anna",
    lastName: "Morris",
    dateOfBirth: new Date(2005, 7, 17),
    startYear: 2023,
    faculty: "Economics",
  },
  {
    firstName: "David",
    lastName: "Smith",
    dateOfBirth: new Date(2004, 7, 6),
    startYear: 2019,
    faculty: "History",
  },
  {
    firstName: "Peter",
    lastName: "Johnson",
    dateOfBirth: new Date(2006, 3, 5),
    startYear: 2021,
    faculty: "Medicine",
  },
  {
    firstName: "Emily",
    lastName: "Williams",
    dateOfBirth: new Date(2004, 11, 27),
    startYear: 2023,
    faculty: "Sociology",
  },
  {
    firstName: "Max",
    lastName: "Brown",
    dateOfBirth: new Date(2003, 11, 23),
    startYear: 2021,
    faculty: "Physics and Mathematics",
  },
  {
    firstName: "Katherine",
    lastName: "Davis",
    dateOfBirth: new Date(2005, 2, 3),
    startYear: 2023,
    faculty: "Chemistry",
  },
  {
    firstName: "Olivia",
    lastName: "Garcia",
    dateOfBirth: new Date(2007, 5, 21),
    startYear: 2022,
    faculty: "Law",
  },
  {
    firstName: "Paul",
    lastName: "Martinez",
    dateOfBirth: new Date(2000, 5, 27),
    startYear: 2018,
    faculty: "Philology",
  },
  {
    firstName: "Ivan",
    lastName: "Taylor",
    dateOfBirth: new Date(1999, 7, 24),
    startYear: 2020,
    faculty: "Sociology",
  },
  {
    firstName: "Maria",
    lastName: "Hernandez",
    dateOfBirth: new Date(2005, 9, 25),
    startYear: 2023,
    faculty: "Economics",
  },
];

// Step 3: Create a function to display a single student in the table, similar to how you did for a case in module 8. The function should return an HTML element with information about the student. The function should have one argument - the student object.

function getStudentItem(studentObj) {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = `${studentObj.firstName} ${studentObj.lastName}`;
  row.appendChild(nameCell);

  const facultyCell = document.createElement("td");
  facultyCell.textContent = studentObj.faculty;
  row.appendChild(facultyCell);

  const ageCell = document.createElement("td");
  const dateOfBirth = new Date(studentObj.dateOfBirth);
  const [day, month, year] = [
    dateOfBirth.getDate().toString().padStart(2, "0"),
    (dateOfBirth.getMonth() + 1).toString().padStart(2, "0"),
    dateOfBirth.getFullYear(),
  ];

  const currentDate = new Date();
  let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
  const monthDifference = currentDate.getMonth() - dateOfBirth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < dateOfBirth.getDate())
  ) {
    age--;
  }

  ageCell.textContent = `${day}.${month}.${year} (${age} years)`;
  row.appendChild(ageCell);

  const studyYearsCell = document.createElement("td");
  const startYear = studentObj.startYear;
  const endYear = startYear + 4;

  let course = currentDate.getFullYear() - startYear;
  const currentMonth = currentDate.getMonth();

  if (course > 4 || (course === 4 && currentMonth >= 8)) {
    studyYearsCell.textContent = `${startYear}-${endYear} (graduated)`;
  } else {
    studyYearsCell.textContent = `${startYear}-${endYear} (${course} year)`;
  }
  row.appendChild(studyYearsCell);

  return row;
}

// Step 4: Create a function to render all students. The function will take an array of students as an argument. The function should use the previously created function to create one record for each student. A loop will help you create a list of students. Each time the student list is changed, you will call this function to render the table.

function renderStudentsTable(studentsArray) {
  const table = document.getElementById("table");

  let tableBody = table.querySelector("tbody");
  if (!tableBody) {
    tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
  } else {
    tableBody.innerHTML = "";
  }

  studentsArray.forEach((student) => {
    const studentRow = getStudentItem(student);
    tableBody.appendChild(studentRow);
  });

  table.appendChild(tableBody);
}

renderStudentsTable(studentsList);

// Step 5: Add an event listener to the student addition form, which will validate the entered data. If the validation is successful, add the object with the student data to the students array and call the rendering function for the student table created in step 4.

document.addEventListener("DOMContentLoaded", function () {
  const newStudentForm = document.getElementById("new-student-form");

  newStudentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const studentFullNameInput = document.getElementById("student-name");
    const fullName = studentFullNameInput.value
      .trim()
      .split(" ")
      .map((name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      });

    const studentFacultyInput = document.getElementById("faculty");
    const faculty = studentFacultyInput.value.trim();
    const capitalizedFaculty =
      faculty.charAt(0).toUpperCase() + faculty.slice(1).toLowerCase();
    const studentBirthdayInput = document.getElementById("student-birthday");
    const studentStartStudyYear = document.getElementById("study-start-year");

    if (
      !fullName[0] ||
      !fullName[1] ||
      !faculty ||
      !studentBirthdayInput.value ||
      !studentStartStudyYear.value
    ) {
      alert("Please fill in all fields!");
      return;
    }

    let newStudent = {
      firstName: fullName[0],
      lastName: fullName[1],
      dateOfBirth: studentBirthdayInput.value,
      startYear: parseInt(studentStartStudyYear.value, 10),
      faculty: capitalizedFaculty,
    };
    console.log(newStudent);

    studentsList.push(newStudent);
    renderStudentsTable(studentsList);
    saveStudentsToLocalStorage();
    newStudentForm.reset();
  });

  function studentsFormValidation() {
    const dateInput = document.getElementById("student-birthday");
    const today = new Date().toISOString().split("T")[0];
    dateInput.max = today;
  }

  studentsFormValidation();
  renderStudentsTable(studentsList);
});

// Step 6: Create a function to sort the array of students and add click events to the corresponding columns.

function sortStudents(sortKey) {
  studentsList.sort((a, b) => {
    if (sortKey === "lastName") {
      return a.lastName.localeCompare(b.lastName);
    } else if (sortKey === "faculty") {
      return a.faculty.localeCompare(b.faculty);
    } else if (sortKey === "dateOfBirth") {
      return a.dateOfBirth - b.dateOfBirth;
    } else if (sortKey === "startYear") {
      return a.startYear - b.startYear;
    }
  });

  renderStudentsTable(studentsList);
}

document.getElementById("last-name-sort").addEventListener("click", () => {
  sortStudents("lastName");
});

document.getElementById("faculty-sort").addEventListener("click", () => {
  sortStudents("faculty");
});

document.getElementById("birthday-sort").addEventListener("click", () => {
  sortStudents("dateOfBirth");
});

document
  .getElementById("start-study-year-sort")
  .addEventListener("click", () => {
    sortStudents("startYear");
  });

function filterStudents() {
  const nameFilterValue = document
    .getElementById("name-filter")
    .value.toLowerCase();
  const facultyFilterValue = document
    .getElementById("faculty-filter")
    .value.toLowerCase();
  const startYearFilterValue =
    document.getElementById("start-year-filter").value;
  const finishYearFilterValue =
    document.getElementById("finish-year-filter").value;

  const filteredStudents = studentsList.filter((student) => {
    const fullName =
      `${student.lastName} ${student.firstName} ${student.patronymic}`.toLowerCase();
    const facultyMatch = student.faculty
      .toLowerCase()
      .includes(facultyFilterValue);
    const startYearMatch = startYearFilterValue
      ? student.startYear === parseInt(startYearFilterValue, 10)
      : true;
    const finishYearMatch = finishYearFilterValue
      ? student.startYear + 4 === parseInt(finishYearFilterValue, 10)
      : true;

    return (
      fullName.includes(nameFilterValue) &&
      facultyMatch &&
      startYearMatch &&
      finishYearMatch
    );
  });

  renderStudentsTable(filteredStudents);
}

document.addEventListener("DOMContentLoaded", function () {
  const nameFilter = document.getElementById("name-filter");
  const facultyFilter = document.getElementById("faculty-filter");
  const startYearFilter = document.getElementById("start-year-filter");
  const finishYearFilter = document.getElementById("finish-year-filter");

  nameFilter.addEventListener("input", filterStudents);
  facultyFilter.addEventListener("input", filterStudents);
  startYearFilter.addEventListener("input", filterStudents);
  finishYearFilter.addEventListener("input", filterStudents);
});

function saveStudentsToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(studentsList));
}

function loadStudentsFromLocalStorage() {
  const storedStudents = localStorage.getItem("students");
  studentsList.length = 0; 
  if (storedStudents) {
    const parsedStudents = JSON.parse(storedStudents);
    parsedStudents.forEach((student) => {
      student.dateOfBirth = new Date(student.dateOfBirth);
      studentsList.push(student);
    });
  }
}

// Call this function to load students from local storage
loadStudentsFromLocalStorage();
renderStudentsTable(studentsList);
