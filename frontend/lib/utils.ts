import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

/**
 * Merges Tailwind classes with clsx. cn = "class names".
 * @param inputs - Class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
