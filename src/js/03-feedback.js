import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const email = formRef.email;
const message = formRef.message;

const STORAGE_KEY = 'feedback-form-state';
updateOutput();

const formData = {
	email: email.value,
	message: message.value,
};

function updateOutput() {
	const savedInStorageKey = JSON.parse(localStorage.getItem(STORAGE_KEY));
	if (savedInStorageKey) {
		email.value = savedInStorageKey.email || '';
		message.value = savedInStorageKey.message || '';
	}
}

const onTextInput = e => {
	formData[e.target.name] = e.target.value;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const onFormSubmit = e => {
	e.preventDefault();
	if (!email.value || !message.value) {
		return alert('Внимательно заполните все поля!');
	}
	console.log(formData);
	e.currentTarget.reset();
	localStorage.removeItem(STORAGE_KEY);
	formData.email = '';
	formData.message = '';
};

formRef.addEventListener('input', throttle(onTextInput, 500));
formRef.addEventListener('submit', onFormSubmit);
