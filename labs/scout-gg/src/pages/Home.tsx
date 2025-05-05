import { useState, useRef } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Button,
  Input,
} from "@headlessui/react";
import findRoutingData from "../api/routing";
import SummonerProfile from "../components/SummonerProfile";
import servers from "../data/servers";

const Home = () => {
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [gameNameInput, setGameNameInput] = useState("");
  const [tagLineInput, setTagLineInput] = useState("");
  const [displayProfile, setDisplayProfile] = useState(false);
  const profileRef = useRef<any>(null);

  const handleFetchUserClick = async () => {
    setDisplayProfile(true);
    setTimeout(() => {
      if (profileRef.current) {
        profileRef.current.handleSearch(
          gameNameInput,
          tagLineInput,
          findRoutingData(selectedServer.name)
        );
      }
    }, 0);
  };

  return (
    <div className="p-8">
      <div className="flex items-center">
        <div className="flex items-center">
          <img src="/src/assets/swords.png" className="size-8" />
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-row rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.3)] p-4">
          <div className="mr-8">
            <Listbox value={selectedServer} onChange={setSelectedServer}>
              <ListboxButton className="flex flex-row items-center bg-blue-400 rounded-lg p-2 pl-4 pr-4 text-white cursor-pointer">
                {selectedServer.name}
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                className="bg-blue-400 rounded-lg cursor-pointer mt-1"
              >
                {servers.map((server) => (
                  <ListboxOption
                    key={server.id}
                    value={server}
                    className="hover:bg-blue-100 p-2 pl-4 pr-4 text-white text-center"
                  >
                    {server.name}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>
          <Input
            className="outline-none w-60"
            type="text"
            placeholder="Enter Game Name"
            value={gameNameInput}
            onChange={(e) => setGameNameInput(e.target.value)}
          />
          <Input
            className="outline-none w-40"
            type="text"
            placeholder="Enter Tagline"
            value={tagLineInput}
            onChange={(e) => setTagLineInput(e.target.value)}
          />
          <Button
            disabled={!(gameNameInput && tagLineInput)}
            className={`rounded-lg p-2 pl-4 pr-4 text-white transition-colors duration-300 ${
              gameNameInput && tagLineInput
                ? "cursor-pointer bg-blue-400"
                : "cursor-not-allowed bg-gray-400"
            }`}
            onClick={handleFetchUserClick}
          >
            Search
          </Button>
        </div>
      </div>

      {displayProfile && <SummonerProfile ref={profileRef} />}
    </div>
  );
};

export default Home;
