import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useLogin } from "../context/LoginProvider";
import { Formik } from 'formik';
import * as Yup from 'yup';


const schema = Yup.object().shape({
    email: Yup.string().email("ادخل الايميل")
    .required("ادخل الايميل"),
    password: Yup.string("ادخل الرمز")
    .required("ادخل الرمز")
    
    

  })

  export default function UserLogin (){
    const { setIsLoggedIn } = useLogin()
    const { navigate } = useNavigation();
    const [err, setErr] = useState("");
    
    

    

    
    

    return (
        <SafeAreaView className="h-screen bg-slate-100">
        <ScrollView>
        <View className="flex flex-row mt-40 justify-center">
        <Text className="font-bold text-3xl">تسجيل دخول</Text>
       </View>
          <Formik initialValues={{
            email: '',
            password: '',
            
          }}
          validateOnChange={false}
          validateOnBlur={true}
          validationSchema={schema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
            setIsLoggedIn(true)
        }).catch( err => {
          setErr(err)
        })
           
          }}
          >
          {({values, errors, touched, handleChange, isValid, handleSubmit, handleBlur}) => (
            <View className="flex flex-cols justify-center py-20 px-10">
            <View className="my-4 border-b-2 border-gray-300 mx-10">
              <TextInput 
              placeholder="الايميل"
               className="font-bold mx-2 my-3 text-right" 
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => handleBlur('ايميل')}
               />
               {touched.email && errors.email ? (
                <Text className="text-red-600 mt-1 text-right">{errors.email}</Text>
               ) : null}
            </View>
            <View className="my-4 border-b-2 border-gray-300 mx-10">
              <TextInput 
              placeholder="الرمز"
               className="font-bold mx-2 my-3 text-right" 
               value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('الرمز')}
               />
               {touched.email && errors.password ?  (
                <Text className="text-red-600 mt-1 text-right">{errors.password}</Text>
               ) : null}
            </View>
            
           <View className="flex items-center">
            {err ? <Text className="text-red-500">الايميل او الرمز غير صحيح</Text> : null}
           </View>
            <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.submitBtn,
            {backgroundColor: isValid ? '#2563EB' : '#93C5FD'},
            ]}
            disabled={!isValid}
            >
            <Text style={styles.submitBtnTxt}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {navigate("SignUp")}}
            >
            <View className="flex flex-row justify-center mt-10">
                   <Text className="mx-1 font-bold text-blue-700 underline">سجل هنا</Text>
                   <Text className="font-bold">ما عندك حساب؟</Text>
                </View>
                </TouchableOpacity>
            </View>
            
          )}
    
          </Formik>
        </ScrollView>
            
        </SafeAreaView>
       
    );
};

const styles = StyleSheet.create({
    submitBtn: {
      backgroundColor: '#395B64',
      padding: 12,
      marginTop: 29,
      borderRadius: 15,
      justifyContent: 'center'
    },
    submitBtnTxt: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '700'
    }
  })