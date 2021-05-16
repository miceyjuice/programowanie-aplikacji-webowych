export const moveCounter = () => (target: any, name: string, descriptor: any) => {
    let originalMethod = descriptor.value;
    let counter = 0;
    descriptor.value = function (...args: any[]) {
      let result = originalMethod.apply(this, args);
      counter++;
      console.log(`Ilosc ruchow: ${counter}`);
      return result;
    };
  };