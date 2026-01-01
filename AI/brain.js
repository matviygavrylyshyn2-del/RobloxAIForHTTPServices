// AI/brain.js

// Conversation memory
let memory = [];

// Settings with defaults
let settings = {
    language: "en",
    personality: "neutral",
    customBehavior: ""
};

// Simple language dictionary
const translations = {
    en: {
        fallback: "I'm not sure yet, but I'm learning.",
        greeting: "Hello! How can I help you?",
    },
    fr: {
        fallback: "Je ne suis pas encore sûr, mais j'apprends.",
        greeting: "Bonjour ! Comment puis-je vous aider ?",
    },
    ua: {
        fallback: "Я ще не впевнений, але я навчаюся.",
        greeting: "Привіт! Чим можу допомогти?",
    }
};

// Personalities
const personalities = {
    neutral: (text) => text,
    friendly: (text) => "Friendly mode: " + text,
    aggressive: (text) => "AGGRESSIVE MODE: " + text.toUpperCase(),
    robotic: (text) => "[ROBOTIC OUTPUT] " + text
};

// Called from UI to update settings
export function updateSettings(newSettings) {
    settings = { ...settings, ...newSettings };
}

// Add entry to memory
function remember(role, text) {
    memory.push({ role, text });
    if (memory.length > 20) {
        memory.shift();
    }
}

// Simple similarity check
function similarity(a, b) {
    const wordsA = a.split(/\s+/);
    const wordsB = b.split(/\s+/);
    let matches = 0;

    for (const w of wordsA) {
        if (wordsB.includes(w)) matches++;
    }

    return matches / Math.max(wordsA.length, wordsB.length);
}

// Apply personality wrapper
function applyPersonality(text) {
    const style = personalities[settings.personality] || personalities.neutral;
    const output = style(text);
    remember("ai", output);
    return output;
}

// Main AI function
export function generateReply(message) {
    remember("user", message);

    const lang = translations[settings.language] || translations.en;
    const msg = message.toLowerCase().trim();

    // Greetings
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
        return applyPersonality(lang.greeting);
    }

    // Roblox / HTTP
    if (msg.includes("httpservice")) {
        return applyPersonality("HttpService lets Roblox send HTTP requests to websites like this one using JSON.");
    }

    if (msg.includes("roblox")) {
        return applyPersonality("Roblox detected. Are you asking about scripting, HttpService, or game design?");
    }

    // GitHub
    if (msg.includes("github")) {
        return applyPersonality("This site runs on GitHub Pages. Update the code in the repo to change my brain.");
    }

    // Help
    if (msg.includes("help")) {
        return applyPersonality("I can talk about Roblox, HttpService, GitHub, and whatever you teach me in AI/brain.js.");
    }

    // If user defined custom behavior, follow it
    if (settings.customBehavior.trim() !== "") {
        return applyPersonality(settings.customBehavior);
    }

    // Memory-based reaction
    const previousUser = memory
        .filter(m => m.role === "user")
        .slice(-2, -1)[0];

    if (previousUser && similarity(msg, previousUser.text.toLowerCase()) > 0.5) {
        return applyPersonality("You already asked something very similar earlier.");
    }

    // Default fallback
    return applyPersonality(lang.fallback);
}
