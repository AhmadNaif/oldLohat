import Navigation from './routes/navigation';
import 'react-native-gesture-handler';
import LoginProvider from './context/LoginProvider'
import { NavigationContainer } from '@react-navigation/native'
import { Animated } from "react-native";




const av = new Animated.Value(0);
av.addListener(() => {return});


export default function App() {
  

 return (
    <LoginProvider>
    <NavigationContainer>
     <Navigation/>
     </NavigationContainer>
     </LoginProvider>
     
    
    
  );
}




