const questions = [
  {
    question: "Choose one of the three movies",
    options: [
      { id: "Navidad", image: "images/homealone.jpg", title: "Home Alone" },
      { id: "Disney", image: "images/inside-out.jpg", title: "Inside Out" },
      { id: "Amor", image: "images/10things.jpg", title: "10 Things i hate about you" },
    ],
  },
  {
    question: "Which one do you like the most?",
    options: {
      Navidad: [
        { image: "images/christmas.jpg", title: "A Christmas Carol" },
        { image: "images/grinch.jpg", title: "El Grinch" },
        { image: "images/guardians.jpg", title: "Rise Guardians" },
      ],
      Amor: [
        { image: "images/mebeforeyou.jpg", title: "Me before you" },
        { image: "images/proposal.jpg", title: "The Proposal" },
        { image: "images/notebook.jpg", title: "The Notebook" },
      ],
      Disney: [
        { image: "images/coco.jpeg", title: "Coco" },
        { image: "images/soul.jpeg", title: "Soul" },
        { image: "images/hero-6.jpeg", title: " Big Hero 6" },
      ],
    },
  },
  {
    question: "Which one do you want to watch now?",
    options: {
      Navidad: [
        { image: "images/klaus.jpg", title: "Klaus" },
        { image: "images/tnbc.jpg", title: "The Nightmare Before Christmas" },
        { image: "images/falling-for-christmas.jpg", title: "Falling for Christmas" },
      ],
      Amor: [
        { image: "images/lalaland.jpg", title: "La La Land" },
        { image: "images/The_Kissing.png", title: "The Kissing booth" },
        { image: "images/love-rosie.jpg", title: "Love, Rosie" },
      ],
      Disney: [
        { image: "images/encanto.jpeg", title: "Encanto" },
        { image: "images/moana.png", title: "Moana" },
        { image: "images/Luca.jpeg", title: "Luca" },
      ],
    },
  },
];

const questionTexts = [
  "Question 1",
  "Question 2",
  "Question 3",
];

let currentQuestionIndex = 0;
let selectedAnswers = []; 

function updateProgressBar() {
  const steps = document.querySelectorAll(".step");

  steps.forEach((step, index) => {
    if (index === currentQuestionIndex) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}

//Actualizo el contador de preguntas de la parte superior
function updateQuestionCounter() {
  const questionCounter = document.getElementById("question-counter");
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questionTexts.length}`;

  const steps = document.querySelectorAll(".step");
  steps.forEach((step, index) => {
    if (index <= currentQuestionIndex) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}

function selectMovie(index) {
  if (index >= 0 && index < questionTexts.length) {
    currentQuestionIndex = index;
    updateQuestionCounter(); 
  }
}

updateQuestionCounter();

document.querySelectorAll(".option-card").forEach((card, index) => {
  card.addEventListener("click", () => selectMovie(index));
});

function handleAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  const options =
    currentQuestionIndex === 0
      ? currentQuestion.options
      : currentQuestion.options[selectedAnswers[0].id];

  const selected = options.find(
    (option) => option.id === selectedOption || option.image === selectedOption
  );

  selectedAnswers.push({ id: selectedOption, title: selected.title });
  currentQuestionIndex++;
  updateProgressBar(); 
  updateQuestionCounter();
  renderQuestion();
}

function renderQuestion() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  if (currentQuestionIndex < questions.length) {
    document.getElementById("progress-bar").style.display = "flex";
    
    const currentQuestion = questions[currentQuestionIndex];
    const questionText = document.createElement("h1");
    questionText.textContent = currentQuestion.question;
    app.appendChild(questionText);

    const options =
      currentQuestionIndex === 0
        ? currentQuestion.options
        : currentQuestion.options[selectedAnswers[0].id];

    options.forEach((option) => {
      const optionCard = document.createElement("div");
      optionCard.className = "option-card";

      const image = document.createElement("img");
      image.src = option.image;
      image.alt = "Movie option";

      optionCard.appendChild(image);
      optionCard.onclick = () => handleAnswer(option.id || option.image);
      app.appendChild(optionCard);
    });
  } else {
    // Oculto la barra de progreso y el contador
    document.getElementById("progress-bar").style.display = "none";
    renderFinalPage();
  }
  updateProgressBar();
}

function renderFinalPage() {
  const finalMovie = selectedAnswers[selectedAnswers.length - 1];
  const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(finalMovie.title)}`;

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="final-message">
      <h1 class="main-title">WATCH NEW MOVIES FOR FREE!</h1>
      <p>Watch any movies online for free without ads!</p>
      <p>Have fun watching your favorite movies!</p>
    </div>
    <button onclick="window.open('${imdbUrl}', '_blank')">¡Ver en IMDB!</button>
  `;

  updateProgressBar();
  updateQuestionCounter();
}

document.addEventListener("DOMContentLoaded", renderQuestion);
