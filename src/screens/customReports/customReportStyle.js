import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    loaderContainer: {
        justifyContent: "center", alignItems: 'center', flex: 1
    },
    container: {
        padding: 8,
        backgroundColor: "#f7f7f7",
        marginBottom: 16,
    },
    matricsContainer: {
        paddingLeft: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: 10,
    },
    matrics: {
        backgroundColor: "#3a7953",
        color: "white",
        padding: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginHorizontal: 4,
        marginBottom: 4,
        fontSize: 12
    },
    heading: {
        fontWeight: "bold",
        fontSize: 16
    },

    Tablecontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,

    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    loadingText: {
        fontSize: 16,
        color: 'red',
    },



})





