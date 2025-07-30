const form = document.querySelector("#form");
const input = document.querySelector("#input-txt");
const add_btn = document.querySelector("#add");
const item_list = document.querySelector("#list");
const item_left = document.querySelector("span");
const filter = document.querySelector(".filter-btn");
const clear_completed = document.querySelector("#clear-completed");
const all_btn = document.querySelector("#All");


let total_item = 0;


// add items to the to-do list section
form.addEventListener("submit", add_value)

function add_value(event) {
  event.preventDefault();

  if (input.value == "" || input.value == " ") {
    alert("please enter a valid task");
    return;
  }

  // items
  const item = document.createElement("div");
  item.classList.add("items");
  // item name
  const item_name = document.createElement("div");
  item_name.classList.add("item-name");

  // input
  const inpt = document.createElement("input");
  inpt.type = "checkbox";
  inpt.classList.add("item-check");

  // text
  const name = document.createElement("p");
  name.classList.add("item-text");
  name.textContent = input.value;

  item_name.appendChild(inpt);
  item_name.appendChild(name);

  // edit del
  const edit_del = document.createElement("div");
  edit_del.classList.add("edit-del");
  // edit btn
  const edit = document.createElement("button");
  edit.classList.add("edit-btn");
  edit.textContent = "edit";
  // delete btn
  const del = document.createElement("button");
  del.id = "del";
  del.textContent = "delete";

  edit_del.appendChild(edit);
  edit_del.appendChild(del);

  item.appendChild(item_name);
  item.appendChild(edit_del);

  item_list.appendChild(item);

  input.value = "";
  // display total no of task to do
  item_left.textContent = ++total_item;

}

// check and unchecked

item_list.addEventListener("change", (e) => {
  if (!e.target.matches(".item-check")) return;

  const item = e.target.closest(".items");
  const text = item.querySelector(".item-text");
  all_btn.className="active";

  if (e.target.checked) {
    text.style.textDecoration = "line-through";
    text.style.color = "#5f8ea6";

    item_left.textContent = --total_item;
  }
  else {
    text.style.textDecoration = "none";
    text.style.color = "#00A6FB";

    item_left.textContent = ++total_item;
  }
});


// filter button

filter.addEventListener("click", (event) => {


  if (event.target.id == "All") {
    Array.from(item_list.children).forEach(element => {
      element.style.display = "flex";
    });
  }

  else if (event.target.id == "active") {
    Array.from(item_list.children).forEach(element => {
      if (element.querySelector('input[type="checkbox"]').checked) {
        element.style.display = "none";
      }
      else {
        element.style.display = "flex";
      }
    });
  }
  else {
    Array.from(item_list.children).forEach(element => {

      if (element.querySelector('input[type="checkbox"]').checked) {
        element.style.display = "flex";
      }
      else {
        element.style.display = "none";
      }
    });
  }

});

// turn on active class for filter btn

const filterButtons = document.querySelectorAll(".filter-box button");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove 'active' class from all buttons
    filterButtons.forEach(b => b.classList.remove("active"));
    // Add 'active' class to the clicked button
    btn.classList.add("active");
    if(total_item === 0){
      alert("the list is empty");
       btn.classList.remove("active");
    }
  });
});

// clear complete
clear_completed.addEventListener("click", () => {
  const result = Array.from(item_list.children).filter((element) => {
    const checkbox = element.querySelector('input[type="checkbox"]');
    return checkbox && checkbox.checked;
  });
  result.forEach((element)=>{
    item_list.removeChild(element);
  })

})

// delete and edit button
item_list.addEventListener("click", (e) => {
  const item = e.target.closest(".items");
  if (!item) return;

  // DELETE
  if (e.target.matches("#del")) {
    const checkbox = item.querySelector(".item-check");
    if (!checkbox.checked) {
      item_left.textContent = --total_item;
    }
    item.remove();
    return;
  }

  // EDIT
  if (e.target.matches(".edit-btn")) {
    const textEl = item.querySelector(".item-text");
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("edit-input");
    input.value = textEl.textContent;
    textEl.replaceWith(input);
    input.focus();

    e.target.textContent = "Save";
    e.target.classList.remove("edit-btn");
    e.target.classList.add("save-btn");
    return;
  }

  // SAVE
  if (e.target.matches(".save-btn")) {
    const input = item.querySelector(".edit-input");
    const newText = input.value.trim();
    if (!newText) {
      alert("Task cannot be empty!");
      return;
    }

    const newTextEl = document.createElement("p");
    newTextEl.classList.add("item-text");
    newTextEl.textContent = newText;
    input.replaceWith(newTextEl);

    e.target.textContent = "edit";
    e.target.classList.remove("save-btn");
    e.target.classList.add("edit-btn");
  }
});

