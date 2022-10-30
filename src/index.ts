import readline from "readline";

const exponentialToDecimal = (exponential: number) => {
  let decimal = exponential.toString().toLowerCase();
  if (decimal.includes('e+')) {
    const exponentialSplitted = decimal.split('e+');
    let postfix = '';
    for (
      let i = 0; i <
      +exponentialSplitted[1] -
      (exponentialSplitted[0].includes('.') ? exponentialSplitted[0].split('.')[1].length : 0); i++
    ) {
      postfix += '0';
    }
    const addCommas = (text: any) => {
      let j = 3;
      let textLength = text.length;
      while (j < textLength) {
        text = `${text.slice(0, textLength - j)},${text.slice(textLength - j, textLength)}`;
        textLength++;
        j += 3 + 1;
      }
      return text;
    };
    decimal = addCommas(exponentialSplitted[0].replace('.', '') + postfix);
  }
  if (decimal.toLowerCase().includes('e-')) {
    const exponentialSplitted = decimal.split('e-');
    let prefix = '0.';
    for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
      prefix += '0';
    }
    decimal = prefix + exponentialSplitted[0].replace('.', '');
  }
  return decimal;
};

const f = (x: any) =>
  x.includes(".") ? x.split(".").pop().length : 0;

const startFunction = (x: number) =>
  0.3 * Math.pow(Math.E, -0.7 * Math.sqrt(x)) - 2 * Math.pow(x, 2) + 4;

const proizvFunction = (x: number) =>
  -4 * x - (0.105 * Math.pow(Math.E, -0.7 * Math.sqrt(x))) / Math.sqrt(x);

const doubleProizvFunction = (x: number) =>
  Math.pow(Math.E, -0.7 * Math.sqrt(x)) *
    (0.0525 / Math.pow(x, 3 / 2) + 0.03675 / x) -
  4;

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> Введите эпсилон и начальное приближение: ",
});

rl.prompt();
rl.on("line", (input: string) => {
  var inputs = input.split(",");
  
  var eps = Number.parseFloat(inputs[0]);
  var countAfterDot = 0;
  if (eps.toString().includes("e")) {
    countAfterDot = f(exponentialToDecimal(eps));
  } else {
    countAfterDot = f(eps.toString());
  }
  var startX = Number.parseFloat(inputs[1]);
  if (!eps || !startX) {
    console.log("Неверный ввод");
    rl.close();
    return;
  }

  var k = 0;
  var subX = 1;
  var oldX = 0;

  do {
    console.log(`Итерация ${k}:`);
    console.log(`X${k} = ${startX.toFixed(countAfterDot)}`);
    var fxn = startFunction(startX);
    console.log(`F(x${k}) = ${fxn.toFixed(countAfterDot)}`);
    var fpxn = proizvFunction(startX);
    console.log(`F\`(x${k}) = ${fpxn.toFixed(countAfterDot)}`);
    var fpxn2 = Math.pow(fpxn,2);
    console.log(`F\`(x${k})^2 = ${fpxn2.toFixed(countAfterDot)}`);
    var fppxn = doubleProizvFunction(startX);
    console.log(`F\`\`(x${k}) = ${fppxn.toFixed(countAfterDot)}`);

    if (k === 0) {
      console.log(`|X${k}-X${k}| = 0`);
    } else {
      subX = startX - oldX;
      console.log(`|X${k}-X${k - 1}| = ${subX.toFixed(countAfterDot)}`);
    }
    oldX = startX;
    var startX = startX - (2 * fxn * fpxn) / (2 * fpxn2 - fxn * fppxn);
    k++;
  } while (subX > eps);
  console.log(`\n\nX* = ${startX.toFixed(countAfterDot)}`);
  rl.close();
});
