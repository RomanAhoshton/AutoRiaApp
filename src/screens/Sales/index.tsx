import { View, TextInput, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'expo-checkbox';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Dropdown from '../../components/Dropdown';
import { theme } from '../../theme';
import { ROUTES } from '../../navigation/constants';
import { StyledText } from '../../components';
import { FormData } from '../../types';
import {
  brands,
  models,
  years,
  colors,
  fuelTypes,
  transmissionTypes,
  condition,
} from '../../helpers';
import { AuthenticatedParamList } from '../../navigation/TabNavigation';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  formItem: {
    marginTop: theme.margins.small,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: moderateScale(300),
  },
  dropdownFormItem: {
    borderWidth: moderateScale(1),
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: theme.borderRadius.regular,
    flexDirection: 'row',
    height: moderateScale(45),
  },
  labeledFormItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputWrapper: {
    width: '80%',
    height: moderateScale(40),
    borderWidth: moderateScale(1),
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: theme.borderRadius.regular,
    flexDirection: 'row',
  },
  inputField: {
    left: theme.margins.medium,
    width: '100%',
    height: '100%',
  },
  label: {
    width: '20%',
  },
  checkBoxSection: {
    flexDirection: 'row',
    marginTop: theme.margins.small,
    width: moderateScale(300),
    height: moderateScale(45),
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },
  invalidField: {
    borderColor: theme.colors.red,
  },
  formButtons: {
    flexDirection: 'row',
    marginVertical: theme.margins.large,
  },
  publishButton: {
    marginRight: theme.margins.small,
    backgroundColor: theme.colors.lightGreen,
    borderRadius: theme.borderRadius.regular,
    paddingVertical: theme.paddings.medium,
    paddingHorizontal: theme.paddings.large,
  },
  cancelButton: {
    marginLeft: theme.margins.small,
    backgroundColor: theme.colors.red,
    borderRadius: theme.borderRadius.regular,
    paddingVertical: theme.paddings.medium,
    paddingHorizontal: theme.paddings.large,
  },
});

