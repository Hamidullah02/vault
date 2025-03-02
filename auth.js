window.onload = function () {
  const firebaseConfig = {
    apiKey: "AIzaSyAEEurR0FMrMt_2HwfTR6C2Db6KDvmfTaE",
    authDomain: "vault-2c2cd.firebaseapp.com",
    projectId: "vault-2c2cd",
    storageBucket: "vault-2c2cd.appspot.com",
    messagingSenderId: "911466241989",
    appId: "1:911466241989:web:2736572e05c4abcd7135ac",
    measurementId: "G-FYVRG02FE1"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  const db = firebase.firestore();


  // Handle Sign Up
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async(e) => {
      e.preventDefault();
      const name = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const confirmPassword = document.getElementById("signup-confirm-password").value;
      let signErrorMessage = document.getElementById("signerrormsg");

      if (password !== confirmPassword) {
        signErrorMessage.innerText = "Passwords do not match!";
        return;
      }

      try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        await user.updateProfile({ displayName: name });

        // Store user data in Firestore
        await db.collection("users").doc(user.uid).set({
          name: name,
          email: email,
          uid: user.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        window.location.href = 'index.html';
      } catch (error) {
        signErrorMessage.innerText = error.message;
      }
    });
  }

  // Handle Login
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      let logError = document.getElementById("logerrormsg");

      auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          window.location.href = 'index.html';
        })
        .catch(error => {
          logError.innerText = "Incorrect credential,try again ";
        });
    });
  }


  // Check Auth State
  auth.onAuthStateChanged(user => {
    const logoutButton = document.getElementById("logout-btn");
    if (user) {
      console.log("User is signed in:", user.email);
      if (logoutButton) {
        logoutButton.style.display = "block";
        logoutButton.innerHTML = `Logout (${user.email})`;
      }
    } else {
      console.log("No user is signed in.");
      if (logoutButton) {
        logoutButton.style.display = "none";
      }
    }
  });







   // Navbar Logic
  auth.onAuthStateChanged((user) => {
    const loginLink = document.getElementById("loginLink");
    const profileDropdown = document.getElementById("profileDropdown");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const useremail = document.getElementById("useremail");

    if (loadingSpinner) {
      loadingSpinner.style.display = "none";
    }

    if (user) {
      if (useremail) useremail.innerHTML = user.email || "useremail";
      if (loginLink) loginLink.style.display = "none";
      if (profileDropdown) profileDropdown.style.display = "inline-block";
    } else {
      if (profileDropdown) profileDropdown.style.display = "none";
      if (loginLink) loginLink.style.display = "inline-block";
    }
  });

  setTimeout(() => {
    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) {
      logoutLink.addEventListener("click", () => {
        auth.signOut()
          .then(() => {
            window.location.href = "index.html"; 
          })
          .catch((error) => {
            console.error("Error logging out:", error);
          });
      });
    }
  }, 1000);




};
