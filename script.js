// script.js — handle form submit, store data in localStorage, go to results.html

const form = document.getElementById('mainForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Build a plain object of form values
  const data = {};
  const formData = new FormData(form);

  // Convert FormData to simple object; handle multiple checkboxes/radios
  formData.forEach((value, key) => {
    // If key already exists, push into array
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (Array.isArray(data[key])) data[key].push(value);
      else data[key] = [data[key], value];
    } else {
      data[key] = value;
    }
  });

  // Special handling: collect all checked hobbies from checkbox inputs
  // (Some checkboxes had unique names in this form; general pattern covered above)

  // For file inputs, record filename only (can't store File object in localStorage safely)
  const avatarInput = document.getElementById('avatar');
  if (avatarInput && avatarInput.files && avatarInput.files.length > 0) {
    data.avatarName = avatarInput.files[0].name;
  } else {
    data.avatarName = "";
  }

  // Save as JSON string in localStorage
  localStorage.setItem('htmlFormData', JSON.stringify(data));

  // Redirect to results page
  window.location.href = 'results.html';
});