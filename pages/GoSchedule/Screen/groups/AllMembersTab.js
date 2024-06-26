//external imports
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
//internal imports
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const AllMembersTab = ({ checked, checkedList, handleChecked, item, type }) => {
    console.log('my members list  for checking hte naem', item
    );

    return (
        <>
            {type != 'memberlist' ?
                <View style={styles.interestsContainer}>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={
                            checkedList.includes(item.userid)
                                ? checked
                                    ? styles.interestsRedTabBorder
                                    : styles.interestsTab
                                : styles.interestsTab
                        }
                        onPress={() => {
                            handleChecked(item.userid, item)
                        }}
                    >
                        {checkedList.includes(item.userid) ? (
                            checked ? (
                                <Image
                                    style={styles.checkedIcon}
                                    tintColor={Mycolors.RED}
                                    resizeMode="contain"
                                    source={require("../../../../assets/Remindably/checked.png")}
                                />
                            ) : null
                        ) : null}

                        {/* invited text according to registered user on app  */}
                        {/* <View>
                                <Text style={styles.notJoinedStatus}>{item?.joinedstatustext}</Text>
                            </View> */}

                        {/* user profile image section  */}
                        <View style={styles.allMemberContainer}>
                            <Image
                                resizeMode="contain"
                                source={
                                    item?.profile_image
                                        ? { uri: `${item?.profile_image}` }
                                        : require("../../../../assets/Remindably/avatar.png")
                                }
                                style={styles.addedMemberImage}
                            />
                        </View>

                        {/* user name section */}
                        <Text style={styles.addedMemberLabel}>
                            {item?.first_name} {item?.last_name}</Text>
                    </TouchableOpacity>

                </View>
                :
                <View style={styles.interestsContainerMemerr}>
                    {item?.joinedstatus == 2 ? (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={
                                checkedList.includes(item.userid)
                                    ? checked
                                        ? styles.interestsOrangeTabBorderr
                                        : styles.interestsTab
                                    : styles.interestsTab
                            }
                            onPress={() => {
                                handleChecked(item.userid, item)
                            }}
                        >
                            {checkedList.includes(item.userid) ? (
                                checked ? (
                                    <Image
                                        style={styles.checkedIcon}
                                        resizeMode="contain"
                                        source={require("../../../../assets/Remindably/checked.png")}
                                    />
                                ) : null
                            ) : null}

                            {/* invited text according to registered user on app  */}
                            {/* <View>
                                <Text style={styles.notJoinedStatus}>{item?.joinedstatustext}</Text>
                            </View> */}

                            {/* user profile image section  */}
                            <View style={styles.allMemberContainer}>
                                <Image
                                    resizeMode="contain"
                                    source={
                                        item?.profile_image
                                            ? { uri: `${item?.profile_image}` }
                                            : require("../../../../assets/Remindably/avatar.png")
                                    }
                                    style={styles.addedMemberImage}
                                />
                            </View>
                            {/* user name section */}
                            <Text style={styles.addedMemberLabel}>{item?.username}</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={
                                    checkedList.includes(item.userid)
                                        ? checked
                                            ? styles.interestsRedTabBorderrr
                                            : styles.interestsTabb
                                        : styles.interestsTabb
                                }
                                onPress={() => {
                                    handleChecked(item.userid, item)
                                }}
                            >
                                {checkedList.includes(item.userid) ? (
                                    checked ? (
                                        <Image
                                            style={styles.checkedIcon}
                                            tintColor={Mycolors.RED}
                                            resizeMode="contain"
                                            source={require("../../../../assets/Remindably/checked.png")}
                                        />
                                    ) : null
                                ) : null}

                                {/* invited text according to registered user on app  */}
                                {/* <View>
                                    <Text style={styles.notJoinedStatus}>{item?.joinedstatustext}</Text>
                                </View> */}

                                {/* user profile image section  */}
                                <View style={styles.allMemberContainer}>
                                    {console.log('my checked', checked)}
                                    <Image
                                        resizeMode="contain"
                                        source={
                                            item?.profile_image
                                                ? { uri: `${item?.profile_image}` }
                                                : require("../../../../assets/Remindably/avatar.png")
                                        }
                                        style={
                                            checkedList.includes(item.userid)
                                                ? checked
                                                    ? styles.addedMemberImageee
                                                    : styles.addedMemberImagee
                                                : styles.addedMemberImagee
                                        }
                                    // styles.addedMemberImagee



                                    />
                                    <></>
                                </View>

                                {/* user name section */}
                                <Text
                                    // style={styles.addedMemberLabell}
                                    style={
                                        checkedList.includes(item.userid)
                                            ? checked
                                                ? styles.addedMemberLabelll
                                                : styles.addedMemberLabell
                                            : styles.addedMemberLabell
                                    }
                                >
                                    {item?.first_name} {item?.last_name}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                // <View>
                //     {Object.keys(item).map((key, index) => {
                //         const currentItem = item[key];
                //         const isEvenIndex = index % 2 === 0;

                //         // Check if 'userid' exists and is not null before accessing it
                //         const userId = currentItem?.userid;

                //         if (userId !== null && userId !== undefined) {
                //             // Calculate styles for the item based on your conditions
                //             const itemStyle = checkedList.includes(userId)
                //                 ? checked
                //                     ? styles.interestsRedTabBorder
                //                     : styles.interestsTabb
                //                 : styles.interestsTabb;

                //             return (
                //                 <View
                //                     key={userId}
                //                     style={{
                //                         flexDirection: 'row',
                //                         justifyContent: 'space-between',
                //                         marginBottom: isEvenIndex ? 10 : 0,
                //                     }}
                //                 >
                //                     <TouchableOpacity
                //                         activeOpacity={1}
                //                         style={itemStyle}
                //                         onPress={() => {
                //                             handleChecked(userId, currentItem);
                //                         }}
                //                     >
                //                         {/* Your item content here */}
                //                     </TouchableOpacity>

                //                     {/* Render a second item if it's not the last item in the object */}
                //                     {index + 1 < Object.keys(item).length && (
                //                         <TouchableOpacity
                //                             activeOpacity={1}
                //                             style={itemStyle}
                //                             onPress={() => {
                //                                 const nextKey = Object.keys(item)[index + 1];
                //                                 const nextItem = item[nextKey];
                //                                 const nextUserId = nextItem?.userid;

                //                                 if (nextUserId !== null && nextUserId !== undefined) {
                //                                     handleChecked(nextUserId, nextItem);
                //                                 }
                //                             }}
                //                         >
                //                             {/* Your second item content here */}
                //                         </TouchableOpacity>
                //                     )}
                //                 </View>
                //             );
                //         } else {
                //             return null; // Skip items with null or undefined userid
                //         }
                //     })}
                // </View>

            }
        </>
    )
}

export default AllMembersTab

const styles = StyleSheet.create({
    interestsContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 20,
        flexDirection: "row",
        height: "auto",
        margin: 5,

    },
    interestsContainerMemer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 20,


    },
    interestsContainerMemerr: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 6,

    },
    interestsTab: {
        alignItems: "center",
        borderColor: Mycolors.brightGray,
        borderRadius: 20,
        borderWidth: 2,
        height: "auto",
        justifyContent: "flex-start",
        padding: 3,
        width: 130,
        marginVertical: 10,
        flexDirection: 'column',


    },
    interestsTabb: {
        alignItems: "center",
        // borderColor: Mycolors.brightGray,
        borderRadius: 20,
        // borderWidth: 2,
        height: 140,
        justifyContent: 'space-between',
        padding: 3,
        width: 140,
        marginVertical: 10,
        alignSelf: 'center',

        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 14,
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: '#455A64',
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.1,
        elevation: 4,
        marginRight: 40,


    },
    interestsOrangeTabBorder: {
        alignItems: "center",
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 20,
        borderWidth: 2,
        height: "auto",
        justifyContent: "flex-start",
        padding: 3,
        width: 105,
        backgroundColor: 'red'
    },
    interestsOrangeTabBorderr: {
        alignItems: "center",
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 20,
        borderWidth: 2,
        height: "auto",
        justifyContent: "flex-start",
        padding: 3,
        width: 45,
        height: 45
    },
    interestsRedTabBorder: {
        alignItems: "center",
        borderColor: Mycolors.RED,
        borderRadius: 20,
        borderWidth: 2,
        height: "auto",
        justifyContent: "flex-start",
        padding: 3,
        width: 105,

        paddingTop: 19
    },
    interestsRedTabBorderr: {
        alignItems: "center",
        borderColor: Mycolors.RED,
        borderRadius: 20,
        borderWidth: 2,
        height: "auto",
        justifyContent: "flex-start",
        padding: 3,
        width: 150,
        marginRight: 40,
        marginLeft: 9,

    },
    interestsRedTabBorderrr: {
        alignItems: "center",
        borderColor: Mycolors.RED,
        borderRadius: 20,
        borderWidth: 2,
        height: "auto",
        justifyContent: "flex-start",
        padding: 3,
        width: 140,
        height: 140,
        marginRight: 40,
        marginLeft: 9,

    },
    checkedIcon: {
        position: "absolute",
        right: 5,
        top: 5,
        zIndex: 1
    },
    joinedStatus: {
        color: Mycolors.GREEN,
        fontSize: 14,
        fontWeight: "500"
    },
    notJoinedStatus: {
        color: Mycolors.RED,
        fontSize: 14,
        fontWeight: "500"
    },
    allMemberContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 50,
        height: 45,
        width: 45,
        resizeMode: 'contain',
        marginTop: 12

    },
    addedMemberImage: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },

    //new cahnges have been done here 8/11/2023
    addedMemberImagee: {
        borderRadius: 40,
        height: 70,
        width: 70,
        resizeMode: 'cover',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addedMemberImageee: {
        borderRadius: 40,
        height: 70,
        width: 70,
        resizeMode: 'cover',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 23
    },
    addedMemberLabel: {
        color: 'red',
        fontSize: 16,
        textAlign: "center",

    },
    addedMemberLabell: {
        color: 'red',
        fontSize: 16,
        textAlign: "center",
        marginTop: 25
    },
    addedMemberLabelll: {
        color: 'red',
        fontSize: 16,
        textAlign: "center",
        // marginTop: 22,
        marginVertical: 50
    }
})
