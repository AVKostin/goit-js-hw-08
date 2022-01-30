import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';
const formRef = document.querySelector('.feedback-form');
const emailRef = formRef.elements.email;
const messageRef = formRef.elements.message;
const STORAGE_KEY = 'feedback-form-state';
const dataForm = {};

updateOutput();
function updateOutput() {
	try {
		const getFormState = localStorage.getItem(STORAGE_KEY);
		const parsedGetFormState = JSON.parse(getFormState);
		emailRef.value = `${parsedGetFormState.email}`;
		messageRef.value = `${parsedGetFormState.message}`;
	} catch (error) {}
}
const onSubmit = e => {
	e.preventDefault();
	if (emailRef.value === '' || messageRef.value === '') {
		return alert('Все поля должны быть заполнены!');
	}
	console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
	e.currentTarget.reset();
	localStorage.removeItem(STORAGE_KEY);
};
const inputValue = () => {
	if (emailRef.value !== '' || messageRef.value !== '') {
		(dataForm.email = emailRef.value), (dataForm.message = messageRef.value);
	}
	localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
};
emailRef.addEventListener('input', throttle(inputValue, 500));
messageRef.addEventListener('input', throttle(inputValue, 500));
formRef.addEventListener('submit', onSubmit);
