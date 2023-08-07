import Highcharts from "highcharts";
import optionsValue from "./utils/constants";

const engagementHelper = {
  processData: (messageCountList) => {
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
  },
  filterChannels: (channelsData) => {
    const filteredChannelsData = Object.entries(channelsData).filter(
      ([_, data]) => data.length > 1
    );
    return filteredChannelsData;
  },
  highChartsData: function (filteredChannelsData, channels) {
    const seriesData = filteredChannelsData.map(([channelId, data]) => {
      const channel = channels.find((ch) => ch.id === channelId);
      return {
        name: channel.name,
        data: data.map((item) => [this.getCurrentTime(item.date), item.count]),
      };
    });
    return seriesData;
  },
  engagementMessageOverTimeChartOptions: function (messageCountList, channels) {
    // Step 1: Process the data
    const channelsData = this.processData(messageCountList);

    // Step 2: Filter channels with messages on more than one date
    const filteredChannelsData = this.filterChannels(channelsData);

    // Step 3: Prepare the data for Highcharts
    const seriesData = this.highChartsData(filteredChannelsData, channels);

    // Step 4: Generate Highcharts options
    const options = {
      chart: {
        type: optionsValue.chart.type,
        backgroundColor: optionsValue.chart.backgroundColor,
      },
      title: {
        text: optionsValue.title,
      },
      xAxis: {
        type: optionsValue.xAxis.type,
      },
      yAxis: {
        title: {
          text: optionsValue.yAxis.title.text,
        },
        gridLineWidth: 0,
      },
      series: seriesData,
      plotOptions: {
        spline: {
          color: optionsValue.plotOptions.spline.color, // Set the color for the spline line
        },
        marker: {
          enabled: false, // Disable markers on the spline line, if desired
        },
      },
      tooltip: {
        formatter: function () {
          return `<b>${this.series.name}</b><br/>Date: ${Highcharts.dateFormat(
            "%Y-%m-%d",
            this.x
          )}<br/>Messages: ${this.y}`;
        },
      },
    };
    return options;
  },
  getCurrentTime: (item) => {
    return new Date(item).getTime();
  },
};

export default engagementHelper;
