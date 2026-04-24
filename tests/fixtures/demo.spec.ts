import { test } from "./fixture";

test("where is my candy", async ({ helloWorld, cupOfCoffee }) => {
  console.log("Where is my candy?");
  console.log(cupOfCoffee);
});

test("test name", async ({ greatDay, cupOfCoffee }) => {
  // test code here
  console.log(greatDay);
  console.log(cupOfCoffee);
});
