import React, { Component } from 'react'
import { Dimensions, Text, TouchableOpacity } from 'react-native'
import MapView, {
    Marker,
    AnimatedRegion,
} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import firebase from '../../Config/Fire'

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8822179;
const LONGITUDE = 67.0652013;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class Map extends Component {
    constructor() {
        super()
        this.state = {
            marker_lat: LATITUDE,
            marker_long: LONGITUDE,
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
            }),
        }
    }

    async componentDidMount() {
        await Permissions.askAsync(Permissions.LOCATION);
        let uid = await firebase.auth().currentUser.uid
        firebase.database().ref("users/" + uid + "/current").on("value", (data) => {
            this.setState({ uid, opponentID: data.val() })
        })

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });

        Location.watchPositionAsync({ timeInterval: 1000, distanceInterval: 0.1 }, loc => {
            this.setState({ marker_long: loc.coords.longitude, marker_lat: loc.coords.latitude })
        })
    }

    done() {
        let msg = 'Latitude: ' + this.state.marker_lat + ' , '  + 'Logitude: ' + this.state.marker_long
        let today = new Date()
        let created = today.getHours() + ":" + today.getMinutes() + ',' + today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let msgObj = {
            msg,
            created,
            sender: "me",
            type: 'message',
        }
        firebase.database().ref(`chatRoom/${this.state.uid}/${this.state.opponentID}`).push(msgObj).then(() => {
            msgObj.sender = "opponent"
            firebase.database().ref(`chatRoom/${this.state.opponentID}/${this.state.uid}`).push(msgObj).then(() => {
                this.props.navigation.navigate("Messages")
            })
        })
    }

    render() {
        return (
            <>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: this.state.marker_lat,
                        longitude: this.state.marker_long,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    <Marker
                        ref={marker => {
                            this.marker = marker;
                        }}
                        coordinate={{
                            latitude: this.state.marker_lat,
                            longitude: this.state.marker_long
                        }}
                    />
                </MapView>
                <TouchableOpacity style={{ borderWidth: 1, alignSelf: 'center', padding: 15 }} onPress={() => this.done()}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>Done</Text>
                </TouchableOpacity>
            </>
        )
    }
}

export default Map
