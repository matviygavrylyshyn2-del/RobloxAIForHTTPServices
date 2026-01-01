// script.js
import { generateReply } from "./AI/brain.js";

const chat = document.getElementById("chat");
const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("message");

    if (sender === "user") {
        div.classList.add("user");
    } else {
        div.classList.add("ai");
    }

    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function handleSend() {
    const text = inputBox.value.trim();
    if (!text) return;

    // Show user message
    addMessage(text, "user");
    inputBox.value = "";

    // Generate AI reply using your custom logic
    const reply = generateReply(text);

    // Simulate a tiny delay for effect
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

// Optional: initial welcome message
addMessage("Yo, I'm your custom Roblox HTTP AI running fully in your browser.", "ai");
addMessage("Ask me about Roblox, HttpService, GitHub, or edit AI/brain.js to change my brain.", "ai");
