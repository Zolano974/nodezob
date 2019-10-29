function sum(a, b) {
    return a + b
}

//measure exec time : at each exec, it will take less time, because of just-in-time compilation
console.time('jit')
console.log(sum(5, 13))
console.timeEnd('jit')
