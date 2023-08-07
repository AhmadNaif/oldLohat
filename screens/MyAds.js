import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Pressable } from "react-native";
import { db } from "../config/firebase"
import { collection, doc, deleteDoc, query, onSnapshot, where, } from "firebase/firestore";
import { auth } from "../config/firebase";
import { useEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useLogin } from "../context/LoginProvider";
import { signOut } from "firebase/auth";
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

const MyAdds = () => {
    const [MyAds, setMyAds] = useState([]);
    const { setIsLoggedIn } = useLogin()
    
    const SignOut = () => {
      signOut(auth).then(() => {

      }).catch((error) => {
          console.log(error)
      })
      setIsLoggedIn(false);
  };

    useEffect(() => {
      const getMyAdds = () => {
        const colRef = collection(db, 'adds')
        
        const q = query(colRef, where('uid', '==', `${auth.currentUser.uid}`))

        onSnapshot(q, (snapshot) => {
          const items = []
          snapshot.docs.map((doc) => {
          items.push(({ ...doc.data(), id: doc.id}));
          })
          setMyAds(items);
        });
      };
      getMyAdds();
    }, [])

    const handleDelete = async (id) => {
     const docRef = doc(db, 'adds', id);
     await deleteDoc(docRef);
    };

    return (
      <SafeAreaView className="h-screen bg-slate-100">
      <StatusBar style="dark" />
      <ScrollView>
      <View className="flex flex-col">

          <View className="flex flex-col items-center my-10 ">
              <View className="flex justify-center mx-5">
              <Text className="font-bold text-xl">اعلاناتي</Text>
              </View>
          </View>
          {MyAds.map((Ad, id) => {
              return <View
              key={id}
              className="flex flex-row justify-between bg-white mt-5 mx-4 rounded-lg shadow border-2 border-white"
              >
                  <View className="bg-white rounded-xl w-32">
                      <Image 
                          source={{ uri: `${Ad.imageUrl}`}}
                          style={{ resizeMode: 'contain' }}
                          transition={10}
                           contentFit="cover"
                          className="w-full h-20"
                      />
                  </View>
                  <View className="flex items-end">
                      <Text className="font-bold text-lg mx-2">{Ad.loha}</Text>
                      <Text className="font-bold mx-2 mt-2">للتواصل: {Ad.phoneNumber}</Text>
                      <Text className="font-bold mx-2 mt-3">السعر: {Ad.price} ريال</Text>
                  </View>
                  <Pressable onPress={() => handleDelete(Ad.id)}>
                  <MaterialIcons name="delete" size={24} color="black" />
                   </Pressable>
              </View>
          })}
      </View>
      <TouchableOpacity
            onPress={SignOut}
            >
      <View className="
      bg-blue-600
       rounded-2xl
        h-10
          items-center
           mx-16
            shadow-lg
            mb-20
            mt-10
            "
            >
            
                <Text className="text-white font-bold text-xl my-1">تسجيل خروج</Text>
                
        </View>
        </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
      
    );
}

export default MyAdds;

// <Button title="delete" onPress={() => handleDelete(Ad.id)}/>