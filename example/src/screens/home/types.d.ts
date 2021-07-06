export type Sports = {
  image: string;
  title: string;
};

type Events = {
  command: {
    one: string;
    two: string;
  };
  icon: {
    one: string;
    two: string;
  };
  score: {
    one: 3;
    two: 4;
  };
  type: string;
};
export type Array = {
  image: string;
  title: string;
  county: string;
  events: Events[];
};
