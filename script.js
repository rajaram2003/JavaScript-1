const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a task
function addTask() {
  if (inputBox.value.trim() === '') {
    alert("Please enter a task!");
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = inputBox.value;
  listContainer.appendChild(li);

  let span = document.createElement("span");

  // Add Lordicon inside the span
  span.innerHTML = `
    <lord-icon
      src="https://cdn.lordicon.com/nqtddedc.json"
      trigger="hover"
      colors="primary:#555555"
      style="width: 30px; height: 30px; cursor: pointer;">
    </lord-icon>
  `;

  li.appendChild(span);
  inputBox.value = "";

  saveData(); // Save after adding a task
}

// Listen for "Enter" key to add a task
inputBox.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {  
    addTask();
  }
});

// Fix: Handle clicks on both <span> and <lord-icon>
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
    
  } else if (e.target.closest("span")) {  
    e.target.closest("li").remove(); // Remove the entire <li>
    saveData();
  }
}, false);

// Save tasks to local storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Load saved tasks from local storage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}

showTask();
