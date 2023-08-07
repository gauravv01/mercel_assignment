import Highcharts from "highcharts";

const engagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
    // Step 1: Process the data
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

    // Step 2: Filter channels with messages on more than one date
    const filteredChannelsData = Object.entries(channelsData).filter(
      ([_, data]) => data.length > 1
    );

    // Step 3: Prepare the data for Highcharts
    const seriesData = filteredChannelsData.map(([channelId, data]) => {
      const channel = channels.find((ch) => ch.id === channelId);
      return {
        name: channel.name,
        data: data.map((item) => [new Date(item.date).getTime(), item.count]),
      };
    });

    // Step 4: Generate Highcharts options
    const options = {
      chart: {
        type: "spline",
        backgroundColor: "#D0D5DA",
      },
      title: {
        text: "Engagement Message Over Time",
      },
      xAxis: {
        type: "datetime",
      },
      yAxis: {
        title: {
          text: "Number of Messages",
        },
        gridLineWidth: 0,
      },
      series: seriesData,
      plotOptions: {
        spline: {
          color: "#40644F", // Set the color for the spline line
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
};

export default engagementHelper;
