const preprocess = (expression) => {
  expression = expression.replaceAll(" ", "");
  if (expression[0] == "-") {
    expression = "0" + expression;
  }
  return expression;
};

const getIndexOfNextPairedBracket = (i, expression) => {
  let count = 0;

  for (; i < expression.length; i++) {
    const c = expression[i];
    if (c == ")") {
      if (count == 0) {
        return i;
      }
      count--;
    } else if (c == "(") {
      count++;
    }
  }

  // TODO: Missing bracket exception
  return -1;
};

const execute = (expression) => {
  expression = preprocess(expression);
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
        const num1 = operandStack.pop() ?? 0;
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
        const indexOfNextRightBracket = getIndexOfNextPairedBracket(
          i + 1,
          expression
        );
        numString =
          execute(expression.substring(i + 1, indexOfNextRightBracket)) + "";
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
