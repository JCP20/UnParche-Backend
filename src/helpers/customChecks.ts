export const isValidPassword = (value: string) => {
  const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // prettier-ignore

  if (value && !regexPass.test(value)) {
    return false;
  }
  return true;
};

export const isValidEmail = (value: string) => {
  // the email should end with @unal.edu.co
  const regexEmail = /^[\w-\.]+@unal\.edu\.co$/; // prettier-ignore

  if (value && !regexEmail.test(value)) {
    return false;
  }
  return true;
};
