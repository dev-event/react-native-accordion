import { useMemo } from 'react';
import invariant from 'invariant';
import type { IAccordionProps } from '../../accordion';

const useValidator = ({ initialMountedContent }: IAccordionProps) => {
  useMemo(() => {
    invariant(
      typeof initialMountedContent === 'boolean',
      `'initialMountedContent' was provided but with wrong type ! expected type is a boolean.`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useValidator;
