import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useLogin } from "../context/LoginProvider";
import { StatusBar } from 'expo-status-bar';

const schema = Yup.object().shape({
    email: Yup.string().email("ادخل الايميل")
    .required("ادخل الايميل")
    .max(255),
    password: Yup
    .string("ادخل الرمز")
    .required('ادخل الرمز')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "اقل شي 8 خانات, تتكون من حرف كبير وحرف صغير ورقم وعلامة مثل @#*"
    )
      
    

  })

export default function SignUp() {
    const { setIsLoggedIn } = useLogin()
    const { navigate } = useNavigation();
    const [user, setUser] = useState({});
    const [err, setErr] = useState("");


    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    });

    return (
       <SafeAreaView className="h-screen bg-slate-100">
       <StatusBar style="dark" />
       <ScrollView>
       <View className="flex flex-row justify-center mt-40">
        <Text className="font-bold text-3xl">تسجيل حساب</Text>
       </View>
          <Formik initialValues={{
            email: '',
            password: '',
            
          }}
          validateOnChange={true}
          validateOnBlur={false}
          validationSchema={schema}
          onSubmit={(values, actions) => {
            actions.resetForm();
             {
       createUserWithEmailAndPassword(auth, values.email, values.password)
       .then(() => {
        setIsLoggedIn(true)
       }).catch(err => {
        setErr(err);
       })}
           
          }}
          >
          {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit}) => (
            <View className="flex flex-cols justify-center py-20 px-10">
            <View className="my-4 border-b-2 border-gray-300 mx-10">
              <TextInput 
              placeholder="الايميل"
               className="font-bold mx-2 my-3 text-right" 
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => handleBlur('اكتب الايميل')}
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
                onBlur={() => handleBlur('اكتب رقم التواصل')}
               />
               {touched.password && errors.password ? (
                <Text className="text-red-600 mt-1 text-right">{errors.password}</Text>
               ) : null}
            </View>
            
           {err ? <View className="flex items-center">
            <Text className="text-red-500">email already in use</Text>
           </View> : null}
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
            onPress={() => {navigate("login")}}
            >
            <View className="flex flex-row justify-center mt-10">
                   <Text className="mx-1 font-bold text-blue-700 underline">سجل دخول</Text>
                   <Text className="font-bold">عندك حساب؟</Text>
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