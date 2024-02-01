import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable as Presumable,
  View,
  Text,
  Modal,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchListOfCars, selectCarList } from '../../redux/reducers/carsSlice';
import CarComponent from './CarComponent';
import { theme } from '../../theme';
import { Car } from '../../API/types';
import { useLanguage } from '../../hooks/useLanguage';
import DropDownPicker from '../../components/DropDownFilter';
import RangeSlider from '../../components/RangeFilter/index';
import filterCars from '../../API/filterCars';
import DropDownSorting from '../../components/DropDownSorting';

const styles = ScaledSheet.create({
  input: {
    height: moderateScale(40),
    borderWidth: moderateScale(2),
    padding: theme.paddings.small,
    borderRadius: theme.borderRadius.medium,
    borderColor: theme.colors.blueGreen,
    backgroundColor: theme.colors.white,
    width: moderateScale(260),
    color: theme.colors.blueGreen,
  },
  buttons: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: moderateScale(50),
    paddingLeft: theme.paddings.large,
    paddingRight: theme.paddings.large,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.white,
  },
  buttonBlue: {
    backgroundColor: '#2196F3',
    alignItems: 'center',
    width: moderateScale(120),
    height: moderateScale(60),
    borderRadius: theme.borderRadius.large,
    justifyContent: 'center',
  },

  buttonOpen: {
    backgroundColor: theme.colors.blueGreen,
    height: moderateScale(40),
    width: moderateScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.large,
  },

  textStyle: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: theme.fontSizes.large,
  },
  modalText: {
    marginBottom: theme.margins.medium,
    textAlign: 'center',
  },

  inputBtnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: theme.paddings.medium,
    paddingRight: theme.paddings.medium,
    width: '100%',
    justifyContent: 'space-between',
    paddingTop: theme.paddings.small,
  },
});

export enum SortYearType {
  ascending = 'Year  from low to high',
  descending = 'Year  from high to low',
}
export enum SortPriceType {
  ascending = 'Year  from low to high',
  descending = 'Year  from high to low',
}
export interface DropDownItem {
  id: number;
  value: string;
  label: string;
}

