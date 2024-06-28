import React from 'react'
import SplashScreen from './src/main-screens/SplashScreen'

export default class App extends React.Component {
    constructor( props ) {
        super( props )
    }

    /*
        Örnek "Request":

        const data = {
            "v": 1,
            "platform": "app",
            "admmdlid": "12f3894ed72fc7d4e3b98688b20513e20a3fa1adbd08b9662412322138d26533",
            "scope": "8fbff85cb7a2b8cbd53b3086c0b16d4c1e96a5d748cbf8761bace32ab294e83a",
//-->          ^ Yukarıdaki 4 key API'ın çalışması için zorunludur. Eksik olmaları durumunda API hata (418) verecektir.

            "fcm_token": fcm_token,
            "pn_type": 3,
            "pn_delay": 1,
            "dev_mode": false
        }

        const response = await fetch(
            "https://challenges.cask.com.tr/api",
            {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )
     */


    render() {
        return <SplashScreen
                style={{width:'100%', flex:1, backgroundColor: 'blue'}}
            />
    }
}
