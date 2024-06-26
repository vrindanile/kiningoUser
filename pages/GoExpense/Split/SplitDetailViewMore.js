//external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native"
import React, { useEffect, useState } from "react"
import moment from "moment"
//external imports
import CustomHeader from "../Constants/CustomHeader"
import SplitBillUsers from "./SplitBillUsers"
import SplitDetailsProcess from "./SplitDetailsProcess"
import { requestGetApi, get_splitGroup, splitgroup_detil, split_comments, requestPostApiImages } from "../../../WebApi/Service"
import { useSelector, useDispatch } from 'react-redux';
// import SplitService from "../../../service/SplitService"
import { Mycolors } from "../../../utility/Mycolors"

const SplitDetailViewMore = ({ navigation, route }) => {
    const User = useSelector(state => state.user.user_details)
    const [monthlySplits, setMonthlySplits] = useState([])
    const [pageLoader, setPageLoader] = useState(false)
    const [splitDetails, setSplitDetails] = useState({})
    const [splitId, setSplitId] = useState(route?.params?.data)

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // setPageLoader(true)
            setSplitId(route?.params?.data)
            getData()
        })
        return unsubscribe
    }, [navigation])

    // function for get split details data on api call
    // const getData = async () => {
    //     // SplitService.getSplitDetails(splitId)
    //     //     .then(response => {
    //     //         setPageLoader(false)
    //     //         setSplitDetails(response.data)
    //     //         setMonthlySplits(response?.data?.monthlysplits)
    //     //     })
    //     //     .catch(error => {
    //     //         setPageLoader(false)
    //     //         console.log(error)
    //     //     })
    //     const { responseJson, err } = await requestGetApi(splitgroup_detil + splitId, '', 'GET', User.token)
    //     console.log('my web details---->>', responseJson)

    // }

    const getData = async () => {
        const { responseJson, err } = await requestGetApi(splitgroup_detil + splitId, '', 'GET', User.token)
        console.log('my web details---->>', responseJson?.body?.monthlySplits)
        setPageLoader(false)
        setSplitDetails(responseJson?.body
        )
        setMonthlySplits(responseJson?.body?.monthlySplits)
        // SplitService.getSplitDetails(splitId)
        //     .then(response => {
        //         setPageLoader(false)
        //         setSplitDetails(response.data)
        //         setMonthlySplits(response?.data?.monthlysplits)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error)
        //     })
    }



    // list for added split bill user
    const renderAddedSplitBillUser = ({ item }) => {
        return <SplitBillUsers items={item} />
    }

    // list for monthly split bill progress bar
    const renderAddedSplitMonthlyProcess = ({ item }) => {
        return (
            <SplitDetailsProcess
                items={item}
                totalAmount={splitDetails?.totalamount}
            />
        )
    }

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Split Detail"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.goBack()
                    }
                }}
            />

            {/* body section */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {!pageLoader ? (
                    <View style={styles.body}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.splitTitle}>
                                {splitDetails?.groupdetails?.groupname}
                            </Text>
                            <Text style={styles.amountText}>
                                ${splitDetails?.totalamount}
                            </Text>
                            <Text style={styles.spendText}>Spend</Text>
                            <Text style={styles.addedByText}>
                                Added by {splitDetails?.groupdetails?.groupusername} on
                                {moment(splitDetails?.groupdetails?.created_at).format(
                                    "MMM DD, YYYY"
                                )}
                            </Text>
                        </View>

                        {/* user with their split amount section */}
                        <View>
                            {splitDetails?.details?.length > 0 ? (
                                <View style={{ paddingHorizontal: 8 }}>
                                    <FlatList
                                        data={splitDetails?.details}
                                        renderItem={renderAddedSplitBillUser}
                                        keyExtractor={(item, index) => String(index)}
                                    />
                                </View>
                            ) : null}

                            {/* description section */}
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.textLine}>
                                    {splitDetails?.groupdetails?.groupdescription}
                                </Text>
                            </View>

                            {/* monthly process bar section */}
                            <FlatList
                                data={monthlySplits}
                                renderItem={renderAddedSplitMonthlyProcess}
                                keyExtractor={(item, index) => String(index)}
                            />

                            {/* spend and total amount section  */}
                            <View style={styles.textDirection}>
                                <View style={styles.spendContainer}>
                                    <Text style={styles.spendText}>Total Amount</Text>
                                    <Text style={styles.spendAmountText}>
                                        ${splitDetails?.totalamount}
                                    </Text>
                                    <View style={styles.backgroundImageContainer}>
                                        <Image
                                            resizeMode="contain"
                                            style={styles.image}
                                            source={require("../../../assets/Remindably/CurrencyCircleDollar.png")}
                                        />
                                    </View>
                                </View>

                                <View style={styles.spendContainer}>
                                    <Text style={styles.spendText}>Spend Amount</Text>
                                    <Text style={styles.spendAmountText}>
                                        ${splitDetails?.spendamount}
                                    </Text>
                                    <View style={styles.backgroundImageContainer}>
                                        <Image
                                            resizeMode="contain"
                                            style={styles.image}
                                            source={require("../../../assets/Remindably/CurrencyCircleDollar.png")}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default SplitDetailViewMore

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        padding: 10
    },
    titleContainer: {
        paddingHorizontal: 5,
        width: "75%"
    },
    splitTitle: {
        color: '#455A64',
        fontSize: 18,
        fontWeight: "400"
    },
    addedByText: {
        color: Mycolors.textGray,
        fontSize: 14,
        fontWeight: "500"
    },
    amountText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500"
    },
    spendText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "400"
    },
    imageContainer: {
        height: 30,
        width: 30,
        borderRadius: 50,
        backgroundColor: Mycolors.WHITE
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    textLine: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "400",
        paddingHorizontal: 10,
        textAlign: "justify"
    },
    descriptionContainer: {
        height: "auto",
        marginVertical: 5,
        padding: 5
    },
    textDirection: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        paddingVertical: 3
    },
    spendContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        height: 70,
        padding: 5,
        width: "48%"
    },
    spendAmountText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        paddingHorizontal: 5
    },
    backgroundImageContainer: {
        borderRadius: 50,
        bottom: -18,
        height: 80,
        position: "absolute",
        right: -18,
        width: 80,
        zIndex: 1
    },
    loaderContainer: {
        alignSelf: "center",
        height: "90%",
        justifyContent: "center"
    }
})
