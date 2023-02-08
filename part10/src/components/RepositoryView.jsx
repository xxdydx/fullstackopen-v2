import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import { FlatList, View, StyleSheet, Image } from 'react-native';
import Text from './Text';


const styles = StyleSheet.create({
    topContainer: {
      display:'flex',
      flexDirection:'row',
      padding:20,
    },
    topTextContainer: {
      display:'flex',
      paddingLeft: 10,
      flexDirection:'column',
      width: '85%',
      backgroundColor:'white'
    },
    bottomContainer: {
      display:'flex',
      padding: 15,
      flexDirection: 'row'
    },
    bottomStatsContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'center',
      flexGrow: 1,
      alignItems:'center'
    },
    separator: {
      height:10,
      backgroundColor: '#d1d1cf'
    },
    avatar: {
      width: 50,
      height: 50,
     
  
    }
  
  });

  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${Math.round(num /1000 * 10) / 10}k`
    }
    else {
      return num
    }
  }
  
  

const RepositoryView = () => {
  const { id } = useParams()
  const {item, loading} = useRepository(id)
  console.log(item)

  if (loading === true) {
    return <Text>Loading...</Text>
  }

  return (
    <View key={item.id} style={styles.container}>
    <View style={styles.topContainer}>
    <Image
          style={styles.avatar}
          source={{ uri: item.ownerAvatarUrl }}
          />
      
    <View style={styles.topTextContainer}>
    <Text fontSize='subheading' fontWeight='bold'>{item.fullName}</Text>
      <Text >{item.description}</Text>
      <Text fontWeight='bold' color='primary'>{item.language}</Text>
    </View>
    </View>
    
    <View style={styles.bottomContainer}>
      <View style={styles.bottomStatsContainer}>
        <Text fontWeight='bold'>{formatNumber(item.stargazersCount)}</Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.bottomStatsContainer}>
        <Text fontWeight='bold'>{formatNumber(item.forksCount)}</Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.bottomStatsContainer}>
        <Text fontWeight='bold'>{formatNumber(item.reviewCount)}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.bottomStatsContainer}>
        <Text fontWeight='bold'>{formatNumber(item.ratingAverage)}</Text>
        <Text>Rating</Text>
      </View>
    
  
    </View>
      
      
      
  </View>

  )  
}

export default RepositoryView