import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref as dbRef, set} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB3-XCcQY4HSnksvDIf2a7rxJvVr7lA4E0",
    authDomain: "app-development-assignment-1.firebaseapp.com",
    projectId: "app-development-assignment-1",
    storageBucket: "app-development-assignment-1.appspot.com",
    messagingSenderId: "1063054144697",
    appId: "1:1063054144697:web:9c3f68dcce4973484fd768"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);  
const storage = getStorage(app); 

async function saveUserData(username, email, password, pictureFile) {
  try {
    // Upload the picture to Firebase Storage
    const pictureRef = ref(storage, `userPictures/${username}`);
    await uploadBytes(pictureRef, pictureFile);
    //reading uploaded file url
    const pictureURL = await getDownloadURL(pictureRef);

    // Save data to datasbe
    await set(dbRef(db, 'users/' + username), {
      username,
      email,
      password,
      pictureURL
    });

    alert('Data saved successfully!');
  } catch (error) {
    console.error("Error saving data: ", error);
  }
}


document.getElementById('userForm').addEventListener('submit',async function(e){
  e.preventDefault();

  const username = document.getElementById('userName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const pictureFile = document.getElementById('file').files[0];

  await saveUserData(username, email, password, pictureFile);
  return false; 
});

  