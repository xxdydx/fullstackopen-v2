import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { TouchableWithoutFeedback } from 'react-native-web';
import { ApolloClient, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import AuthStorage from "../utils/AuthStorage";
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import AuthStorageContext from "../contexts/AuthStorageContext";



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
const navigate = useNavigate()
const apolloClient = useApolloClient()
const [reRender, setReRender] = useState(false);
const authStorage = useContext(AuthStorageContext);

let {data} = useQuery (gql`
  query User {
    me {
      id
      username
    }
  }
  `)



const handleSignOut = async (event) => {
  await authStorage.removeAccessToken()
  apolloClient.resetStore()
  navigate('/')

}
  


  return (
    <Pressable>
         <View style={styles.container}>
            <ScrollView horizontal>
            <Link  to='/'><Text style={styles.tab} color='appBarText' fontSize='subheading' fontWeight='bold'>Repositories</Text></Link>
            
            { data && data.me ? <Text style={styles.tab} onPress={handleSignOut} color='appBarText' fontSize='subheading' fontWeight='bold'>Sign Out</Text>
             : <Link to='/signin'><Text style={styles.tab} color='appBarText' fontSize='subheading' fontWeight='bold'>Sign In</Text></Link>}
            </ScrollView>
           
            </View>
    </Pressable>
   
  )
  
};

export default AppBar;