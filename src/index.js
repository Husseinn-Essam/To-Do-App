import './styles/main.scss';
import task from './Modules/task';
import project from './Modules/project';

const task1 = task("jojo", 12, true, "ez");
task1.title = "siwa";
console.log(task1.title);
const pr1 = project("pr1");
// pr1.tasks.push(task1);
pr1.addTask(task1);
console.table(pr1.tasks);
pr1.removeTask(task1);
console.log(pr1.tasks);
