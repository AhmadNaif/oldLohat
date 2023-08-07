import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, Alert} from "react-native"
import { db } from "../config/firebase"
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, storage } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';



const schema = Yup.object().shape({
  loha: Yup.string()
  .min(2, 'اللوحة لازم تكون من رقم وحرف')
  .max(10, 'بالغت في اللوحة')
  .required('لازم تدخل اللوحة'),
  phoneNumber: Yup.string()
  .min(10, 'لازم تدخل رقم مكون من 10 ارقام')
  .max(10, 'عشر ارقام فقط')
  .matches(/^[0-9]+$/, 'ارقام فقط')
  .required('لازم تدخل رقم التواصل'),
  price: Yup.string()
  .required('لازم تدخل السعر'),
  image: Yup.mixed()
  
  
      
  
})




export default function AddAd() {
  
  const [uid, setUid] = useState(auth.currentUser.uid);
  const [image, setImage] = useState(null);
  const [imageUrl, setimageUrl] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  

  const createTwoButtonAlert = () =>
      Alert.alert('تم الارسال', '.', [
        
      ]);

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "Stuff/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        
      },
      (error) => {
        // handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setimageUrl(downloadURL);
          // save record
         
        });
      }
    );
  }

 
  return (
   <SafeAreaView className="h-screen bg-slate-100">
   
   <StatusBar style="dark" />
   <ScrollView>
      <Formik
      initialValues={{
        loha: '',
        phoneNumber: '',
        price: '',
        image: ''
      }}
      validateOnChange={true}
      validateOnBlur={true}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        addDoc(collection(db, 'adds'), {
          loha: values.loha,
          phoneNumber: values.phoneNumber,
          price: values.price,
          uid: uid,
          imageUrl: imageUrl
        }, uploadImage().catch((err) => {
          console.log(err)
        }, createTwoButtonAlert()))
      }}
      >
        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit}) => (
          <View className="my-44">
          <View className="border-b-2 border-gray-300 mx-10">
          
          <TextInput placeholder="اكتب اللوحة" className="text-right text-lg mx-2 my-2"
            value={values.loha}
            onChangeText={handleChange('loha')}
            onBlur={() => handleBlur('اللوحة')}
          />
          {touched.loha && errors.loha ? (
            <Text className="text-red-500 text-right"> {errors.loha} </Text>
          ) : null}
          </View>
          <View className="my-4 border-b-2 border-gray-300 mx-10">
         <TextInput placeholder="اكتب رقم التواصل" className="text-right text-lg mx-2 my-2"
          value={values.phoneNumber}
          onChangeText={handleChange('phoneNumber')}
          onBlur={() => handleBlur('رقم التواصل')}
          keyboardType="phone-pad"
         />
         {touched.phoneNumber && errors.phoneNumber ? (
            <Text className="text-red-600 mt-1 text-right">{errors.phoneNumber}</Text>
           ) : null}
          </View>
          <View className=" border-b-2 border-gray-300 mx-10">
          <TextInput placeholder="اكتب السعر" className="text-right text-lg mx-2 my-2"
            value={values.price}
            onChangeText={handleChange('price')}
            onBlur={() => handleBlur('السعر')}
            keyboardType="phone-pad"
          />
          {touched.price && errors.price ? (
            <Text className="text-red-600 mt-1 text-right">{errors.price}</Text>
           ) : null}
         </View>
          {/* Photo upload */}
         <TouchableOpacity
        className="flex flex-row justify-center mt-5"
        value={values.image}
        onChangeText={handleChange('image')}
        onPress={
          async function pickImage() {
           let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 4],
           quality: 1,
    });
    if (!result.canceled) {
      handleChange(result.assets[0].uri);
      // upload the image
      await uploadImage(result.assets[0].uri, "image");
    }
  }
        }
        >
        <View className="flex justify-center items-center h-12 w-32 border-2 border-gray-300">
          <Text>اضغط لاختيار الصورة</Text>
        </View>
        </TouchableOpacity>
         {/* Ending photo */}
         <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.submitBtn,
        {backgroundColor: isValid ? '#2563EB' : '#93C5FD'},
        ]}
        disabled={!isValid}
        >
        <Text style={styles.submitBtnTxt}>Submit</Text>
        </TouchableOpacity>
          </View>
        )}
      </Formik>
   </ScrollView>
   </SafeAreaView>
    
  )}


  const styles = StyleSheet.create({
    submitBtn: {
      backgroundColor: '#395B64',
      padding: 12,
      marginTop: 29,
      marginHorizontal: 60,
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