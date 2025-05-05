import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import RankedData from "../interface/RankedData";
import MatchData from "../interface/MatchData";
import {
  fetchUserInfo,
  fetchSummonerInfo,
  fetchSummonerRank,
} from "../api/user";
import { fetchMatchList, fetchMatchInfo, compileMatchInfo } from "../api/match";
import MatchDataTable from "./MatchDataTable";
import { getLatestDDVersion } from "../api/ddragon";

const SummonerProfile = forwardRef((_, ref) => {
  const [currentRoutingInfo, setCurrentRoutingInfo] = useState<string[]>([]);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [currentSummonerInfo, setCurrentSummonerInfo] = useState(null);
  const [currentRankedInfo, setCurrentRankedInfo] = useState<RankedData | null>(
    null
  );
  const [currentMatchDataList, setCurrentMatchDataList] = useState<MatchData[]>(
    []
  );
  const [ddVersion, setDDVersion] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchVersion = async () => {
    const latestVersion = await getLatestDDVersion();
    setDDVersion(latestVersion!);
  };

  useEffect(() => {
    fetchVersion();
  }, []);

  const handleSearch = async (
    gameName: string,
    tagLine: string,
    routingInfo: string[]
  ) => {
    setCurrentRoutingInfo(routingInfo);
    setError(null);
    setCurrentUserInfo(null);
    setCurrentSummonerInfo(null);
    setCurrentRankedInfo(null);
    setCurrentMatchDataList([]);

    let userInfo;
    try {
      userInfo = await fetchUserInfo(gameName, tagLine, routingInfo[0]);
      setCurrentUserInfo(userInfo);
    } catch (error) {
      setError("Failed to fetch user info");
      console.error(error);
      return;
    }

    let summonerInfo;
    try {
      summonerInfo = await fetchSummonerInfo(userInfo.puuid, routingInfo[1]);
      setCurrentSummonerInfo(summonerInfo);
    } catch (error) {
      setError("Failed to fetch summoner info");
      console.error(error);
      return;
    }

    let rankedInfo;
    try {
      rankedInfo = await fetchSummonerRank(userInfo.puuid, routingInfo[1]);
      setCurrentRankedInfo(rankedInfo);
    } catch (error) {
      setError("Failed to fetch ranked info");
      console.error(error);
      return;
    }

    let matchData;
    try {
      matchData = await fetchMatchList(userInfo.puuid, "10", routingInfo[0]);
    } catch (error) {
      setError("Failed to fetch match list");
      console.error(error);
      return;
    }

    let matchDataList;
    try {
      matchDataList = await Promise.all(
        matchData.map(async (matchId: string) => {
          const data = await fetchMatchInfo(matchId, routingInfo[0]);
          return data["info"];
        })
      );
    } catch (error) {
      setError("Failed to fetch match details");
      console.error(error);
      return;
    }

    let compiledMatchDetails;
    try {
      compiledMatchDetails = await compileMatchInfo(
        matchDataList,
        userInfo.puuid
      );
      setCurrentMatchDataList(compiledMatchDetails);
    } catch (error) {
      setError("Failed to compile match details");
      console.error(error);
      return;
    }
  };

  useImperativeHandle(ref, () => ({ handleSearch }));

  return (
    <div className="flex justify-center">
      <div className="w-160 mt-12">
        {error && <p className="text-red-600">{error}</p>}
        {currentUserInfo && currentSummonerInfo && (
          <div>
            <div className="flex items-center">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/profileicon/${currentSummonerInfo["profileIconId"]}.png`}
                className="size-24 mr-4 rounded-lg"
                alt="Summoner Icon"
              />
              <div>
                <strong>
                  {currentUserInfo["gameName"]}#{currentUserInfo["tagLine"]}
                </strong>
                <p>
                  <strong>Summoner Level: </strong>
                  {currentSummonerInfo["summonerLevel"]}
                </p>
                {currentRankedInfo ? (
                  <p>
                    <strong>{currentRankedInfo.type}: </strong>
                    {currentRankedInfo.tier} {currentRankedInfo.rank}{" "}
                    {currentRankedInfo.points.toString()}LP (
                    {currentRankedInfo.wins}W {currentRankedInfo.losses}L)
                  </p>
                ) : (
                  <p>There is no Ranked information available.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {currentMatchDataList.length > 0 && (
          <div>
            {currentMatchDataList.map((matchData, index) => {
              return (
                <MatchDataTable
                  matchData={matchData}
                  usernameClick={handleSearch}
                  routingInfo={currentRoutingInfo}
                  ddVersion={ddVersion}
                  key={index}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

export default SummonerProfile;
