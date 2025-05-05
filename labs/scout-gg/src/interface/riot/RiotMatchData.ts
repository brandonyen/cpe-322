import RiotSummonerData from "./RiotSummonerData";

interface RiotMatchData {
  queueId: number;
  participants: RiotSummonerData[];
}

export default RiotMatchData;
