/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { theme } from '../../theme';
import { useLanguage } from '../../hooks/useLanguage';

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
    marginTop: moderateScale(50),
    zIndex: 5,
  },
  dropDown: {
    borderColor: theme.colors.lightBlue,
    borderWidth: moderateScale(3),
  },
});

interface Props {
  brandItems: object[];
  modelItems: object[];
  colorItems: object[];
  colorValue: string | number | boolean;
  modelValue: string | number | boolean;
  brandValue: string | number | boolean;
  engineValue: string | number | boolean;
  transmissionValue: string | number | boolean;
  fuelValue: string | number | boolean;
  setModalValue: (label: string | null | any) => void;
  setBrandValue: (label: string | null | any) => void;
  setTransmissionValue: (label: string | null | any) => void;
  setFuelValue: (label: string | null | any) => void;
  setEngineValue: (label: string | null | any) => void;
  setColorValue: (label: string | null | any) => void;
}

export default ({
  colorItems,
  colorValue,
  brandItems,
  modelItems,
  modelValue,
  brandValue,
  engineValue,
  transmissionValue,
  fuelValue,
  setModalValue,
  setBrandValue,
  setTransmissionValue,
  setFuelValue,
  setEngineValue,
  setColorValue,
}: Props) => {
  const translations = useLanguage();

  const [openColor, setOpenColor] = useState(false);
  /// Color state

  const [openModel, setOpenModel] = useState(false);

  /// Model state

  const [openBrand, setOpenBrand] = useState(false);

  /// Brand state

  const [openEngine, setOpenEngine] = useState(false);
  const [engineItems] = useState([
    { label: '3.0L', value: '3.0L' },
    { label: '1.4L', value: '1.4L' },
    { label: '2.0L', value: '2.0L' },
    { label: '5.0L', value: '5.0L' },
  ]);
  /// Engine state
  const [openFuel, setOpenFuel] = useState(false);
  const [fuelItems] = useState([
    { label: 'gasoline', value: 'gasoline' },
    { label: 'electric', value: 'electric' },
    { label: 'diesel', value: 'diesel' },
    { label: 'hybrid', value: 'hybrid' },
  ]);
  /// Fuel state

  const [openTransmission, setOpenTransmission] = useState(false);
  const [transmissionItems] = useState([
    { label: 'automatic', value: 'automatic' },
    { label: 'manual', value: 'manual' },
  ]);

  /// Transmission state

  return (
    <View style={styles.dropdownContainer}>
      <View style={[styles.DropDownPicker, { zIndex: openModel ? 1 : 0 }]}>
        <DropDownPicker
          style={[
            styles.dropDown,
            { position: openModel ? 'relative' : 'absolute' },
          ]}
          open={openModel}
          setOpen={setOpenModel}
          value={modelValue}
          items={modelItems}
          containerStyle={{ height: moderateScale(40) }}
          setValue={setModalValue}
          placeholder={translations.common.chooseModel}
          onChangeValue={(label: string | null | any) => setModalValue(label)}
          textStyle={{
            color: theme.colors.lightBlue,
            fontWeight: '700',
          }}
          dropDownContainerStyle={{
            borderColor: theme.colors.lightBlue,
            borderWidth: moderateScale(3),
          }}
        />
      </View>
      <View style={[styles.DropDownPicker, { zIndex: openBrand ? 1 : 0 }]}>
        <DropDownPicker
          style={styles.dropDown}
          open={openBrand}
          multiple={false}
          setOpen={setOpenBrand}
          value={brandValue}
          items={brandItems}
          containerStyle={{ height: moderateScale(40) }}
          setValue={setBrandValue}
          placeholder={translations.common.chooseBrand}
          onChangeValue={(label: string | null | any) => setBrandValue(label)}
          textStyle={{
            color: theme.colors.lightBlue,
            fontWeight: '700',
          }}
          dropDownContainerStyle={{
            borderColor: theme.colors.lightBlue,
            borderWidth: moderateScale(3),
          }}
        />
      </View>
      <View style={[styles.DropDownPicker, { zIndex: openEngine ? 1 : 0 }]}>
        <DropDownPicker
          style={styles.dropDown}
          open={openEngine}
          multiple={false}
          setOpen={setOpenEngine}
          value={engineValue}
          items={engineItems}
          containerStyle={{ height: moderateScale(40) }}
          setValue={setEngineValue}
          placeholder={translations.common.chooseEngine}
          onChangeValue={(label: string | null | any) => setEngineValue(label)}
          textStyle={{
            color: theme.colors.lightBlue,
            fontWeight: '700',
          }}
          dropDownContainerStyle={{
            borderColor: theme.colors.lightBlue,
            borderWidth: moderateScale(3),
          }}
        />
      </View>
      <View style={[styles.DropDownPicker, { zIndex: openFuel ? 1 : 0 }]}>
        <DropDownPicker
          style={styles.dropDown}
          open={openFuel}
          setOpen={setOpenFuel}
          value={fuelValue}
          items={fuelItems}
          containerStyle={{ height: moderateScale(40) }}
          setValue={setFuelValue}
          placeholder={translations.common.chooseFuelType}
          onChangeValue={(label: string | null | any) => setFuelValue(label)}
          textStyle={{
            color: theme.colors.lightBlue,
            fontWeight: '700',
          }}
          dropDownContainerStyle={{
            borderColor: theme.colors.lightBlue,
            borderWidth: moderateScale(3),
          }}
        />
      </View>
      <View
        style={[styles.DropDownPicker, { zIndex: openTransmission ? 1 : 0 }]}>
        <DropDownPicker
          style={styles.dropDown}
          open={openTransmission}
          setOpen={setOpenTransmission}
          value={transmissionValue}
          items={transmissionItems}
          containerStyle={{ height: moderateScale(40) }}
          setValue={setTransmissionValue}
          placeholder={translations.common.chooseTransmission}
          onChangeValue={(label: string | null | any) =>
            setTransmissionValue(label)
          }
          textStyle={{
            color: theme.colors.lightBlue,
            fontWeight: '700',
          }}
          dropDownContainerStyle={{
            borderColor: theme.colors.lightBlue,
            borderWidth: moderateScale(3),
            backgroundColor: theme.colors.white,
            width: '100%',
          }}
        />
      </View>
      <View style={[styles.DropDownPicker, { zIndex: openColor ? 1 : 0 }]}>
        <DropDownPicker
          style={styles.dropDown}
          open={openColor}
          setOpen={setOpenColor}
          value={colorValue}
          items={colorItems}
          containerStyle={{ height: moderateScale(40) }}
          setValue={setColorValue}
          placeholder={translations.common.chooseColor}
          onChangeValue={(label: string | null | any) => setColorValue(label)}
          textStyle={{
            color: theme.colors.lightBlue,
            fontWeight: '700',
          }}
          dropDownContainerStyle={{
            borderColor: theme.colors.lightBlue,
            borderWidth: moderateScale(3),
            backgroundColor: theme.colors.white,
            width: '100%',
          }}
        />
      </View>
    </View>
  );
};
