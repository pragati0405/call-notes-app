const addnote = document.querySelector("#add_note");
const form = document.querySelector(".modal-form");
const cardsContainer = document.querySelector("#cards-container");

const imageInput = document.querySelector("#img");
const nameInput = document.querySelector("#name");
const townInput = document.querySelector("#town");
const purposeInput = document.querySelector("#purpose");
const radio_btn = document.querySelectorAll('input[name="category"]');

const closeBtn = document.querySelector(".btn-close");

 
const prevBtn = document.querySelector("#prev_btn");
const nextBtn = document.querySelector("#next_btn");

// Track the current card being displayed
let currentIndex = 0;

 
addnote.addEventListener("click", () => {
    form.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    form.style.display = "none";
});

//LOCAL STORAGE
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//  SAVE LOGIC 
function savelocalstorage(obj) {
    let tasks = getTasks();
    tasks.push(obj);
    saveTasks(tasks);
    
    // Automatically jump to the newly added card
    currentIndex = tasks.length - 1; 
    show_cards();
}

// FORM SUBMIT 
form.addEventListener("submit", function (event) {
    event.preventDefault();

    let selectedCategory = "";
    radio_btn.forEach(r => {
        if (r.checked) selectedCategory = r.value;
    });

    if (
        imageInput.value.trim() === "" ||
        nameInput.value.trim() === "" ||
        townInput.value.trim() === "" ||
        purposeInput.value.trim() === ""
    ) {
        alert("Please fill all details!");
        return;
    }

    if (!selectedCategory) {
        alert("Please select a category!");
        return;
    }

    savelocalstorage({
        img: imageInput.value,
        name: nameInput.value,
        hometown: townInput.value,
        bookings: purposeInput.value,
        category: selectedCategory
    });

    form.reset();
    form.style.display = "none";
});

// CARD CREATION  
function createCard(data) {
    const center = document.createElement("div");
    center.className = "card-wrapper";

    center.innerHTML = `
        <div class="card front">
            <div class="top">
                <img class="img" src="${data.img}" />
                <h2 class="name">${data.name}</h2>
            </div>

            <div class="details">
                <div class="detail">
                    <span>Home Town</span>
                    <span>${data.hometown}</span>
                </div>

                <div class="detail">
                    <span>Bookings</span>
                    <span>${data.bookings}</span>
                </div>
            </div>

            <div class="action">
                <button>Call</button>
                <button>Message</button>
            </div>
        </div>
    `;

    return center;
}

 
function show_cards() {
    cardsContainer.innerHTML = "";
    let tasks = getTasks();
 
    if (tasks.length === 0) {
        cardsContainer.innerHTML = "<p style='text-align:center; padding: 20px;'>No notes yet. Add one!</p>";
        return;
    }

     
    if (currentIndex >= tasks.length) currentIndex = tasks.length - 1;
    if (currentIndex < 0) currentIndex = 0;

     
    const currentTask = tasks[currentIndex];
    cardsContainer.appendChild(createCard(currentTask));
}

 
// Move up to the previous card
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        show_cards();
    }
});

// Move down to the next card
nextBtn.addEventListener("click", () => {
    let tasks = getTasks();
    if (currentIndex < tasks.length - 1) {
        currentIndex++;
        show_cards();
    }
});

 
show_cards();