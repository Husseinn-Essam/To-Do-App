import format from "date-fns/format";
import toDolist from "./ToDoList";
import task from "./task";
import project from "./project";

const displayContoller = (function () {
  const selectedProject = toDolist.home;
  function startApp() {
    displayContoller.btnEvents();
  }
  function btnEvents() {
    displayContoller.openModal();
    displayContoller.submitTask();
    displayContoller.submitProject();
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
      displayContoller.addTaskToProject();
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
      displayContoller.addProjectToList();
    //   console.log(toDolist.projects);
    });
  }
  function addProjectToList() {
    const projectName = document.querySelector("#addProjectTitle");
    toDolist.addProject(project(projectName.value));
  }
  function addTaskToProject() {
    const taskName = document.querySelector("#title");
    const details = document.querySelector("#details-txt");
    const date = document.querySelector("#task-date");
    // example
    selectedProject.addTask(task(taskName.value, date.value, details.value, false));
  }
  return {
    btnEvents,
    openModal,
    submitTask,
    submitProject,
    addTaskToProject,
    startApp,
    addProjectToList,
    selectedProject,

  };
}());
export default displayContoller;
