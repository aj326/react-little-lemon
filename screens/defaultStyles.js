import { StyleSheet } from "react-native";


export const defaultStyles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#ffffff'
    },
    bodyContainer: {
        flex: 1
    },
    container: {
        // flex: 1,
        backgroundColor: '#dee3e9',
        justifyContent:"center",
        flexDirection: 'row',
        paddingHorizontal:15,
        //   display:''
    },
    logo: {
        height: 100,
        width: 100
    },
    text: {
        paddingTop: 30,
        paddingBottom: 20,
        paddingLeft: 20,
        fontSize: 20,
        color: '#43504d',
        justifyContent: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 5
    }, inner: {
        padding: 24,
        flex: 0.8,
        justifyContent: 'space-around',
        backgroundColor: "#cbd2d9",
        marginTop: 10
    },
    footerContainer: {
        flex: 0.2,
        backgroundColor: 'green'
    },
    header: {
        fontSize: 30,
        marginBottom: 48,
        color: '#314551'
    },
    textInput: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#314551',
        marginBottom: 36,
    },
    btnArea: {
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingEnd: 50,
        alignItems: "flex-end",
        backgroundColor: '#f1f4f7'
    },
    textError: {
        color: "#ec644b",
        fontWeight: "bold"
    },

    button: {
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderColor: '#cbd2d9',
        backgroundColor: '#cbd2d9',
        borderRadius: 10,
    },
    buttonText: {
        color: '#667884'
    }
});
