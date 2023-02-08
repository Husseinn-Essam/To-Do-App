import toDolist from "./ToDoList";
import task from "./task";
import project from "./project";

const displayContoller = (function () {
  let selectedProject = toDolist.home;
  // creating objects
  function addProjectToList() {
    const projectName = document.querySelector("#addProjectTitle");
    toDolist.addProject(project(projectName.value));
  }

  function addTaskToProject() {
    const taskName = document.querySelector("#title");
    const details = document.querySelector("#details-txt");
    const date = document.querySelector("#task-date");
    selectedProject.addTask(task(taskName.value, date.value, details.value, false));
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
    const submitTaskBtn = document.querySelector(".submit");
    submitTaskBtn.addEventListener('click', () => {
      addTaskToProject();
      toDolist.getTodayTasks();
      toDolist.getWeekTasks();
      console.log(toDolist.projects);
    });
  }

  function submitProject() {
    const addProjectBtn = document.querySelector(".addProject");
    const addProjectForm = document.querySelector(".addProjectForm");
    const cancelProject = document.querySelector(".cancel");
    const submitProjectForm = document.querySelector(".submitProject");
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
    const uiProjects = document.querySelectorAll(".project");
    for (let i = 0; i < toDolist.projects.length; i++) {
      if (selectedProject === toDolist.projects[i]) {
        uiProjects[i].style.color = "#007fff";
      } else {
        uiProjects[i].style.color = "#f8fafc";
      }
    }
  }

  function checkSelectedProject(i) {
    selectedProject = toDolist.projects[i];
    setSelectedProjectColor();
  }

  function setSelectedProject() {
    const uiProjects = document.querySelectorAll(".project");
    for (let i = 0; i < toDolist.projects.length; i++) {
      uiProjects[i].addEventListener('click', () => {
        checkSelectedProject(i);
      });
    }
  }

  // rendering tasks

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
