const deleteBtn = document.getElementById("delete");
const studentsList = document.getElementById("student-list-body");
const addStudentBtn = document.getElementById("add-student-btn");
const analyzeBtn = document.querySelector(".analyze-btn");
const average = document.getElementById("average");
const passedStudents = document.getElementById("passed");
const highestScore = document.getElementById("highest");
const lowestScore = document.getElementById("lowest");
const output =document.getElementById("list-output");
let newName = document.getElementById("name");
let newScore = document.getElementById("score");

const students = [
  { name: "Ada", score: 75 },
  { name: "John", score: 48 },
  { name: "Fatima", score: 82 },
  { name: "Bola", score: 33 },
  { name: "Paul", score: 59 },
  { name: "Red", score: 88 },
  { name: "Jude", score: 37 },
  { name: "Tina", score: 64 },
  { name: "Femi", score: 49 }
];

students.forEach(student => {
  studentsList.innerHTML += `<tr><td>${student.name}</td><td>${student.score}</td><td><button class="delete">Delete</button></td></tr>`
});

addStudentBtn.addEventListener("click", () => {
  if (newName.value.trim() && newScore.value.trim()) {
    students.push({ name: newName.value, score: Number(newScore.value) });
    studentsList.innerHTML += `
      <tr>
        <td>${newName.value}</td>
        <td>${newScore.value}</td>
        <td><button class="delete">Delete</button></td>
      </tr>
    `;
    newName.value = "";
    newScore.value = "";
    console.log(students);
  }
});

studentsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const row = e.target.closest("tr");
    const name = row.children[0].textContent;

    const index = students.findIndex(student => student.name === name);
    if (index !== -1) {
      students.splice(index, 1);
    };
    row.remove();
  }
});

analyzeBtn.addEventListener("click", () => {
  output.innerHTML = ``;
  let allScores = students.map(el => el.score);
  average.textContent = (allScores.reduce((sum, score) => sum + score, 0) / allScores.length).toFixed(1);
  passedStudents.textContent = students.filter(student => student.score > 50).length;
  highestScore.textContent = Math.max(...students.map(student => student.score));
  lowestScore.textContent = Math.min(...students.map(student => student.score));
  students.forEach(student => {
    output.innerHTML += `<tr><td>${student.name}</td><td>${student.score}</td><td>${student.score >= 50 ? `<span class="pass">Passed</span>` : `<span class="fail">Failed</span>`}</td></tr>`
  });
});

