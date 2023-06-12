import { lazy } from 'react';

export default function lazyLoad(path: string, namedExport: string) {
  return lazy(async () => {
    if (namedExport == null) {
      return import(path);
    }
    return import(path).then((module) => ({ default: module[namedExport] }));
  });
}
