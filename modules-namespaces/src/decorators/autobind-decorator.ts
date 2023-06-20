export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const newMethod: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundedFunction = originalMethod.bind(this);
      return boundedFunction;
    },
  };
  return newMethod;
}
