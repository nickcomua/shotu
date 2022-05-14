import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { PropsAddContactStack } from '../types/navigation';
import { connect } from 'react-redux';
import { RootState } from '../store';
import SvgQRCode from 'react-native-qrcode-svg';
import { getAuth } from 'firebase/auth';
import * as Clipboard from 'expo-clipboard';
import { TouchableOpacity } from 'react-native-gesture-handler';

const addcontact = connect((state: RootState) => state.user)(({ navigation, username, dispatch }: PropsAddContactStack) => {
    React.useLayoutEffect(() => {
        navigation.getParent().setOptions({
            headerShown: false,
        });
    }, [navigation.getParent()]
    );
    const auth = getAuth()
    const [isLoading, setIsLoading] = React.useState(false); 
    React.useEffect(() => {
        const f = async () => {
         const cbtext = await Clipboard.getStringAsync();
          if(cbtext.length == 28)
          {
              alert("QR code is in clipboard"); 
          }    
          setIsLoading(true);
        }
        f();
      }, [isLoading]);


    return (
    <View style={styles.container}>
        <Button title="from clipboard" onPress={async () => {
            const cbtext = await Clipboard.getStringAsync();
            if(cbtext.length == 28)
            {
                alert("QR code is in clipboard"); 
            }    
        }
        } />
        <Button title='Scan QR code' onPress={() => navigation.push('ScanQR')} />
        <TouchableOpacity onPress={async () => {await Clipboard.setStringAsync(auth.currentUser.uid)}}>
        <SvgQRCode value={auth.currentUser.uid} size={300} />
        </TouchableOpacity>
    </View>
    )
});

export default addcontact

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

})