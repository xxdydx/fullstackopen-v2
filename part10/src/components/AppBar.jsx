import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { TouchableWithoutFeedback } from 'react-native-web';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    height: 75,
    alignItems: 'center'
    // ...
  },
  tab: {
    flexGrow: 0,
    marginLeft: 15
  }
  // ...
});

const AppBar = () => {
  return (
    <Pressable>
         <View style={styles.container}>
            <ScrollView horizontal>
            <Link  to='/'><Text style={styles.tab} color='appBarText' fontSize='subheading' fontWeight='bold'>Repositories</Text></Link>
            <Link to='/signin'><Text style={styles.tab} color='appBarText' fontSize='subheading' fontWeight='bold'>Sign In</Text></Link>
            </ScrollView>
           
            </View>
    </Pressable>
   
  )
  
};

export default AppBar;