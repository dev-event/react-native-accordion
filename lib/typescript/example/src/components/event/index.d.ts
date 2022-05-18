import { ImageProps } from 'react-native';
import type { FC } from 'react';
declare type IEvent = {
    type: string;
    iconOne: ImageProps;
    iconTwo: ImageProps;
    scoreOne: number;
    scoreTwo: number;
    commandOne: string;
    commandTwo: string;
};
declare const Event: FC<IEvent>;
export { Event };
