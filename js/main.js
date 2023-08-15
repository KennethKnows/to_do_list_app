

document.addEventListener("DOMContentLoaded", function() {
    let taskInput = document.querySelector("#taskInput");
    let dateInput = document.querySelector("#dateInput");
    let addTaskBtn = document.querySelector("#addTaskBtn");
    let todoList = document.querySelector("#todoList");
    let tasks = JSON.parse(localStorage.getItem("list")) || [];

    let nextId = 1; // here ka mag initialize sa unique ID counter

    console.log(tasks);

    let tdList = "";

    if (todoList) {
        if (tasks.length === 0) {
            tdList = `<p id="warning">No Task added.</p>`;
        } else {
            tasks.forEach((x, index) => {
                tdList += `
                    <li>${x.disTaskInput} ${x.disDateInput}
                        <button class="deleteBtn" data-id="${x.id}">Delete</button>
                    </li>`;
                nextId = Math.max(nextId, x.id + 1); //diri mag update ang nextId based on existing IDs
            });
        }
        todoList.innerHTML = tdList;
    } else {
        console.error("todoList element not found");
    }

    let addTask = () => {
        if (tasks == null) {
            tasks = [];
        }

        let task = {
            id: nextId, // Assign the unique ID
            disTaskInput: taskInput.value,
            disDateInput: dateInput.value,
        };

        nextId++; // Increment the unique ID counter

        tasks.push(task);
        console.log(tasks);

        localStorage.setItem("list", JSON.stringify(tasks));

        if (tasks.length === 1) {
            let warning = document.querySelector("#warning");
            if (warning) {
                warning.style.display = "none";
            }
        }

        let itemTask = document.createElement("li");
        itemTask.innerHTML = `
            ${task.disTaskInput} - ${task.disDateInput}
            <button class="deleteBtn" data-id="${task.id}">Delete</button>
        `;

        todoList.appendChild(itemTask);
        attachDeleteListeners();
    };

    addTaskBtn.addEventListener("click", addTask);

    function attachDeleteListeners() {
        let deleteButtons = document.querySelectorAll(".deleteBtn");
        deleteButtons.forEach(button => {
            button.removeEventListener("click", deleteTask);
            button.addEventListener("click", deleteTask);
        });
    }

    function deleteTask() {
        let id = parseInt(this.getAttribute("data-id"));
        let index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            tasks.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(tasks));
            renderTasks();
        }
    }

    function renderTasks() {
        tdList = "";
        if (todoList) {
            if (tasks.length === 0) {
                tdList = `<p id="warning">No Task added.</p>`;
            } else {
                tasks.forEach((x) => {
                    tdList += `
                        <li>${x.disTaskInput} ${x.disDateInput}
                            <button class="deleteBtn" data-id="${x.id}">Delete</button>
                        </li>`;
                });
            }
            todoList.innerHTML = tdList;
            attachDeleteListeners();
        }
    }

    renderTasks();
});