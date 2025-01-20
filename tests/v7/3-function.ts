/* Перевірка оцінки

 Якщо бал >= 50 — "Тест складено". Якщо < 50 — "Тест не складено".
 */

 export function checkGrade (gradeMark: number): string {

  if (gradeMark >= 50) {
    return "Тест складено";
  } else {
    return "Тест не складено";
  }
}