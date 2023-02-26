import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Button, View } from "react-native";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import * as yup from "yup";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
  passConf: "",
};

const styles = StyleSheet.create({
  form: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 30,
    paddingTop: 50,
  },
  inputs: {
    marginBottom: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  passConf: yup.string().required(),
});

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <View style={styles.inputs}>
        <FormikTextInput
          name="username"
          placeholder="Username"
        ></FormikTextInput>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry={true}
        ></FormikTextInput>
        <FormikTextInput
          name="passConf"
          placeholder="Password Confirmation"
          secureTextEntry={true}
        ></FormikTextInput>
      </View>

      <Button style={styles.button} onPress={onSubmit} title="Sign Up"></Button>
    </View>
  );
};

const SignUp = () => {
  const [signup] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signup({ username, password });
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
