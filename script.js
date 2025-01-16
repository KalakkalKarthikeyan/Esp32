const ESP_IP = "http://192.168.114.195";  // Replace with your ESP32 IP address

// Check the status of ESP32
function checkStatus() {
  fetch(ESP_IP + "/status")
    .then(response => response.json())
    .then(data => {
      const statusText = document.getElementById("statusText");
      if (data.status === "online") {
        statusText.innerText = "Online 🟢";
        statusText.style.color = "green";
      } else {
        statusText.innerText = "Offline 🔴";
        statusText.style.color = "red";
      }
    })
    .catch(error => {
      console.error("Error fetching status:", error);
      const statusText = document.getElementById("statusText");
      statusText.innerText = "Offline 🔴";
      statusText.style.color = "red";
    });
}

// Send the text entered in the input field to ESP32
function sendText() {
  const text = document.getElementById("textInput").value;
  if (text.trim() === "") {
    alert("Please enter text before sending.");
    return;
  }

  fetch(ESP_IP + "/sendText", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: text
  })
  .then(response => response.text())
  .then(data => {
    alert("Text sent: " + data);
    document.getElementById("textInput").value = "";  // Clear the input field
  })
  .catch(error => {
    console.error("Error sending text:", error);
    alert("Failed to send text.");
  });
}

// Set up event listener for the "Send" button
document.getElementById("sendButton").addEventListener("click", sendText);

// Check ESP32 status every 5 seconds
setInterval(checkStatus, 5000);
checkStatus();  // Initial status check when the page loads
