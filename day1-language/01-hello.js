"use strict";

/**
 * Bidon function
 * @param {string} name Input
 * @return {string} Output message*/
function hello(name) {
  return `Hello, ${name}`;
}

const names = ["Yo", "Lo", "Li", "Lu"];

for (const n of names) {
  console.log(hello(n));
}

