// AI/brain.js

// Simple pattern-based "AI" for now.
// You can customize all of this.

function normalize(text) {
    return text.toLowerCase().trim();
}

export function generateReply(message) {
    const msg = normalize(message);

    // greetings
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
        return "Hello! I'm your custom Roblox HTTP AI. What are you trying to build?";
    }

    // roblox / http
    if (msg.includes("http") || msg.includes("httpservice")) {
        return "HttpService lets Roblox talk to web servers. You can use it to send JSON to this site or others.";
    }

    if (msg.includes("roblox")) {
        return "Roblox detected. Are you asking about scripting, HttpService, or something else?";
    }

    // github
    if (msg.includes("github")) {
        return "This site is hosted with GitHub Pages. You can update it by committing new files to the repo.";
    }

    // basic help
    if (msg.includes("help")) {
        return "I can answer basic questions about Roblox, HTTP, and how this web AI works. Try asking: 'How do I use HttpService?'";
    }

    // fallback
    return "I don't fully understand that yet, but you can teach me by updating AI/brain.js in the repo.";
}