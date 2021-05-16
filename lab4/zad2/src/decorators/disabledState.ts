export const disabled = (value: boolean) => (target: Object, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, { value });
  };