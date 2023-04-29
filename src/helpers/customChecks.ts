export const isValidPassword = (value: string) => {
  const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (value && !regexPass.test(value)) {
    return false;
  }
  return true;
};

export const isValidDate = (value:string) => {
  const partsDate = value.split('/');
  if (partsDate.length !== 3) {
    return false; // El string de fecha no tiene el formato correcto
  }
  const day = parseInt(partsDate[0]);
  const month = parseInt(partsDate[1]) - 1; // Los meses en JS van de 0 a 11
  const year = parseInt(partsDate[2]) + 2000; // Asumimos que los años están en formato 'AA'

  const fecha = new Date(year, month, day);
  if (isNaN(fecha.getTime())) {
    return false; // La fecha es inválida
  }
  return true;
}
