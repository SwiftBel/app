import React, { memo } from 'react';
import { SafeAreaView } from 'react-native';
import propTypes from 'prop-types';
import { LineChart,chart } from 'react-native-charts-wrapper';
import styles from './styles';
import defaultSettings from './defaultSettings';

const LineChartSeries = ({
  data,
  label = '',
  chartStyle = {},
  config = defaultSettings.config,
  xAxis = defaultSettings.xAxis,
  xAxisFormattedValues = {},
  yAxis = defaultSettings.yAxis,
  marker = defaultSettings.marker,
  yAxisFormattedValues = {},
  chartDescription = defaultSettings.chartDescription,
  legend = defaultSettings.legend,
  onSelect = () => {},
  onChange = () => {},
  screen = 'stock',
}) => {
 // const chartDataValues = screen === 'stock' ? data : data.sort(compare);
  const chartData = {
    dataSets: data
  };
  const xAxisValues = { ...xAxis, ...xAxisFormattedValues };
  const yAxisValues = { ...yAxis, ...yAxisFormattedValues };
  return (
    <SafeAreaView style={styles.container}>
      <LineChart
        style={chartStyle}
        data={chartData}
        chartDescription={chartDescription}
        xAxis={xAxisValues}
        yAxis={yAxisValues}
        marker={marker}
        legend={legend}
        // // visibleRange={{ x: { min: 1, max: 1 } }}
        doubleTapToZoomEnabled={false}
        highlightLineWidth={200}
        onSelect={onSelect}
        onChange={onChange}
      />
    </SafeAreaView>
  );
};

LineChartSeries.propTypes = {
  data: propTypes.array,
  config: propTypes.object,
  xAxis: propTypes.object,
  xAxisFormattedValues: propTypes.object,
  yAxis: propTypes.object,
  yAxisFormattedValues: propTypes.any,
  chartDescription: propTypes.object,
  legend: propTypes.object,
  label: propTypes.string,
  onSelect: propTypes.func,
  onChange: propTypes.func,
  chartStyle: propTypes.object,
  marker: propTypes.any,
  screen: propTypes.string,
};

export default memo(LineChartSeries);
