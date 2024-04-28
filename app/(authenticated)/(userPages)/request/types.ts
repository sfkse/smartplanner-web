export type Draggable = {
  day: number;
  hour: number;
  top: number;
  left: number;
  height: number;
  width: number;
  data: {
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    description: string;
    userID: string;
  };
};

export type Draggables = {
  properties: Draggable;
}[];
