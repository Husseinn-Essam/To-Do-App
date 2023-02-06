const project = (title) => {
  const tasks = [];
  function addTask(task) {
    tasks.push(task);
  }
  function removeTask(task) {
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
  }
  return {
    title,
    addTask,
    removeTask,
    tasks,
  };
};
export default project;
