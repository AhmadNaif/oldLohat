import { View, Text, TextInput, ScrollView, ActivityIndicator, RefreshControl, SafeAreaView, Image, StatusBar } from "react-native"
import { db } from "../config/firebase"
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { auth } from '../config/firebase';
import { useCallback } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { Image } from 'expo-image';


export default function Home() {
  const [adds, setAdds] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
 
  const getAdds = async () => {
    const data = await getDocs(collection(db, "adds"));
    setAdds(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
    setIsLoading(true); 
  };

  useEffect(() => {
    getAdds();
  }, []);

  
  
  
  return (
      <SafeAreaView className="h-screen bg-slate-100">
      <StatusBar style="dark" />
        
        <View className="bg-white h-10 mx-10 rounded-3xl my-10 shadow-lg">
          <TextInput placeholder="ابحث عن اللوحة.." className="text-right mx-4 my-3"
            onChange={(e) => setSearch(e.nativeEvent.text)}
          />
        </View>
        
        <ScrollView
        refreshControl={
          <RefreshControl onRefresh={getAdds} />
        }>
        {isLoading ? ( <View>
          {adds.filter((Ad) => {
            return search.toLowerCase() === '' ? Ad : Ad.loha.toLowerCase().includes(search)
          }).map((Ad, i) => {
            return <View key={i}
            className="flex
          flex-row
          justify-between
          bg-white
          mt-5
          mx-4
          h-24
          rounded-lg
          shadow
          border-white
          border-2
          "
            >
              <View className="flex justify-center bg-white  w-32">
                <Image className="w-full h-16 mx-2" source={{ uri: `${Ad.imageUrl}`}} style={{ resizeMode: "contain"}} 
                  
                  
                />
              </View>
              <View className="flex items-end">
              <Text className="font-bold text-lg mx-2">{Ad.loha}</Text>
              <Text className="font-bold mt-2  mx-2">للتواصل: {Ad.phoneNumber}</Text>
              <Text className="font-bold mt-3  mx-2">السعر: {Ad.price} ريال</Text>
              </View>
            </View>
          })}
        </View> ) : (
          <ActivityIndicator size="large" />
        )}
        
          
        </ScrollView>
      </SafeAreaView>
   )
}



