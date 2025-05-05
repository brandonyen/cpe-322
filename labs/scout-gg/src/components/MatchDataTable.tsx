import MatchData from "../interface/MatchData";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const MatchDataTable = ({
  matchData,
  usernameClick,
  routingInfo,
  ddVersion,
}: {
  matchData: MatchData;
  usernameClick: (
    newGameName: string,
    newTagLine: string,
    routingInfo: string[]
  ) => void;
  routingInfo: string[];
  ddVersion: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className={`flex flex-row p-2 items-center rounded-lg mt-4 mb-4 ${
          matchData.currentSummonerGameData.didWin ? "bg-sky-200" : "bg-red-200"
        }`}
      >
        <div className="flex flex-col text-center w-20 ml-6 mr-8">
          <strong>{matchData.gameType}</strong>
          <p>
            {matchData.currentSummonerGameData.didWin ? "Victory" : "Defeat"}
          </p>
        </div>
        <div className="flex flex-row items-center">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${matchData.currentSummonerGameData.champion}.png`}
            className="size-20 mr-6 rounded-lg"
            alt="Champion Icon"
          />
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="flex items-center">
                <strong>
                  {matchData.currentSummonerGameData.kills}
                  &nbsp;/&nbsp;
                </strong>
                <strong className="text-red-500">
                  {matchData.currentSummonerGameData.deaths}
                </strong>
                <strong>
                  &nbsp;/&nbsp;
                  {matchData.currentSummonerGameData.assists}
                </strong>
              </div>
            </div>
            <p>{matchData.currentSummonerGameData.kda} KDA</p>
          </div>
        </div>
        <div className="ml-auto flex flex-row items-center">
          <div className="flex flex-col w-24 gap-1">
            {matchData.blueSummoners.map((summoner, index) => {
              return (
                <div className="flex flex-row items-center gap-1" key={index}>
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${summoner.champion}.png`}
                    className="size-6 mr-2 rounded-xs"
                    alt="Champion Icon"
                  />
                  <span
                    className="text-xs truncate cursor-pointer"
                    onClick={() =>
                      usernameClick(
                        summoner.gameName!,
                        summoner.tagLine!,
                        routingInfo
                      )
                    }
                  >
                    {summoner.gameName}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-24 ml-2 mr-2 gap-1">
            {matchData.redSummoners.map((summoner, index) => {
              return (
                <div className="flex flex-row items-center" key={index}>
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${summoner.champion}.png`}
                    className="size-6 mr-2 rounded-xs
                    "
                    alt="Champion Icon"
                  />
                  <span
                    className="text-xs truncate cursor-pointer"
                    onClick={() =>
                      usernameClick(
                        summoner.gameName!,
                        summoner.tagLine!,
                        routingInfo
                      )
                    }
                  >
                    {summoner.gameName}
                  </span>
                </div>
              );
            })}
          </div>
          <ChevronDownIcon
            className={`size-12 align-center transition-transform duration-300 ease-in-out cursor-pointer ${
              matchData.currentSummonerGameData.didWin
                ? "fill-blue-400"
                : "fill-red-400"
            } ${isOpen ? "rotate-180" : "rotate-0"}`}
            onClick={handleOpen}
          ></ChevronDownIcon>
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-row rounded-lg overflow-hidden">
          <div
            className={`flex flex-col w-[50%] h-full p-8 ${
              matchData.winner == "Blue" ? "bg-sky-200" : "bg-red-200"
            }`}
          >
            {matchData.winner == "Blue" ? (
              <span className="mb-4">
                <strong>Victory</strong> (Blue Team)
              </span>
            ) : (
              <span className="mb-4">
                <strong>Defeat</strong> (Blue Team)
              </span>
            )}
            {matchData.blueSummoners.map((summoner, index) => {
              return (
                <div
                  className="flex flex-row items-center mb-4 last:mb-0"
                  key={index}
                >
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${summoner.champion}.png`}
                    className="size-12 mr-2 rounded-sm"
                    alt="Champion Icon"
                  />
                  <div className="flex flex-col">
                    <p
                      className="truncate cursor-pointer"
                      onClick={() =>
                        usernameClick(
                          summoner.gameName!,
                          summoner.tagLine!,
                          routingInfo
                        )
                      }
                    >
                      {summoner.gameName}
                    </p>
                    <p>
                      {summoner.kills}/{summoner.deaths}/{summoner.assists} (
                      {summoner.kda} KDA)
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`flex flex-col w-[50%] h-full p-8 ${
              matchData.winner == "Red" ? "bg-sky-200" : "bg-red-200"
            }`}
          >
            {matchData.winner == "Red" ? (
              <span className="mb-4">
                <strong>Victory</strong> (Red Team)
              </span>
            ) : (
              <span className="mb-4">
                <strong>Defeat</strong> (Red Team)
              </span>
            )}
            {matchData.redSummoners.map((summoner, index) => {
              return (
                <div
                  className="flex flex-row items-center mb-4 last:mb-0"
                  key={index}
                >
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${summoner.champion}.png`}
                    className="size-12 mr-2 rounded-sm"
                    alt="Champion Icon"
                  />
                  <div className="flex flex-col">
                    <p
                      className="truncate cursor-pointer"
                      onClick={() =>
                        usernameClick(
                          summoner.gameName!,
                          summoner.tagLine!,
                          routingInfo
                        )
                      }
                    >
                      {summoner.gameName}
                    </p>
                    <p>
                      {summoner.kills}/{summoner.deaths}/{summoner.assists} (
                      {summoner.kda} KDA)
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDataTable;
