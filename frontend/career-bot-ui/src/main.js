let controller = null;
let lastBotReply = "";
let isSpeaking = false;

const input = document.getElementById("input");
const messages = document.getElementById("messages");
const loadingDiv = document.getElementById("loading");
const toggleBtn = document.getElementById("toggleBtn");
const iconSpan = document.getElementById("btnIcon");
const darkToggle = document.getElementById("darkToggle");
const micBtn = document.getElementById("micBtn");
const speakBtn = document.getElementById("speakBtn");


// ✅ Disable mic when offline
function updateMicButton() {
  if (!navigator.onLine) {
    micBtn.disabled = true;
    micBtn.title = "Voice input requires internet connection";
    micBtn.style.opacity = 0.5;
    micBtn.style.cursor = "not-allowed";
  } else {
    micBtn.disabled = false;
    micBtn.title = "Voice Input";
    micBtn.style.opacity = 1;
    micBtn.style.cursor = "pointer";
  }
}

// Initial check and listeners for connection status
updateMicButton();
window.addEventListener("online", updateMicButton);
window.addEventListener("offline", updateMicButton);

// ENTER to send or stop
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    controller ? stopResponse() : sendMessage();
  }
});

// Button toggle
toggleBtn.addEventListener("click", () => {
  controller ? stopResponse() : sendMessage();
});

// Dark mode toggle
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark ? "true" : "false");
  darkToggle.textContent = isDark ? "☀️" : "🌙";
});

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  darkToggle.textContent = "☀️";
}

// Typing animation
function typeText(element, text) {
  let index = 0;

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.innerText = "|";
  element.appendChild(cursor);

  const interval = setInterval(() => {
    if (index < text.length) {
      cursor.before(text[index++]);
    } else {
      clearInterval(interval);
      cursor.remove(); // remove cursor when done
    }
    messages.scrollTop = messages.scrollHeight;
  }, 20);
}


// Get current time string
function getTimeString() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // User message wrapper
  // User message wrapper
  const userWrapper = document.createElement("div");
  userWrapper.className = "message-wrapper user-wrap";

  const userLabel = document.createElement("div");
  userLabel.className = "label";
  userLabel.innerText = "You";

  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.innerText = userMessage;

  const userTime = document.createElement("div");
  userTime.className = "timestamp";
  userTime.innerText = getTimeString();

  userWrapper.appendChild(userLabel);
  userWrapper.appendChild(userDiv);
  userWrapper.appendChild(userTime);
  messages.appendChild(userWrapper);

  input.value = "";

  loadingDiv.style.display = "block";
  iconSpan.innerText = "⏸";
  controller = new AbortController();

  try {
    const response = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
      signal: controller.signal,
    });

    const data = await response.json();
    const botReply = data.reply || "❌ No reply from CareerBuddy";
    lastBotReply = botReply;

     // Bot message wrapper
    const botWrapper = document.createElement("div");
    botWrapper.className = "message-wrapper bot-wrap";

    const botLabel = document.createElement("div");
    botLabel.className = "label";
    botLabel.innerText = "CareerBuddy";

    const botDiv = document.createElement("div");
    botDiv.className = "message bot";

    const botTime = document.createElement("div");
    botTime.className = "timestamp";
    botTime.innerText = getTimeString();

    botWrapper.appendChild(botLabel);
    botWrapper.appendChild(botDiv);
    botWrapper.appendChild(botTime);
    messages.appendChild(botWrapper);

    typeText(botDiv, botReply);

    // 👇 Reaction buttons
const reactionDiv = document.createElement("div");
reactionDiv.className = "reactions";

