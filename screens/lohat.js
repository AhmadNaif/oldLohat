// import { View, Text, TextInput, Image,  ScrollView, RefreshControl, SafeAreaView, } from "react-native"
// import { useEffect, useState } from "react";
// import { db } from "../config/firebase"
// import { collection, getDocs } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { useCallback } from "react";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { StatusBar } from 'expo-status-bar';

// export default function Lohat() {
//     const [adds, setAdds] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
  
//     useEffect(() => {
//         setIsLoading(true);
//         getAdds();
//         setIsLoading(false);
//       }, []);

//     const getAdds = async () => {
//         const data = await getDocs(collection(db, "adds"));
//         setAdds(data.docs.map((doc) => ({...doc.data(), id: doc.id})));  
//       };
    
      
//   return (
//     <View>
//     {adds.map((Ad, i) => {
//         return <View key={i}
//         className="flex
//       flex-row
//       justify-between
//       bg-white
//       mt-5
//       mx-4
//       h-24
//       rounded-lg
//       shadow
//       border-white
//       border-2
//       "
//         >
//           <View className="flex justify-center bg-white  w-32">
//             <Image className="w-full h-16" source={{ uri: `${Ad.imageUrl}`}} style={{ resizeMode: "contain"}} />
//           </View>
//           <View className="flex items-end">
//           <Text className="font-bold text-lg mx-2">{Ad.loha}</Text>
//           <Text className="font-bold mt-2  mx-2">للتواصل: {Ad.phoneNumber}</Text>
//           <Text className="font-bold mt-3  mx-2">السعر: {Ad.price} ريال</Text>
//           </View>
//         </View>
//       })}
//       </View>
//   )
// }