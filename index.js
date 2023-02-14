// packages needed for this application
const fs = require('fs');
const readline = require('readline');

const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questionToBuild = (question) => {
  return new Promise((resolve) => {
    userInput.question(question, (answer) => {
      resolve(answer);
    });
  });
};

