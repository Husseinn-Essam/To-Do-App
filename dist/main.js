/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Modules/ToDoList.js":
/*!*********************************!*\
  !*** ./src/Modules/ToDoList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isToday/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isThisWeek/index.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/Modules/project.js");



var toDolist = function () {
  var home = (0,_project__WEBPACK_IMPORTED_MODULE_0__["default"])("Home");
  var today = (0,_project__WEBPACK_IMPORTED_MODULE_0__["default"])("Today");
  var week = (0,_project__WEBPACK_IMPORTED_MODULE_0__["default"])("This week");
  var projects = [home, today, week];

  function addProject(aproject) {
    projects.push(aproject);
  }

  function removeProject(aproject) {
    var index = projects.indexOf(aproject);
    projects.splice(index, 1);
  }

  function getTodayTasks() {
    today.tasks = [];

    for (var i = 0; i < projects.length; i++) {
      if (projects[i] !== today && projects[i] !== week) {
        var currentTasks = projects[i].tasks;

        for (var j = 0; j < currentTasks.length; j++) {
          var tasksDate = new Date(currentTasks[j].date);

          if ((0,date_fns__WEBPACK_IMPORTED_MODULE_1__["default"])(tasksDate)) {
            today.tasks.push(currentTasks[j]);
          }
        }
      }
    }
  }

  function getWeekTasks() {
    week.tasks = [];

    for (var i = 0; i < projects.length; i++) {
      if (projects[i] !== today && projects[i] !== week) {
        var currentTasks = projects[i].tasks;

        for (var j = 0; j < currentTasks.length; j++) {
          if ((0,date_fns__WEBPACK_IMPORTED_MODULE_2__["default"])(new Date(currentTasks[j].date))) {
            week.tasks.push(currentTasks[j]);
          }
        }
      }
    }
  }

  return {
    addProject: addProject,
    removeProject: removeProject,
    projects: projects,
    getTodayTasks: getTodayTasks,
    getWeekTasks: getWeekTasks,
    home: home,
    today: today,
    week: week
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toDolist);

/***/ }),

/***/ "./src/Modules/displayControl.js":
/*!***************************************!*\
  !*** ./src/Modules/displayControl.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ToDoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToDoList */ "./src/Modules/ToDoList.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/Modules/task.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project */ "./src/Modules/project.js");




