
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------
const myQuestions = [
  {
    question: "Reciprocating pump is a positive displacement pump(say true or false)",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "a"
  },

  {
    question: "A reciprocating pump is suitable for less discharge and higher heads. (Say true or false)",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "a"
  },

  {
    question: "Is priming required for reciprocating pump?( Say Yes/ No)",
    answers: {
      a: "Yes",
      b: "No"
    },
    correctAnswer: "b"
  },
  {
    question: "In a reciprocating pump, air vessels are used to",
    answers: {
      a: "Smoothen the flow",
      b: "Reduce suction head",
      c: "Increase delivery head",
      d: "Reduce acceleration head"
    },
    correctAnswer: "d"
  },
  {
    question: "The relation between hydraulic efficiency &eta;<sub>h</sub>, mechanical efficiency &eta;<sub>m</sub> and overall efficiency &eta;<sub>o</sub> is",
    answers: {
      a: "&eta;<sub>h</sub> = &eta;<sub>o</sub> * &eta;<sub>m</sub>",
      b: "&eta;<sub>m</sub> = &eta;<sub>o</sub> * &eta;<sub>h</sub>",
      c: "&eta;<sub>o</sub> = &eta;<sub>h</sub> * &eta;<sub>m</sub>",
      d: "None of the above"
    },
    correctAnswer: "d"
  }
];



// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
