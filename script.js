// script.js
import { generateReply, updateSettings } from "./AI/brain.js";

const chat = document.getElementById("chat");
const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");

// settings UI
const langSelect = document.getElementById("langSelect");
const personalitySelect = document.getElementById("personalitySelect");
const customBehavior = document.getElementById("customBehavior");
const saveSettings = document.getElementById("saveSettings");

// load settings from localStorage if present
function loadSettings() {
    const saved = localStorage.getItem("robloxHttpAISettings");
    if (!saved) return;

    try {
        const parsed = JSON.parse(saved);
        if (parsed.language) langSelect.value = parsed.language;
        if (parsed.personality) personalitySelect.value = parsed.personality;
        if (parsed.customBehavior) customBehavior.value = parsed.customBehavior;

        updateSettings(parsed);
    } catch (e) {
        console.warn("Failed to load saved settings:", e);
    }
}

function saveSettingsLocal(newSettings) {
    localStorage.setItem("robloxHttpAISettings", JSON.stringify(newSettings));
}

// settings button
saveSettings.addEventListener("click", () => {
    const newSettings = {
        language: langSelect.value,
        personality: personalitySelect.value,
        customBehavior: customBehavior.value
    };

    updateSettings(newSettings);
    saveSettingsLocal(newSettings);

    addMessage("Settings updated.", "ai");
});

// chat helpers
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
    }, 120);
}

sendBtn.addEventListener("click", handleSend);

inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
    }
});

// init
loadSettings();
addMessage("Custom browser AI online. Configure my language, personality, and behavior in the settings below.", "ai");
addMessage("You can also edit AI/brain.js in the repo to hard‑code new behaviors.", "ai");
