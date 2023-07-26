import React, { forwardRef } from 'react';

// ? Declare a type that works with generic components
type FixedForwardRef = <T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement
) => (props: P & React.RefAttributes<T>) => React.ReactElement;

// ! Cast the old `forwardRef` element to the new one !
export const fixedForwardRef = forwardRef as FixedForwardRef;
