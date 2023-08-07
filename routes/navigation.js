import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import AddAd from '../screens/addAd';
import Profile from '../screens/Profile';
import SignUp from '../screens/SignUp';
import { useContext } from 'react';
import { useLogin } from '../context/LoginProvider';
import MyAds from '../screens/MyAds';
import UserLogin from '../screens/login';
import NotLoggedInPage from '../screens/SplashPage';
import { AntDesign } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack = createStackNavigator();
function StackGroup (){
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/* <Stack.Screen name='Profile' component={Profile} /> */}
            <Stack.Screen name='MyAds' component={MyAds} />
        </Stack.Navigator>
    )
}


function StackNot (){
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='SplashPage' component={NotLoggedInPage}/>
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='login' component={UserLogin}/>
        </Stack.Navigator>
    )
}


const Tab = createBottomTabNavigator();

function TabGroup (){
    return (
        <Tab.Navigator  screenOptions={({ route }) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'الرئيسية') {
                    iconName = focused ?   
                 'home-sharp'
                : 'home-outline';
                } else if (route.name === 'اضف اعلان') {
                    iconName = focused ?
                     'add-circle-sharp' 
                     : 'add-circle-outline';
                } else if (route.name === 'الملف الشخصي') {
                    iconName = focused ? 'person-circle-sharp' : 'person-circle-outline';
                }
                return <Ionicons name={iconName} size={size} color={color}/>
            },
            tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'gray',
        })}>
            <Tab.Screen options={{ headerShown: false }} name='الرئيسية' component={Home} />
            <Tab.Screen options={{ headerShown: false }} name='اضف اعلان' component={AddAd} />
            <Tab.Screen options={{ headerShown: false }} name='الملف الشخصي' component={StackGroup} />
        </Tab.Navigator>
    )
}


function Navigation() {
    const {isLoggedIn} = useLogin();
    
    return ( 
       
        isLoggedIn ? <TabGroup/> : <StackNot/>
       
        
    )
}

export default Navigation;


// <ion-icon name="home-outline"></ion-icon>