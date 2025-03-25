export const getRandomQuestions = () => {
  const programmingQuestions = [
    "What are variables, and how do you declare them in JavaScript?",
    "What is a loop, and why do we use loops in programming?",
    "What is an algorithm, and can you give a simple example?",
    "How do you write a function in Python, and why is it useful?",
    "What is an array, and how do you create one in JavaScript?",
    "What is the difference between `let`, `const`, and `var` in JavaScript?",
    "How does an `if` statement work in programming?",
    "What is a function, and how do you use it?",
    "What is the difference between `for` and `while` loops?",
    "How do you store and retrieve data in an array?",
    "What is an object in JavaScript, and how do you create one?",
    "What is debugging, and why is it important in programming?",
    "How does a simple website work using HTML, CSS, and JavaScript?",
    "What is an event in JavaScript, and how can you handle it?",
    "What is the difference between synchronous and asynchronous code?",
    "How do you print output in Python and JavaScript?",
    "What is a comment in code, and why should you use it?",
    "How do you check if one number is greater than another in JavaScript?",
    "What is a simple way to explain recursion?",
    "How do you connect to an API and get data in JavaScript?",
  ];

  const shuffled = programmingQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};
