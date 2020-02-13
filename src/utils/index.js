export * from './is';
export * from './json-color';
export * from './clipboard';

export const deepCloneJSON = obj => {
  if (!obj) {
    return {};
  }
  return JSON.parse(JSON.stringify(obj));
};