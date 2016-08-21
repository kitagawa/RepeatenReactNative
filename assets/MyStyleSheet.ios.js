import ApplicationStyle from './applicationStyle.json'

export default {
  CustomNavigator: {
    container:{
      marginTop: 64,
      flex: 1
    },
    bar: {
      backgroundColor: ApplicationStyle.themeColor,
      height: 64
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center'
    },
    titleText:{
      color: ApplicationStyle.titleTextColor,
      fontSize: ApplicationStyle.fontSizeLarge
    }
  },
  SearchBar: {
    bar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: ApplicationStyle.cardBackgroundColor
    },
    text:{
      color: ApplicationStyle.themeColor,
      fontSize: ApplicationStyle.fontSize,
      padding: 10
    },
  },
  LocationBar: {
    LocationBar: {
      padding: 3,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: ApplicationStyle.themeColor
    },
    LocationBarButton: {
      backgroundColor: ApplicationStyle.themeSubColor,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      flex: 1,
      height: 30,
    },
    locationBarText: {
      fontSize: ApplicationStyle.fontSizeLarge,
      color: ApplicationStyle.titleTextColor,
    },
    spinner: {
      width: 30,
    },
  },
  LocationSearchScreen: {
    locationBar: {
      // left: 0,
      // right: 60,
      // position: "absolute",
      padding: 5
    },
    locationBarInput: {
      backgroundColor: ApplicationStyle.themeSubColor,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 10,
      paddingRight: 10,
      flex: 1,
      width: 300,
      height: 30,
      fontSize: ApplicationStyle.fontSizeLarge,
      borderRadius: 5,
      color: ApplicationStyle.titleTextColor,
    },
    suggetionText: {
      fontSize: ApplicationStyle.fontSize
    },
    suggetionDescription: {
      color: ApplicationStyle.textMutedColor,
      fontSize: ApplicationStyle.fontSizeSmall
    },
    suggestionRow: {
      padding: 10
    },
    currentPosRow: {
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 15,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderColor: ApplicationStyle.borderColor,
    },
    logoConatiner:{
      marginTop: 20,
      padding: 10,
      alignItems: "flex-end",
    }
  },
  SearchScreen: {
    container: {
      flex: 1,
    },
    row:{
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 12,
    },
    rowText:{
      color: ApplicationStyle.textColor,
      fontSize: ApplicationStyle.fontSize,
      lineHeight: 20
    },
    rowSeparator: {
      backgroundColor: ApplicationStyle.borderColor,
      height: 1,
      marginLeft: 4,
    },
    modalButtonTextStyle:{
      color: ApplicationStyle.themeColor
    },
    buttonStyle:{
      backgroundColor: ApplicationStyle.themeColor,
      padding: 10
    },
    buttonTextStyle:{
      fontSize: ApplicationStyle.fontSizeLarge,
      color: "white"
    },
    priceRow:{
      padding: 12,
      borderBottomWidth: 1,
      borderColor: ApplicationStyle.borderColor,
    },
    slider: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20
    }
  },
  CustomNavigationBar: {
    navigationBar: {
      paddingTop: 30,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      backgroundColor: ApplicationStyle.themeColor,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    child: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
    },
    childLeft: {
      justifyContent: "flex-start",
    },
    childRight: {
      justifyContent: "flex-end",
    },
    barText: {
      color: "white",
      padding: 5,
      fontSize: ApplicationStyle.fontSizeLarge
    },
  },
  VenueSearchScreen: {
    searchBar:{
      // left: 0,
      // right: 60,
      // position: "absolute",
    },
    searchBarInputContainer: {
      padding: 5,
    },
    searchBarInput: {
      width: 300,
      backgroundColor: ApplicationStyle.themeSubColor,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 10,
      paddingRight: 10,
      // flex: 1,
      height: 30,
      fontSize: ApplicationStyle.fontSizeLarge,
      borderRadius: 5,
      color: ApplicationStyle.titleTextColor,
    },
    suggetionText: {
      fontSize: ApplicationStyle.fontSize
    },
    suggetionDescription: {
      color: ApplicationStyle.textMutedColor,
      fontSize: ApplicationStyle.fontSizeSmall
    },
    suggestionRow: {
      padding: 10,
    },
    icon: {
      width: 15,
      height: 15,
      marginRight: 5
    },
    counts: {
      flexDirection: "row"
    },
    container:{
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1
    },
    containerLeft: {
      flex: 1
    },
    containerRight: {
      width: 70,
      borderLeftWidth: 1,
      borderColor: ApplicationStyle.borderColor,
      paddingLeft: 20
    },
    currentPosRow: {
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 15,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderColor: ApplicationStyle.borderColor,
    },
    logoConatiner:{
      marginTop: 20,
      padding: 10,
      alignItems: "flex-end",
    },
    indicator:{
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      position: "absolute",
      top: 20,
      right: 0,
      left: 0
    },
    indicatorFrame:{
      backgroundColor: "white",
      padding: 10,
      borderWidth: 1,
      borderColor: ApplicationStyle.borderColor,
      borderRadius: 5
    }
  },
  VenueListScreen: {
    container: {
      flex: 1,
      backgroundColor: ApplicationStyle.backgroundColor,
    },
    centerText: {
      alignItems: 'center',
    },
    noVenues: {
      marginTop: 80,
    },
    scrollSpinner: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    errorMessageContainer:{
      marginTop: 100
    },
    errorMessage: {
      fontSize: ApplicationStyle.fontSizeLarge,
    },
    errorDiscription: {
      marginTop: 20,
      width: 200
    },
    searchVenueButtonNode: {
      alignItems: "center",
      marginRight: 10
    },
    searchVenueButtonIcom:{
      width: 30,
      height: 30
    },searchVenueButtonText:{
      color: "#fff",
      fontSize: ApplicationStyle.fontSizeSmall
    }
  },
  VenueMapScreen:{
    container: {
      flex: 1
    },
    text:{
      fontSize: ApplicationStyle.fontSize,
      color: ApplicationStyle.textColor
    },
    row: {
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 10,
      borderBottomWidth: 1,
      borderBottomColor: ApplicationStyle.borderColor,
    },
    buttons:{
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: ApplicationStyle.borderColor,
    },
    button:{
      paddingTop: 12,
      paddingBottom: 12,
    },
    buttonText:{
      textAlign: "center",
      color: ApplicationStyle.themeColor
    },
    separator:{
      borderLeftWidth: 1,
      borderLeftColor: ApplicationStyle.borderColor
    },
    mapView: {
      flex: 1,
      flexDirection: 'row',
    }
  }
}
