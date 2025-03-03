///// THEME COLOR CHANGE ////////
const changeBgButton = document.getElementById("changeBgButton");

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

changeBgButton.addEventListener("click", () => {
  // Remove Tailwind's background classes
  document.body.classList.remove(
    "bg-gradient-to-b",
    "from-[#f0f7ff]",
    "to-white"
  );

  // Generate a random color
  const randomColor = getRandomColor();

  // Create a <style> element to apply the background color with !important
  const style = document.createElement("style");
  style.innerHTML = `
    body {
      background-color: ${randomColor} !important;
    }
  `;
  // Remove any previously added <style> element
  const existingStyle = document.getElementById("dynamic-bg-style");
  if (existingStyle) {
    existingStyle.remove();
  }
  // Add the new <style> element to the document
  style.id = "dynamic-bg-style";
  document.head.appendChild(style);
});

// //////COMPLETED ALERT /////////
function showAlert() {
  const alertBox = document.createElement("div");
  Object.assign(alertBox.style, {
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    zIndex: "1000",
  });
  const message = document.createElement("p");
  message.textContent = "Board Updated Successfully";
  message.style.marginBottom = "20px";
  alertBox.appendChild(message);

  const okButton = document.createElement("button");
  okButton.textContent = "OK";
  Object.assign(okButton.style, {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  });
  okButton.addEventListener("click", () => document.body.removeChild(alertBox));
  alertBox.appendChild(okButton);
  document.body.appendChild(alertBox);
}

///////////Rest Calculation of the index.html////////////////
function handleCompleteTask(button) {
  // Call the showAlert function
  showAlert();

  // Get the completed count element
  const completedCountElement = document.getElementById("completedCount");
  const taskCountElement = document.getElementById("taskCount");

  // Reduce the task count by 1
  let reduceCount = parseInt(taskCountElement.textContent);
  if (reduceCount > 0) {
    reduceCount--;
    taskCountElement.textContent = reduceCount.toString().padStart(2, "0");
  }

  // Increase the completed count by 1
  let currentCount = parseInt(completedCountElement.textContent);
  currentCount++;
  completedCountElement.textContent = currentCount.toString().padStart(2, "0");

  // Disable the clicked button and change its style
  button.disabled = true; // Make the button unclickable
  button.classList.remove("bg-blue-600", "hover:bg-blue-700");
  button.classList.add("bg-gray-400", "cursor-not-allowed", "opacity-50");

  // Show and append the <p> tag with the current time
  const debugTemplate = document.getElementById("debugTemplate");
  const debugMessagesContainer = document.getElementById("debugMessages");

  // Clone the hidden <p> tag
  const newDebugMessage = debugTemplate.cloneNode(true);
  newDebugMessage.classList.remove("hidden");

  // Get the current time in 12-hour format with AM/PM
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format
    timeZone: "Asia/Dhaka", // Bangladeshi time zone
  });

  // Replace "CURRENT TIME" with the actual current time
  newDebugMessage.textContent = newDebugMessage.textContent.replace(
    "CURRENT TIME",
    currentTime
  );

  // Append the new <p> tag to the container
  debugMessagesContainer.appendChild(newDebugMessage);
}

///////////Clear all the histories of the P tags////////////////
function clearHistory() {
  // Get the debugMessages container
  const debugMessagesContainer = document.getElementById("debugMessages");

  // Remove all child elements (p tags) inside the container
  while (debugMessagesContainer.firstChild) {
    debugMessagesContainer.removeChild(debugMessagesContainer.firstChild);
  }
}
