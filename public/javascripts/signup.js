/*! Front end validation for user signup and sending of AJAX request 
*/
let selector = e => document.querySelector(e) 

const userName  = selector('#name') 
userName.addEventListener('focus' , event => {
	let feedBack = selector('.name-feedback') 
	feedBack.textContent = 'Please , enter your name' 
	feedBack.style.color = '#f00' 
}) 

let displayArea = selector('#root') 
fetch('http://localhost:4000/fetch')
.then(res => res.text())
.then(res => {
	displayArea.textContent = res
}).catch(err => {
	console.log(err) 
}) 

selector('#submit').addEventListener('submit' , event => {
	event.preventDefault() 
	/*fetch('http://localhost:4000/signup' , {
		method : 'POST' , 
		body : new FormData(selector('form'))
	})
	*/
})
//! Testing the fetch API and using AJAX to send a request working with express 
