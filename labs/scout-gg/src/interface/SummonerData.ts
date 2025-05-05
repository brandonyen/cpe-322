interface SummonerData {
  didWin?: boolean;
  gameName?: string;
  tagLine?: string;
  champion: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: string;
}

export default SummonerData;
