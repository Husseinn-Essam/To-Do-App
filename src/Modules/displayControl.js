import toDolist from './ToDoList';
import task from './task';
import project from './project';

const displayContoller = (function () {
  let selectedProject = toDolist.home;
  // rendering tasks
  function createTaskCard(title, date) {
    const taskCard = document.createElement('div');
    const taskInfo = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const taskName = document.createElement('p');
    const taskActions = document.createElement('div');
    const taskDetails = document.createElement('button');
    const taskDate = document.createElement('div');
    const taskEdit = document.createElement('button');
    const taskDelete = document.createElement('button');
    const editIcon = document.createElement('i');
    const deleteIcon = document.createElement('i');
    const list = document.querySelector('.list');
    taskCard.classList.add('task');
    taskInfo.classList.add('info');
    checkbox.classList.add('done');
    taskName.classList.add('title');
    taskActions.classList.add('actions');
    taskDetails.classList.add('details');
    taskDate.classList.add('date');
    taskEdit.classList.add('edit');
    taskDelete.classList.add('delete');
    editIcon.classList.add('fa-solid');
    editIcon.classList.add('fa-pen-to-square');
    deleteIcon.classList.add('fa-solid');
    deleteIcon.classList.add('fa-trash');
    taskName.textContent = title;
    taskDate.textContent = date;
    taskDetails.textContent = 'Details';
    list.appendChild(taskCard);
    taskCard.appendChild(taskInfo);
    taskCard.appendChild(taskActions);
    taskInfo.appendChild(checkbox);
    taskInfo.appendChild(taskName);
    taskActions.appendChild(taskDetails);
    taskActions.appendChild(taskDate);
    taskActions.appendChild(taskEdit);
    taskActions.appendChild(taskDelete);
    taskEdit.appendChild(editIcon);
    taskDelete.appendChild(deleteIcon);
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
    createTaskCard(taskName.value, date.value);
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
    //   console.log(toDolist.projects);
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
  }

  function setSelectedProject() {
    const uiProjects = document.querySelectorAll('.project');
    for (let i = 0; i < toDolist.projects.length; i++) {
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
    createTaskCard('ggez', 2);
  }
  return {

    startApp,

    selectedProject,

  };
}());
export default displayContoller;
