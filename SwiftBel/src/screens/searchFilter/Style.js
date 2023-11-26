import { Platform } from "react-native";
import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from '../../utils/Responsive/index'
export default {

    //...........................Common Style.............................//

    container: {
        flex: 1,

    },
    bottomContainer: {
        flexDirection: 'row',
        height: 100,
    },
    button: {
        backgroundColor: palette.black,
        height: 54,
        width: wp('40%'),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp("2%")
    },
    buttonText: {
        color: palette.white,
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: "Roobert-Medium",
    },
    backButton: {
        height: 44,
        width: wp('40%'),
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },

    dragView: {
        flex:1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: wp('85%'),
        borderRadius: 30,
        height: 300,

    },
    headerName: {
        fontSize: 14,
        fontWeight: '400',
        paddingLeft: wp('5%'),
        paddingTop: wp('2%'),
        paddingBottom: wp('2%'),
        color: palette.black,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: wp('6%')
    },
    leftCross: {
        position: 'absolute',
        left: 15,
        backgroundColor: '#fff',
        width: 35,
        height: 35,
        top: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: palette.lightGrey,
        borderWidth: 1,
        zIndex: 1
    },
    searchCross: {
        position: 'absolute',
        left: 18,
        backgroundColor: '#fff',
        width: 30,
        height: 30,
        top: -2,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: palette.lightGrey,
        borderWidth: 1,
        zIndex: 1
    },
    headerText: {

        position: 'absolute',
        opacity: 3,
        backgroundColor: 'rgba(255,5,5,0.2',
        textAlign: 'center',
        alignSelf: 'center',

        justifyContent: 'center',
        alignItems: 'center',
        borderColor: palette.lightGrey,
        borderWidth: 1,
        zIndex: 1
    },
    btnContainer: {
        marginLeft: 5

    },
    PickerButton: {

        elevation: 4,
        shadowRadius: 2.22,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 2.0,
        shadowColor: palette.lightGrey,
        backgroundColor: '#ffffff',
        borderRadius: 10,

        borderWidth: 0.3,
        borderColor: palette.lightGrey,
        width: wp('90%'),
        marginBottom: 30
    },
    ServiceHeaderText: {
        color: '#2d3436',
        fontSize: 24,
        padding: 15,

    },
    serviceTextKey: {

    },
    PickerButtonContainer: {

        flex: 1,
        marginRight: wp('1%'),
        marginLeft: wp('1%'),
    },
    Icon: {
        height: 8,
        width: 12,
        alignSelf: 'center'
    },

    locationBottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        margin: 20
    },
    // dragView: {
    //     position: 'absolute',
    //     top: Platform.OS === 'android' ? hp('2%') : hp('2%'),
    //     alignSelf: 'center',
    //     justifyContent: 'center',
    //     width: wp('90%'),
    //     borderRadius: 30,
    //     height: 300,
    //     zIndex: 10000
    // },
    dragText: {
        fontSize: 14,
        textAlign: 'center',
        color: palette.black
    },
    LocationButton: {
        height: 60,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: hp('3%'),
        borderRadius: 10,
        backgroundColor: palette.pink
    },
    LocationText: {
        fontSize: 20,
        color: palette.white,
        marginTop: hp('2%'),
    },
    locationDataText: {
        fontSize: 16,
        color: palette.black,

    },
    LocationDataButton: {
        borderWidth: 1,
        borderRadius: 10,
        width: '90%',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        paddingLeft: wp('6%'),
        marginBottom: hp('2%'),
        paddingRight: wp('4%'),
        backgroundColor: palette.white
    },
    bottomFooter: {
        backgroundColor: '#fff',
        paddingTop: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
    },
    arrowImg:{
        width: 20, 
        height: 20, 
        tintColor: palette.grey, 
        marginLeft:20
    }
}