export default () => {
  const navigation = useNavigation<NavigationProp<AuthenticatedParamList>>();

  const validationSchema = yup.object({
    brand: yup.string().required('Brand is required'),
    model: yup.string().required('Model is required'),
    year: yup.string().required('Year is required'),
    interior_color: yup.string(),
    exterior_color: yup.string(),
    fuel_type: yup.string(),
    transmission: yup.string(),
    engine: yup.string(),
    condition: yup.string().required('Condition is required'),
    is_price_negotiable: yup.boolean(),
    mileage: yup.string(),
    price: yup.string().required('Price is required'),
    description: yup.string().required('Description is required'),
    title: yup.string().required('Title is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.formItem}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View
                style={[
                  styles.dropdownFormItem,
                  errors.brand?.message ? styles.invalidField : {},
                ]}>
                <Dropdown
                  options={brands}
                  setOption={onChange}
                  value={value}
                  placeholder="Choose brand"
                />
              </View>
            )}
            name="brand"
          />
        </View>

        <View style={styles.formItem}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View
                style={[
                  styles.dropdownFormItem,
                  errors.model?.message ? styles.invalidField : {},
                ]}>
                <Dropdown
                  options={models}
                  setOption={onChange}
                  value={value}
                  placeholder="Choose model"
                />
              </View>
            )}
            name="model"
          />
        </View>
        <View style={styles.formItem}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View
                style={[
                  styles.dropdownFormItem,
                  errors.year?.message ? styles.invalidField : {},
                ]}>
                <Dropdown
                  options={years}
                  setOption={onChange}
                  value={value}
                  placeholder="Choose year"
                />
              </View>
            )}
            name="year"
          />
        </View>
        <View style={styles.formItem}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={[styles.labeledFormItem]}>
                <View style={styles.label}>
                  <StyledText style={{ color: theme.colors.black }}>
                    Mileage
                  </StyledText>
                </View>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.mileage?.message ? styles.invalidField : {},
                  ]}>
                  <TextInput
                    style={styles.inputField}
                    keyboardType="numeric"
                    placeholder="Enter mileage"
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              </View>
            )}
            name="mileage"
          />
        </View>
        <View style={styles.formItem}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.labeledFormItem}>
                <View style={styles.label}>
                  <StyledText style={{ color: theme.colors.black }}>
                    Price
                  </StyledText>
                </View>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.price?.message ? styles.invalidField : {},
                  ]}>
                  <TextInput
                    style={styles.inputField}
                    keyboardType="numeric"
                    placeholder="Enter price (USD)"
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              </View>
            )}
            name="price"
          />
        </View>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.checkBoxSection}>
                <CheckBox
                  disabled={false}
                  value={value}
                  onValueChange={onChange}
                />
                <StyledText
                  style={{ marginLeft: 5, color: theme.colors.black }}>
                  Select if the price is negotiable
                </StyledText>
              </View>
            )}
            name="is_price_negotiable"
          />
        </View>
        <View style={styles.formItem}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.labeledFormItem}>
                <View style={styles.label}>
                  <StyledText style={{ color: theme.colors.black }}>
                    Interior
                  </StyledText>
                </View>
                <View style={[styles.dropdownFormItem, { width: '80%' }]}>
                  <Dropdown
                    options={colors}
                    setOption={onChange}
                    value={value}
                    placeholder="Choose color"
                  />
                </View>
              </View>
            )}
            name="interior_color"
          />
        </View>
        <View style={styles.formItem}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.labeledFormItem}>
                <View style={styles.label}>
                  <StyledText style={{ color: theme.colors.black }}>
                    Exterior
                  </StyledText>
                </View>
                <View style={[styles.dropdownFormItem, { width: '80%' }]}>
                  <Dropdown
                    options={colors}
                    setOption={onChange}
                    value={value}
                    placeholder="Choose color"
                  />
                </View>
              </View>
            )}
            name="exterior_color"
          />
        </View>
        <View style={styles.formItem}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.dropdownFormItem}>
                <Dropdown
                  options={fuelTypes}
                  setOption={onChange}
                  value={value}
                  placeholder="Choose fuel type"
                />
              </View>
            )}
            name="fuel_type"
          />
        </View>
        <View style={styles.formItem}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.dropdownFormItem}>
                <Dropdown
                  options={transmissionTypes}
                  setOption={onChange}
                  value={value}
                  placeholder="Choose transmission"
                />
              </View>
            )}
            name="transmission"
          />
        </View>
        <View
          style={[
            styles.formItem,
            errors.engine?.message ? styles.invalidField : {},
          ]}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.labeledFormItem}>
                <View style={[styles.label, { width: '50%' }]}>
                  <StyledText style={{ color: theme.colors.black }}>
                    Engine displacement
                  </StyledText>
                </View>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.engine?.message ? styles.invalidField : {},
                    { width: '50%' },
                  ]}>
                  <TextInput
                    style={styles.inputField}
                    keyboardType="numeric"
                    placeholder="Enter displacement"
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              </View>
            )}
            name="engine"
          />
        </View>
        <View style={styles.formItem}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View
                style={[
                  styles.dropdownFormItem,
                  errors.condition?.message ? styles.invalidField : {},
                ]}>
                <Dropdown
                  options={condition}
                  setOption={onChange}
                  value={value}
                  placeholder="Choose condition"
                />
              </View>
            )}
            name="condition"
          />
        </View>
        <View style={styles.formItem}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.labeledFormItem}>
                <View
                  style={[
                    styles.inputWrapper,
                    { height: moderateScale(100), width: '100%' },
                    errors.description?.message ? styles.invalidField : {},
                  ]}>
                  <TextInput
                    multiline={true}
                    textAlignVertical="top"
                    style={[
                      styles.inputField,
                      { paddingTop: theme.paddings.small },
                    ]}
                    placeholder="Any special features"
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              </View>
            )}
            name="description"
          />
        </View>
        <View style={styles.formItem}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.labeledFormItem}>
                <View style={styles.label}>
                  <StyledText style={{ color: theme.colors.black }}>
                    Title
                  </StyledText>
                </View>
                <View
                  style={[
                    styles.inputWrapper,
                    errors.title?.message ? styles.invalidField : {},
                  ]}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Title"
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              </View>
            )}
            name="title"
          />
        </View>

        <View style={styles.formButtons}>
          <Pressable
            style={styles.publishButton}
            onPress={handleSubmit(onSubmit)}>
            <StyledText>Publish</StyledText>
          </Pressable>
          <Pressable
            style={styles.cancelButton}
            onPress={() => navigation.navigate(ROUTES.HOME)}>
            <StyledText>Cancel</StyledText>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
