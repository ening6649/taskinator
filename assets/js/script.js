// console.dir(window.document); displays the html element as an object. Dom element 
// document objects allows access to everything on the webpage. i.e. document.blah
// window.document.querySelector("button"); element selector
// document.querySelector(".btn"); class selector
// document.querySelector("button").textContent; selects "add task"
// document.querySelector("#save-task"); selects the id save-task

// give each new task a unique id by counting tasks
var taskIdCounter = 0;

// assign the button element object representation to a variable in the file
// the EL suffix identifies this as a dom element. camelCase marks the element as a java variable
// var buttonEl = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
// target the <ul> element in the DOM 
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

// pass two arguments into the eventlistener , the type of even we will listen for "click" 
// and the event response to execute when the event is triggered
//  when a function is passed into a function, it is called a callback function
// the above line means we are passing a function to another function to execute
// callback functions make sure a function is only executed in the order intended. 
// timer java : var startCountdown =setInterval(countdown, 1000) and clearInterval(startCountdown)
// execute after a delay of 2 sec : setTimeout(sayHello, 2000)
// more on timer , video 4.1.7
// buttonEl.addEventListener("click", function() {


var pageContentEl = document.querySelector("#page-content");

// by passing the event argument to the taskFormHandler() function , we can use the data and funcitonalilty that object holds
var taskFormHandler = function(event) {   
    event.preventDefault();
    // single '' should be used inside a "" because otherwise the double quote would end early 
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    // clears the task entry boxes after clicking add task
    // reset() method only works with <form> element 
    formEl.reset();
    // hasAttribute test if an element has a certain attribute. if there is a date task id, it will return true.
    var isEdit = formEl.hasAttribute("data-task-id");
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        // package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
         // send it as an argument to createTaskEl
        createTaskEl(taskDataObj);
    }  
}

var taskStatusChangeHandler = function(event) {
    // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

};

var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    // reset the form by removing the task id and changing the button text back to normal 
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

//     // console.dir(taskNameInput);
//     // creating a new list item. 
//     var listItemEl = document.createElement("li");
//     // dynamic styling . assign this class to the task item with the property className
//     listItemEl.className = "task-item";
//     // create div to hold task info and add to list item
//     var taskInfoEl = document.createElement("div");
//     // give it a class name
//     taskInfoEl.className = "task-info";
//     // add HTML content to div
//     // textContent only accepts text values, here it would display html tags too
//     // innerHTML reads the tags value and text values 
//     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
//     // more explaination 4.2.6
//     listItemEl.appendChild(taskInfoEl);
//     // giving the list item text of this is a new task
//     // listItemEl.textContent = taskNameInput;
//     // to attach the task item as a child to the list
//     tasksToDoEl.appendChild(listItemEl);
// };

var createTaskEl = function (taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

     // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);


    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // use taskIdCounter as the argument to create buttons that corresponds to the current task id
    // createTaskAction() returns a DOM element , we store it in taskActionsEl
    var taskActionsEl = createTaskActions(taskIdCounter);
    console.log(taskActionsEl);
    // append taskActionsEl to listItemEl before listItemEl is appended to the page
    listItemEl.appendChild(taskActionsEl);
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
}

// create form elements dynamically because tasks are dynamically created
var createTaskActions = function(taskId) {
    // creates a new div element with the class name task actions
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    // adds the above button to the div 
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // add an empty select element to the div 
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
      }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};


var taskButtonHandler = function(event) {
     // get target element from event
    var targetEl = event.target;
    console.log(event.target);

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } 
    // the matches()method is similar to querySelector()method except it doesnt find and retrun an element, it returns true. 
    else if (targetEl.matches(".delete-btn")) {
        console.log("you clicked a delete button!");
         // get the element's task id 
        var taskId = targetEl.getAttribute("data-task-id");
        console.log(taskId);
        // captures the id of the task we want to delete
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    console.log("editing task #" + taskId);
  
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);
    // document.queryselector searches within the document element. the below searched witin taskSelected element
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
    // use the selectors from before to update the form
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    // update the text of the submit button to say "save task"
    document.querySelector("#save-task").textContent = "Save Task";
    // add taskID to a data-task-id attribute on the form itself. will use later to save the correct task
    formEl.setAttribute("data-task-id", taskId);

};
  


var deleteTask = function(taskId) {
    console.log(taskId);
    // selecting a list item use .task-item
    // no space between task-item and data-task-id means both properties must be on the same element
    // a space would look for an element with data-task-id inside a .task-item element
    // more 4.3.7
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    console.log(taskSelected);
    taskSelected.remove();
    
  };
// the createtakehandler should be before the below because we d be calling the function
// before we defined it
// the function below use TaskfromHandler as the callback function
// buttonEl.addEventListener("click", taskFormHandler);
// submit listens for when a user click a button element with a type attribut that has
// a value of submit, and when a user presses Enter on the keyboard
// Keeping a click event would trigger everytime the form is clicked
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
// event.preventdefault() prevents the page from refreshing when a button is clicked. 
// The common verb that's used for retrieving or reading data from an object's property is getting. 
// When we provide and store data in an object's property, it's called setting. These two terms are used often in web development.