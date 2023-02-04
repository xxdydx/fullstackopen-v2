import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Button, View } from 'react-native';
import { Formik } from 'formik';
import { StyleSheet } from 'react-native';
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  Username: '',
  Password: '',
};

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection:'column',
    flex:1,
    padding:30,
    paddingTop:50
    
   
  },
  inputs: {
    marginBottom:10
  }
  
})

const validationSchema = yup.object().shape({
  Username: yup
  .string()
  .required(),
  Password: yup
  .string()
  .required()
}
)


const LoginForm = ({onSubmit}) => {
 
  return (
    <View style={styles.form}>
      <View style={styles.inputs}>
      <FormikTextInput name='Username' placeholder='Username'></FormikTextInput>
  <FormikTextInput name='Password' placeholder='Password' secureTextEntry={true}></FormikTextInput>
      </View>
 
  <Button style={styles.button} onPress={onSubmit} title='Sign In'></Button>
</View>
  )
  
}

const SignIn = () => {
  const [signin] = useSignIn()
  const onSubmit = async (values) => {
    const {Username, Password} = values
    try {
      const {data} = await signin({Username, Password})
      console.log(data)

    }
    catch (error) {
      console.log(error);

    }    

  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  
    
  )
};

export default SignIn;
