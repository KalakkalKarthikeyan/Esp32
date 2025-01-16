const ESP_IP = "http://192.168.114.195";  // Replace with your actual ESP32 IP address

// Function to check the ESP32 connection status
function checkStatus() {
  fetch(ESP_IP + "/status")
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
      const statusText = document.getElementById("statusText");

      if (data.status === "online") {
        statusText.innerText = "Online 🟢";  // Display "Online" if status is online
        statusText.style.color = "green";
      } else {
        statusText.innerText = "Offline 🔴";  // Display "Offline" if status is not online
        statusText.style.color = "red";
      }
    })
    .catch(error => {
      console.error("Error fetching status:", error);
      const statusText = document.getElementById("statusText");
      statusText.innerText = "Offline 🔴";  // In case of error, show Offline
      statusText.style.color = "red";
    });
}

// Function to send the text to the ESP32
function sendTextToESP() {
  const textInput = document.getElementById("textInput").value;
  
  if (textInput.trim() !== "") {
    fetch(ESP_IP + "/sendText", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: textInput,
    })
    .then(response => response.text())  // Get the response text
    .then(responseText => {
      document.getElementById("response").innerText = "Response: " + responseText; // Display server response
    })
    .catch(error => {
      console.error("Error sending text:", error);
      document.getElementById("response").innerText = "Error sending text"; // Show error
    });
  } else {
    alert("Please enter some text to send!");
  }
}

// Trigger the status check when the page loads
window.onload = function() {
  checkStatus();  // Check the status when the page loads
  setInterval(checkStatus, 5000); // Check the status every 5 seconds
};

