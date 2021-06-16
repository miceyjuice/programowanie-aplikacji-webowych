export const gameLog = () => (target: any, name: string, descriptor: any) => {
    let originalMethod = descriptor.value;
    let counter = 0;
    descriptor.value = function (...args: any[]) {
      let result = originalMethod.apply(this, args);
      counter++;
      console.log(`Licznik wywolania metody: ${counter}`);
      return result;
    };
  };