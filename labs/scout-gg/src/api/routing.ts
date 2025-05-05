const findRoutingData = (server: string) => {
  switch (server) {
    case "NA":
      return ["americas", "na1"];
    case "KR":
      return ["asia", "kr"];
    case "EUW":
      return ["europe", "euw1"];
    default:
      return ["americas", "na1"];
  }
};

export default findRoutingData;
