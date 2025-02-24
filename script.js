// Blaster data
const blasters = {
    "E-11": {
        name: "E-11 Blaster Rifle",
        faction: "Empire",
        stats: { range: 3, power: 3, fire_rate: 4 },
        description: "The reliable workhorse of Imperial Stormtroopers.",
        match: "You’re a balanced fighter who thrives in any situation.",
        image: "https://via.placeholder.com/300x200?text=E-11" // Replace with real image URL
    },
    "DL-44": {
        name: "DL-44 Heavy Blaster Pistol",
        faction: "Rebels",
        stats: { range: 3, power: 5, fire_rate: 2 },
        description: "Han Solo’s iconic sidearm—packs a punch.",
        match: "You’re a bold risk-taker who ends fights fast.",
        image: "https://via.placeholder.com/300x200?text=DL-44"
    },
    "A280": {
        name: "A280 Blaster Rifle",
        faction: "Rebels",
        stats: { range: 5, power: 3, fire_rate: 3 },
        description: "A precision weapon for tactical sharpshooters.",
        match: "You’re a strategist who strikes with deadly accuracy.",
        image: "https://via.placeholder.com/300x200?text=A280"
    },
    "EE-3": {
        name: "EE-3 Carbine Rifle",
        faction: "Bounty Hunter",
        stats: { range: 4, power: 4, fire_rate: 3 },
        description: "Boba Fett’s go-to for hunting prey.",
        match: "You’re a mobile predator who hunts on your terms.",
        image: "https://via.placeholder.com/300x200?text=EE-3"
    },
    "WESTAR-35": {
        name: "WESTAR-35 Blaster Pistol",
        faction: "Mandalorians",
        stats: { range: 2, power: 4, fire_rate: 4 },
        description: "A Mandalorian favorite for close-quarters chaos.",
        match: "You’re an aggressive warrior who loves a good scrap.",
        image: "https://via.placeholder.com/300x200?text=WESTAR-35"
    }
};

// Quiz questions
const questions = [
    {
        text: "What role would you play in a Star Wars battle?",
        answers: [
            { text: "Frontline Soldier", points: { "E-11": 3, "DC-15A": 3 } },
            { text: "Stealth Operative", points: { "WESTAR-35": 3, "SE-14r": 2 } },
            { text: "Sniper/Marksman", points: { "A280": 3 } },
            { text: "Quick-Draw Duelist", points: { "DL-44": 3 } },
            { text: "Bounty Hunter", points: { "EE-3": 3 } }
        ]
    },
    {
        text: "What’s your combat style?",
        answers: [
            { text: "Heavy firepower, lots of shots", points: { "E-11": 3, "WESTAR-35": 2 } },
            { text: "One-shot-one-kill precision", points: { "A280": 3, "DL-44": 2 } },
            { text: "Close-range chaos", points: { "WESTAR-35": 3 } },
            { text: "Balanced, tactical moves", points: { "E-11": 3, "A280": 2 } }
        ]
    },
    {
        text: "What’s your top priority in a fight?",
        answers: [
            { text: "Fire rate", points: { "WESTAR-35": 3 } },
            { text: "Accuracy", points: { "A280": 3 } },
            { text: "Power", points: { "DL-44": 3 } },
            { text: "Versatility", points: { "E-11": 3 } },
            { text: "Mobility", points: { "EE-3": 3 } }
        ]
    },
    {
        text: "Pick your Star Wars faction:",
        answers: [
            { text: "Empire", points: { "E-11": 3 } },
            { text: "Rebels", points: { "A280": 3, "DL-44": 2 } },
            { text: "Bounty Hunter", points: { "EE-3": 3 } },
            { text: "Mandalorian", points: { "WESTAR-35": 3 } }
        ]
    },
    {
        text: "Preferred mission type?",
        answers: [
            { text: "Full-on assault", points: { "E-11": 3 } },
            { text: "Hit-and-run", points: { "EE-3": 3, "WESTAR-35": 2 } },
            { text: "Infiltration/Stealth", points: { "WESTAR-35": 2 } },
            { text: "Defensive holdout", points: { "A280": 3 } },
            { text: "High-stakes duels", points: { "DL-44": 3 } }
        ]
    }
];

// State
let currentQuestion = 0;
let scores = {};
let selectedAnswer = null;

// DOM elements
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const retakeBtn = document.getElementById("retake-btn");
const shareBtn = document.getElementById("share-btn");

// Initialize quiz
function startQuiz() {
    scores = Object.keys(blasters).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
    totalQuestionsSpan.textContent = questions.length;
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    currentQuestionSpan.textContent = currentQuestion + 1;
    questionText.textContent = q.text;
    answersDiv.innerHTML = "";
    selectedAnswer = null;
    nextBtn.disabled = true;

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.textContent = answer.text;
        btn.onclick = () => selectAnswer(answer, btn);
        answersDiv.appendChild(btn);
    });
}

function selectAnswer(answer, btn) {
    selectedAnswer = answer;
    nextBtn.disabled = false;
    document.querySelectorAll(".answer-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
}

function nextQuestion() {
    if (selectedAnswer) {
        for (let blaster in selectedAnswer.points) {
            scores[blaster] = (scores[blaster] || 0) + selectedAnswer.points[blaster];
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }
}

function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    const topBlaster = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    const blaster = blasters[topBlaster];

    document.getElementById("blaster-name").textContent = blaster.name;
    document.getElementById("blaster-image").src = blaster.image;
    document.getElementById("blaster-description").textContent = blaster.description;
    document.getElementById("blaster-stats").textContent = 
        `Stats - Range: ${blaster.stats.range}/5, Power: ${blaster.stats.power}/5, Rate of Fire: ${blaster.stats.fire_rate}/5`;
    document.getElementById("blaster-match").textContent = `Why it matches you: ${blaster.match}`;

    shareBtn.onclick = () => {
        const tweet = `I got the ${blaster.name}! What’s your Star Wars blaster? Take the quiz: [your-link] #MyStarWarsBlaster`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, "_blank");
    };
}

retakeBtn.onclick = () => {
    currentQuestion = 0;
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    startQuiz();
};

nextBtn.onclick = nextQuestion;

// Start the quiz
startQuiz();
