import React, {useState, useEffect} from "react";
import { 
    View,
    StyleSheet,
    Image,
    Dimensions
} from "react-native";

import {Text, Title, Paragraph, Button, TextInput} from "react-native-paper"
import RNPickerSelect from "react-native-picker-select";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const goToContact = (name, age, region, hospital, bloodType, {navigation, route}) => {
    navigation.navigate("Contact", {
        name: name,
        age: age,
        region: region,
        hospital: hospital,
        bloodType: bloodType,
        type: "#RequestOxygen"
    })
}

const RequestVentilator = ({navigation, route}) =>{ 
    const user = route.params.user;
    const type = "#RequestOxygen"
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [address, setAddress] = useState("")
    const [region, setRegion] = useState("")
    const [bloodType, setBloodType] = useState("")
    
    return(
    <View>
        <View style={{alignItems: "center", justifyContent: "center", height: 150, marginTop: 20}}>
            <Image source={require("../assets/getOxygen.png")}/>
        </View>
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <TextInput 
            style = {{marginBottom: 10, width: width-20}}
            label = "Enter patient name"
            value = {name}
            onChangeText = {text => setName(text)}
            />

            <TextInput 
            style = {{marginBottom: 10, width: width-20}}
            label = "Enter age"
            value = {age}
            onChangeText = {text => setAge(text)}
            keyboardType = "numeric"
            />

            <TextInput 
            style = {{marginBottom: 10, width: width-20}}
            label = "Enter region (State / Union Territory)"
            value = {region}
            onChangeText = {text => setRegion(text)}
            />    

            <TextInput 
            style = {{marginBottom: 10, width: width-20}}
            label = "Enter hospital name (Name, Branch)"
            value = {address}
            onChangeText = {text => setAddress(text)}
            />   

            <View style={{width: width-20, alignItems: "flex-start", justifyContent: "center"}}>
                <Title style={{fontSize: 16}}>Please choose blood type:</Title>
            <View style={{marginVertical: 10, backgroundColor: "#E59E18", paddingVertical: 20, paddingHorizontal:10, borderRadius: 10}}>
            <RNPickerSelect
                placeholder={{ label: "Select your blood type", value: null }}
                 onValueChange={(value) => setBloodType(value)}
                 items={[
                     { label: "A+", value: "A+" },
                     { label: "B+", value: "B+" },
                     { label: "O+", value: "O+" },
                     { label: "A-", value: "A-" },
                     { label: "B-", value: "B-" },
                     { label: "O-", value: "O-" },
                     { label: "AB+", value: "AB+" },
                     { label: "AB-", value: "AB-" },
                 ]}

             />
             </View>
             </View>
             <Button
             mode="contained"
             style={{
                 marginTop: 50,
                 height: 40,
                 alignItems: "center", justifyContent: "center",
                 width: width - 20,
             }}
             disabled = {(name === "") || (age == "") || (region == "") || (address == "") || (!bloodType) ? true : false}
             onPress = {()=>{goToContact(name, age, region, address, bloodType, {navigation, route})}}
             >Next</Button>
        </View>
</View>
    )}
export default RequestVentilator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});