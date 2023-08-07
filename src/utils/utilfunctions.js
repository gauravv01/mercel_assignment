export const processData = (messageCountList) => {
  const channelsData = {};
  messageCountList.forEach((message) => {
    const { channelId, timeBucket, count } = message;
    if (!channelsData[channelId]) {
      channelsData[channelId] = [];
    }
    channelsData[channelId].push({
      date: timeBucket,
      count: parseInt(count),
    });
  });
  return channelsData;
};

export const filterChannels = (channelsData) => {
  const filteredChannelsData = Object.entries(channelsData).filter(
    ([_, data]) => data.length > 1
  );
  return filteredChannelsData;
};

const getCurrentTime = (item) => {
  return new Date(item).getTime();
};

export const highChartsData = (filteredChannelsData, channels) => {
  const seriesData = filteredChannelsData.map(([channelId, data]) => {
    const channel = channels.find((ch) => ch.id === channelId);
    return {
      name: channel.name,
      data: data.map((item) => [getCurrentTime(item.date), item.count]),
    };
  });
  return seriesData;
};
