import React, {useState, useEffect} from "react";
import { 
    View,
    StyleSheet,
    Image,
    Dimensions
} from "react-native";


import {Text, Title, Paragraph, Button, TextInput, Dialog, Portal} from "react-native-paper"

import firestore from "@react-native-firebase/firestore";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height



const Contact = ({navigation, route}) => {

    const [contactName, setContactName] = useState("")
    const [contactRelation, setContactRelation] = useState("")
    const [contactPhone, setContactPhone] = useState("")
    const [dialog, setDialog] = useState(false)
    const ref = firestore().collection(route.params.user.uid);

    async function addToDB(name, age, bloodType, hospital, region, contactName, contactRelation, contactPhone, contactEmail, type, message) {
        await ref.add({
        type: type,
        patientName: name,
        patientAge: age,
        patientBloodType: bloodType,
        patientHospital: hospital,
        patientRegion: region,
        contactName: contactName,
        contactRelation: contactRelation,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
        message: message,
        });
      }

    const post = (name, age, bloodType, hospital, region, contactName, contactRelation, contactPhone, contactEmail, type) => {
        var message = `Type of Request: ${type} \n\nPatient Details: \n\nName: ${name} \nAge: ${age} \nBlood Type: ${bloodType} \nAdmitted in: ${hospital} \nRegion: ${region} \n\nContact Details: \n\nName: ${contactName} \nContact Relationship: ${contactRelation} \nPhone Number: ${contactPhone} \nEmail: ${contactEmail}\n`
        var tweet = message.toString()
        addToDB(name, age, bloodType, hospital, region, contactName, contactRelation, contactPhone, contactEmail, type, tweet)
        fetch(`https://requestcovid19.herokuapp.com/tweets/${tweet}`, {method: 'POST'})
    }


    return(
    <View>
        <View style={{alignItems: "center", justifyContent: "center", height: 150, marginTop: 20}}>
            <Image source={require("../assets/appBar.png")}/>
        </View>
        <View>
        <Title style={{marginLeft: 20}}>Enter contact details</Title>
        <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>

        <TextInput 
            style = {{marginBottom: 10, width: width-20}}
            label = "Enter name of the person to be contacted"
            value = {contactName}
            onChangeText = {text => setContactName(text)}
            />

        <TextInput 
            style = {{marginBottom: 10, width: width-20}}
            label = "Relationship of contact to the patient"
            value = {contactRelation}
            onChangeText = {text => setContactRelation(text)}
            />

        <TextInput 
            style = {{marginBottom: 10, width: width-20}}
            label = "Enter phone number (+91)"
            value = {contactPhone}
            onChangeText = {text => setContactPhone(text)}
            keyboardType = "numeric"
            />
        
        <Button
        mode = "contained"
        color = "#DA1540"
        disabled = {(contactName == "") || (contactPhone == "") || (contactPhone.length != 10) || (contactRelation == "") ? true : false}
        onPress = {()=>{
            setDialog(true)
        }}
        >Submit Request</Button>

        <Text style={{fontWeight: "600", marginTop: 20, padding: 20}}>Note: Swipe from the left edge of the screen to go back and make changes</Text>
        </View>
        </View>

        <Portal>
        <Dialog visible={dialog} onDismiss={()=>{setDialog(false)}}>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to post this request?</Paragraph>
            <Text style={{fontWeight: "600"}}>{route.params.type}</Text>
            <Text></Text>
            <Text style={{fontWeight: "bold"}}>Patient Details:</Text>
            <Paragraph>
                Patient Name: {route.params.name} {"\n"}
                Patient Age: {route.params.age} {"\n"}
                Blood Type: {route.params.bloodType} {"\n"}
                Admitted in: {route.params.hospital} {"\n"}
                Region: {route.params.region} {"\n"}
            </Paragraph>
            <Text style={{fontWeight: "bold"}}>Contact Details:</Text>
            <Paragraph>
                Contact Name: {contactName} {"\n"}
                Relationship with Patient: {contactRelation} {"\n"}
                Phone Number: {contactPhone} {"\n"}
                Email Address: {route.params.user.email} {"\n"}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={()=>{setDialog(false)}} color="#DA1540" style={{marginRight: 10}}>Cancel</Button>
            <Button mode="contained" onPress={()=>{
                post(route.params.name, route.params.age, route.params.bloodType, route.params.hospital, route.params.region, contactName, contactRelation, contactPhone, route.params.user.email, route.params.type)
                setDialog(false)
                navigation.navigate("Request")
                }}>Post</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </View>
    )
}
export default Contact;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});