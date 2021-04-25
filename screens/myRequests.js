import React, {useState, useEffect} from "react";
import { 
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    Image
} from "react-native";
import {Title, ActivityIndicator, Button, Text} from "react-native-paper"
import RequestsCard from "../components/Card"
import firestore from "@react-native-firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";

const Results = ({navigation, route}) =>
    {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const user = route.params.user
    const ref = firestore().collection(user.uid)

    useEffect(() => {
      return ref.onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          list.push({
            id: doc.id,
            data: doc.data()
          });
        });
  
        setData(list);
        console.log(data)
        if (loading) {
          setLoading(false);
        }
      });
    }, []);

    if (data.length === 0)
    {
      return(
        <>
        <View>
        <View style={{alignItems: "center", justifyContent: "center", height: 150, marginTop: 20}}>
            <Image source={require("../assets/appBar.png")}/>
        </View>
        </View>
        <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
          <Title style={{fontWeight: "400"}}>No requests have been made yet!</Title>
        </View>
        </>
      )
    }

    if (loading)
    {
        return <ActivityIndicator size="large"/>
    }

    return (
      <>
      <View>
        <View style={{alignItems: "center", justifyContent: "center", height: 150, marginTop: 20}}>
            <Image source={require("../assets/appBar.png")}/>
        </View>
        </View>
      <SafeAreaView style={{flex: 1, marginTop: 10, marginHorizontal: 20}}>
        <FlatList 
          style={{flex: 1}}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RequestsCard {...item} />}
        />
      </SafeAreaView>
      </>
    );
  }
export default Results;
