export type LifeFields = {
  health: number,
  love: number,
  career: number
}

export type LifeFieldsPrediction = {
  health: Record<number, string>,
  love: Record<number, string>,
  career: Record<number, string>
}
