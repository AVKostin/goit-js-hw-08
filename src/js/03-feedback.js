import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';
const formRef = document.querySelector('.feedback-form');
const emailRef = formRef.elements.email;
const messageRef = formRef.elements.message;
const STORAGE_KEY = 'feedback-form-state';
let formData = {};
updateOutput();

function updateOutput() {
	try {
		const parseStorageKey = JSON.parse(localStorage.getItem(STORAGE_KEY));
		emailRef.value = `${parseStorageKey.email}`;
		messageRef.value = `${parseStorageKey.message}`;
	} catch (error) {}
}

const checkInputValue = () => {
	if (emailRef.value !== '' || messageRef.value !== '') {
		(formData.email = emailRef.value), (formData.message = messageRef.value);
	}
	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const valueInput = e => {
	e.preventDefault();
	if (formRef.email.value === '' || formRef.message.value === '') {
		return alert('Внимательно заполните все поля!');
	}
	console.log(formData);
	e.target.reset();
	localStorage.removeItem(STORAGE_KEY);
};
emailRef.addEventListener('input', throttle(checkInputValue, 500));
formRef.addEventListener('input', throttle(checkInputValue, 500));
formRef.addEventListener('submit', valueInput);
