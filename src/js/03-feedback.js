import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-from-state';
const formData = {};

const parseStorageKey = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (parseStorageKey) {
	form.email.value = parseStorageKey.email;
	form.message.value = parseStorageKey.message;
}

const onFormSubmit = e => {
	e.preventDefault();

	if (!form.email.value || !form.message.value) {
		return alert('Все поля должны быть заполнены!');
	}
	formData[e.target.name] = e.target.value;
	console.log({
		email: form.email.value,
		message: form.message.value,
	});

	localStorage.removeItem(STORAGE_KEY);
	e.target.reset();
};

const onTextInput = () => {
	localStorage.setItem(
		STORAGE_KEY,
		JSON.stringify({
			email: form.email.value,
			message: form.message.value,
		}),
	);
};
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextInput, 500));
