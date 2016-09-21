export interface IGameConfig {
  readonly width: number;
  readonly height: number;
  readonly mines: number;
  readonly name: string;
}

export const easy: IGameConfig = {
  width: 10,
  height: 8,
  mines: 10,
  name: "Easy",
};
export const medium: IGameConfig = {
  width: 16,
  height: 16,
  mines: 40,
  name: "Medium",
};
export const hard: IGameConfig = {
  width: 24,
  height: 24,
  mines: 99,
  name: "Expert",
};

export const presets = [
  easy,
  medium,
  hard,
];
