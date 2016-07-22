export interface IGameConfig{
  width: number;
  height: number;
  mines: number;
}

export const easy: IGameConfig = {
  width: 10,
  height: 10,
  mines: 10,
}
export const medium: IGameConfig = {
  width: 20,
  height: 20,
  mines: 50,
}
export const hard: IGameConfig = {
  width: 30,
  height: 20,
  mines: 150,
}

export const presets = {
  easy,
  medium,
  hard,
}
