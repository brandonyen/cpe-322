import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;
const RIOT_API_KEY = process.env.REACT_APP_RIOT_API_KEY as string;

if (!RIOT_API_KEY) {
  throw new Error("Missing RIOT_API_KEY in environment variables");
}

interface RiotHeaders {
  gamename?: string;
  tagline?: string;
  region?: string;
  puuid?: string;
  platform?: string;
  count?: string;
  matchid?: string;
}

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/userInfo", async (req, res): Promise<any> => {
  const headers = req.headers as RiotHeaders;
  const { gamename, tagline, region } = headers;

  if (!gamename || !tagline || !region) {
    return res
      .status(400)
      .json({ error: "Game name, tagline, and region are required" });
  }

  try {
    const response = await axios.get(
      `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gamename}/${tagline}`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      }
    );
    res.json(response.data);
  } catch (error: any) {
    console.error("Riot API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Riot API responded with an error",
      details: error.response?.data || error.message,
    });
  }
});

app.get("/summonerInfo", async (req, res): Promise<any> => {
  const headers = req.headers as RiotHeaders;
  const { puuid, platform } = headers;

  if (!puuid || !platform) {
    return res
      .status(400)
      .json({ error: "Player UUID and platform are required" });
  }

  try {
    const response = await axios.get(
      `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      }
    );
    res.json(response.data);
  } catch (error: any) {
    console.error("Riot API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Riot API responded with an error",
      details: error.response?.data || error.message,
    });
  }
});

app.get("/rankedInfo", async (req, res): Promise<any> => {
  const headers = req.headers as RiotHeaders;
  const { puuid, platform } = headers;

  if (!puuid || !platform) {
    return res
      .status(400)
      .json({ error: "Player UUID and platform are required" });
  }

  try {
    const response = await axios.get(
      `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      }
    );
    res.json(response.data);
  } catch (error: any) {
    console.error("Riot API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Riot API responded with an error",
      details: error.response?.data || error.message,
    });
  }
});

app.get("/matchList", async (req, res): Promise<any> => {
  const headers = req.headers as RiotHeaders;
  const { puuid, count, region } = headers;

  if (!puuid || !count || !region) {
    return res.status(400).json({
      error: "Player UUID, number of matches, and region are required",
    });
  }

  try {
    const response = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${count}`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      }
    );
    res.json(response.data);
  } catch (error: any) {
    console.error("Riot API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Riot API responded with an error",
      details: error.response?.data || error.message,
    });
  }
});

app.get("/matchInfo", async (req, res): Promise<any> => {
  const headers = req.headers as RiotHeaders;
  const { matchid, region } = headers;

  if (!matchid || !region) {
    return res.status(400).json({ error: "Match ID and region are required" });
  }

  try {
    const response = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchid}`,
      {
        headers: { "X-Riot-Token": RIOT_API_KEY },
      }
    );
    res.json(response.data);
  } catch (error: any) {
    console.error("Riot API Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Riot API responded with an error",
      details: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
