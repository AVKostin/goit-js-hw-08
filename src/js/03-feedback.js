import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const email = formRef.email;
const message = formRef.message;
const STORAGE_KEY = 'feedback-form-state';
updateOutput();

function updateOutput() {
	const parseStorageKey = JSON.parse(localStorage.getItem(STORAGE_KEY));
	if (!parseStorageKey) {
		return;
	}
	if (parseStorageKey.email || parseStorageKey.message)
		(formRef.email.value = parseStorageKey.email),
			(formRef.message.value = parseStorageKey.message);
}

const onTextInput = () => {
	const formData = {
		email: email.value,
		message: message.value,
	};
	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const onFormSubmit = e => {
	e.preventDefault();
	if (formRef.email.value === '' || formRef.message.value === '') {
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
formRef.addEventListener('input', throttle(onTextInput, 500));
formRef.addEventListener('submit', onFormSubmit);
