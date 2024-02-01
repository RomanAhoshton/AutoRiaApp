/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { theme } from '../../theme';
import { useLanguage } from '../../hooks/useLanguage';
import { DropDownItem } from '../../screens/Home';

const styles = ScaledSheet.create({
  DropDownPicker: {
    width: moderateScale(350),
    height: moderateScale(40),
    marginBottom: theme.margins.large,
    borderColor: theme.colors.lightBlue,
  },

  textStyle: {
    color: theme.colors.white,
    fontWeight: '400',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: theme.margins.medium,
    textAlign: 'center',
  },
  dropdownContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.margins.small,
    zIndex: 5,
  },
  dropDown: {
    borderColor: theme.colors.blueGreen,
    borderWidth: moderateScale(3),
  },
});

interface Props {
  valueSortPrice: string | null;
  sortItemPrice: DropDownItem[];
  setValueSortPrice: React.Dispatch<React.SetStateAction<string | null>>;
  sortByPrice: (label: string | null) => void;
  valueSortYear: string | null;
  sortItemYear: DropDownItem[];
  setValueSortYear: React.Dispatch<React.SetStateAction<string | null>>;
  sortByYear: (label: string | null) => void;
}

export default ({
  valueSortPrice,
  sortItemPrice,
  setValueSortPrice,
  sortByPrice,
  sortByYear,
  valueSortYear,
  setValueSortYear,
  sortItemYear,
}: Props) => {
  const translations = useLanguage();
  const [sortPriceOpen, setSortPriceOpen] = useState(false);
  const [sortYearOpen, setSortYearOpen] = useState(false);
  return (
    <View style={styles.dropdownContainer}>
      <View style={[styles.DropDownPicker, { zIndex: sortPriceOpen ? 1 : 0 }]}>
        <DropDownPicker
          style={[
            styles.dropDown,
            { position: sortPriceOpen ? 'relative' : 'absolute' },
          ]}
          open={sortPriceOpen}
          setOpen={setSortPriceOpen}
          value={valueSortPrice}
          items={sortItemPrice}
          containerStyle={{ height: moderateScale(40) }}
          setValue={setValueSortPrice}
          placeholder={translations.common.sortByPrice}
          onChangeValue={(label: string | null) => sortByPrice(label)}
          textStyle={{
            color: theme.colors.blueGreen,
            fontWeight: '700',
          }}
          dropDownContainerStyle={{
            borderColor: theme.colors.blueGreen,
            borderWidth: moderateScale(3),
          }}
        />
      </View>

      <View style={[styles.DropDownPicker, { zIndex: sortYearOpen ? 1 : 0 }]}>
        <DropDownPicker
          style={styles.dropDown}
          open={sortYearOpen}
          setOpen={setSortYearOpen}
          value={valueSortYear}
          items={sortItemYear}
          containerStyle={{ height: moderateScale(40) }}
          setValue={setValueSortYear}
          placeholder={translations.common.sortByYear}
          onChangeValue={(label: string | null) => sortByYear(label)}
          textStyle={{
            color: theme.colors.blueGreen,
            fontWeight: '700',
          }}
          dropDownContainerStyle={{
            borderColor: theme.colors.blueGreen,
            borderWidth: moderateScale(3),
            backgroundColor: theme.colors.white,
            width: '100%',
          }}
        />
      </View>
    </View>
  );
};