var displayContoller = function () {
  var selectedProject = _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].home;
  var theIndexOfEdited; ///validate Modal

  function validate(title) {
    if (title.value == '') {
      alert("must enter task name");
      return false;
    }

    return true;
  } // rendering tasks


  function createTaskCard(title, date, checked) {
    var list = document.querySelector('.tasks');
    list.innerHTML += "<div class=\"task\">\n    <div class=\"info\">\n      <input type=\"checkbox\" name=\"done\" id=\"done\" ".concat(checked == true ? "checked" : "", ">\n      <p class=\"title\">").concat(title, "</p>\n    </div>\n    <div class=\"actions\">\n      <button class=\"details\">Details</button>\n      <div class=\"date\">").concat(date, "</div>\n      <button class=\"edit\"><i class=\"fa-solid fa-pen-to-square\"></i></button>\n      <button class=\"delete\"><i class=\"fa-solid fa-trash\"></i></button>\n    </div>\n    \n  </div>");
  }

  function resetList() {
    var list = document.querySelector('.tasks');
    list.textContent = '';
  }

  function renderProjectTasks(j) {
    resetList();

    for (var i = 0; i < selectedProject.tasks.length; i++) {
      createTaskCard(selectedProject.tasks[i].title, selectedProject.tasks[i].date, selectedProject.tasks[i].checked);
    }

    editTaskBtn();
    deleteTask();
    openTaskDetails();
  } // rendering Created Projects


  function createProjectUI(projectTitle) {
    var projectList = document.querySelector(".project-list");
    projectList.innerHTML += "<div class=\"projectWrapper\"> <button class=\"project newProject\"> <i class=\"fa-solid fa-list-check\"></i>".concat(projectTitle, "</button>\n    <button class='deleteProjectBtn'><i class=\"fa-sharp fa-solid fa-xmark\"></i></button></div>");
    setSelectedProject();
  }

  function resetProjectUI() {
    var projectList = document.querySelector(".project-list");
    projectList.textContent = '';
  }

  function renderCreatedProjects() {
    resetProjectUI();

    for (var i = 3; i < _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].projects.length; i++) {
      createProjectUI(_ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].projects[i].title);
    }
  } // creating objects


  function addProjectToList() {
    var projectName = document.querySelector('#addProjectTitle');
    _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].addProject((0,_project__WEBPACK_IMPORTED_MODULE_2__["default"])(projectName.value));
  }

  function addTaskToProject() {
    var taskName = document.querySelector('#title');
    var details = document.querySelector('#details-txt');
    var date = document.querySelector('#task-date');

    if (validate(taskName) == true) {
      selectedProject.addTask((0,_task__WEBPACK_IMPORTED_MODULE_1__["default"])(taskName.value, date.value, details.value, false));
    }
  } // button events


  function openModal() {
    var addTask = document.querySelector('.add-task');
    var modal = document.querySelector('.modal');
    var detailsModal = document.querySelector('.detailsModal');
    var modalEntry = document.querySelector('.input');
    addTask.addEventListener('click', function () {
      modal.style.display = 'flex';
    }); // closing modal

    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        modalEntry.reset();
        modal.style.display = 'none';
        detailsModal.style.display = 'none';
      }
    });
  }

  function submitTask() {
    var submitTaskBtn = document.querySelector('.submit');
    var modal = document.querySelector('.modal');
    submitTaskBtn.addEventListener('click', function (e) {
      e.preventDefault();
      addTaskToProject();
      modal.style.display = 'none';
      _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].getTodayTasks();
      _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].getWeekTasks();
      renderProjectTasks();
      completeTask();
    });
  }

  function submitProject() {
    var addProjectBtn = document.querySelector('.addProject');
    var addProjectForm = document.querySelector('.addProjectForm');
    var cancelProject = document.querySelector('.cancel');
    var submitProjectForm = document.querySelector('.submitProject');
    addProjectBtn.addEventListener('click', function () {
      addProjectBtn.style.display = 'none';
      addProjectForm.style.display = 'flex';
    });
    cancelProject.addEventListener('click', function () {
      addProjectBtn.style.display = 'flex';
      addProjectForm.style.display = 'none';
    });
    submitProjectForm.addEventListener('click', function () {
      addProjectToList();
      renderCreatedProjects();
      removeProject();
      openTaskDetails();
    });
  }

  function setSelectedProjectColor() {
    var uiProjects = document.querySelectorAll('.project');

    for (var i = 0; i < _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].projects.length; i++) {
      if (selectedProject === _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].projects[i]) {
        uiProjects[i].style.color = '#007fff';
      } else {
        uiProjects[i].style.color = '#f8fafc';
      }
    }
  }

  function checkSelectedProject(i) {
    selectedProject = _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].projects[i];
    setSelectedProjectColor();
    renderProjectTasks();
    completeTask();
  }

  function setSelectedProject() {
    var uiProjects = document.querySelectorAll('.project');

    var _loop = function _loop(i) {
      uiProjects[i].addEventListener('click', function () {
        checkSelectedProject(i, selectedProject);
      });
    };

    for (var i = 0; i < uiProjects.length; i++) {
      _loop(i);
    }
  }

  function removeProject() {
    var removeProjectBtns = document.querySelectorAll('.deleteProjectBtn');
    var projectList = document.querySelector(".project-list");
    var createdProjects = document.querySelectorAll('.projectWrapper');

    var _loop2 = function _loop2(i) {
      removeProjectBtns[i].addEventListener('click', function () {
        _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].removeProject(_ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].projects[i + 3]);
        projectList.removeChild(createdProjects[i]);
      });
    };

    for (var i = 0; i < removeProjectBtns.length; i++) {
      _loop2(i);
    }
  }

  function completeTask() {
    var taskCheckbox = document.querySelectorAll("#done");

    var _loop3 = function _loop3(i) {
      taskCheckbox[i].addEventListener('click', function () {
        selectedProject.tasks[i].checked = selectedProject.tasks[i].checked == true ? false : true;
      });
    };

    for (var i = 0; i < taskCheckbox.length; i++) {
      _loop3(i);
    }
  }

  function deleteTask() {
    var deleteTaskBtn = document.querySelectorAll('.delete');
    var CreatedTasks = document.querySelectorAll('.task');
    var tasks = document.querySelector(".tasks");

    var _loop4 = function _loop4(i) {
      deleteTaskBtn[i].addEventListener('click', function () {
        if (selectedProject == _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].today || selectedProject == _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].week) {
          alert('You can not delete from "Today" and "This Week", please delete from created project');
        } else {
          selectedProject.removeTask(selectedProject.tasks[i]);
          tasks.removeChild(CreatedTasks[i]);
          _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].getTodayTasks();
          _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].getWeekTasks();
        }
      });
    };

    for (var i = 0; i < CreatedTasks.length; i++) {
      _loop4(i);
    }
  }

  function editTaskBtn() {
    var editTaskBtn = document.querySelectorAll('.edit');
    var editModal = document.querySelector('.editTask');

    var _loop5 = function _loop5(i) {
      editTaskBtn[i].addEventListener('click', function () {
        editModal.style.display = 'flex';
        theIndexOfEdited = i;
      });
    };

    for (var i = 0; i < editTaskBtn.length; i++) {
      _loop5(i);
    }

    window.addEventListener('click', function (e) {
      if (e.target === editModal) {
        editModal.style.display = 'none';
      }
    });
  }

  function submitEdit() {
    var editSubmit = document.querySelector('.editBtn');
    var taskTitle = document.querySelector('.editedTitle');
    var details = document.querySelector('.editedDetails');
    var date = document.querySelector('.editedDate');
    var editModal = document.querySelector('.editTask');
    var editModalEntry = document.querySelector('.editModal');
    editSubmit.addEventListener('click', function (e) {
      e.preventDefault();
      if (validate(taskTitle) == true) selectedProject.editTask(selectedProject.tasks[theIndexOfEdited], taskTitle.value, date.value, details.value);
      editModalEntry.reset();
      editModal.style.display = 'none';
      _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].getTodayTasks();
      _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].getWeekTasks();
      _ToDoList__WEBPACK_IMPORTED_MODULE_0__["default"].ez();
      renderProjectTasks();
    });
  }

  function openTaskDetails() {
    var detailsModal = document.querySelector('.detailsModal');
    var details = document.querySelector('.taskDetails');
    var showDetailsBtn = document.querySelectorAll('.details');

    var _loop6 = function _loop6(i) {
      showDetailsBtn[i].addEventListener('click', function () {
        detailsModal.style.display = 'flex';
        details.textContent = selectedProject.tasks[i].details;
      });
    };

    for (var i = 0; i < showDetailsBtn.length; i++) {
      _loop6(i);
    }

    window.addEventListener('click', function (e) {
      if (e.target === detailsModal) {
        detailsModal.style.display = 'none';
      }
    });
  }

  function humMenu() {
    var menu = document.querySelector(".sidebar");
    var hamburger = document.querySelector(".hamburger");

    function toggleMenu() {
      if (menu.classList.contains("showMenu")) {
        menu.classList.remove("showMenu");
      } else {
        menu.classList.add("showMenu");
      }
    }

    hamburger.addEventListener("click", toggleMenu);
  }

  function btnEvents() {
    openModal();
    submitTask();
    submitProject();
    setSelectedProject();
    submitEdit();
    humMenu();
  }

  function startApp() {
    btnEvents();
    setSelectedProjectColor();
  }

  return {
    startApp: startApp,
    selectedProject: selectedProject
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayContoller);

