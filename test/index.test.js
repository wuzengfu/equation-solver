const execute = require("../logic/index");

const testExecute = (expression, expectedOutput) => () => {
  expect(execute(expression)).toBe(expectedOutput);
};

describe("Addition Only", () => {
  test("1 + 2 = 3", testExecute("1+2", 3));
  test("-2 + 5 = 3", testExecute("-2+5", 3));
  test("2 + 4 + 1 + 0 + 0 + 9 = 16", testExecute("2+4+1+0+0+9", 16));
});

describe("Subtraction Only", () => {
  test("1 - 2 = -1", testExecute("1-2", -1));
  test("-2 - 3 = -3", testExecute("-2-3", -5));
  test("-2 - 3 - 1 - 10 - 0 - 6", testExecute("-2-3-1-10-0-6", -22));
});

describe("Multiplication Only", () => {
  test("3 * 5 = 15", testExecute("3*5", 15));
  test("3 * 0 * 5 = 0", testExecute("3*0*5", 0));
  test("-3 * 5 = -15", testExecute("-3*5", -15));
  test("1 * 3 * 7 * 2 = 42", testExecute("1*3*7*2", 42));
});

describe("Division Only", () => {
  test("3 / 5 = 0.6", testExecute("3/5", 0.6));
  test("0 / 5 = 0", testExecute("0/5", 0));
  test("10 / 2 / 5 = 1", testExecute("10/2/5", 1));
  test("-10 / 2 / 5 = -1", testExecute("-10/2/5", -1));
  test("10 / 0", testExecute("10/0", Infinity));
});

describe("Compound Operations", () => {
  test("5 * 3 + 9 = 24", testExecute("5*3+9", 24));
  test("5 * 3 / 5 + 9 * 2 = 21", testExecute("5*3/5+9*2", 21));
  test("3 - 2 * 2 + 5 * 3 = 14", testExecute("3 - 2 * 2 + 5 * 3", 14));
});

describe("Operations with brackets", () => {
  test("3 * (-5) = -15", testExecute("3*(-5)", -15));
  test("(5 + 3) * 2 = 16", testExecute("(5+3)*2", 16))
  test("((5 + 3) * 2) = 16", testExecute("((5 + 3) * 2)", 16))
  test("3 * ((5 + 3) * 2) + 2 = 96", testExecute("3 * ((5 + 3) * 2) * 2", 96))
  test("(-3 * (-1) + 2) / ((2 + 2) * (5/4)) = 1", testExecute("(-3 * (-1) + 2) / ((2 + 2) * (5/4))", 1))
});
