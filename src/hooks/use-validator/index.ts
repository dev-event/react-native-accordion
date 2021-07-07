import { useMemo } from 'react';
// import invariant from 'invariant';
import type { IAccordionProps } from '../../accordion';

const useValidator = ({}: IAccordionProps) => {
  useMemo(() => {
    // snap points
    // invariant(
    //   typeof isUnmountedContent === 'boolean',
    //   `'isUnmountedContent' was provided but with wrong type ! expected type is a boolean.`
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useValidator;