/***/ }),

/***/ "./src/Modules/project.js":
/*!********************************!*\
  !*** ./src/Modules/project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var project = function project(title) {
  var tasks = [];

  function addTask(task) {
    tasks.push(task);
  }

  function removeTask(task) {
    var index = tasks.indexOf(task);
    tasks.splice(index, 1);
  }

  function editTask(task, Ttitle, Tdate, Tdetails) {
    task.title = Ttitle;
    task.date = Tdate;
    task.details = Tdetails;
  }

  return {
    title: title,
    addTask: addTask,
    removeTask: removeTask,
    editTask: editTask,
    tasks: tasks
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (project);

/***/ }),

/***/ "./src/Modules/task.js":
/*!*****************************!*\
  !*** ./src/Modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var task = function task(title, date, details) {
  var checked = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  function getDateFormat(taskDate) {
    var year = taskDate.split('-')[0];
    var month = taskDate.split('-')[1];
    var day = taskDate.split('-')[2];
    return "".concat(month, "/").concat(day, "/").concat(year);
  }

  return {
    title: title,
    date: date,
    details: details,
    checked: checked,
    getDateFormat: getDateFormat
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (task);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".list {\n  background-color: #cbd5e1;\n  grid-row: 2;\n  grid-column: 2;\n  display: flex;\n  flex-direction: column;\n  padding: 30px;\n  gap: 10px;\n}\n.list .add-task {\n  background-color: transparent;\n  font-size: 2rem;\n  font-weight: 700;\n  color: #334155;\n  border: none;\n  cursor: pointer;\n}\n.list .add-task:hover {\n  color: #007fff;\n}\n.list .tasks {\n  display: flex;\n  flex-direction: column;\n  padding: 30px;\n  gap: 10px;\n}\n.list .task {\n  background-color: #f8fafc;\n  display: flex;\n  padding: 10px;\n  flex-direction: row;\n  justify-content: space-between;\n  border-radius: 5px;\n  overflow: auto;\n}\n.list .task:hover {\n  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;\n  transition: 1s;\n}\n.list .task .info {\n  display: flex;\n  flex-direction: row;\n  gap: 20px;\n  font-size: 1.4rem;\n  align-items: center;\n}\n.list .task .info .title {\n  margin-bottom: 7px;\n}\n.list .task .info input {\n  -webkit-appearance: none;\n  appearance: none;\n  background-color: #fff;\n  margin: 0;\n  font: inherit;\n  color: currentColor;\n  width: 1.15em;\n  height: 1.15em;\n  border: 0.15em solid currentColor;\n  border-radius: 0.15em;\n  transform: translateY(-0.075em);\n  display: grid;\n  place-content: center;\n  cursor: pointer;\n}\n.list .task .info input::before {\n  content: \"\";\n  width: 0.65em;\n  height: 0.65em;\n  transform: scale(0);\n  transition: 120ms transform ease-in-out;\n  box-shadow: inset 1em 1em #007fff;\n  transform-origin: bottom left;\n  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);\n}\n.list .task .info input:checked::before {\n  transform: scale(1);\n}\n.list .task .actions {\n  display: flex;\n  flex-direction: row;\n  gap: 20px;\n  align-items: center;\n  font-size: 1.2rem;\n  margin-left: 10px;\n}\n.list .task .actions button {\n  cursor: pointer;\n  font-size: 1.2rem;\n}\n.list .task .actions .details {\n  background-color: #007fff;\n  color: #f8fafc;\n  border: none;\n  padding: 5px;\n  border-radius: 5px;\n  font-weight: 700;\n}\n.list .task .actions .details:hover {\n  opacity: 0.7;\n}\n.list .task .actions .edit, .list .task .actions .delete {\n  background-color: transparent;\n  border: none;\n  font-size: 1.3rem;\n}\n.list .task .actions .edit:hover, .list .task .actions .delete:hover {\n  color: #007fff;\n}\n\n.modal {\n  display: none;\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgba(0, 0, 0, 0.5);\n  justify-content: center;\n  align-items: center;\n  transition: 2s;\n}\n.modal-content {\n  background-color: #f0eef1;\n  width: 500px;\n  border-radius: 5px;\n  display: flex;\n  gap: 20px;\n  flex-direction: column;\n  animation: appear 350ms ease-in 1;\n}\n@keyframes appear {\n  0% {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n}\n.modal-content .modal-title {\n  margin: 0 auto;\n  padding: 10px;\n}\n.modal-content .input {\n  display: flex;\n  flex-direction: column;\n  padding: 10px;\n  gap: 10px;\n}\n.modal-content #title {\n  border: none;\n  background-color: white;\n  padding: 5px;\n  font-size: 1.4rem;\n  border-radius: 5px;\n}\n.modal-content #details-txt {\n  border: none;\n  border-radius: 5px;\n  background-color: white;\n  height: 12rem;\n  margin-bottom: auto;\n  font-size: 1.4rem;\n  padding: 5px;\n  resize: none;\n}\n.modal-content .date-area {\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n}\n.modal-content .date-area label {\n  font-size: 1.2rem;\n  font-weight: 500;\n}\n.modal-content #task-date {\n  width: fit-content;\n  display: flex;\n  align-items: flex-end;\n  padding: 5px;\n  margin-left: 4px;\n  border: #007fff solid 2px;\n  border-radius: 5px;\n  background-color: #007fff;\n  color: #f8fafc;\n  font-weight: 700;\n  cursor: pointer;\n  margin-bottom: 20px;\n}\n.modal-content .submit {\n  width: 200px;\n  height: 43px;\n  margin: auto;\n  background-color: #007fff;\n  color: #f8fafc;\n  font-size: 1rem;\n  font-weight: 600;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n}\n.modal-content .submit:hover {\n  opacity: 0.7;\n}\n\n.editTask {\n  display: none;\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgba(0, 0, 0, 0.5);\n  justify-content: center;\n  align-items: center;\n}\n.editTask .editBtn {\n  width: 200px;\n  height: 43px;\n  margin: auto;\n  background-color: #007fff;\n  color: #f8fafc;\n  font-size: 1rem;\n  font-weight: 600;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n}\n.editTask .editBtn:hover {\n  opacity: 0.7;\n}\n\n.detailsModal {\n  display: none;\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgba(0, 0, 0, 0.5);\n  justify-content: center;\n  align-items: center;\n}\n.detailsModal .details-content {\n  background-color: #f0eef1;\n  width: 400px;\n  height: 300px;\n  border-radius: 5px;\n  display: flex;\n  gap: 20px;\n  padding: 20px;\n  flex-direction: column;\n  font-size: 1.2rem;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serifs;\n}\n\nbody {\n  height: 100vh;\n}\n\n.container {\n  display: grid;\n  position: relative;\n  grid-template-columns: 260px 3fr;\n  grid-template-rows: 0.5fr 4fr;\n  height: 100vh;\n  overflow: auto;\n}\n\n.header {\n  background-color: #007fff;\n  color: #f8fafc;\n  grid-row: 1;\n  grid-column: 1/-1;\n  display: flex;\n  align-items: center;\n  gap: 70px;\n  justify-content: space-between;\n}\n.header .hamburger {\n  font-size: 2rem;\n  display: none;\n  padding: 10px;\n  cursor: pointer;\n  z-index: 1;\n  top: 1rem;\n  right: 1rem;\n  margin-right: 10px;\n}\n.header h1 {\n  padding: 10px;\n}\n.header h1 i {\n  margin-left: 10px;\n  font-size: 2.2rem;\n}\n\n.sidebar {\n  background-color: #334155;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 16px;\n  grid-row: 2;\n  grid-column: 1;\n}\n.sidebar .divider {\n  height: 1px;\n  width: 100%;\n  background-color: #f8fafc;\n}\n.sidebar .project, .sidebar .projects .addProject {\n  background-color: transparent;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  border: none;\n  color: #f8fafc;\n  font-size: 1.4rem;\n  cursor: pointer;\n}\n.sidebar .project:hover, .sidebar .projects .addProject:hover {\n  color: #007fff;\n}\n.sidebar .project i, .sidebar .projects .addProject i {\n  padding: 10px;\n}\n.sidebar .inbox, .sidebar .projects {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  width: 100%;\n}\n.sidebar .inbox h2, .sidebar .projects h2 {\n  font-size: 1.7rem;\n  margin-left: 10px;\n  color: #f8fafc;\n  margin-top: 16px;\n}\n.sidebar .projects {\n  color: #f8fafc;\n  padding: 10px;\n}\n.sidebar .projects h2 {\n  font-size: 1.7rem;\n}\n.sidebar .projects .addProjectForm {\n  display: none;\n  flex-direction: column;\n  gap: 5px;\n}\n.sidebar .projects .addProjectForm button:hover {\n  color: #f8fafc;\n  opacity: 0.7;\n}\n.sidebar .projects input {\n  padding: 4px;\n  font-size: 1rem;\n  border-radius: 5px;\n  border: none;\n}\n.sidebar .projects .projectActions {\n  display: flex;\n  flex-direction: row;\n  gap: 3px;\n}\n.sidebar .projects .projectActions button {\n  border: none;\n  font-size: 1.3rem;\n  color: #f8fafc;\n  cursor: pointer;\n}\n.sidebar .projects .submitProject {\n  background-color: #007fff;\n  width: 50%;\n  border-radius: 5px;\n  justify-content: center;\n}\n.sidebar .projects .cancel {\n  background-color: #af3a3a;\n  width: 50%;\n  border-radius: 5px;\n  justify-content: center;\n}\n.sidebar .projects .project-list {\n  max-height: 200px;\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n}\n.sidebar .projects .projectWrapper {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  gap: 13px;\n}\n.sidebar .projects .projectWrapper .deleteProjectBtn {\n  background: transparent;\n  font-size: 1.2rem;\n  color: #f8fafc;\n  border: none;\n  cursor: pointer;\n}\n.sidebar .projects .projectWrapper .deleteProjectBtn:hover {\n  color: #af3a3a;\n}\n\n@media (max-width: 800px) {\n  .sidebar {\n    position: fixed;\n    transform: translateX(-100%);\n    transition: transform 0.5s;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 1;\n  }\n\n  .list {\n    grid-column: 1/-1;\n  }\n\n  .showMenu {\n    transform: translateX(0);\n    transition: transform 0.2s;\n  }\n\n  .modal-content {\n    width: 300px;\n  }\n\n  .details-model {\n    width: 300px;\n  }\n\n  .header .hamburger {\n    display: block;\n    z-index: 2;\n  }\n}", "",{"version":3,"sources":["webpack://./src/styles/_task.scss","webpack://./src/styles/_colors.scss","webpack://./src/styles/main.scss","webpack://./src/styles/_modal.scss"],"names":[],"mappings":"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","sourcesContent":[".list{\r\n    background-color: $grey;\r\n    grid-row: 2;\r\n    grid-column: 2;\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 30px;\r\n    gap:10px;\r\n    .add-task{\r\n        background-color: transparent;\r\n        font-size: 2rem;\r\n        font-weight: 700;\r\n        color: $dark;\r\n        border: none;\r\n        cursor: pointer;\r\n        &:hover{\r\n            color: $primary;\r\n        }\r\n    }\r\n    .tasks{\r\n        display: flex;\r\n        flex-direction: column;\r\n        padding: 30px;\r\n        gap:10px;\r\n    }\r\n    .task{\r\n        background-color: $light;\r\n        display: flex;\r\n        padding: 10px;\r\n        flex-direction: row;\r\n        justify-content: space-between;\r\n        border-radius: 5px;\r\n        overflow: auto;\r\n        &:hover{\r\n            box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;\r\n            transition: 1s;\r\n        }\r\n        .info{\r\n            display: flex;\r\n            flex-direction: row;\r\n            gap: 20px;\r\n            font-size: 1.4rem;\r\n            align-items: center;\r\n            .title{\r\n                margin-bottom: 7px;\r\n            }\r\n            input{\r\n                -webkit-appearance: none;\r\n                appearance: none;\r\n                background-color: #fff;\r\n                margin: 0;\r\n                font: inherit;\r\n                color: currentColor;\r\n                width: 1.15em;\r\n                height: 1.15em;\r\n                border: 0.15em solid currentColor;\r\n                border-radius: 0.15em;\r\n                transform: translateY(-0.075em);\r\n                display: grid;\r\n                place-content: center;\r\n                cursor: pointer;\r\n                &::before{\r\n                    content: \"\";\r\n                    width: 0.65em;\r\n                    height: 0.65em;\r\n                    transform: scale(0);\r\n                    transition: 120ms transform ease-in-out;\r\n                    box-shadow: inset 1em 1em $primary;\r\n                    transform-origin: bottom left;\r\n                    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);\r\n                }\r\n                &:checked::before{\r\n                    transform: scale(1);\r\n                }\r\n            }\r\n        }\r\n        .actions{\r\n            display: flex;\r\n            flex-direction: row;\r\n            gap:20px;\r\n            align-items: center;\r\n            font-size: 1.2rem;\r\n            margin-left: 10px;\r\n            button{\r\n                cursor: pointer;\r\n                font-size: 1.2rem;\r\n                \r\n            }\r\n            .details{\r\n                background-color: $primary;\r\n                color: $light;\r\n                border: none;\r\n                padding: 5px;\r\n                border-radius: 5px;\r\n                font-weight: 700;\r\n                &:hover{\r\n                    opacity: 0.7;\r\n                }\r\n            }\r\n            .edit , .delete{\r\n                background-color: transparent;\r\n                border: none;\r\n                font-size: 1.3rem;\r\n                &:hover{\r\n                    color: $primary;\r\n                }\r\n            }\r\n        }\r\n    }\r\n}","$primary: #007fff;\r\n$dark: #334155;\r\n$light: #f8fafc;\r\n$grey: #cbd5e1;\r\n$modal:#f0eef1;\r\n$red:rgb(175, 58, 58);\r\n@mixin blueFilter {\r\n    filter: invert(59%) sepia(90%) saturate(7465%) hue-rotate(183deg) brightness(101%) contrast(105%);\r\n}\r\n@mixin lightFilter {\r\n    filter: invert(83%) sepia(4%) saturate(622%) hue-rotate(172deg) brightness(106%) contrast(86%);\r\n}\r\n","@import \"colors\";\r\n@import \"task\";\r\n@import \"modal\";\r\n@import \"mobile\";\r\n*{\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serifs;\r\n}\r\nbody{\r\n    height: 100vh;\r\n}\r\n.container{\r\n    display: grid;\r\n    position: relative;\r\n    grid-template-columns: 260px 3fr;\r\n    grid-template-rows: 0.5fr 4fr;\r\n    height: 100vh;\r\n    overflow: auto\r\n}\r\n\r\n.header{\r\n    background-color: $primary;\r\n    color: $light;\r\n    grid-row: 1;\r\n    grid-column: 1/-1;\r\n    display: flex;\r\n    align-items: center;\r\n    gap:70px;\r\n    justify-content: space-between;\r\n    .hamburger {\r\n        font-size: 2rem;\r\n        display: none;\r\n        padding: 10px;\r\n        cursor: pointer;  \r\n        z-index: 1;\r\n        top: 1rem;\r\n        right: 1rem;\r\n        margin-right: 10px;\r\n      }\r\n    h1{  \r\n        padding: 10px;\r\n        i{\r\n            margin-left:10px;\r\n            font-size: 2.2rem;\r\n        }\r\n    }\r\n\r\n}\r\n.sidebar{\r\n    \r\n  //\r\n    background-color: $dark;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n    gap: 16px;\r\n    grid-row: 2;\r\n    grid-column: 1;\r\n    \r\n    .divider{\r\n        height: 1px;\r\n        width: 100%;\r\n        background-color: #f8fafc;\r\n    }\r\n    .project{\r\n        background-color: transparent;\r\n        display: flex;\r\n        flex-direction: row;\r\n        align-items: center;\r\n        border: none;\r\n        color: $light;\r\n        font-size: 1.4rem;\r\n        cursor: pointer;\r\n        &:hover{\r\n            color: $primary;\r\n        }\r\n        i{\r\n            padding: 10px;\r\n            \r\n        }\r\n       \r\n    }\r\n    .inbox{\r\n        display: flex;\r\n        flex-direction: column;\r\n        gap: 16px;\r\n        width: 100%;\r\n        \r\n        h2{\r\n            font-size: 1.7rem;\r\n            margin-left: 10px;\r\n            color: $light;\r\n            margin-top: 16px;\r\n        }\r\n    }\r\n    .projects{\r\n        @extend .inbox;\r\n        color: $light;\r\n        padding: 10px;\r\n        h2{\r\n            font-size: 1.7rem;\r\n           \r\n        }\r\n        .addProject{\r\n            @extend .project;\r\n        }\r\n        .addProjectForm{\r\n            display: none;\r\n            flex-direction: column;\r\n            gap: 5px;\r\n            button:hover{\r\n                color: $light;\r\n                opacity: 0.7;\r\n            }\r\n        }\r\n        input{\r\n            padding: 4px;\r\n            font-size: 1rem;\r\n            border-radius: 5px;\r\n            border: none;\r\n        }\r\n        .projectActions{\r\n            display: flex;\r\n            flex-direction: row;\r\n            gap:3px;\r\n            button{\r\n                border: none;\r\n                font-size: 1.3rem;\r\n                color:$light;\r\n                cursor: pointer;\r\n            }\r\n        }\r\n        .submitProject{\r\n            background-color: $primary;\r\n            width: 50%;\r\n            border-radius:5px ;\r\n            justify-content: center;\r\n        }\r\n        .cancel{\r\n            background-color: $red;\r\n            width: 50%;\r\n            border-radius:5px ;\r\n            justify-content: center;\r\n        }\r\n        .project-list{\r\n            max-height: 200px;\r\n            \r\n            display: flex ;\r\n            flex-direction: column;\r\n            \r\n            overflow: auto;\r\n        }\r\n        .projectWrapper{\r\n            display: flex;\r\n            flex-direction: row;\r\n            align-items: baseline;\r\n            gap: 13px;\r\n            .deleteProjectBtn{\r\n                background: transparent;\r\n                font-size: 1.2rem;\r\n                color: $light;\r\n                border: none;\r\n                cursor: pointer;\r\n                &:hover{\r\n                    color: $red;\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n@media(max-width:800px) {\r\n    .sidebar{\r\n        position: fixed;\r\n        transform: translateX(-100%);\r\n        transition: transform 0.5s;\r\n        top: 0;\r\n        left: 0;\r\n        right: 0;\r\n        bottom: 0;\r\n        z-index: 1;\r\n    }\r\n    .list{\r\n        grid-column: 1/-1;\r\n    }\r\n    .showMenu {\r\n        transform: translateX(0);\r\n        transition: transform 0.2s;\r\n      }\r\n      .modal-content{\r\n        width: 300px;\r\n      }\r\n      .details-model \r\n      {\r\n        width: 300px;\r\n      }\r\n      .header .hamburger\r\n      {\r\n        display: block; \r\n        z-index: 2;\r\n      }\r\n}\r\n\r\n","\r\n.modal {\r\n    display: none;\r\n    position: fixed;\r\n    z-index: 1;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow: auto;\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n    justify-content: center;\r\n    align-items: center;\r\n    transition: 2s;\r\n    &-content{\r\n        @keyframes appear {\r\n            0%{\r\n              opacity: 0;\r\n              transform: translateY(-10px);\r\n            }\r\n          };\r\n        background-color: $modal;\r\n        width: 500px;\r\n       \r\n        border-radius: 5px;\r\n        display: flex;\r\n        gap: 20px;\r\n        flex-direction: column;\r\n        animation: appear 350ms ease-in 1;;\r\n        .modal-title{\r\n            margin: 0 auto;\r\n            padding: 10px;\r\n            \r\n        }\r\n        .input{\r\n            display: flex;\r\n            flex-direction: column;\r\n            padding: 10px;\r\n            gap: 10px;\r\n        }\r\n        #title{\r\n            border:none;\r\n            background-color: white;\r\n            padding:5px;\r\n            font-size: 1.4rem;\r\n            border-radius: 5px;\r\n        }\r\n        #details-txt{\r\n            border: none;\r\n            border-radius: 5px;\r\n            background-color: white;\r\n            height: 12rem;\r\n            margin-bottom: auto;\r\n            font-size: 1.4rem;\r\n            padding: 5px;\r\n            resize: none;\r\n        }\r\n       .date-area{\r\n        display: flex;\r\n        flex-direction: row;\r\n        gap: 10px;\r\n        label{\r\n            font-size: 1.2rem;\r\n            font-weight: 500;\r\n        }\r\n       }\r\n        #task-date{\r\n            width: fit-content;\r\n            display: flex;\r\n            align-items: flex-end;\r\n            padding: 5px;\r\n            margin-left: 4px;\r\n            border: $primary solid 2px;\r\n            border-radius: 5px;\r\n            background-color: $primary;\r\n            color: $light;\r\n            font-weight: 700;\r\n            cursor: pointer;\r\n            margin-bottom: 20px;\r\n        }\r\n        .submit{\r\n            width: 200px;\r\n            height: 43px;\r\n            margin: auto;\r\n            background-color: $primary;\r\n            color: $light;\r\n            font-size: 1rem;\r\n            font-weight: 600;\r\n            border: none;\r\n            border-radius: 5px;\r\n            cursor: pointer;\r\n            &:hover{\r\n                opacity: 0.7;\r\n            }\r\n        }\r\n    }\r\n  }\r\n\r\n  .editTask{\r\n    display: none;\r\n    position: fixed;\r\n    z-index: 1;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow: auto;\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n    justify-content: center;\r\n    align-items: center;\r\n    .editBtn{\r\n        width: 200px;\r\n            height: 43px;\r\n            margin: auto;\r\n            background-color: $primary;\r\n            color: $light;\r\n            font-size: 1rem;\r\n            font-weight: 600;\r\n            border: none;\r\n            border-radius: 5px;\r\n            cursor: pointer;\r\n            &:hover{\r\n                opacity: 0.7;\r\n            }\r\n    }\r\n  }\r\n\r\n.detailsModal{\r\n    display: none;\r\n    position: fixed;\r\n    z-index: 1;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow: auto;\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n    justify-content: center;\r\n    align-items: center;\r\n    .details-content{\r\n        background-color: $modal;\r\n        width: 400px;\r\n        height: 300px;\r\n        border-radius: 5px;\r\n        display: flex;\r\n        gap: 20px;\r\n        padding: 20px;\r\n        flex-direction: column;\r\n        font-size: 1.2rem;\r\n    }\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/defaultOptions/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultOptions: () => (/* binding */ getDefaultOptions),
/* harmony export */   setDefaultOptions: () => (/* binding */ setDefaultOptions)
/* harmony export */ });
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameDay/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameDay/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSameDay)
/* harmony export */ });
/* harmony import */ var _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfDay/index.js */ "./node_modules/date-fns/esm/startOfDay/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day (and year and month)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeftStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRightStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameWeek/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameWeek/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSameWeek)
/* harmony export */ });
/* harmony import */ var _startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfWeek/index.js */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the dates are in the same week (and month and year)
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameWeek(dirtyDateLeft, dirtyDateRight, options) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeftStartOfWeek = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft, options);
  var dateRightStartOfWeek = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight, options);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isThisWeek/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isThisWeek/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isThisWeek)
