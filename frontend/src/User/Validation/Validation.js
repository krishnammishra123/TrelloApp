// Card Validation
export const cardValidate = (title,task) => {
  let errors = {};
  if (!title?.trim()) {
    errors.title = "*Title is required";
  } 

  if (!task?.trim()) {
    errors.task = "*task is required";
  }
  return errors;
};

//Login Validation
export const projectValidate = (project, selectedUsers) => {
  let errors = {};
  if (!project?.trim()) {
    errors.project = "*Project is required";
  }
  if (selectedUsers.length === 0) {
    errors.selectedUsers = "* Please select at least one user";
  }

  return errors;
};

//
export const  taskValidate = (title, task ,invite) => {
  let errors = {};
  if (!title?.trim()) {
    errors.title = "*Title is required";
  }

  if (!task?.trim()) {
    errors.task = "*task is required";
  }

  if (invite.length === 0) {
    errors.invite = "*assign user is required";
  }
  return errors;
};
