const BigNumber = require('bignumber.js').default;

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN });

const times = 10 ** 8;

/**
 * @param {BigNumber} a
 */
const testFunc = (a) => +a / 100;

/**
 * @param {BigNumber} a
 */
const baseline = (a) => a.div(100);

let num = new BigNumber(1);

let max = new BigNumber(999999);

let wrongCount = new BigNumber(0);

// 0.01的取值及toFixed为2意在校验常规价格显示场景下土炮方法是否可信

let minWrong;
let maxWrong;

while (num.lte(max)) {
  num = num.plus(1);
  const expected = baseline(num).toFixed(2);
  const actual = new BigNumber(testFunc(num)).toFixed(2);
  if (expected !== actual) {
    wrongCount = wrongCount.plus(1);

    // 只console一次意在保留
    // console.log(`expected: ${+baseline(num)}, actual: ${+testFunc(num)}`);
    console.log(`expected: ${expected}, actual: ${actual}`);
    if (minWrong === undefined) {
      minWrong = num.toFixed(2);
    }
    maxWrong = num.toFixed(2);
  }
}

if (wrongCount.isZero()) {
  console.log('all pass');
} else {
  console.log(`total wrong: ${wrongCount}, min: ${minWrong}, max: ${maxWrong}`);
}
