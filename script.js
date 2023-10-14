const $cResult = document.querySelector(".c_result");
const $cInput = document.querySelector(".c_input");

let problem = "";
let result = null;
let ans = null;
let cd = 0;

function calculator(problem) {
  console.log(problem);
  let aProblem = problem.split(" ");
  console.log(aProblem);
  let pLength = aProblem.length;
  if (pLength <= 1) return aProblem[0];
  if (aProblem[pLength - 1] === "") return;

  let [n1, operation, n2] = aProblem;

  console.log(operate(n1, n2, operation));
  return operate(n1, n2, operation);
}

function operate(n1, n2, operation) {
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  const obj = {
    "+": n1 + n2,
    "-": n1 - n2,
    "*": n1 * n2,
    "/": n1 / n2,
  }[operation];

  return obj;
}

let clicked = (e) => {
  const aim = e.target.classList;

  if (aim.contains("number") && !aim.contains("ans")) {
    problem += e.target.innerHTML;
  }

  if (aim.contains("operation") && !aim.contains("no")) {
    if (cd === 0) {
      problem += " " + e.target.innerHTML + " ";
      cd = 1;
    } else {
      result = calculator(problem);

      if (result === undefined) {
        problem = problem;
      } else {
        $cResult.innerHTML = result;

        problem = "";
        problem += result + " " + e.target.innerHTML + " ";
        ans = result;

        result = null;
      }
    }
  }

  if (aim.contains("equals")) {
    result = calculator(problem);
    console.log(result);

    if (result === undefined && typeof result !== "number") {
      $cResult.innerHTML = "";
    } else {
      $cResult.innerHTML = result;
    }

    ans = result;
    problem = result + "";
    result = null;
    cd = 0;
  }

  if (aim.contains("delete_all")) {
    problem = "";
    result = null;

    $cResult.innerHTML = result;
    cd = 0;
  }

  if (aim.contains("delete_one")) {
    let one = problem.slice(0, -1);
    let two = problem.slice(0, -2);
    let l = problem.length;

    if (problem === "") cd = 0;

    if (problem[l - 1] === " ") {
      problem = two;
    } else {
      problem = one;
    }
  }

  if (aim.contains("ans")) {
    if (ans === null) {
      ans = "";
    }
    problem = "";
    problem += ans;
  }

  console.log(problem);
  $cInput.innerHTML = problem;
};

document.addEventListener("click", clicked);
