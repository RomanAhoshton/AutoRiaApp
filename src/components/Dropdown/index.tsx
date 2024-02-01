import { useState } from 'react';
import { View, Modal, Pressable, ScrollView } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import StyledText from '../StyledText';
import { theme } from '../../theme';

interface Props {
  options: string[];
  setOption: (option: string) => void;
  value: string;
  placeholder: string;
}

const styles = ScaledSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: theme.colors.white,
    width: '100%',
    height: '40%',
    borderRadius: theme.borderRadius.regular,
    padding: theme.paddings.large,
    alignItems: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 15,
  },
  optionText: {
    textAlign: 'center',
    color: theme.colors.black,
    marginTop: theme.margins.small,
  },
  title: {
    color: theme.colors.black,
    left: theme.margins.medium,
  },
});

export default ({ options, setOption, value, placeholder }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const chooseOption = (option: string) => {
    setOption(option);
    setModalVisible(false);
  };

  return (
    <View style={{ width: '100%' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          <View style={styles.modalView}>
            <ScrollView
              style={{ marginTop: theme.margins.small, width: '100%' }}>
              {options.map((option, index) => (
                // index will be replaced with option id later
                <Pressable onPress={() => chooseOption(option)} key={index}>
                  <View style={{}}>
                    <StyledText style={styles.optionText}>{option}</StyledText>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        {value ? (
          <StyledText style={styles.title}>{value}</StyledText>
        ) : (
          <StyledText style={{ left: theme.margins.medium }}>
            {placeholder}
          </StyledText>
        )}
      </Pressable>
    </View>
  );
};
