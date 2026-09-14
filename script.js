// ===== Functions =====
function calculateAverage(g1, g2, g3) {
  return (g1 + g2 + g3) / 3;
}

function getStatus(average) {
  if (average >= 90) return "Excellent";
  if (average >= 85) return "Very Good";
  if (average >= 80) return "Good";
  if (average >= 75) return "Passed";
  return "Failed";
}

function statusClass(status) {
  if (status === "Failed") return "failed";
  return "passed";
}

// ===== Array of subjects =====
let subjects = ["Programming", "Database", "Networking"];

document.getElementById("evaluateBtn").addEventListener("click", function () {
  let name = document.getElementById("studentName").value.trim();
  let id = document.getElementById("studentId").value.trim();
  let programming = parseFloat(document.getElementById("programming").value);
  let database = parseFloat(document.getElementById("database").value);
  let networking = parseFloat(document.getElementById("networking").value);

  if (!name || !id || isNaN(programming) || isNaN(database) || isNaN(networking)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  if (
    programming < 0 || programming > 100 ||
    database < 0 || database > 100 ||
    networking < 0 || networking > 100
  ) {
    alert("Grades must be between 0 and 100.");
    return;
  }

  // ===== Object grouping student info =====
  let student = {
    name: name,
    id: id,
    grades: [programming, database, networking]
  };

  let average = calculateAverage(student.grades[0], student.grades[1], student.grades[2]);
  let status = getStatus(average);
  let highest = Math.max(...student.grades);
  let lowest = Math.min(...student.grades);
  let passedAll = student.grades.every(function (g) {
    return g >= 75;
  });

  // ===== Loop through subjects array =====
  let subjectListHtml = "";
  for (let i = 0; i < subjects.length; i++) {
    let grade = student.grades[i];
    subjectListHtml += `<li>${subjects[i]}: ${grade}</li>`;
  }

  document.getElementById("outName").textContent = student.name;
  document.getElementById("outId").textContent = student.id;
  document.getElementById("outSubjects").innerHTML = subjectListHtml;
  document.getElementById("outHighest").textContent = highest;
  document.getElementById("outLowest").textContent = lowest;
  document.getElementById("outAverage").textContent = average.toFixed(2);

  let statusElem = document.getElementById("outStatus");
  statusElem.textContent = status;
  statusElem.className = statusClass(status);

  let passedAllElem = document.getElementById("outPassedAll");
  passedAllElem.textContent = passedAll ? "Yes" : "No";
  passedAllElem.className = passedAll ? "passed" : "failed";

  document.getElementById("output").classList.remove("hidden");
});

document.getElementById("clearBtn").addEventListener("click", function () {
  document.getElementById("studentName").value = "";
  document.getElementById("studentId").value = "";
  document.getElementById("programming").value = "";
  document.getElementById("database").value = "";
  document.getElementById("networking").value = "";
  document.getElementById("outSubjects").innerHTML = "";
  document.getElementById("output").classList.add("hidden");
});