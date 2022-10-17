import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const LOCAL_STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onInputChange, 500));
refs.form.addEventListener('submit', onSubmitClick);

initPage();

function onInputChange(event) {
  const { name, value } = event.target;
  let saveData = load(LOCAL_STORAGE_KEY);
  saveData = saveData ? saveData : {};

  saveData[name] = value;

  save(LOCAL_STORAGE_KEY, saveData);
}

function initPage() {
  const saveData = load(LOCAL_STORAGE_KEY);
  if (!saveData) {
    return;
  }
  Object.entries(saveData).forEach(([name, value]) => {
    refs.form.elements[name].value = value;
  });
}

function onSubmitClick(event) {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;
  console.log({ email: email.value, message: message.value });
  event.currentTarget.reset();
  remove(LOCAL_STORAGE_KEY);
}
