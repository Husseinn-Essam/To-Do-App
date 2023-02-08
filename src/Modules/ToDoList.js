import {
  isToday, isThisWeek,
} from "date-fns";
import project from "./project";

const toDolist = (function () {
  const home = project("Home");
  const today = project("Today");
  const week = project("This week");
  const projects = [home, today, week];
  function addProject(aproject) {
    projects.push(aproject);
  }
  function removeProject(aproject) {
    const index = projects.indexOf(aproject);
    projects.splice(index, 1);
  }
  function getTodayTasks() {
    today.tasks = [];

    for (let i = 0; i < projects.length; i++) {
      if (projects[i] !== today && projects[i] !== week) {
        const currentTasks = projects[i].tasks;
        for (let j = 0; j < currentTasks.length; j++) {
          const tasksDate = new Date(currentTasks[j].date);
          if (isToday(tasksDate)) {
            today.tasks.push(currentTasks[j]);
          }
        }
      }
    }
  }
  function getWeekTasks() {
    week.tasks = [];
    for (let i = 0; i < projects.length; i++) {
      if (projects[i] !== today && projects[i] !== week) {
        const currentTasks = projects[i].tasks;
        for (let j = 0; j < currentTasks.length; j++) {
          if (isThisWeek(new Date(currentTasks[j].date))) {
            week.tasks.push(currentTasks[j]);
          }
        }
      }
    }
  }
  return {
    addProject,
    removeProject,
    projects,
    getTodayTasks,
    getWeekTasks,
    home,
    today,
    week,
  };
}());
export default toDolist;
