import throttle from 'lodash.throttle';
const refs = {
	form: document.querySelector('.feedback-form'),
	email: document.querySelector('.feedback-form input'),
	message: document.querySelector('.feedback-form textarea'),
};
const STORAGE_KEY = 'feedback-form-state';

let formData = {
	email: refs.email.value,
	message: refs.message.value,
};
updateOutput();

function updateOutput() {
	const parseStorageKey = JSON.parse(localStorage.getItem(STORAGE_KEY));
	if (!parseStorageKey) {
		return;
	}
	refs.email.value = parseStorageKey.email || '';
	refs.message.value = parseStorageKey.message || '';
	formData = parseStorageKey;
}

const onTextInput = e => {
	formData[e.target.name] = e.target.value;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const onFormSubmit = e => {
	e.preventDefault();

	if (formData.email === '' || formData.message === '') {
		return alert('Внимательно заполните все поля!');
	}
	console.log(formData);
	e.target.reset();
	localStorage.removeItem(STORAGE_KEY);
	formData.email = '';
	formData.message = '';
};
refs.form.addEventListener('input', throttle(onTextInput, 500));
refs.form.addEventListener('submit', onFormSubmit);