/* harmony export */ });
/* harmony import */ var _isSameWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isSameWeek/index.js */ "./node_modules/date-fns/esm/isSameWeek/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isThisWeek
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @param {Object} [options] - the object with options
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the date is in this week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
 * //=> false
 */

function isThisWeek(dirtyDate, options) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return (0,_isSameWeek_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, Date.now(), options);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isToday/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/isToday/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isToday)
/* harmony export */ });
/* harmony import */ var _isSameDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isSameDay/index.js */ "./node_modules/date-fns/esm/isSameDay/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is today
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return (0,_isSameDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, Date.now());
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfDay/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfDay/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfWeek/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfWeek/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");




/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var defaultOptions = (0,_lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var weekStartsOn = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (argument instanceof Date || (0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      // eslint-disable-next-line no-console
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _Modules_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modules/task */ "./src/Modules/task.js");
/* harmony import */ var _Modules_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modules/project */ "./src/Modules/project.js");
/* harmony import */ var _Modules_ToDoList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Modules/ToDoList */ "./src/Modules/ToDoList.js");
/* harmony import */ var _Modules_displayControl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Modules/displayControl */ "./src/Modules/displayControl.js");




 // const myd = new Date();
// const task1 = task("jojo", myd, true, "ez");
// // console.log(task1.title);
// const pr1 = project("pr1");
// // pr1.tasks.push(task1);
// pr1.addTask(task1);
// console.log(pr1.tasks);
// toDolist.addProject(pr1);
// console.table(toDolist.projects[1]);
// console.table(toDolist.projects);
// toDolist.getTodayProjects();
// console.table(toDolist.projects[1]);
// pr1.addTask(task1);
// pr1.addTask(task1);
// toDolist.getTodayProjects();
// console.table(toDolist.projects[1]);

_Modules_displayControl__WEBPACK_IMPORTED_MODULE_4__["default"].startApp();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map