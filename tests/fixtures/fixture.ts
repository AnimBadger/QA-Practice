import { test as base } from "@playwright/test";

type MyFixture = {
  helloWorld: string;
  greatDay: string;
};

type WorkerFixture = {
  // worker scope fixture properties
  cupOfCoffee: string;
};
export const test = base.extend<MyFixture, WorkerFixture>({
  helloWorld: async ({}, use) => {
    console.log("Hello, World 1!");
    const myWorld = "from the fixture";
    await use(myWorld);
    console.log("Hello, World! Goodbye");
  },
  greatDay: async ({ helloWorld }, use) => {
    console.log(helloWorld);
    const myGreatDay = "Have a great day love!";
    await use(myGreatDay);
    console.log("Have a great day! Goodbye");
  },
  // worker scope fixture
  cupOfCoffee: [
    async ({}, use, workerInfo) => {
      console.log("Making a cup of coffee...");
      const coffee = `Coffee for worker ${workerInfo.workerIndex}`;
      await use(coffee);
    },
    { scope: "worker" },
  ],
});
