/* =========================================
   STUDENT DATA
========================================= */

const students = [

    {
        id: "ST001",
        name: "João Silva",
        email: "joao@email.com",
        gender: "Male",
        course: "Computer Science",
        year: 2026,
        status: "Active"
    },

    {
        id: "ST002",
        name: "Ana Costa",
        email: "ana@email.com",
        gender: "Female",
        course: "Accounting",
        year: 2025,
        status: "Active"
    },

    {
        id: "ST003",
        name: "Pedro Lima",
        email: "pedro@email.com",
        gender: "Male",
        course: "Engineering",
        year: 2026,
        status: "Active"
    },

    {
        id: "ST004",
        name: "Maria Fernandes",
        email: "maria@email.com",
        gender: "Female",
        course: "Computer Science",
        year: 2024,
        status: "Inactive"
    },

    {
        id: "ST005",
        name: "Carlos Mendes",
        email: "carlos@email.com",
        gender: "Male",
        course: "Business Administration",
        year: 2026,
        status: "Active"
    }

];



/* =========================================
   ELEMENTS
========================================= */

const table =
    document.getElementById("studentTable");

const search =
    document.getElementById("search");

const courseFilter =
    document.getElementById("courseFilter");

const yearFilter =
    document.getElementById("yearFilter");

const statusFilter =
    document.getElementById("statusFilter");



/* =========================================
   LOAD FILTERS
========================================= */

function loadFilters() {

    const courses = [
        ...new Set(
            students.map(student => student.course)
        )
    ];

    const years = [
        ...new Set(
            students.map(student => student.year)
        )
    ];


    courses.forEach(course => {

        const option =
            document.createElement("option");

        option.value = course;

        option.textContent = course;

        courseFilter.appendChild(option);

    });


    years
        .sort((a, b) => b - a)
        .forEach(year => {

            const option =
                document.createElement("option");

            option.value = year;

            option.textContent = year;

            yearFilter.appendChild(option);

        });

}



/* =========================================
   DISPLAY STUDENTS
========================================= */

function displayStudents(data) {

    table.innerHTML = "";


    data.forEach(student => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>${student.id}</strong>
            </td>

            <td>

                <div class="student-name">
                    ${student.name}
                </div>

                <div class="student-email">
                    ${student.email}
                </div>

            </td>

            <td class="${
                student.gender === "Male"
                ? "male"
                : "female"
            }">

                ${student.gender}

            </td>

            <td>
                ${student.course}
            </td>

            <td>
                ${student.year}
            </td>

            <td>

                <span class="badge ${
                    student.status === "Active"
                    ? "active"
                    : "inactive"
                }">

                    ${student.status}

                </span>

            </td>

        `;


        table.appendChild(row);

    });


    document.getElementById(
        "resultCount"
    ).textContent =
        `${data.length} student${
            data.length !== 1 ? "s" : ""
        }`;

}



/* =========================================
   FILTER
========================================= */

function filterStudents() {

    const searchValue =
        search.value.toLowerCase();

    const courseValue =
        courseFilter.value;

    const yearValue =
        yearFilter.value;

    const statusValue =
        statusFilter.value;


    const filtered =
        students.filter(student => {

            const matchesSearch =

                student.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                student.email
                    .toLowerCase()
                    .includes(searchValue)

                ||

                student.id
                    .toLowerCase()
                    .includes(searchValue);


            const matchesCourse =

                courseValue === "" ||
                student.course === courseValue;


            const matchesYear =

                yearValue === "" ||
                student.year.toString() === yearValue;


            const matchesStatus =

                statusValue === "" ||
                student.status === statusValue;


            return (

                matchesSearch &&
                matchesCourse &&
                matchesYear &&
                matchesStatus

            );

        });


    displayStudents(filtered);

}



/* =========================================
   STATISTICS
========================================= */

function updateStatistics() {

    /* TOTAL */

    document.getElementById(
        "totalStudents"
    ).textContent = students.length;



    /* COURSES */

    const courses =
        new Set(
            students.map(
                student => student.course
            )
        );


    document.getElementById(
        "totalCourses"
    ).textContent = courses.size;



    /* CURRENT YEAR */

    const currentYear =
        new Date().getFullYear();


    const thisYear =
        students.filter(
            student =>
                student.year === currentYear
        ).length;


    document.getElementById(
        "thisYear"
    ).textContent = thisYear;



    /* ACTIVE */

    const active =
        students.filter(
            student =>
                student.status === "Active"
        ).length;


    document.getElementById(
        "activeStudents"
    ).textContent = active;

}



/* =========================================
   EVENTS
========================================= */

search.addEventListener(
    "input",
    filterStudents
);

courseFilter.addEventListener(
    "change",
    filterStudents
);

yearFilter.addEventListener(
    "change",
    filterStudents
);

statusFilter.addEventListener(
    "change",
    filterStudents
);



/* =========================================
   START
========================================= */

loadFilters();

displayStudents(students);

updateStatistics();

