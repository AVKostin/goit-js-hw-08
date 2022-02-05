import throttle from 'lodash.throttle';
const refs = {
	form: document.querySelector('.feedback-form'),
	email: document.querySelector('.feedback-form input'),
	message: document.querySelector('.feedback-form textarea'),
};
const STORAGE_KEY = 'feedback-form-state';
const formData = {
	email: refs.email.value,
	message: refs.message.value,
};
updateOutput();

function updateOutput() {
	const parseStorageKey = JSON.parse(localStorage.getItem(STORAGE_KEY));
	if (parseStorageKey) {
		refs.email.value = parseStorageKey.email || '';
		refs.message.value = parseStorageKey.message || '';
	}
}

const onTextInput = e => {
	// console.log(
	// 	'JSON.parse(localStorage.getItem(STORAGE_KEY)): ',
	// 	JSON.parse(localStorage.getItem(STORAGE_KEY)),
	// );
	// const formData = { ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };

	console.log(formData);
	formData[e.target.name] = e.target.value;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const onFormSubmit = e => {
	e.preventDefault();

	if (refs.form.email.value === '' || refs.form.message.value === '') {
		return alert('Внимательно заполните все поля!');
	}
	const formDataInput = {
		email: e.currentTarget.email.value,
		massage: e.currentTarget.message.value,
	};
	console.log(formDataInput);
	e.target.reset();
	localStorage.removeItem(STORAGE_KEY);
};
refs.form.addEventListener('input', throttle(onTextInput, 500));
refs.form.addEventListener('submit', onFormSubmit);
