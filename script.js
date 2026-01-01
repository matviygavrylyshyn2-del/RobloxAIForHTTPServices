const chat = document.getElementById("chat");
const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.textContent = sender + ": " + text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
    const text = inputBox.value;
    if (!text) return;

    addMessage(text, "You");
    inputBox.value = "";

    const response = await fetch("https://YOUR-SERVER.com/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    addMessage(data.reply, "AI");
}

sendBtn.onclick = sendMessage;
inputBox.onkeydown = (e) => {
    if (e.key === "Enter") sendMessage();
};