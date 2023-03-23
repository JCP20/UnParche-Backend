//make a custom validation using check from express-validator to match a regex
export const isValidPassword = (value: string) => {
  const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (value && !regexPass.test(value)) {
    return false;
  }
  return true;
};
