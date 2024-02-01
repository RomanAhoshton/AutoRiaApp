import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { theme } from '../../../theme';
import { Car } from '../../../API/types';
import { StyledText } from '../../../components';

const styles = ScaledSheet.create({
  text: {
    color: theme.colors.black,
    marginBottom: theme.margins.small,
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    padding: theme.paddings.large,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picture: {
    width: '100%',
    height: moderateScale(200),
    backgroundColor: theme.colors.darkGray,
  },
});

interface Props {
  item: Car;
}

export default ({ item }: Props) => {
  return (
    <View>
      <View style={styles.picture} />
      <View style={styles.textContainer}>
        <View style={styles.spaceBetween}>
          <StyledText
            style={[styles.text, { fontSize: theme.fontSizes.large }]}>
            {item.title}
          </StyledText>
          <StyledText style={styles.text}>{item.exterior_color}</StyledText>
          <StyledText style={styles.text}>{item.interior_color}</StyledText>
          <StyledText style={styles.text}>{item.description}</StyledText>
          <StyledText style={styles.text}>
            {item.brand.headquarters_country}
          </StyledText>
        </View>
        <View style={styles.spaceBetween}>
          <StyledText
            style={{
              color: theme.colors.blueGreen,
              fontSize: theme.fontSizes.large,
              marginBottom: theme.margins.small,
            }}>
            {item.price}
          </StyledText>
          <StyledText style={styles.text}>{item.mileage}</StyledText>
          <StyledText style={styles.text}>{item.engine}</StyledText>
          <StyledText style={styles.text}>{item.transmission}</StyledText>
          <StyledText
            style={[styles.text, { fontSize: theme.fontSizes.large }]}>
            {item.brand.name}
          </StyledText>
        </View>
        <Feather
          name="heart"
          size={theme.iconSizes.tabIcon}
          color={theme.colors.darkGray}
        />
      </View>
    </View>
  );
};
