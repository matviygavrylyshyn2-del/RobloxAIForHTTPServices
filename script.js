import { generateReply, updateSettings } from "./AI/brain.js";

const chat = document.getElementById("chat");
const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");

// Settings elements
const langSelect = document.getElementById("langSelect");
const personalitySelect = document.getElementById("personalitySelect");
const customBehavior = document.getElementById("customBehavior");
const saveSettings = document.getElementById("saveSettings");

saveSettings.addEventListener("click", () => {
    updateSettings({
        language: langSelect.value,
        personality: personalitySelect.value,
        customBehavior: customBehavior.value
    });

    addMessage("Settings updated.", "ai");
});

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("message", sender === "user" ? "user" : "ai");
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function handleSend() {
    const text = inputBox.value.trim();
    if (!text) return;

    addMessage(text, "user");
    inputBox.value = "";

    const reply = generateReply(text);

    setTimeout(() => {
        addMessage(reply, "ai");
    }, 150);
}

sendBtn.addEventListener("click", handleSend);

inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
    }
});
