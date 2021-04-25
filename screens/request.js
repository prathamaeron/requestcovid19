import React from "react";
import { 
    View,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView,
} from "react-native";
import {Card, Text, Title, Paragraph, Button} from "react-native-paper"

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Request = ({navigation, route}) => (
    <View>
        <View style={{alignItems: "center", justifyContent: "center", height: 150, marginTop: 20}}>
            <Image source={require("../assets/appBar.png")}/>
        </View>
    <ScrollView style={{height: height-250}}>

    <View style={styles.container}>
        <View style={{marginBottom: 20}}>
        <Card style={{height: 'auto', width: width - 20}}>
    <Card.Content>
      <Image source={require('../assets/getPlasma.png')}/>
      <Paragraph style={{marginTop: 20}}>Fill in contact and patient details and request for Plasma Donation.</Paragraph>
    </Card.Content>
        </Card>
        <Button mode="contained" color="#DA1540" onPress={()=>{navigation.navigate("Plasma")}}>Fill Form</Button>
        </View>

        <View style={{marginBottom: 20}}>
        <Card style={{height: 'auto', width: width - 20}}>
    <Card.Content>
      <Image source={require('../assets/getOxygen.png')}/>
      <Paragraph style={{marginTop: 20}}>Fill in contact and patient health details and request for Oxygen.</Paragraph>
    </Card.Content>
        </Card>
        <Button mode="contained" color="#E59E18" onPress={()=>{navigation.navigate("Oxygen")}}>Fill Form</Button>
        </View>

        <View style={{marginBottom: 20}}> 
        <Card style={{height: 'auto', width: width - 20}}>
    <Card.Content>
      <Image source={require('../assets/getBed.png')}/>
      <Paragraph style={{marginTop: 20}}>Fill in contact and patient details and request for bed availability.</Paragraph>
    </Card.Content>
        </Card>
        <Button mode="contained" onPress={()=>{navigation.navigate("Bed")}}>Fill Form</Button>
        </View>
        

    </View>
    </ScrollView>
    </View>
    )
export default Request;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});