const task = (title, date, details, checked = false) => {
  function getDateFormat(taskDate) {
    const year = taskDate.split('-')[0];
    const month = taskDate.split('-')[1];
    const day = taskDate.split('-')[2];
    return `${month}/${day}/${year}`;
  }

  return {
    title,
    date,
    details,
    checked,
    getDateFormat,
  };
};

export default task;
