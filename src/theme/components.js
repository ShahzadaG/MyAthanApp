import { StyleSheet } from 'react-native';

export default ({ layout, backgrounds, fonts }) => {
    return {
        buttonCircle: {
            ...layout.justifyCenter,
            ...layout.itemsCenter,
            ...backgrounds.purple100,
            ...fonts.gray400,
            height: 70,
            width: 70,
            borderRadius: 35,
        },
        circle250: {
            borderRadius: 140,
            height: 250,
            width: 250,
        },
        nextPrayerTextContainer: {
          height: '100%',
          justifyContent: 'space-between'
        },
        nextPrayerContainer2: {
            ...layout.justifyBetween,
            ...layout.itemsCenter,
            ...layout.row,
            width: 303,
            height: 88,
            borderRadius: 20,
            backgroundColor: '#FFF',
            marginTop: -50,
            marginBottom: 5,
            paddingHorizontal: 20,
            paddingVertical: 15,
            overflow: 'hidden', // Ensures that children outside the bounds are clipped
            // Platform-specific shadow styles
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 30,
              },
              android: {
                elevation: 10,
              },
            }),
        },
        nextPrayerContainer: {
          // Common styles
          width: 303,
          height: 88,
          borderRadius: 20,
          backgroundColor: '#FFF',
          marginTop: -50,
          marginBottom: 30,
          paddingHorizontal: 20,
          paddingVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflow: 'hidden', // Ensures that children outside the bounds are clipped
          // Platform-specific shadow styles
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 30,
            },
            android: {
              elevation: 10,
            },
          }),
        },
        prayerContainer: {
            padding: 20,
            flexDirection: 'column',
            alignItems: 'flex-start',
            borderRadius: 15,
            backgroundColor: '#F9F7FF',
            marginBottom: 25
          },
          prayerInnerContainer: {
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
          prayerItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 303,
            height: 24,
            marginBottom: 10,
          },
          prayerItemText: {
            color: '#333',
            fontFamily: 'Poppins', // Ensure this font is linked in your project if using custom fonts
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: '500',
            marginLeft: 24
          },
          selectedPrayerItemText: {
              color: '#6849FF'
          },
          prayerNameAndIcon: {
              flexDirection: 'row',
          },
          upcomingPrayerTextInfo: {
            color: '#6849FF',
            fontFamily: 'Poppins',
            fontSize: 20,
            fontStyle: 'normal',
            fontWeight: '600',
          },
          upcomingPrayerText: {
            color: '#999',
            fontFamily: 'Poppins',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: '500',
          },
          muteIconContainer: {
            width: 44,
            height: 44,
            borderRadius: 15,
            backgroundColor: 'rgba(104, 73, 255, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
          width: 164,
          height: 60,
          borderRadius: 15,
          backgroundColor: '#333',
          marginHorizontal: 7,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
      },
      buttonText: {
        color: '#FFF',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 500,
        marginHorizontal: 6
    },
    DeviceConnectionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginBottom: 15,
    },
    statusIndicator: {
      width: 10,
      height: 10,
      borderRadius: 5, // Half of the width and height to make it a circle
      backgroundColor: 'red',
      marginRight: 10, // Adds some space between the circle and the text
    },
    statusText: {
      color: '#999',
      fontFamily: 'Poppins',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: 500,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end', // Aligns the child (modalView) to the bottom
  },
  modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      height: '47%',
      margin: 20,
      marginBottom: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 17,
    marginBottom: 15,
    textAlign: 'center',
    color: 'grey'
  },
  button2: {
      marginTop: 20,
      backgroundColor: '#007bff', // Example blue color
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      elevation: 3, // Adds a shadow for Android
      shadowOpacity: 0.3, // Shadow for iOS
      shadowRadius: 5,
      shadowOffset: { height: 2, width: 0 },
  },
  buttonText2: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
  },

  deviceName: {
      fontSize: 17,
      marginBottom: 15,

  },
  sectionTitle: {
    color: '#333',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    marginBottom: 16
  },

  clockSettingsContainer: {
    flex: 1,
    backgroundColor: '#EAEBF3', // Light grey background for the section title
    padding: 16,
  },
  athanSettingsContainer: {
    flex: 1,
    backgroundColor: '#EAEBF3', // Light grey background for the section title
    padding: 16,
  },
  clockSettingsSection: {
    marginBottom: 24,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: '#FFF',
    paddingHorizontal: 20
  },
  toggleContainer: {
    flexDirection: 'row', // Align children in a row
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomColor: '#C6C6C8',
  },
  toggleText: {
    marginRight: 10, // Add some space between the text and the switch
    fontSize: 17,
  },
  toggleIconText: {
    flexDirection: 'row', // Align children in a row
    alignItems: 'center', // Align items vertically in the center
  },
  toggleOptionText: {
    color: '#333',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
  },
  toggleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#C6C6C8',
  },
  toggleIconContainer: {
    // Rounded box styles
    width: 30, // Set width and height for the box
    height: 30,
    borderRadius: 5, // Half of width/height to make it perfectly rounded
    justifyContent: 'center', // Center the icon horizontally
    alignItems: 'center', // Center the icon vertically
    marginRight: 10,
  },
  athanSettingsIconContainer: {
    // Rounded box styles
    width: 30, // Set width and height for the box
    height: 30,
    borderRadius: 5, // Half of width/height to make it perfectly rounded
    justifyContent: 'center', // Center the icon horizontally
    alignItems: 'center', // Center the icon vertically
    marginRight: 10,
  },
  location: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 15,
  },
  fixedIconContainer: {
    // Rounded box styles
    position: 'absolute', // this makes it 'fixed' within the container
    width: 30, // Set width and height for the box
    height: 30,
    borderRadius: 5, // Half of width/height to make it perfectly rounded
    justifyContent: 'center', // Center the icon horizontally
    alignItems: 'center', // Center the icon vertically
    left: 15,
    top: 12
  },
  verticalLine: {
    height: '140%', // Make the line as tall as the container
    width: 1, // Thickness of the line
    backgroundColor: '#EEEEEE', // Color of the line
    marginRight: 40, // Space on both sides of the line
  },
  athanSettingsToggle: {
      paddingVertical: 0,
      paddingLeft: 0,
      borderBottomWidth: 0
  },
    athanSettingsSection: {
      marginBottom: 24,
      overflow: 'hidden',
      borderRadius: 15,
      backgroundColor: '#FFF',
      paddingHorizontal: 20
    },
    athanSettingsOption: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingVertical: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#C6C6C8',
    },
    athanSettingsOptionText: {
      color: '#333',
      fontFamily: 'Poppins',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '500',
    },
    athanSettingsSelectedOption: {
      color: 'gray', 
      marginRight: 8,
      fontSize: 17
    },
    toggleSwitch: {
      paddingVertical: 0,
      paddingLeft: 0,
      borderBottomWidth: 0
  },
  iconAndPrayerName: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center', // This line ensures vertical centering
  },      
  nameAndToggle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  selectedOption: {
      color: '#666',
      fontFamily: 'Poppins',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '500',
  },
  prayerName: {
      color: '#333',
      fontFamily: 'Poppins',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '500',
      paddingLeft: 15
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 0,
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#C6C6C8',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
    };
};
