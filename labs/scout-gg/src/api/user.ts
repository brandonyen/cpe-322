import axios from "axios";
import RankedData from "../interface/RankedData";

export const fetchUserInfo = async (
  gameName: string,
  tagLine: string,
  region: string
) => {
  const response = await axios.get("http://localhost:3001/userInfo", {
    headers: {
      gamename: encodeURIComponent(gameName),
      tagline: encodeURIComponent(tagLine),
      region: region,
    },
  });

  return response.data;
};

export const fetchSummonerInfo = async (puuid: string, platform: string) => {
  const response = await axios.get("http://localhost:3001/summonerInfo/", {
    headers: {
      puuid: puuid,
      platform: platform,
    },
  });

  return response.data;
};

export const fetchSummonerRank = async (puuid: string, platform: string) => {
  const response = await axios.get("http://localhost:3001/rankedInfo/", {
    headers: {
      puuid: puuid,
      platform: platform,
    },
  });
  let soloDuoRankedInfo: RankedData | null = null;
  let flexRankedInfo: RankedData | null = null;

  response.data.forEach((queueRank: any) => {
    if (queueRank["queueType"] == "RANKED_SOLO_5x5") {
      soloDuoRankedInfo = {
        type: "Ranked Solo/Duo",
        tier: queueRank["tier"],
        rank: queueRank["rank"],
        points: queueRank["leaguePoints"],
        wins: queueRank["wins"],
        losses: queueRank["losses"],
      };
    } else if (queueRank["queueType"] == "RANKED_FLEX_SR") {
      flexRankedInfo = {
        type: "Ranked Flex",
        tier: queueRank["tier"],
        rank: queueRank["rank"],
        points: queueRank["leaguePoints"],
        wins: queueRank["wins"],
        losses: queueRank["losses"],
      };
    }
  });

  return soloDuoRankedInfo ? soloDuoRankedInfo : flexRankedInfo;
};
