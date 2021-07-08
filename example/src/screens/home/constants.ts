import type { Array, Sports } from './types';
import { assets } from '../../assets';

export const sports: Sports[] = [
  { image: assets.pingpong, title: 'Ping-pong' },
  { image: assets.badminton, title: 'Badminton' },
  { image: assets.baseball, title: 'Baseball' },
  { image: assets.football, title: 'Football' },
  { image: assets.tennis, title: 'Tennis' },
  { image: assets.basketball, title: 'Basketball' },
];

export const array: Array[] = [
  {
    image: assets.flag_1,
    title: 'La League',
    county: 'Spain',
    events: [
      {
        command: {
          one: 'Barcelona',
          two: 'Liverpoll',
        },
        icon: {
          one: assets.real_betis,
          two: assets.tottenham,
        },
        score: {
          one: 3,
          two: 4,
        },
        type: 'KL',
      },
    ],
  },
  {
    image: assets.flag_2,
    title: 'Basketball League',
    county: 'Belarus',
    events: [
      {
        command: {
          one: 'BATE',
          two: 'Liverpoll',
        },
        icon: {
          one: assets.real_betis,
          two: assets.tottenham,
        },
        score: {
          one: 3,
          two: 4,
        },
        type: 'HT',
      },
    ],
  },
  {
    image: assets.flag_1,
    title: 'Football League',
    county: 'Belarus',
    events: [
      {
        command: {
          one: 'Real Madrid',
          two: 'Moscow',
        },
        icon: {
          one: assets.real_betis,
          two: assets.tottenham,
        },
        score: {
          one: 3,
          two: 4,
        },
        type: 'HR',
      },
    ],
  },
];