export default () => {
  const [modelValue, setModelValue] = useState<string>('');
  const [colorValue, setColorValue] = useState<string>('');
  const [brandValue, setBrandValue] = useState<string>('');
  const [fuelValue, setFuelValue] = useState<string>('');
  const [engineValue, setEngineValue] = useState<string>('');
  const [transmissionValue, setTransmissionValue] = useState<string>('');
  // dropDownValue
  const [lowPrice, setLowPrice] = useState<number>(0);
  const [highPrice, setHighPrice] = useState<number>(10000);
  const [lowYear, setLowYear] = useState<number>(1950);
  const [highYear, setHighYear] = useState<number>(2023);
  const [lowMileage, setLowMileage] = useState<number>(0);
  const [highMileage, setHighMileage] = useState<number>(1000000);
  // rangeSliderValue
  const cars = useAppSelector(selectCarList);
  const dispatch = useAppDispatch();
  const translations = useLanguage();
  const [filteredCars, setFilteredCars] = useState<Car[]>();
  const [search, setSearch] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);
  // other
  const [brandItems, setBrandItems] = useState([]);
  const [modelItems, setModelItems] = useState([]);
  const [colorItems, setColorItems] = useState([]);
  // Sorting state
  const [sortItemPrice] = useState<DropDownItem[]>([
    {
      value: SortPriceType.ascending,
      label: SortPriceType.ascending,
      id: 1,
    },
    {
      label: SortPriceType.descending,
      value: SortPriceType.descending,
      id: 2,
    },
  ]);
  const [valueSortPrice, setValueSortPrice] = useState<string | null>('');

  const [sortItemYear] = useState<DropDownItem[]>([
    {
      value: SortYearType.ascending,
      label: SortYearType.ascending,
      id: 1,
    },
    {
      label: SortYearType.descending,
      value: SortYearType.descending,
      id: 2,
    },
  ]);
  const [valueSortYear, setValueSortYear] = useState<string | null>('');

  const fetchCars = async () => {
    const response = await dispatch(fetchListOfCars()).unwrap();

    setBrandItems(
      response.data.map((item: { brand: Car }) => ({
        label: item.brand.name,
        value: item.brand.name,
      })),
    );
    setModelItems(
      response.data.map((item: { model: Car }) => ({
        label: item.model.name,
        value: item.model.name,
      })),
    );
    setColorItems(
      response.data.map((item: { exterior_color: Car }) => ({
        label: item.exterior_color,
        value: item.exterior_color,
      })),
    );
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

  const filterName = (text: string) => {
    if (text) {
      const newData = cars.filter(item => {
        const itemData = item.brand.name ? item.brand.name.toUpperCase() : '';
        const textData = text.toUpperCase().trim();

        return itemData.indexOf(textData) > -1;
      });

      setFilteredCars(newData);
      setSearch(text);
    } else {
      setSearch(text);
    }
  };
  const callFilterCars = async () => {
    const response = await filterCars({
      brandValue,
      engineValue,
      modelValue,
      fuelValue,
      transmissionValue,
      colorValue,
      highMileage,
      highPrice,
      lowPrice,
      highYear,
      lowYear,
      lowMileage,
    });

    setFilteredCars(response.data);
    setModalVisible(!modalVisible);
  };

  // sorting logic
  const sortByPrice = (label: string | null) => {
    setValueSortPrice(label);

    if (valueSortPrice === SortPriceType.ascending) {
      const fromLow = [...cars];
      fromLow.sort((a: Car, b: Car) => a.price - b.price);
      setFilteredCars(fromLow);
    } else if (valueSortPrice === SortYearType.descending) {
      const fromHigh = [...cars];
      fromHigh.sort((a: Car, b: Car) => b.price - a.price);
      setFilteredCars(fromHigh);
    }
  };
  const sortByYear = (label: string | null) => {
    setValueSortYear(label);

    if (valueSortYear === SortYearType.ascending) {
      const fromLow = [...cars];
      fromLow.sort((a: Car, b: Car) => a.year - b.year);
      setFilteredCars(fromLow);
    } else if (valueSortYear === SortYearType.descending) {
      const fromHigh = [...cars];
      fromHigh.sort((a: Car, b: Car) => b.year - a.year);
      setFilteredCars(fromHigh);
    }
  };

  return (
    <View>
      <View style={styles.inputBtnContainer}>
        <TextInput
          style={styles.input}
          placeholder={translations.common.search}
          onChangeText={text => filterName(text)}
          value={search}
          placeholderTextColor={theme.colors.blueGreen}
        />
        <Presumable
          style={styles.buttonOpen}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Filters</Text>
        </Presumable>
      </View>
      <DropDownSorting
        valueSortPrice={valueSortPrice}
        sortItemPrice={sortItemPrice}
        setValueSortPrice={setValueSortPrice}
        sortByPrice={sortByPrice}
        valueSortYear={valueSortYear}
        setValueSortYear={setValueSortYear}
        sortItemYear={sortItemYear}
        sortByYear={sortByYear}
      />

      <FlatList
        data={filteredCars}
        renderItem={({ item }) => <CarComponent item={item} />}
        keyExtractor={item => item.id.toString()}
      />
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <DropDownPicker
              colorValue={colorValue}
              brandItems={brandItems}
              modelItems={modelItems}
              modelValue={modelValue}
              brandValue={brandValue}
              fuelValue={fuelValue}
              transmissionValue={transmissionValue}
              engineValue={engineValue}
              colorItems={colorItems}
              setModalValue={setModelValue}
              setBrandValue={setBrandValue}
              setTransmissionValue={setTransmissionValue}
              setFuelValue={setFuelValue}
              setEngineValue={setEngineValue}
              setColorValue={setColorValue}
            />
            <RangeSlider
              setLowPrice={setLowPrice}
              setHighPrice={setHighPrice}
              setLowYear={setLowYear}
              setHighYear={setHighYear}
              setLowMileage={setLowMileage}
              setHighMileage={setHighMileage}
              lowPrice={lowPrice}
              highPrice={highPrice}
              lowMileage={lowMileage}
              highMileage={highMileage}
              lowYear={lowYear}
              highYear={highYear}
            />
            <View style={styles.buttons}>
              <Presumable
                style={styles.buttonBlue}
                onPress={() => callFilterCars()}>
                <Text style={styles.textStyle}>Filter</Text>
              </Presumable>
              <Presumable
                style={styles.buttonBlue}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Filter</Text>
              </Presumable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};
