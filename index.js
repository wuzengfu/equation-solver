const preprocess = (expression) => {
  expression = expression.replaceAll(" ", "");
  if (expression[0] == "-") {
    expression = "0" + expression;
  }
  return expression;
};

const execute = (expression) => {
  let operatorStack = [];
  let operandStack = [];

  for (let i = 0; i < expression.length; i++) {
    const c = expression[i];
    if (["("].includes(c)) {
      operatorStack.push(c);
    } else if ([")"].includes(c)) {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] != "("
      ) {
        const num2 = operandStack.pop();
        const num1 = operandStack.pop();
        const operator = operatorStack.pop();
        if (operator == "+") {
          operandStack.push(num1 + num2);
        } else if (operator == "-") {
          operandStack.push(num1 - num2);
        }
      }
      operatorStack.pop();
    } else if (["+", "-"].includes(c)) {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] != "("
      ) {
        const num2 = operandStack.pop();
        const num1 = operandStack.pop();
        const operator = operatorStack.pop();
        if (operator == "+") {
          operandStack.push(num1 + num2);
        } else if (operator == "-") {
          operandStack.push(num1 - num2);
        }
      }
      operatorStack.push(c);
    } else if (["*", "/"].includes(c)) {
      const num1 = operandStack.pop();
      let numString = "";
      i++;
      if (expression[i] == "(") {
        const indexOfNextRightBracket = expression.indexOf(")", i + 1);
        numString = execute(
          expression.substring(i + 1, indexOfNextRightBracket)
        );
        i = indexOfNextRightBracket + 1;
      }
      while (
        i < expression.length &&
        !["+", "-", "*", "/", "(", ")"].includes(expression[i])
      ) {
        numString += expression[i];
        i++;
      }
      i--;
      const num2 = Number(numString);
      if (c == "*") {
        operandStack.push(num1 * num2);
      } else if (c == "/") {
        operandStack.push(num1 / num2);
      }
    } else {
      let numString = c;
      i++;
      while (
        i < expression.length &&
        !["+", "-", "*", "/", "(", ")"].includes(expression[i])
      ) {
        numString += expression[i];
        i++;
      }
      i--;

      operandStack.push(Number(numString));
    }
  }

  while (operatorStack.length > 0) {
    const operator = operatorStack.pop();
    const num2 = operandStack.pop();
    const num1 = operandStack.pop();
    let result;
    if (operator == "+") {
      result = num1 + num2;
    } else if (operator == "-") {
      result = num1 - num2;
    } else {
      // TODO: handle exception
    }
    operandStack.push(result);
  }

  return operandStack.pop();
};

const evaluate = (expression) => {
  expression = preprocess(expression);
  return execute(expression);
};

module.exports = evaluate;
