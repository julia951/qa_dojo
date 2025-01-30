import { test, expect, Page } from "@playwright/test";

/* 

1) Створіть функцію, яка використовує проміс для імітації затримки у 2 секунди перед поверненням значення.
Вимоги:

• Створіть функцію waitForTwoSeconds(), яка повертає проміс, що вирішується через 2 секунди.
• Після виконання проміса функція повинна вивести в консоль повідомлення “2 секунди пройшло!”.

*використовуйте setTimeout()
*/

/* function waitForTwoSeconds(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("2 секунди пройшло!");
        }, 2000);
    });
}

waitForTwoSeconds().then((message) => console.log(message)); */

/*

2) Створіть три функції, кожна з яких повертає проміс, що виконується через випадковий час (від 1 до 3 секунд). 
Використайте Promise.all, щоб дочекатися виконання всіх промісів.
Вимоги:

•Створіть три функції: task1(), task2(), task3().
•Кожна з цих функцій повинна повертати проміс із випадковою затримкою (1-3 секунди).
•Використайте Promise.all, щоб дочекатися виконання всіх промісів і вивести в консоль повідомлення, що всі завдання виконано.

*/

/* function task1(): Promise<string> {

    const delay = Math.floor(Math.random() * 3 + 1) * 1000; 
    console.log ("Перша затримка - " + delay);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("task1 done");
        }, 2000);
    });
}

function task2(): Promise<string> {

    const delay = Math.floor(Math.random() * 3 + 1) * 1000; 
    console.log ("Друга затримка - " + delay);


    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("task2 done");
        }, delay);
    });
}

function task3(): Promise<string> {

    const delay = Math.floor(Math.random() * 3 + 1) * 1000; 
    console.log ("Третя затримка - " + delay);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("task3 done");
        }, delay);
    });
}

Promise.all([task1(), task2(), task3()])
    .then(() => {
        console.log('All tasks completed');
    })
    .catch((error) => {
        console.error('An error occurred', error);
    }); */


/*
3) Є функція, що використовує проміси для отримання даних про користувача з серверу. 
  Перетворіть її на функцію, яка використовує async/await.
*/

function getUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "John", age: 30 });
        }, 1000);
    });
}


getUserData()
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        console.error(error);
    });

////////////////////////////////

async function displayUserData() {
    try {
        const user = await getUserData();
        console.log(user);
    } catch (error) {
        console.error(error);
    }
}

displayUserData();


// 4) погратись з https://www.jsv9000.app/ виконайте всі запропоновані дії і подивіться як відпрацьовує івентлуп