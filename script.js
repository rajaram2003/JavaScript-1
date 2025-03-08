const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === '') {
    alert("Please enter a task!");
  } else {
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
  }

  inputBox.value = "";
  saveData();
}

// Fix: Handle clicks on both <span> and <lord-icon>
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();

  } else if (e.target.tagName === "SPAN" || e.target.tagName === "LORD-ICON") {
    e.target.closest("li").remove(); // Ensure the whole <li> is removed
    saveData();
  }
}, false);

function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
  listContainer.innerHTML =localStorage.getItem("data");
}
showTask();