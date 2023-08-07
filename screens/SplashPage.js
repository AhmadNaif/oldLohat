import { View, Text, Pressable, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useLogin } from "../context/LoginProvider";
import { onAuthStateChanged } from "firebase/auth";
import { StatusBar } from 'expo-status-bar';

const NotLoggedInPage = () => {
    const { setIsLoggedIn } = useLogin();
    const { navigate } = useNavigation();

     
    useEffect(() => {
        onAuthStateChanged(auth, (data) => {
            console.log(data);
        })
    }, [])
    return (
        <SafeAreaView className="h-screen bg-slate-100">
            <StatusBar style="dark" />
                <View className="flex flex-cols items-center my-80">
                <Text className="font-bold text-4xl">مرحبا فيك في لوحات</Text>
                <TouchableOpacity
                 onPress={() => {navigate("login")}}
                >
                    <View className="bg-blue-700 border-2 px-12 py-3 shadow-lg rounded-md mt-5">
                        <Text className="text-white font-bold text-xl">تسجيل دخول</Text>
                    </View>
                    </TouchableOpacity>
                <TouchableOpacity
                className="mt-5"
                onPress={() => {navigate("SignUp")}}
                >
                <View className="flex flex-row">
                   <Text className="mx-1 font-bold text-blue-700 underline">سجل هنا</Text>
                   <Text className="font-bold">ما عندك حساب؟</Text>
                </View>
                </TouchableOpacity>
                </View>
            
        </SafeAreaView>
    );
};


export default NotLoggedInPage;
