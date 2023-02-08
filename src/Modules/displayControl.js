import toDolist from './ToDoList';
import task from './task';
import project from './project';

const displayContoller = (function () {
  let selectedProject = toDolist.home;
  // rendering tasks
  function createTaskCard(title, date) {
    const list = document.querySelector('.tasks');
    list.innerHTML += `<div class="task">
    <div class="info">
      <input type="checkbox" name="done" id="done">
      <p class="title">${title}</p>
    </div>
    <div class="actions">
      <button class="details">Details</button>
      <div class="date">${date}</div>
      <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>
    
  </div>`;
  }
  function resetList() {
    const list = document.querySelector('.tasks');
    const tasks = document.querySelectorAll('.task');
    if (tasks.length !== 0) {
      for (let i = 0; i < tasks.length; i++) {
        list.removeChild(tasks[i]);
      }
    }
  }
  function renderProjectTasks() {
    resetList();
    for (let i = 0; i < selectedProject.tasks.length; i++) {
      createTaskCard(selectedProject.tasks[i].title, selectedProject.tasks[i].date);
    }
  }
  // rendering Created Projects
  function createProjectUI(projectTitle) {
    const projectList = document.querySelector(".project-list");
    projectList.innerHTML+=` <button class="project newProject"> <i class="fa-solid fa-list-check"></i>${projectTitle}</button>`
    setSelectedProject();
  }

  function resetProjectUI() {
    const projectList = document.querySelector(".project-list");
    const createdProjects = document.querySelectorAll('.newProject');
    if (createdProjects.length !== 0) {
      for (let i = 0; i < createdProjects.length; i++) {
        projectList.removeChild(createdProjects[i]);
      }
    }
  }

  function renderCreatedProjects() {
    resetProjectUI();
    for (let i = 3; i < toDolist.projects.length; i++) {
      createProjectUI(toDolist.projects[i].title);
    }
  }

  // creating objects
  function addProjectToList() {
    const projectName = document.querySelector('#addProjectTitle');
    toDolist.addProject(project(projectName.value));
  }

  function addTaskToProject() {
    const taskName = document.querySelector('#title');
    const details = document.querySelector('#details-txt');
    const date = document.querySelector('#task-date');
    selectedProject.addTask(task(taskName.value, date.value, details.value, false));
    // createTaskCard(taskName.value, date.value);
  }

  // button events
  function openModal() {
    const addTask = document.querySelector('.add-task');
    const modal = document.querySelector('.modal');
    addTask.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
    // closing modal
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  function submitTask() {
    const submitTaskBtn = document.querySelector('.submit');
    submitTaskBtn.addEventListener('click', () => {
      addTaskToProject();
      toDolist.getTodayTasks();
      toDolist.getWeekTasks();
      renderProjectTasks();

      console.log(toDolist.projects);
    });
  }

  function submitProject() {
    const addProjectBtn = document.querySelector('.addProject');
    const addProjectForm = document.querySelector('.addProjectForm');
    const cancelProject = document.querySelector('.cancel');
    const submitProjectForm = document.querySelector('.submitProject');
    addProjectBtn.addEventListener('click', () => {
      addProjectBtn.style.display = 'none';
      addProjectForm.style.display = 'flex';
    });
    cancelProject.addEventListener('click', () => {
      addProjectBtn.style.display = 'flex';
      addProjectForm.style.display = 'none';
    });
    submitProjectForm.addEventListener('click', () => {
      addProjectToList();
      renderCreatedProjects();
      console.log(toDolist.projects);
    });
  }

  function setSelectedProjectColor() {
    const uiProjects = document.querySelectorAll('.project');
    for (let i = 0; i < toDolist.projects.length; i++) {
      if (selectedProject === toDolist.projects[i]) {
        uiProjects[i].style.color = '#007fff';
      } else {
        uiProjects[i].style.color = '#f8fafc';
      }
    }
  }

  function checkSelectedProject(i) {
    selectedProject = toDolist.projects[i];
    setSelectedProjectColor();
    renderProjectTasks();
  }

  function setSelectedProject() {
    const uiProjects = document.querySelectorAll('.project');
    for (let i = 0; i < uiProjects.length; i++) {
      uiProjects[i].addEventListener('click', () => {
        checkSelectedProject(i);
      });
    }
  }

  function btnEvents() {
    openModal();
    submitTask();
    submitProject();
    setSelectedProject();
  }

  function startApp() {
    btnEvents();
    setSelectedProjectColor();
  }
  return {

    startApp,

    selectedProject,

  };
}());
export default displayContoller;
