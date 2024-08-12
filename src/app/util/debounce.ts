export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  } as T;
}
