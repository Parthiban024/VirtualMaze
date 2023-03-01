const paragraph = document.getElementById("paragraph");
const input = document.getElementById("input");
const wpm = document.getElementById("wpm");
const mistakes = document.getElementById("mistakes");

let startTime, endTime;
let correctWords = 0, incorrectWords = 0;

// split the paragraph into an array of words
const paragraphWords = paragraph.innerText.trim().split(" ");

input.addEventListener("focus", () => {
  // reset variables when the user starts typing
  startTime = new Date();
  correctWords = 0;
  incorrectWords = 0;
});

input.addEventListener("input", () => {
  const inputWords = input.value.trim().split(" ");

  for (let i = 0; i < inputWords.length; i++) {
    if (inputWords[i] === paragraphWords[i]) {
      // mark correct words with green background
      input.classList.remove("incorrect");
      input.classList.add("correct");
      correctWords++;
    } else {
      // mark incorrect words with red background
      input.classList.remove("correct");
      input.classList.add("incorrect");
      incorrectWords++;
    }
  }

  if (inputWords.length === paragraphWords.length && incorrectWords === 0) {
    // calculate typing speed and display results
    endTime = new Date();
    const totalTime = (endTime - startTime) / 1000;
    const totalWords = inputWords.length;
    const wpmResult = Math.round(totalWords / totalTime * 60);
    const mistakesResult = incorrectWords;
    wpm.innerText = `Words per minute: ${wpmResult}`;
    mistakes.innerText = `Mistakes: ${mistakesResult}`;
  }
});

input.addEventListener("blur", () => {
  if (input.value.trim() === "") {
    // reset input background color
    input.classList.remove("correct");
    input.classList.remove("incorrect");
  }
});

input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    // calculate typing speed and display results
    const inputWords = input.value.trim().split(" ");
    const totalWords = inputWords.length;
    const mistakesResult = incorrectWords;
    if (totalWords > 0) {
      endTime = new Date();
      const totalTime = (endTime - startTime) / 1000;
      const wpmResult = Math.round(totalWords / totalTime * 60);
      wpm.innerText = `Words per minute: ${wpmResult}`;
    } else {
      wpm.innerText = "";
    }
    mistakes.innerText = `Mistakes: ${mistakesResult}`;
  }
});
