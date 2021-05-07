import React from 'react';
import type {AccordionHeadProps} from '../types/header';
import {chevron} from '../chevron/types';
import {StyleSheetProperties} from 'react-native';

export interface AccordionProps {
  state: boolean;
  /**
   * onchange state hide/show content
   */
  onChange: (index: boolean) => void;
  /**
   * default component header collapsed
   * @see {AccordionHeadProps}
   * @type React.FC\<AccordionHeadProps\>
   */
  handleHead?: React.FC<AccordionHeadProps> | null;
  handleIcon?: React.FC<chevron> | null;
  handleContentHead?: React.FC<chevron> | null;
  children: React.ReactNode;
  isUnmounted: boolean;
  isBackgroundChevron: boolean;
  styleChevron: StyleSheetProperties;
  styleHeader: any;
  activeBackgroundIcon: string;
  inactiveBackgroundIcon: string;
}
