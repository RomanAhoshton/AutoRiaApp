import { StyleSheet, View, Text } from 'react-native';
import React, { useCallback } from 'react';

import Thumb from './RangeComponents/Thumb';
import Rail from './RangeComponents/Rail';
import RailSelected from './RangeComponents/RailSelected';
import { theme } from '../../theme';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Slider = require('rn-range-slider').default;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: theme.margins.small,
  },
  minText: {
    fontSize: theme.fontSizes.regular,
    color: theme.colors.lightGrey,
    textAlign: 'left',
    fontStyle: 'italic',
  },
  maxText: {
    fontSize: theme.fontSizes.regular,
    color: theme.colors.lightGrey,
    textAlign: 'right',
    fontStyle: 'italic',
  },
  minMaxPrice: {
    fontWeight: 'bold',
    color: theme.colors.black,
    fontSize: theme.fontSizes.large,
  },
  container: {
    paddingLeft: theme.paddings.large,
    paddingRight: theme.paddings.large,
  },
  title: {
    fontWeight: 'bold',
    color: theme.colors.black,
    fontSize: theme.fontSizes.large,
    textAlign: 'center',
  },
});
interface Props {
  setLowPrice: (newLow: number) => void;
  setHighPrice: (newHigh: number) => void;
  setLowYear: (newLow: number) => void;
  setHighYear: (newHigh: number) => void;
  setLowMileage: (newLow: number) => void;
  setHighMileage: (newHigh: number) => void;
  lowPrice: number;
  highPrice: number;
  lowYear: number;
  highYear: number;
  lowMileage: number;
  highMileage: number;
}

const RangeSlider = ({
  setLowPrice,
  setHighPrice,
  setLowYear,
  setHighYear,
  setLowMileage,
  setHighMileage,
  lowPrice,
  highPrice,
  lowYear,
  highYear,
  lowMileage,
  highMileage,
}: Props) => {
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

  const priceValueChange = useCallback(
    (newLow: number, newHigh: number) => {
      setLowPrice(newLow);
      setHighPrice(newHigh);
    },
    [setLowPrice, setHighPrice],
  );

  const yearValueChange = useCallback(
    (newLow: number, newHigh: number) => {
      setLowYear(newLow);
      setHighYear(newHigh);
    },
    [setLowYear, setHighYear],
  );
  const mileageValueChange = useCallback(
    (newLow: number, newHigh: number) => {
      setLowMileage(newLow);
      setHighMileage(newHigh);
    },
    [setLowMileage, setHighMileage],
  );

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.minText}>Min</Text>

            <Text style={styles.minMaxPrice}>{lowPrice}$</Text>
          </View>

          <View>
            <Text style={styles.maxText}>Max</Text>
            <Text style={styles.minMaxPrice}>{highPrice}$</Text>
          </View>
        </View>

        <Slider
          min={0}
          max={10000}
          step={5}
          low={lowPrice}
          high={highPrice}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          onValueChanged={priceValueChange}
        />
      </View>
      <View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.minText}>Min</Text>
            <Text style={styles.minMaxPrice}>{lowYear}Year</Text>
          </View>

          <View>
            <Text style={styles.maxText}>Max</Text>
            <Text style={styles.minMaxPrice}>{highYear}Year</Text>
          </View>
        </View>

        <Slider
          min={1950}
          max={2023}
          step={1}
          low={lowYear}
          high={highYear}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          onValueChanged={yearValueChange}
        />
      </View>
      <View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.minText}>Min</Text>

            <Text style={styles.minMaxPrice}>{lowMileage}km</Text>
          </View>

          <View>
            <Text style={styles.maxText}>Max</Text>
            <Text style={styles.minMaxPrice}>{highMileage}km</Text>
          </View>
        </View>

        <Slider
          min={0}
          max={1000000}
          step={100}
          low={lowMileage}
          high={highMileage}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          onValueChanged={mileageValueChange}
        />
      </View>
    </View>
  );
};
export default RangeSlider;
