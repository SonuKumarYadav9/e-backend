/**
 VALIDATIONS 
 */

 export const namRegex = function (val) {
  let regx = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
  return regx.test(val);
};

export const phoneRegex = function (val) {
  let regx = /^[6-9]\d{9}$/gi;
  return regx.test(val);
};
export const passwordRegex = function (val) {
  let regx = /^[a-zA-Z0-9!@#$%^&*]{8,15}$/;
  return regx.test(val);
};
export const addressRegex = (val) => {
  let regx = /^([a-zA-Z0-9!-/=* ]{2,50})*$/;
  return regx.test(val);
};
export const cityRegex = function (val) {
  let regx = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
  return regx.test(val);
};
export const emailRegex = function (val) {
  let regx = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  return regx.test(val);
};

export const bankRegex = (val) => {
  let regex = /^[0-9]+$/;
  return regex.test(val);
};
export const pincodeRegex = (val) => {
  let regex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
  return regex.test(val);
};

export const stateRegex = (val) => {
  let regex = /^[a-zA-Z]+|[a-zA-Z]+\\s[a-zA-Z]/;
  return regex.test(val);
};

export const panRegex = (val) => {
  let regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(val);
};