["👍", "❤️", "👎"].forEach((emoji) => {
  const btn = document.createElement("button");
  btn.innerText = emoji;
  btn.className = "reaction-btn";

  btn.onclick = () => {
    let response = "";
    switch (emoji) {
      case "👍":
        response = " Glad you found it helpful!";
        break;
      case "❤️":
        response = " I'm happy you loved it!";
        break;
      case "👎":
        response = " Sorry to hear that. Let me know how I can improve.";
        break;
    }

    const botWrapper = document.createElement("div");
    const botDiv = document.createElement("div");
    botDiv.className = "message bot";
    botDiv.innerText = response;

    const botTime = document.createElement("div");
    botTime.className = "timestamp";
    botTime.innerText = getTimeString();

    botWrapper.appendChild(botDiv);
    botWrapper.appendChild(botTime);
    messages.appendChild(botWrapper);
    messages.scrollTop = messages.scrollHeight;

    // Optional: disable all buttons after one click
    reactionDiv.querySelectorAll("button").forEach(b => b.disabled = true);
  };

  reactionDiv.appendChild(btn);
});

botWrapper.appendChild(reactionDiv); // 👈 Add to message box

  } catch (err) {
    const errDiv = document.createElement("div");
    errDiv.className = "message bot";
    errDiv.innerText =
      err.name === "AbortError"
        ? "  Response stopped by user."
        : "  Error: " + err.message;
    messages.appendChild(errDiv);
  } finally {
    loadingDiv.style.display = "none";
    iconSpan.innerText = "↑";
    controller = null;
    messages.scrollTop = messages.scrollHeight;
  }
}

function stopResponse() {
  if (controller) {
    controller.abort();
    controller = null;
    loadingDiv.style.display = "none";
    iconSpan.innerText = "↑";
  }
}

// ✅ Suggestion Chip Logic
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    input.value = chip.innerText;
    sendMessage();
  });
});

// ✅ Welcome Message
window.addEventListener("load", () => {
  const botWrapper = document.createElement("div");
  const botDiv = document.createElement("div");
  botDiv.className = "message bot";
  botDiv.innerText = "👋 Hi there! I’m CareerBuddy. Ask me anything about careers, skills, or roadmaps!";

  const time = document.createElement("div");
  time.className = "timestamp";
  time.innerText = getTimeString();

  botWrapper.appendChild(botDiv);
  botWrapper.appendChild(time);
  messages.appendChild(botWrapper);
});

// ✅ Text-to-Speech
function speakText(text) {
  if (!('speechSynthesis' in window)) return;

  speechSynthesis.cancel(); // stop previous speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  isSpeaking = true;
  micBtn.disabled = true;
  micBtn.classList.add("disabled");

  utterance.onend = () => {
    isSpeaking = false;
    micBtn.disabled = false;
    micBtn.classList.remove("disabled");
  };

  speechSynthesis.speak(utterance);
}

// ✅ Manual Speak Button
speakBtn.addEventListener("click", () => {
  if (isSpeaking || !lastBotReply) return;
  speakText(lastBotReply);
});

// ✅ Voice Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  micBtn.addEventListener("click", () => {
    if (isSpeaking) return;
    recognition.start();
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
    sendMessage();
  };
}
// ✅ Sticky Notes / Reminders Feature (Offline Capable)
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

// Load existing notes from localStorage
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("stickyNotes") || "[]");
  notesList.innerHTML = "";
  notes.forEach((note, index) => addNoteToDOM(note, index));
}

// Add a note to DOM
function addNoteToDOM(note, index) {
  const li = document.createElement("li");
  li.textContent = note;

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.className = "delete-note";
  delBtn.onclick = () => {
    deleteNote(index);
  };

  li.appendChild(delBtn);
  notesList.appendChild(li);
}

// Save a new note
function addNote() {
  const note = noteInput.value.trim();
  if (!note) return;

  const notes = JSON.parse(localStorage.getItem("stickyNotes") || "[]");
  notes.push(note);
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
  noteInput.value = "";
  loadNotes();
}

// Delete a note
function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem("stickyNotes") || "[]");
  notes.splice(index, 1);
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
  loadNotes();
}

// Event listener for add button
addNoteBtn.addEventListener("click", addNote);

// Load notes on page load
window.addEventListener("load", loadNotes);

// Welcome Modal Logic
window.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("welcomeModal");
  const closeBtn = document.getElementById("closeModal");
  modal.style.display = "flex";

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
