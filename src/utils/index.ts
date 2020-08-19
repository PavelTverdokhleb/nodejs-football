import { v4 as uuidv4 } from 'uuid';

export class Utils {
  /**
   * Function that generate id for entity.
   */
  public static generateId(): string {
    return uuidv4();
  }

  /**
   * Function that updates object based on conditions
   * @arr array of conditions;
   * @obj object to update;
   * @func function to call if condition is true;
   * @arg1 argument to pass in function;
   * @arg2 argument to pass in function;
   */
  public static checkAndSwap<T>(
    arr: [boolean, boolean],
    obj: T,
    func: (obj: T, arg1: number, arg2: number) => T,
    arg1: number,
    arg2: number,
  ): T {
    if (arr[0]) {
      obj = func(obj, arg1, arg2);
    } else if (arr[1]) {
      obj = func(obj, arg2, arg1);
    }
    return obj;
  }

  public static format(
    template: string,
    ...args: Array<string | number>
  ): string {
    return (
      '' +
      (args || []).reduce(
        (prev, curr, index) =>
          ('' + prev).replace(new RegExp(`\\{${index}\\}`, 'g'), '' + curr),
        template || '',
      )
    );
  }
}
