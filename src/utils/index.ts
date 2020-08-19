import { v4 as uuidv4 } from 'uuid';

export function generateId(): string {
  return uuidv4();
}

export function checkAndSwap<T>(
  arr: [boolean, boolean],
  obj: T,
  func: (obj: T, arg1: number, arg2: number) => T,
  arg1: number,
  arg2: number,
) {
  if (arr[0]) {
    obj = func(obj, arg1, arg2);
  } else if (arr[1]) {
    obj = func(obj, arg2, arg1);
  }
  return obj;
}
