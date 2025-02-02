/* Promise — це об'єкт, який представляє результат асинхронної операції. Він може бути успішно виконаний (fulfilled), відхилений (rejected) або залишатися в стані очікування (pending), і дозволяє обробляти асинхронний код в зручний і структурований спосіб.

Основні стани промісу:
1. Pending (Очікування): Початковий стан, коли проміс ще не завершився.
2. Fulfilled (Виконано): Операція завершилася успішно, і проміс передає результат.
3. Rejected (Відхилено): Операція завершилася з помилкою, і проміс передає причину відхилення.


Проміси створюються через конструктор new Promise(), який приймає функцію з двома аргументами: resolve (для успіху) і reject (для помилки).

1. `then(onFulfilled)`
   - Викликається, коли проміс переходить у стан "fulfilled".
   - Параметр onFulfilled — це функція, яка виконується з результатом промісу.

   myPromise.then((result) => {
     console.log(result);  // Виконається при успіху
   });
   
2. `catch(onRejected)`
   - Викликається, коли проміс переходить у стан "rejected".
   - Параметр onRejected — це функція, яка виконується у випадку помилки.

   myPromise.catch((error) => {
     console.log(error);  // Виконається при помилці
   });

3. `finally(onFinally)`
   - Викликається незалежно від результату (успіх або помилка).

   myPromise.finally(() => {
     console.log('Операція завершена');
   });

Вбудовані методи для роботи з промісами:

1. `Promise.resolve(value)`
   - Створює проміс, який негайно переходить у стан "fulfilled" з переданим значенням.
   
   Promise.resolve('Успіх').then(console.log);  // Виведе "Успіх"
   

2. `Promise.reject(reason)`
   - Створює проміс, який негайно переходить у стан "rejected" з переданою причиною.

   Promise.reject('Помилка').catch(console.error);  // Виведе "Помилка"
   
3. `Promise.all(promises)`
   - Повертає проміс, який виконається, коли всі проміси в масиві завершаться. 
   Якщо хоча б один із промісів буде відхилено, весь Promise.all буде відхилено.


   Promise.all([promise1, promise2]).then(console.log).catch(console.error);
   

4. `Promise.allSettled(promises)`
   - Повертає проміс, який виконається, коли всі проміси в масиві завершаться незалежно від результату. 
   Повертає масив об'єктів із статусом кожного промісу.

   Promise.allSettled([promise1, promise2]).then(console.log);
   

5. `Promise.race(promises)`
   - Повертає проміс, який завершиться з результатом першого виконаного промісу з масиву.

   Promise.race([promise1, promise2]).then(console.log).catch(console.error);
   

6. `Promise.any(promises)`
   - Повертає проміс, який завершиться з результатом першого успішного промісу. 
   Якщо всі проміси будуть відхилені, повертає помилку AggregateError.
   
   Promise.any([promise1, promise2]).then(console.log).catch(console.error); */