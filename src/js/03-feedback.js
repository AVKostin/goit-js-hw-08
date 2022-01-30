import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';
const formRef = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let formData = {};
updateOutput();

function updateOutput() {
	const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
	for (const key in savedData) {
		if (key) {
			formRef[key].value = savedData[key];
			formData = savedData;
		}
	}
}
const onTextAreaInput = e => {
	formData[e.target.name] = e.target.value;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const inputValue = e => {
	e.preventDefault();
	if (formRef.email.value === '' || formRef.message.value === '') {
		return alert('Внимательно заполните все поля!');
	}
	console.log(formData);
	e.currentTarget.reset();
	localStorage.removeItem(STORAGE_KEY);
};
formRef.addEventListener('submit', inputValue);
formRef.addEventListener('input', throttle(onTextAreaInput, 500));
