export type TDraggable = {
  requestID: string;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  description: string;
  userID: string;
  properties: {
    top: number;
    left: number;
    height: number;
    width: number;
  };
};

export type TDraggables = TDraggable[];

