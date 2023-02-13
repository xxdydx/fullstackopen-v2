import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Button, View } from "react-native";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import useReview from "../hooks/useReview";

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

const initialValues = {
  ownername: "",
  reponame: "",
  rating: "",
  review: "",
};

const validationSchema = yup.object().shape({
  ownername: yup.string().required(),
  reponame: yup.string().required(),
  rating: yup.number().integer().required().lessThan(101).moreThan(0),
  review: yup.string().required(),
});
const Form = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <View style={styles.inputs}>
        <FormikTextInput
          name="ownername"
          placeholder="Repository Owner Name"
        ></FormikTextInput>
        <FormikTextInput
          name="reponame"
          placeholder="Repository Name"
        ></FormikTextInput>
        <FormikTextInput name="rating" placeholder="Rating"></FormikTextInput>
        <FormikTextInput name="review" placeholder="Review"></FormikTextInput>
      </View>

      <Button onPress={onSubmit} title="Create a Review"></Button>
    </View>
  );
};

const ReviewForm = () => {
  const [review1] = useReview();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { ownername, reponame, rating, review } = values;
    try {
      await review1({ ownername, reponame, rating, review });
      navigate("/");
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
      {({ handleSubmit }) => <Form onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default ReviewForm;
