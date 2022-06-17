import { processColor } from 'react-native';
import { palette } from '../../theme';

const defaultSettings = {
  xAxis: {
    enabled: true,
    textColor: processColor('black'),
    textSize: 11,
    drawAxisLines: true,
    drawGridLines: false,
    avoidFirstLastClipping: true,
    granularityEnabled: true,
    granularity: 1,
    position: 'BOTTOM',
    drawAxisLine: false,
  //  fontFamily: fontFamily.Regular,
    yOffset: 4,
  },
  yAxis: {
    left: {
      enabled: false,
      drawGridLines: false,
    },
    right: {
      enabled: true,
      drawGridLines: false,
      drawAxisLine: false,
     // fontFamily: fontFamily.Regular,
      // axisLineColor: processColor(fontColor.greyBackground),
      // axisLineWidth: 1.5,
      granularityEnabled: true,
      granularity: 10,
    },
  },
  marker: {
    enabled: true,
    markerColor:[processColor(palette.pink), processColor(palette.black)],
    textColor: processColor(palette.grey),
    textSize: 13,
  },
  config: {
    lineWidth: 2,
    drawValues: false,
    drawCircles: false,
    drawCubicIntensity: 0.3,
   // fontFamily: fontFamily.Regular,
    drawCubic: false,
    drawHighlightIndicators: false,
    color: processColor(palette.pink),
    drawFilled: true,
    fillAlpha: 40,
    fillGradient: {
      colors: [processColor(palette.pink), processColor(palette.smokeWhite)],
      positions: [0, 0.5],
      angle: 90,
      orientation: 'TOP_BOTTOM',
    },
  },
  chartDescription: {
    text: '',
  },
  legend: {
    enabled: false,
  },

};

export default defaultSettings;
