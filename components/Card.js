import React from "react";
import { 
    View,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import firestore from "@react-native-firebase/firestore";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const RequestsCard = ({data}) => {

    return (
        <View style={{marginVertical: 10}}>
    <Card style={{height: "auto", width: width-30}}>
        <Card.Title title={data.type}/>
        <Card.Content>
            <Text>Patient Name: {data.patientName}</Text>
            <Text>Age: {data.patientAge}</Text>
            <Text>Blood Type: {data.patientBloodType}</Text>
        </Card.Content>
    </Card>

    </View>
    )
}
export default RequestsCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});