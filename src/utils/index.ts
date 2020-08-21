export class Utils {
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

  /**
   * Function that formats string with variables
   * @template string to format;
   * @args array of variables;
   */
  public static format(
    template: string,
    ...args: Array<string | number>
  ): string {
    return (args || [])
      .reduce(
        (prev, curr, idx) =>
          prev
            .toString()
            .replace(new RegExp(`\\{${idx}\\}`, 'g'), curr.toString()),
        template,
      )
      .toString();
  }
}
