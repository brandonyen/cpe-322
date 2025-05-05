import axios from "axios";
import MatchData from "../interface/MatchData";
import SummonerData from "../interface/SummonerData";
import RiotMatchData from "../interface/riot/RiotMatchData";
import RiotSummonerData from "../interface/riot/RiotSummonerData";
import findQueueMode from "./queue";

export const fetchMatchList = async (
  puuid: string,
  count: string,
  region: string
) => {
  const response = await axios.get("http://localhost:3001/matchList/", {
    headers: {
      puuid: puuid,
      count: count,
      region: region,
    },
  });

  return response.data;
};

export const fetchMatchInfo = async (matchId: string, region: string) => {
  const response = await axios.get("http://localhost:3001/matchInfo/", {
    headers: {
      matchid: matchId,
      region: region,
    },
  });
  return response.data;
};

export const compileMatchInfo = async (
  matchDetailsList: RiotMatchData[],
  playerPUUID: string
) => {
  const matchInfoListTrimmed: MatchData[] = [];
  matchDetailsList
    .filter(
      (matchDetails: RiotMatchData) => matchDetails.participants.length == 10
    )
    .forEach((matchDetails) => {
      let winningSide: string;
      let currentSummonerGameData: SummonerData;

      if (matchDetails.participants[0].win) {
        winningSide = "Blue";
      } else {
        winningSide = "Red";
      }

      const queueId = matchDetails.queueId;
      const queueMode = findQueueMode(queueId);

      const blueSummonerInfo: SummonerData[] = [];
      const redSummonerInfo: SummonerData[] = [];

      matchDetails.participants.forEach(
        (participant: RiotSummonerData, index: number) => {
          const currentParticipant: SummonerData = {
            gameName: participant.riotIdGameName,
            tagLine: participant.riotIdTagline,
            champion:
              participant.championName == "FiddleSticks"
                ? "Fiddlesticks"
                : participant.championName,
            kills: participant.kills,
            deaths: participant.deaths,
            assists: participant.assists,
            kda:
              participant.deaths == 0
                ? "Perfect"
                : (
                    (participant.kills + participant.assists) /
                    participant.deaths
                  )
                    .toFixed(2)
                    .toString(),
          };

          if (participant.puuid === playerPUUID) {
            const summonerTeam = index < 5 ? "Blue" : "Red";
            currentSummonerGameData = {
              didWin: summonerTeam == winningSide ? true : false,
              champion:
                participant.championName == "FiddleSticks"
                  ? "Fiddlesticks"
                  : participant.championName,
              kills: participant.kills,
              deaths: participant.deaths,
              assists: participant.assists,
              kda:
                participant.deaths == 0
                  ? "Perfect"
                  : (
                      (participant.kills + participant.assists) /
                      participant.deaths
                    )
                      .toFixed(2)
                      .toString(),
            };
          }

          if (index < 5) {
            blueSummonerInfo.push(currentParticipant);
          } else {
            redSummonerInfo.push(currentParticipant);
          }
        }
      );

      const matchInfoTrimmed: MatchData = {
        gameType: queueMode,
        winner: winningSide,
        currentSummonerGameData: currentSummonerGameData!,
        blueSummoners: blueSummonerInfo,
        redSummoners: redSummonerInfo,
      };
      matchInfoListTrimmed.push(matchInfoTrimmed);
    });

  return matchInfoListTrimmed;
};
