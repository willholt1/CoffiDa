import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    title: {
        color: 'dodgerblue',
        backgroundColor: 'lightblue',
        padding: 10,
        fontSize: 25
    },
    drawerButton: {
        padding: 10,
        alignItems: 'center'
    },
    drawerButtonText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'dodgerblue'
    },
    formItem: {
        padding: 20
    },
    formLabel: {
        fontSize: 18,
        color: 'dodgerblue'
    },
    formInput: {
        borderWidth: 1,
        borderColor: 'lightblue',
        borderRadius: 5
    },
    formTouch: {
        backgroundColor: 'dodgerblue',
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'lightblue'
    },
    formTouchText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'aliceblue'
    },
    textStyle: {
        padding: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'dodgerblue' 
    },
    middleTouch: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    numInput: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
    }

})