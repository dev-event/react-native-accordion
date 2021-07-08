import { ImageProps } from 'react-native';

export type Sports = {
  image: string;
  title: string;
};

type Events = {
  command: ICommand;
  icon: IIcon;
  score: IScore;
  type: string;
};

type IScore = {
  [key: string]: number;
};
type IIcon = {
  [key: string]: string;
};
type ICommand = {
  [key: string]: string;
};

export type Array = {
  image: ImageProps;
  title: string;
  county: string;
  events: Events[];
};
