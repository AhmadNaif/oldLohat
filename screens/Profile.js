
import { View, Text, Image, Button, TextInput, ScrollView, SafeAreaView, Pressable, TouchableOpacity } from "react-native"
import { db } from "../config/firebase"
import { collection, doc, deleteDoc, query, onSnapshot, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useLogin } from "../context/LoginProvider";
import { MaterialIcons } from '@expo/vector-icons'; 


export default function Profile() {
    const [MyAds, setMyAds] = useState([])
    const { setIsLoggedIn } = useLogin()

    useEffect(() => {
        const getMyAdds = () => {
            const colRef = collection(db, 'adds')
            const q = query (colRef, where('uid', '==', `${auth.currentUser.uid}`))
            onSnapshot(q, (snapshot) => {
                const items = []
                snapshot.docs.map((doc) => {
                    items.push(({ ...doc.data(), id: doc.id}));
                })
                setMyAds(items)
            });
        };
        getMyAdds();
    })
    const handleDelete = async (id) => {
        const docRef = doc(db, 'adds', id);
        await deleteDoc(docRef)
    }

    const SignOut = () => {
        signOut(auth).then(() => {

        }).catch((error) => {
            console.log(error)
        })
        setIsLoggedIn(false);
    };
   const { navigate } = useNavigation();
   
   return (
    
      <SafeAreaView className="h-screen bg-slate-100">
        <View className="flex flex-cols">
            <View className="my-10 items-center">
                <Text className="font-bold text-xl">اعلاناتي</Text>
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
      </SafeAreaView>
    
    
    )
}
