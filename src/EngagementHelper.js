import Highcharts from "highcharts";
import optionsValue from "./utils/constants";
import {
  processData,
  filterChannels,
  highChartsData,
} from "./utils/utilfunctions";

const engagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
    // Step 1: Process the data
    const channelsData = processData(messageCountList);

    // Step 2: Filter channels with messages on more than one date
    const filteredChannelsData = filterChannels(channelsData);

    // Step 3: Prepare the data for Highcharts
    const seriesData = highChartsData(filteredChannelsData, channels);

    // Step 4: Generate Highcharts options
    const options = {
      chart: {
        type: optionsValue.chart.type,
        backgroundColor: optionsValue.chart.backgroundColor,
      },
      title: {
        text: optionsValue.title.text,
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
};

export default engagementHelper;
