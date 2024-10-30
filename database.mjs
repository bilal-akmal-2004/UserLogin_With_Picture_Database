import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
  remove,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3-XCcQY4HSnksvDIf2a7rxJvVr7lA4E0",
  authDomain: "app-development-assignment-1.firebaseapp.com",
  projectId: "app-development-assignment-1",
  storageBucket: "app-development-assignment-1.appspot.com",
  messagingSenderId: "1063054144697",
  appId: "1:1063054144697:web:9c3f68dcce4973484fd768",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Realtime Database reference

async function displayUserData() {
  const tableBody = document
    .getElementById("userTable")
    .getElementsByTagName("tbody")[0];
  const dbRef = ref(db);

  try {
    const snapshot = await get(child(dbRef, "users"));
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();

        // Insert row into the table
        const row = tableBody.insertRow();
        row.insertCell().textContent = userData.username;
        row.insertCell().textContent = userData.email;
        row.insertCell().textContent = userData.password; // Be cautious about displaying passwords

        const imgCell = row.insertCell();
        const img = document.createElement("img");
        img.src = userData.pictureURL;
        img.width = 50; // Set width of the image
        img.height = 50; // Set height of the image
        imgCell.appendChild(img);
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        // Add click event listener for the delete button
        deleteButton.addEventListener("click", async function () {
          let makeSureToDelete = prompt(
            "Are you sure you want to delete this data,yes or no !"
          );
          if (makeSureToDelete.toLowerCase() === "yes") {
            try {
              // Remove user from the database
              await remove(ref(db, "users/" + userData.username));
              // Remove the row from the table
              tableBody.removeChild(row);
              alert("User deleted successfully!");
            } catch (error) {
              console.error("Error deleting user: ", error);
            }
          } else {
            alert("No user deleted!");
            return;
          }
        });

        deleteCell.appendChild(deleteButton);
      });
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error("Error retrieving data: ", error);
  }
}

// Call displayUserData when the DOM is loaded
window.addEventListener("DOMContentLoaded", displayUserData);
