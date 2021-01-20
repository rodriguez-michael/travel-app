const getYoutube = async (city, API_KEY) => {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let resp = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&eventType=none&maxResults=1&q=${city}%20tour&safeSearch=none&videoCaption=any&key=${API_KEY}`,
    requestOptions
  );
  let response = await resp.json();
  return response;
};

const YoutubeAPI = {
  getYoutube,
};

export default YoutubeAPI;
