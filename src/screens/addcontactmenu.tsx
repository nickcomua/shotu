import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PropsAddContactMenuStack } from '../types/navigation'
import { db, auth } from '../firebase'
import { ref, set, push, get, child, update } from "firebase/database";


const Addcontactmenu = ({ route }: PropsAddContactMenuStack) => {
    const myuid = auth.currentUser.uid
    const notmyuid = route.params.QrCode
    console.log('uid', myuid, notmyuid)
    get(ref(db, `contacts`)).then((snapshot) => {
        if (snapshot.exists()) {
            type contact = { uid1: string, uid2: string, isFinite: boolean }
            const arr: { [key: string]: contact } = snapshot.val();
            const keys = Object.keys(arr)
            console.log(arr)
            console.log(keys)
            if (keys.filter(key => arr[key].uid1 === myuid && arr[key].uid2 === notmyuid).length === 1)
                Alert.alert("invitation already added")
            else {
                const key = keys.filter(key => arr[key].uid1 === notmyuid && arr[key].uid2 === myuid)
                if (key.length === 1) {
                    if (arr[key[0]].isFinite === true)
                        Alert.alert("contact already added")
                    else if (arr[key[0]].isFinite === false) {
                        Alert.alert("contact approved")
                        update(ref(db, `contacts/${key}`), { isFinite: true })
                    }
                }
                else {
                    Alert.alert("invitation added")
                    push(ref(db, `contacts`), { uid1: myuid, uid2: notmyuid, isFinite: false })
                }
            }
        }
        else {
            set(push(ref(db, 'contacts')), { uid1: myuid, uid2: notmyuid, isFinite: false }).catch((error) => {
                console.error(error);
            });
        }
    })
        .then(() => {
            console.log('success')
        })
        .catch((error) => {
            console.log(error)
        });




    console.log(route.params.QrCode);
    return (
        <View>
            <Text>addcontactmenu</Text>
        </View>
    )
}

export default Addcontactmenu

const styles = StyleSheet.create({})