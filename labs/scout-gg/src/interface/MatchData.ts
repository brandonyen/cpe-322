import SummonerData from "./SummonerData";

interface MatchData {
  gameType: string;
  winner: string;
  currentSummonerGameData: SummonerData;
  blueSummoners: SummonerData[];
  redSummoners: SummonerData[];
}

export default MatchData;
