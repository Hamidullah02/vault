const firebaseConfig = {
    apiKey: "AIzaSyAEEurR0FMrMt_2HwfTR6C2Db6KDvmfTaE",
    authDomain: "vault-2c2cd.firebaseapp.com",
    projectId: "vault-2c2cd",
    storageBucket: "vault-2c2cd.appspot.com",
    messagingSenderId: "911466241989",
    appId: "1:911466241989:web:2736572e05c4abcd7135ac",
    measurementId: "G-FYVRG02FE1"
};

let auth, db;

try {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
} catch (error) {
    console.error('Firebase initialization failed:', error);
    alert(`Failed to connect to Firebase: ${error.message}`);
}

// Create Item
const reportItemForm = document.getElementById('report-item-form');

reportItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const itemData = getItemFormData();

    try {
        await db.collection('items').add({
            ...itemData,
            userId: auth.currentUser ? auth.currentUser.uid : 'anonymous',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error reporting item:', error);
        alert(`Failed to report item: ${error.message}`);
    }
});

// Helper Function to Get Form Data
function getItemFormData() {
    let imageUrls = [];
    document.querySelectorAll('.image-url').forEach(input => {
        if (input.value.trim() !== "") {
            imageUrls.push(input.value.trim());
        }
    });

    // Get the contact info fields
    const primaryContact = document.getElementById('primary-contact').value.trim();
    const alternateContact = document.getElementById('alternate-contact').value.trim();

    return {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        type: document.getElementById('type').value,
        category: document.getElementById('category').value,
        color: document.getElementById('color').value,
        brand: document.getElementById('brand').value,
        uniqueFeatures: document.getElementById('unique-features').value,
        reward: document.getElementById('reward').value,
        primaryContact: primaryContact ? primaryContact : null,  // Ensure null if empty
        alternateContact: alternateContact ? alternateContact : null,  // Ensure null if empty
        location: document.getElementById('location').value,
        landmark: document.getElementById('landmark').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        notes: document.getElementById('notes').value,
        resolved:false,
        imageUrls: imageUrls,
    };
}









