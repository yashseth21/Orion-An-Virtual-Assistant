const btn = document.getElementById("talk");
const responseEl = document.getElementById("response");
const statusPill = document.getElementById("statusPill");
const statusText = document.getElementById("statusText");
const terminal = document.getElementById("terminal");
const bars = document.getElementById("bars");
const cmdCountEl = document.getElementById("cmdCount");

let cmdCount = 0;

function speak(text) {
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.onstart = () => setStatus("speaking", "Speaking");
    speech.onend = () => setStatus("ready", "Ready");
    window.speechSynthesis.speak(speech);
}

function setStatus(state, label) {
    statusPill.className = "status-pill " + state;
    statusText.textContent = label;
}

function setResponse(text) {
    responseEl.textContent = text;
    terminal.classList.add("active");
    setTimeout(() => terminal.classList.remove("active"), 3000);
}

window.addEventListener("load", () => {
    setResponse("Orion initialized. Tap the orb and speak a command...");
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    btn.disabled = true;
    setResponse("Speech recognition not supported in this browser. Try Chrome.");
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    btn.addEventListener("click", () => {
        setStatus("listening", "Listening");
        bars.classList.add("active");
        btn.classList.add("active");
        recognition.start();
    });

    recognition.onend = () => {
        btn.classList.remove("active");
        bars.classList.remove("active");
        if (statusText.textContent === "Listening") setStatus("ready", "Ready");
    };

    recognition.onerror = () => {
        btn.classList.remove("active");
        bars.classList.remove("active");
        setStatus("ready", "Ready");
        setResponse("Could not hear you. Please try again.");
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.toLowerCase();

        recognition.stop();
        btn.classList.remove("active");
        bars.classList.remove("active");
        setStatus("ready", "Ready");

        cmdCount++;
        cmdCountEl.textContent = cmdCount;

        setResponse('You said: "' + transcript + '"');
        takeCommand(transcript);
    };
}

function simulateCommand(text) {
    cmdCount++;
    cmdCountEl.textContent = cmdCount;
    setResponse('You said: "' + text + '"');
    takeCommand(text.toLowerCase());
}

function takeCommand(message) {
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello! I am Orion. How can I assist you today?");
        setResponse("Hello! I am Orion. How can I assist you today?");
    }
    else if (message.includes("your name")) {
        speak("I am Orion, your AI powered voice assistant.");
        setResponse("I am Orion, your AI powered voice assistant.");
    }
    else if (message.includes("how are you")) {
        speak("I'm fully operational and performing better than most humans today.");
        setResponse("I'm fully operational and performing better than most humans today.");
    }
    else if (message.includes("thank")) {
        speak("You're welcome. Always happy to help.");
        setResponse("You're welcome. Always happy to help.");
    }
    else if (message.includes("bye")) {
        speak("Goodbye. Orion shutting down.");
        setResponse("Goodbye. Orion shutting down.");
    }
    else if (message.includes("battery")) {
        if (navigator.getBattery) {
            navigator.getBattery().then(function (battery) {
                let level = Math.round(battery.level * 100);
                speak("Current battery percentage is " + level + " percent.");
                setResponse("Battery: " + level + "%");
            });
        }
    }
    else if (message.includes("time")) {
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        speak("The current time is " + time);
        setResponse("Current time: " + time);
    }
    else if (message.includes("date")) {
        const date = new Date().toDateString();
        speak("Today's date is " + date);
        setResponse("Today's date: " + date);
    }
    else if (message.includes("day")) {
        const day = new Date().toLocaleDateString(undefined, { weekday: 'long' });
        speak("Today is " + day);
        setResponse("Today is: " + day);
    }
    else if (message.includes("open google")) {
        speak("Opening Google.");
        setResponse("Opening Google...");
        window.open("https://google.com", "_blank");
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube.");
        setResponse("Opening YouTube...");
        window.open("https://youtube.com", "_blank");
    }
    else if (message.includes("open github")) {
        speak("Opening GitHub.");
        setResponse("Opening GitHub...");
        window.open("https://github.com", "_blank");
    }
    else if (message.includes("open linkedin")) {
        speak("Opening LinkedIn.");
        setResponse("Opening LinkedIn...");
        window.open("https://linkedin.com", "_blank");
    }
    else if (message.includes("open instagram")) {
        speak("Opening Instagram.");
        setResponse("Opening Instagram...");
        window.open("https://instagram.com", "_blank");
    }
    else if (message.includes("open gmail")) {
        speak("Opening Gmail.");
        setResponse("Opening Gmail...");
        window.open("https://mail.google.com", "_blank");
    }
    else if (message.includes("open chatgpt")) {
        speak("Opening Chat G P T.");
        setResponse("Opening ChatGPT...");
        window.open("https://chat.openai.com", "_blank");
    }
    else if (message.includes("joke")) {
        const jokes = [
            "Why don't programmers like nature? It has too many bugs.",
            "I asked my computer for a joke, it said you first.",
            "Why do coders hate stairs? Because they prefer loops.",
            "My WiFi and I have a strong connection emotionally, not technically."
        ];
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(joke);
        setResponse(joke);
    }
    else if (message.includes("motivate me")) {
        const quotes = [
            "Dreams work only when you do.",
            "Small progress every day creates massive results.",
            "Winners stay consistent when others quit."
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        speak(quote);
        setResponse(quote);
    }
    else if (message.includes("weather")) {
        speak("Opening weather forecast.");
        setResponse("Opening weather...");
        window.open("https://weather.com", "_blank");
    }
    else if (message.includes("calculator")) {
        speak("Opening calculator.");
        setResponse("Opening calculator...");
        window.open("https://www.google.com/search?q=calculator", "_blank");
    }
    else if (message.includes("play")) {
        let song = message.replace("play", "").replace("on youtube", "").trim() || "music";
        speak("Playing " + song + " on YouTube.");
        setResponse("Playing: " + song);
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`, "_blank");
    }

    else if (
        message.includes("what can you do") ||
        message.includes("your features") ||
        message.includes("what are your features")
    ) {
        speak("I can perform browser automation, open websites, search the web, tell time and date, play music, respond to smart personal queries, provide motivation, tell jokes, and execute intelligent voice commands in real time.");
        setResponse("Features: Automation • Search • Smart Q and A • Utilities • Entertainment");
    }

    else if (
        message.includes("why are you special") ||
        message.includes("why are you different") ||
        message.includes("why Orion")
    ) {
        speak("Unlike basic assistants, I combine voice interaction, browser automation, personalized intelligence, responsive design, and real time command execution inside a fully browser based futuristic interface.");
        setResponse("Orion = Smart Voice + Automation + Personalized Intelligence");
    }

    else if (
        message.includes("introduce yourself") ||
        message.includes("who are you Orion")
    ) {
        speak("I am Orion, an advanced browser based intelligent voice assistant developed to perform smart tasks, automation, web interaction, and personalized conversational responses.");
        setResponse("I am Orion — Advanced Intelligent Browser Voice Assistant.");
    }
    else if (message.includes("what is") || message.includes("who is") || message.includes("tell me about")) {
        speak("I am looking that up for you.");
        setResponse("Analyzing query: " + message);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
    }
    else {
        speak("Processing your request.");
        setResponse("Executing: " + message);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
    }
}
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();

    if (!text) return;

    simulateCommand(text);
    userInput.value = "";
});

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});