const categories = {
    anime: [
        {
            question: "Who is the protagonist of 'Naruto'?",
            options: ["Naruto Uzumaki", "Sasuke Uchiha", "Kakashi Hatake"],
            answer: "Naruto Uzumaki",
        },
        // Add more anime questions here
    ],
    movies: [
        {
            question: "Who played the role of Iron Man in the Marvel Cinematic Universe?",
            options: ["Chris Hemsworth", "Robert Downey Jr.", "Chris Evans"],
            answer: "Robert Downey Jr.",
        },
        // Add more movie questions here
    ],
    // Repeat this structure for other categories
};

let currentCategory;
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentCategory = document.getElementById("category").value;
    document.getElementById("category-selection").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const currentQuestion = categories[currentCategory][currentQuestionIndex];
    
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    
    currentQuestion.options.forEach((option) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.addEventListener("click", () => checkAnswer(option));
        optionsElement.appendChild(optionButton);
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = categories[currentCategory][currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < categories[currentCategory].length) {
        loadQuestion();
    } else {
        showReview();
    }
}

function showReview() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("review").style.display = "block";

    const reviewElement = document.getElementById("review");
    reviewElement.innerHTML = `
        <h2>Review</h2>
        <p>You scored ${score} out of ${categories[currentCategory].length}.</p>
        <p>Would you like to leave a review?</p>
        <textarea id="reviewTextarea" rows="4" cols="50"></textarea><br>
        <button onclick="restartQuiz()">Restart</button>
        <button onclick="submitReview()">Submit Review</button>
    `;
}

function submitReview() {
    const reviewText = document.getElementById("reviewTextarea").value;
    // You can implement code here to send the review to your server or perform other actions.
    // For simplicity, we'll just log it to the console.
    console.log("User Review:", reviewText);
    restartQuiz();
}


function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("category-selection").style.display = "block";
    document.getElementById("review").style.display = "none";
}
