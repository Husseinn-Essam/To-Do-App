
const project = (title) => {
  const tasks = [];
  function addTask(task) {
    tasks.push(task);
  }
  function removeTask(task) {
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
  }
  function editTask(task , Ttitle, Tdate, Tdetails){
    task.title =Ttitle;
    task.date = Tdate;
    task.details = Tdetails;
  }
  return {
    title,
    addTask,
    removeTask,
    editTask,
    tasks,
  };
};
export default project;
