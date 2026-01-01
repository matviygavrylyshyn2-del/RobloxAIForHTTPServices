// AI/brain.js

// Memory of conversation
let memory = [];

// Settings (default values)
let settings = {
    language: "en",
    personality: "neutral",
    customBehavior: ""
};

// Simple translation dictionary
const translations = {
    en: {
        fallback: "I'm not sure yet, but I'm learning.",
        greeting: "Hello! How can I help you?",
    },
    fr: {
        fallback: "Je ne suis pas encore sûr, mais j'apprends.",
        greeting: "Bonjour! Comment puis-je vous aider?",
    },
    ua: {
        fallback: "Я ще не впевнений, але я навчаюся.",
        greeting: "Привіт! Чим можу допомогти?",
    }
};

// Personalities
const personalities = {
    neutral: (text) => text,
    friendly: (text) => "😊 " + text,
    aggressive: (text) => "⚠️ " + text.toUpperCase(),
    robotic: (text) => "[SYSTEM OUTPUT]: " + text
};

// Update settings from UI
export function updateSettings(newSettings) {
    settings = { ...settings, ...newSettings };
}

// Add message to memory
function remember(role, text) {
    memory.push({ role, text });
    if (memory.length > 20) memory.shift(); // limit memory size
}

// Main AI function
export function generateReply(message) {
    remember("user", message);

    const lang = translations[settings.language] || translations.en;

    // Basic understanding
    const msg = message.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) {
        return applyPersonality(lang.greeting);
    }

    if (msg.includes("roblox")) {
        return applyPersonality("Roblox detected. Do you want help with scripting, HttpService, or something else?");
    }

    if (msg.includes("httpservice")) {
        return applyPersonality("HttpService allows Roblox to communicate with this website using JSON.");
    }

    // Custom behavior injection
    if (settings.customBehavior.trim() !== "") {
        return applyPersonality(settings.customBehavior);
    }

    // Memory-based fallback
    const lastUser = memory[memory.length - 2]?.text || "";
    if (lastUser && similarity(msg, lastUser) > 0.5) {
        return applyPersonality("You already said something similar earlier.");
    }

    // Default fallback
    return applyPersonality(lang.fallback);
}

// Apply personality
function applyPersonality(text) {
    const style = personalities[settings.personality] || personalities.neutral;
    const output = style(text);
    remember("ai", output);
    return output;
}

// Very simple similarity check
function similarity(a, b) {
    const wordsA = a.split(" ");
    const wordsB = b.split(" ");
    let matches = 0;

    for (let w of wordsA) {
        if (wordsB.includes(w)) matches++;
    }

    return matches / Math.max(wordsA.length, wordsB.length);
}
