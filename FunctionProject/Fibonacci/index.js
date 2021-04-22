var bigInt = require("big-integer");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = context.req.query.nth;
    let answer = bigInt.zero;
    let memo = {};

    function fib(n, a = bigInt.zero, b = bigInt.one) {
        if (n in memo) return memo[n];
        if (n == 0) {
            memo[n] = a;
            return a;
        }
        if (n == 1) {
            memo[n] = b;
            return b;
        }
        return memo[n] = fib(n - 1, b, a.add(b));
    }

    answer = fib(nth);

    context.res = {
        body: answer.toString()
    };
}