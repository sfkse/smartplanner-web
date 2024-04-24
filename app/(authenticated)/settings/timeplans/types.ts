export type Timeplan = {
  name: string;
};

export type ClassTimeplan = {
  idclasstimeplans: string;
  idclasses: string;
  timeplanname: string;
  classname?: string;
  minutes?: object[];
};

