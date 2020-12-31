
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
    question: "The work requirement of reciprocating pump with increase in acceleration head",
    answers: {
      a: "Increases",
      b: "Remains same",
      c: "Decreases",
      d: "None of the above"
    },
    correctAnswer: "b"
  },

  {
    question: "The positive pump has less pressure at output than centrifugal pump. (Say True or False)",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "a"
  },

  {
    question: "Slip of a reciprocating pump is defined as the",
    answers: {
      a: "Ratio of actual discharge to the theoretical discharge",
      b: "Sum of actual discharge and the theoretical discharge",
      c: "Difference of theoretical discharge and the actual discharge",
      d: "Product of theoretical discharge and the actual discharge"
    },
    correctAnswer: "c"
  },
  {
    question: "Saving of work done and power by fitting an air vessel to double acting reciprocating pump is of the order of",
    answers: {
      a: "37.2%",
      b: "38.2%",
      c: "39.2%",
      d: "84.8%"
    },
    correctAnswer: "c"
  },
  {
    question: "Reciprocating pump should be chosen in preference to centrifugal pump",
    answers: {
      a: "Large flows are to be pumped against small head",
      b: "Small flows are to be pumped against large head",
      c: "Liquids with suspended matters has to be pumped",
      d: "Hydraulic losses in pump and pipes are to be minimized"
    },
    correctAnswer: "b"
  }
];





// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
