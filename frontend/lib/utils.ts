import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

/**
 * Объединяет классы Tailwind с clsx. cn = "class names".
 * @param inputs - классы.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


/**
 * Функция для выводы разницы между датой и текущей датой.
 * @param date - дата к которой считается разница.
 * @returns строка с разницей (только что, минуту назад, 3 часа назад, 2 месяца назад).
 */
export function timeAgoString(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'только что';

  const emptyIfEqualToOne = (value: number): string => (value === 1 ? '' : value.toString());

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${emptyIfEqualToOne(diffInMinutes)} ${getRussianWord(diffInMinutes, ['минуту', 'минуты', 'минут'])} назад`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${emptyIfEqualToOne(diffInHours)} ${getRussianWord(diffInHours, ['час', 'часа', 'часов'])} назад`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${emptyIfEqualToOne(diffInDays)} ${getRussianWord(diffInDays, ['день', 'дня', 'дней'])} назад`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${emptyIfEqualToOne(diffInMonths)} ${getRussianWord(diffInMonths, ['месяц', 'месяца', 'месяцев'])} назад`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${emptyIfEqualToOne(diffInYears)} ${getRussianWord(diffInYears, ['год', 'года', 'лет'])} назад`;
}


/**
 * Функция для склонения русских слов.
 * @param number - число.
 * @param words - массив из трех русских слов разных форм.
 * `word[0]` - форма для 1 (день, час, минута).
 * `word[1]` - форма для 2-4 (дня, часа, минуты).
 * `word[2]` - форма для 5-20 (дней, часов, минут).
 * Зачастую выходит как [ед_число, род_падеж, мн_число].
 */
export function getRussianWord(number: number, words: [string, string, string]) {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[Math.min(number % 10, 5)]
    ];
}
