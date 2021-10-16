// console.dir(window.document); displays the html element as an object. Dom element 
// document objects allows access to everything on the webpage. i.e. document.blah
// window.document.querySelector("button"); element selector
// document.querySelector(".btn"); class selector
// document.querySelector("button").textContent; selects "add task"
// document.querySelector("#save-task"); selects the id save-task

// assign the button element object representation to a variable in the file
// the EL suffix identifies this as a dom element. camelCase marks the element as a java variable
// var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
// target the <ul> element in the DOM 
var tasksToDoEl = document.querySelector("#tasks-to-do");
// pass two arguments into the eventlistener , the type of even we will listen for "click" 
// and the event response to execute when the event is triggered
//  when a function is passed into a function, it is called a callback function
// the above line means we are passing a function to another function to execute
// callback functions make sure a function is only executed in the order intended. 
// timer java : var startCountdown =setInterval(countdown, 1000) and clearInterval(startCountdown)
// execute after a delay of 2 sec : setTimeout(sayHello, 2000)
// more on timer , video 4.1.7
// buttonEl.addEventListener("click", function() {

// by passing the event argument to the createTaskHandler() function , we can use the data and funcitonalilty that object holds
var createTaskHandler = function(event) {   
    event.preventDefault();
    // creating a new list item. 
    var listItemEl = document.createElement("li");
    // dynamic styling . assign this class to the task item with the property className
    listItemEl.className = "task-item";
    // giving the list item text of this is a new task
    listItemEl.textContent = "This is a new task.";
    // to attach the task item as a child to the list
    tasksToDoEl.appendChild(listItemEl);
};

// the createtakehandler should be before the below because we d be calling the function
// before we defined it
// the function below use createtaskhandler as the callback function
// buttonEl.addEventListener("click", createTaskHandler);
// submit listens for when a user click a button element with a type attribut that has
// a value of submit, and when a user presses Enter on the keyboard
// Keeping a click event would trigger everytime the form is clicked
formEl.addEventListener("submit", createTaskHandler);

// event.preventdefault() prevents the page from refreshing when a button is clicked. 