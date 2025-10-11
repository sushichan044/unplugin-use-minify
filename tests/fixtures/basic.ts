export function calculateUserScore(baseScore: number) {
  "use minify";

  const multiplier = 2;
  const bonusPoints = 50;

  console.log("Calculating user score...");

  const intermediateResult = baseScore * multiplier;
  const finalScore = intermediateResult + bonusPoints;

  return finalScore;
}

export const processUserData = (userData: {
  age: number;
  firstName: string;
  lastName: string;
}) => {
  "use minify";

  const firstName = userData.firstName;
  const lastName = userData.lastName;
  const age = userData.age;

  const fullName = firstName + " " + lastName;

  if (age >= 18) {
    console.log("Adult user:", fullName);
    return { fullName, isAdult: true };
  } else {
    console.log("Minor user:", fullName);
    return { fullName, isAdult: false };
  }
};

export const formatMessage = (messageType: string, messageContent: string) => {
  "use minify";

  const prefix = "[Message]";
  const separator = " - ";
  const timestamp = Date.now();

  const formattedMessage =
    prefix + separator + messageType + separator + messageContent;

  console.log("Timestamp:", timestamp);
  console.log("Formatted:", formattedMessage);

  return {
    message: formattedMessage,
    timestamp: timestamp,
    type: messageType,
  };
};

// Unminified function for control comparison
export function normalFunction() {
  const someVariable = "this will not be minified";
  const anotherVariable = "neither will this";

  console.log(someVariable);
  console.log(anotherVariable);

  return someVariable + " " + anotherVariable;
}

// Async function declaration with "use minify"
export async function fetchUserData(userId: number) {
  "use minify";

  const apiEndpoint = "https://api.example.com/users/";
  const url = apiEndpoint + userId;

  console.log("Fetching user data from:", url);

  const response = await fetch(url);
  const userData = await response.json();

  return userData;
}

// Async arrow function with "use minify"
export const processAsyncData = async (data: string[]) => {
  "use minify";

  const prefix = "processed-";
  const results = [];

  console.log("Processing data...");

  for (const item of data) {
    const processedItem = prefix + item;
    results.push(processedItem);
    await new Promise((resolve) => setTimeout(resolve, 10));
  }

  console.log("Processing complete");

  return results;
};

// Nested function with "use minify" on inner function
export function outerFunction(value: number) {
  "use minify";

  const outerConstant = 100;
  const multipliedValue = value * outerConstant;

  console.log("Outer function processing");

  function innerFunction(innerValue: number) {
    "use minify";

    const innerConstant = 10;
    const result = innerValue + innerConstant;

    console.log("Inner function processing");

    return result;
  }

  const innerResult = innerFunction(multipliedValue);

  return innerResult;
}

// Arrow function with implicit return (no BlockStatement)
// This should NOT be minified as it lacks BlockStatement
export const implicitReturnArrow = (x: number) => x * 2;

// Function expression with "use minify"
// Note: Currently not handled by Visitor (only FunctionDeclaration and ArrowFunctionExpression)
// This should NOT be minified unless Visitor is updated
export const functionExpression = function (value: number) {
  "use minify";

  const multiplier = 5;
  const offset = 20;

  console.log("Function expression processing");

  const result = value * multiplier + offset;

  return result;
};
