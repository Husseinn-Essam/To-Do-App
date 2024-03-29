import toDolist from './ToDoList';
import task from './task';
import project from './project';

const displayContoller = (function () {
  let selectedProject =  toDolist.home;
  let theIndexOfEdited; 
  ///validate Modal
  function validate(title){
    if(title.value==''){
      alert("must enter task name");
      return false;
    }
    return true;
  }
  // rendering tasks
  function createTaskCard(title, date,checked) {
    const list = document.querySelector('.tasks');
    list.innerHTML += `<div class="task">
    <div class="info">
      <input type="checkbox" name="done" id="done" ${checked==true? `checked` : ``}>
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
    list.textContent='';
  }
  function renderProjectTasks(j) {
    resetList();
    for (let i = 0; i < selectedProject.tasks.length; i++) {
      createTaskCard(selectedProject.tasks[i].title, selectedProject.tasks[i].date,selectedProject.tasks[i].checked);
    }
    editTaskBtn();
    deleteTask();
    openTaskDetails();
  }
  // rendering Created Projects
  function createProjectUI(projectTitle) {
    const projectList = document.querySelector(".project-list");
    projectList.innerHTML+=`<div class="projectWrapper"> <button class="project newProject"> <i class="fa-solid fa-list-check"></i>${projectTitle}</button>
    <button class='deleteProjectBtn'><i class="fa-sharp fa-solid fa-xmark"></i></button></div>`
    setSelectedProject();
  }

  function resetProjectUI() {
    const projectList = document.querySelector(".project-list");
    projectList.textContent='';
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
    
    
    if (validate(taskName)==true){

      selectedProject.addTask(task(taskName.value, date.value, details.value, false));
    }
    
  }

  // button events
  function openModal() {
    const addTask = document.querySelector('.add-task');
    const modal = document.querySelector('.modal');
    const detailsModal= document.querySelector('.detailsModal');
    const modalEntry = document.querySelector('.input')
    addTask.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
    // closing modal
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modalEntry.reset();
        modal.style.display = 'none';
        detailsModal.style.display='none';
      }
    });
  }

  function submitTask() {
    const submitTaskBtn = document.querySelector('.submit');
    const modal = document.querySelector('.modal');
    submitTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addTaskToProject();
      modal.style.display = 'none';
      toDolist.getTodayTasks();
      toDolist.getWeekTasks();
      renderProjectTasks();
      completeTask();
      
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
      removeProject();
      openTaskDetails();
      
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
    selectedProject =toDolist.projects[i];
    setSelectedProjectColor();
    renderProjectTasks();
    completeTask();
  }

  function setSelectedProject() {
    const uiProjects = document.querySelectorAll('.project');
    for (let i = 0; i < uiProjects.length; i++) {
      uiProjects[i].addEventListener('click', () => {
        checkSelectedProject(i,selectedProject);
      });
    }
  }

  function removeProject(){
    const removeProjectBtns = document.querySelectorAll('.deleteProjectBtn');
    const projectList = document.querySelector(".project-list");
    const createdProjects = document.querySelectorAll('.projectWrapper');
      for(let i=0;i<removeProjectBtns.length;i++){
        removeProjectBtns[i].addEventListener('click',()=>{
          toDolist.removeProject(toDolist.projects[i+3]);
          projectList.removeChild(createdProjects[i]);
        })
      }
   
  }
  function completeTask(){
    const taskCheckbox= document.querySelectorAll("#done");
    for(let i =0 ;i<taskCheckbox.length;i++){
      taskCheckbox[i].addEventListener('click',()=>{
        selectedProject.tasks[i].checked =  selectedProject.tasks[i].checked==true? false:true ;
        
      })
    }
  }
  function deleteTask(){
    const deleteTaskBtn = document.querySelectorAll('.delete');
    const CreatedTasks = document.querySelectorAll('.task');
    const tasks = document.querySelector(".tasks")
    for(let i = 0;i<CreatedTasks.length;i++){
      deleteTaskBtn[i].addEventListener('click',()=>{
        if(selectedProject == toDolist.today || selectedProject == toDolist.week){
          alert('You can not delete from "Today" and "This Week", please delete from created project');
        }
        else{
          selectedProject.removeTask(selectedProject.tasks[i]);
          tasks.removeChild(CreatedTasks[i]);
          toDolist.getTodayTasks();
          toDolist.getWeekTasks();
        }
      })
    }
  }
  
  function editTaskBtn(){
    const editTaskBtn= document.querySelectorAll('.edit');
    const editModal = document.querySelector('.editTask');
    
    for(let i= 0; i<editTaskBtn.length;i++){
      editTaskBtn[i].addEventListener('click',()=>{
        editModal.style.display = 'flex';
        theIndexOfEdited=i;
      })
      
    }
    window.addEventListener('click', (e) => {
      if (e.target === editModal) {
        
        editModal.style.display='none';
      }
    });
  }
  function submitEdit(){
    const editSubmit = document.querySelector('.editBtn');
    const taskTitle = document.querySelector('.editedTitle');
    const details = document.querySelector('.editedDetails');
    const date = document.querySelector('.editedDate');
    const editModal = document.querySelector('.editTask');
    const editModalEntry = document.querySelector('.editModal');
    editSubmit.addEventListener('click',(e)=>{
      e.preventDefault();
      if(validate(taskTitle)==true)
      selectedProject.editTask(selectedProject.tasks[theIndexOfEdited],taskTitle.value,date.value,details.value);
      editModalEntry.reset();
      editModal.style.display = 'none';
      toDolist.getTodayTasks();
      toDolist.getWeekTasks();
      toDolist.ez();
      renderProjectTasks();
    })
  }

  function openTaskDetails(){
    const detailsModal = document.querySelector('.detailsModal');
    const details = document.querySelector('.taskDetails');
    const showDetailsBtn = document.querySelectorAll('.details');
    for(let i =0 ;i<showDetailsBtn.length;i++){
      showDetailsBtn[i].addEventListener('click',()=>{
        detailsModal.style.display='flex';
        details.textContent=selectedProject.tasks[i].details;
      })
      
    }
    window.addEventListener('click', (e) => {
      if (e.target === detailsModal) {
        
        detailsModal.style.display='none';
      }
    });
  }
  function humMenu()
  {
    const menu = document.querySelector(".sidebar");
    const hamburger= document.querySelector(".hamburger");

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
    startApp,
    selectedProject,
  };
}());
export default displayContoller;
