function getFormData(form) {
  let formData = new FormData(form);
  formData = Object.fromEntries(formData.entries());
  return formData;
}

module.exports = {
  getFormData,
};
