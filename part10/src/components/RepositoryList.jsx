import { FlatList, View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import { TouchableHighlight } from 'react-native-web';

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


const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem = {({item, index, separators}) => (
        
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
    />
  );
};

export default RepositoryList;
