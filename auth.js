
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

// const auth = firebase.auth();

// // Signup Form Handler
// const signupForm = document.getElementById('signup-form');
// if (signupForm) {
//     signupForm.addEventListener('submit', (e) => {
//         e.preventDefault();

//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         const confirmPassword = document.getElementById('confirm-password').value;

//         if (password !== confirmPassword) {
//             alert('Passwords do not match');
//             return;
//         }

//         auth.createUserWithEmailAndPassword(email, password)
//             .then((userCredential) => {
//                 console.log('User signed up:', userCredential.user);
//                 alert("Signup Successful! Redirecting...");
//                 window.location.href = 'index.html';
//             })
//             .catch((error) => {
//                 console.error('Error signing up:', error);
//                 alert(error.message);
//             });
//     });
// }

// // Login Form Handler
// const loginForm = document.getElementById('login-form');
// if (loginForm) {
//     loginForm.addEventListener('submit', (e) => {
//         e.preventDefault();

//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;

//         auth.signInWithEmailAndPassword(email, password)
//             .then((userCredential) => {
//                 console.log('User logged in:', userCredential.user);
//                 alert('Login Successful! Redirecting...');
//                 window.location.href = 'index.html';
//             })
//             .catch((error) => {
//                 console.error('Error logging in:', error);
//                 alert('Failed to log in. Please check your credentials.');
//             });
//     });
// }





