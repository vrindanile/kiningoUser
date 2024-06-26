
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Dimensions } from 'react-native';
import HomeHeaderRoundBottom from './components/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import FashionSearch from './components/FashionSearch';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import Animated from "react-native-reanimated";
import ProgressBar from 'react-native-progress/Bar'
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../WebApi/Loader';
import moment from 'moment';
import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_people_newPost, art_getCollection, requestPostApiMedia, art_PostCollection, postApiWithToken2, art_HomePage, art_likeDislike, get_suggestion, creation_home, creation_searchHome, creation_startup, invention_home, getNewsAPI, getAPI, startup_suggested } from '../../../WebApi/Service'

import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient'
import AppIntroSlider from 'react-native-app-intro-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// import Loader from '../../../WebApi/Loader';
import VideoPlayer from 'react-native-video-player'
import { createThumbnail } from "react-native-create-thumbnail";
import ViewMoreText from 'react-native-view-more-text';
import { VideoModel } from '../../../component/VideoModel';
import ArtSearch from './components/ArtSearch'
import { parseZone } from 'moment';


const AllSatrtupSuggested = (props, route) => {
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const User = useSelector(state => state.user.user_details)
    console.log('User', User.token);

    const [searchValue, setsearchValue] = useState('')
    const [loading2, setLoading2] = useState(false)
    const [scrollEnabled, setScrollEnabled] = useState(false)
    const myTextInput = useRef()
    const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
    const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
    const flatListRef = React.useRef(null);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const isAutoScrolling = React.useRef(true);
    const activeIndex = React.useRef(0);
    const [typeArticle, setTypeArticle] = useState('Fundraiser')
    const [selectedButton, setSelectedButton] = useState('')

    const [selectedCategory, setSelectedCategory] = useState('1')
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState({ isVisible: false, data: null });
    const [showVideoModal, setShowVideoModal] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState({})
    const [showReportModal, setShowReportModal] = useState(false)
    const [selectedReasonId, setSelectedReasonId] = useState(null)
    const [categoryData, setCategorydata] = useState([])
    const [isLiked, setIsLiked] = useState(false);
    const [latestRecords, setLatestRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [modlevisual5, setmodlevisual5] = useState(false)
    const [totalAmount, setTotalAmount] = useState(1000)
    const [raisedAmount, setRaisedAmount] = useState(200)
    const progress = raisedAmount / totalAmount;
    // console.log('progess ammaount', (progress * 100).toFixed(0));
    const calculatedProgress = progress * 100;
    const formattedProgress = calculatedProgress.toFixed(0);

    const [reportReasonData, setReportReasonData] = useState([
        {
            id: '1',
            name: 'I just don’t like it',
            description: '',
            selected: true
        },
        {
            id: '2',
            name: 'Nudity or pornography',
            description: '',
            selected: false
        },
        {
            id: '3',
            name: 'Hate speech or symbols',
            description: 'Racist, homophobic or sexist slurs',
            selected: false
        },
        {
            id: '4',
            name: 'Violence or threat of violence',
            description: `Graphic injury, unlawful activity, dangerous or criminal organizations`,
            selected: false
        },
        {
            id: '5',
            name: 'Sale or promotion of firearms',
            description: '',
            selected: false
        },
        {
            id: '6',
            name: 'Sale or promotion of drugs',
            description: '',
            selected: false
        },
        {
            id: '7',
            name: 'Harassment or bullying',
            description: '',
            selected: false
        },
        {
            id: '8',
            name: 'Intellectual property violation',
            description: 'Copyright or trademark infringement',
            selected: false
        },
    ])
    const [videoDetails, setVideoDetails] = useState([
        { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
        { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
        { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
    ])
    const [classesList, setClassesList] = useState([
        {
            id: '1',
            title: 'Graphic Design Class',
            price: 949,
            desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
            distance: '3 kms away',
            img: require('../../../assets/images/service-product-image.png'),
        },
        {
            id: '2',
            title: 'Graphic Design Class',
            price: 949,
            desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
            distance: '3 kms away',
            img: require('../../../assets/images/service-product-image.png'),
        },
        {
            id: '3',
            title: 'Graphic Design Class',
            price: 949,
            desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
            distance: '3 kms away',
            img: require('../../../assets/images/service-product-image.png'),
        },
    ])
    const [typeCategory, setTypeCategory] = useState([
        {
            id: '1',
            title: 'Informational',

        },
        {
            id: '2',
            title: 'Fundraiser',

        },

    ])
    const [aroundTheWorldData, setAroundTheWorldData] = useState([
        {
            id: '1',
            name: 'Leslie Alexander',
            desc: '',
            time: '14 hours ago',
            img: require('../../../assets/images/fashion-around-the-world-image.png'),
            likes: '4k',
            dislikes: '1k',
        },
        {
            id: '2',
            name: 'Leslie Alexander',
            desc: '',
            time: '14 hours ago',
            img: require('../../../assets/images/fashion-around-the-world-image.png'),
            likes: '4k',
            dislikes: '1k',
        },
        {
            id: '3',
            name: 'Leslie Alexander',
            desc: '',
            time: '14 hours ago',
            img: require('../../../assets/images/fashion-around-the-world-image.png'),
            likes: '4k',
            dislikes: '1k',
        },
    ])
    const [showFundraiserInput, setShowFundraiserInput] = useState(false);
    const [courseData, setCourseData] = useState([
        {
            id: '1',
            title: 'Celebrity Style',
            desc: '',
            time: '',
            img: require('../../../assets/images/fashion-celebrity-style.png'),
        },
        {
            id: '2',
            title: 'Street Style',
            desc: '',
            time: '',
            img: require('../../../assets/images/fashion-celebrity-style.png'),
        },
        {
            id: '3',
            title: 'Models',
            desc: '',
            time: '',
            img: require('../../../assets/images/fashion-celebrity-style.png'),
        },
    ])
    const [upData, setupData] = useState([
        {
            id: '1',
            catId: '1',
            title: 'Intel 3rd Gen Motherboard',
            desc: '',
            price: '$140.00',
            time: '',
            img: require('../../../assets/images/intel_motherboard.png'),
        },
        {
            id: '2',
            catId: '2',
            title: 'Intel 3rd Gen Motherboard',
            desc: '',
            price: '$140.00',
            time: '',
            img: require('../../../assets/images/intel_motherboard.png'),
        },
        {
            id: '3',
            catId: '3',
            title: 'Intel 3rd Gen Motherboard',
            desc: '',
            price: '$140.00',
            time: '',
            img: require('../../../assets/images/intel_motherboard.png'),
        },
        {
            id: '4',
            catId: '4',
            title: 'Intel 3rd Gen Motherboard',
            desc: '',
            price: '$140.00',
            time: '',
            img: require('../../../assets/images/intel_motherboard.png'),
        },
        {
            id: '5',
            catId: '1',
            title: 'Intel 3rd Gen Motherboard',
            desc: '',
            price: '$140.00',
            time: '',
            img: require('../../../assets/images/intel_motherboard.png'),
        },
        {
            id: '6',
            catId: '2',
            title: 'Intel 3rd Gen Motherboard',
            desc: '',
            price: '$140.00',
            time: '',
            img: require('../../../assets/images/intel_motherboard.png'),
        },
        {
            id: '7',
            catId: '3',
            title: 'Intel 3rd Gen Motherboard',
            desc: '',
            price: '$140.00',
            time: '',
            img: require('../../../assets/images/intel_motherboard.png'),
        },
    ])
    const [introSliderData] = useState([
        // require('../../assets/Group75972.png'),
        { key: 'one', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
        { key: 'two', image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
        { key: 'three', image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' }
    ])
    const [, filterValue, setFilterValue] = useState('')
    const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
    useEffect(() => {
        getFilterStatement(1, selectedButton,)
        // ArtCategory()

        // getSuggestion()
        console.log('selectedButton', selectedButton);
    }, [selectedButton])
    const handleInformationalClick = () => {
        setShowFundraiserInput(false);
        setSelectedButton('Informational');
        setCategorydata([]); // Clear previous data
        getFilterStatement(1, 'Informational');
    };

    const handleFundraiserClick = () => {
        setShowFundraiserInput(true);
        setSelectedButton('Fundraiser');
        setCategorydata([]); // Clear previous data
        getFilterStatement(1, 'Fundraiser');
    };

    // const getFilterStatement = async (
    //     pageNo = 1,
    //     type = '',
    //     search = ''
    // ) => {
    //     try {
    //         // Check if the selected button matches the type parameter
    //         if (type !== selectedButton) {
    //             return; // Do not make the API call
    //         }

    //         // Set loading state to true before making the API request
    //         setLoading(true);

    //         const paramData = {
    //             page: pageNo,
    //             type: type,
    //             limit: 20,
    //             headline: search,
    //         };
    //         console.log(paramData, 'paramData');
    //         const { response, status, message } = await getAPI(
    //             startup_suggested,
    //             paramData,
    //             User.token,
    //         );
    //         if (status) {
    //             console.log('jjjj checkkkk');
    //             if (pageNo == 1) {
    //                 console.log('mr new function rr let me check', response.articles)
    //                 // setStatementData(response?.listing);
    //                 generateThumb(response.articles);
    //             } else {
    //                 generateThumb([...articleData, ...response.body.articles]);
    //                 setPage(newpage);
    //             }
    //         }

    //         // Set loading state back to false after the API call is completed
    //         setLoading(false);
    //     } catch (error) {
    //         console.error('error in getFilterStatement', error);

    //         // Ensure that even in case of an error, loading state is set to false
    //         setLoading(false);
    //     }
    // };


    const getFilterStatement = async (
        pageNo = 1,
        type = '',
        search = ''
    ) => {
        try {
            // Set loading state to true before making the API request
            setLoading(true);

            const paramData = {
                page: pageNo,
                type: type,
                limit: 20,
                headline: search,
            };
            console.log(paramData, 'paramData');
            const { response, status, message } = await getAPI(
                startup_suggested,
                paramData,
                User.token,
            );
            if (status) {
                console.log('jjjj checkkkk', response.data);
                if (pageNo == 1) {
                    console.log('mr new function rr let me check', response.data)
                    // setStatementData(response?.listing);
                    generateThumb(response.data);
                } else {
                    generateThumb([...articleData, ...response.data]);
                    setPage(newpage);
                }
            }

            // Set loading state back to false after the API call is completed
            setLoading(false);
        } catch (error) {
            console.error('error in getFilterStatement', error);

            // Ensure that even in case of an error, loading state is set to false
            setLoading(false);
        }
    };
    const HomePage2 = async (getnwPage = false, item) => {
        console.log('my home page 2 is called hhhhh');
        console.log(selectedButton, 'my item slected home 2');
        setLoading(true)
        const newpage = getnwPage ? page + 1 : 1;
        console.log('my hompage2 for search', invention_home);
        var fUrl = invention_home;
        var urls = '?type=' + item;
        var murl = `&page_no=${newpage}&limit=10`


        if (urls != undefined) {
            console.log('mu url rreache', ru);
            fUrl = fUrl + urls + murl
        } `1`
        console.log('my urln home pagefoe 2 api---------->', fUrl)

        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoading(false)
        console.log('the res of home2 coking', responseJson)
        if (responseJson.headers.success == 1) {
            console.log('hhhhhhh gggggg called for 2');

            if (responseJson.body.articles.length
                == 0) {
                console.log('if block is called');
                setCategorydata([])
            } else {
                if (responseJson.headers.success == 1) {
                    console.log('my request has been called',);
                    if (!getnwPage) {
                        console.log('my page status', responseJson?.body?.last_page);
                        // setLastPage(responseJson?.body?.last_page);
                        // console.log('for data 10', responseJson.body.articles);
                        //setCategorydata(responseJson.body.articles)
                        generateThumb(responseJson.body.articles);
                    } else {
                        console.log('for data 4', responseJson.body.articles, newpage);

                        // Check if responseJson.body.articles is not undefined or empty before updating the page state
                        if (responseJson.body.articles && responseJson.body.articles.length > 0) {

                            generateThumb([...articleData, ...responseJson.body.articles]);
                            setPage(newpage);
                        }
                    }

                    const latestRecordsArray = responseJson.body.articles.slice(0, 3);
                    setLatestRecords(latestRecordsArray);
                } else {
                    setalert_sms(err);
                    setMy_Alert(true);
                }
            }
        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }



    const ArtCategory = async (getnwPage = false, item, text) => {
        console.log('my art is called', item, text);
        // console.log('Current page:', page); // Add a debug log for the current page
        setLoading(true);

        // Calculate the new page value based on the getnwPage parameter
        const newpage = getnwPage ? page + 1 : 1;
        // console.log('my new getnewpage', newpage);

        // Update the fUrl with the new page value
        // var fUrl = creation_startup + `?page_no=${newpage}&limit=10`;
        var fUrl = invention_home;

        var uri = `&page_no=${1}&limit=10`
        // var murl = '?type=' + item;
        if (Object.keys(selectedButton).length > 0) {
            murl = '?type=' + selectedButton;
        } else {
            murl = '';
        }

        var furl = fUrl + murl + uri
        console.log('my urls', furl);
        try {
            // Make the API request to fetch data
            const { responseJson } = await requestGetApi(furl, '', 'GET', User.token);
            setLoading(false);

            if (responseJson.headers.success == 1) {
                if (!getnwPage) {
                    console.log('for data 10', responseJson.body.articles, newpage);
                    generateThumb(responseJson.body.articles);
                } else {
                    // console.log('for data 4', responseJson.body.articles, newpage);

                    // Check if responseJson.body.articles is not undefined or empty before updating the page state
                    if (responseJson.body.articles && responseJson.body.articles.length > 0) {
                        generateThumb([...categoryData, ...responseJson.body.articles]);
                        setPage(newpage);
                    }
                }

                const latestRecordsArray = responseJson.body.articles.slice(0, 3);
                setLatestRecords(latestRecordsArray);
            } else {
                setalert_sms(err);
                setMy_Alert(true);
            }
        } catch (error) {
            // console.error('Error occurred during fetching data:', error);
            setLoading(false);
        }
    };

    const applyFilter = async () => {
        setIsFilterApplied(true);
        setPage(1);
        setShowFilter(false);
        setShowLoader(true);
        await getFilterStatement(1, startDate, endDate, selectedCrDr);
        setShowLoader(false);
    };
    const ArtSearch = async (item) => {
        console.log('my seach bu heading title', item);
        setLoading(true)
        var fUrl = invention_home
        var urls = '&headline=' + item
        var uri = `&page_no=${1}&limit=10`
        var murl;
        if (Object.keys(selectedButton).length > 0) {
            murl = '?type=' + selectedButton;
        } else {
            murl = '';
        }
        console.log('my url---------->', searchValue.text)
        if (urls != undefined) {
            fUrl = fUrl + murl + uri + urls
        }
        console.log('my urln home page---------->', fUrl)


        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoading(false)
        console.log('the res Home searcg==>>', responseJson)
        if (responseJson.body.total > 0) {
            console.log('the res after sucess of search cooking', responseJson.body.articles)
            generateThumb(responseJson.body.articles)
        } else {
            setCategorydata([]);
        }
    }

    const generateThumb = async (item) => {
        console.log('my array for thumbnail', item.type);
        setLoading2(true)
        const allData = await Promise.all(
            item.map?.(async (el) => {
                console.log('tpe el', el.type)
                if (!el.files) {
                    return { ...el, type: "none", post_type: el.type };
                }
                else if (el.files.find((js) => js.post_type == "Image")) {
                    return {
                        ...el,
                        type: "image",
                        post_type: el.type
                    };
                } else {
                    // console.log("createThumbnail will be called", el.files[0].file_url);
                    const thumb = await createThumbnail({
                        url: el.files[0].file_url,
                        timeStamp: 1000, // Specify the time position for the thumbnail (in milliseconds)
                    });
                    return {
                        ...el,
                        thumb,
                        type: "video",
                        post_type: el.type
                    };
                }
            })

        );
        // console.log("allData  search", allData);
        const data = allData
        // console.log(data, 'data111');
        setCategorydata(data);
        setLoading2(false)
    };

    const searchFilter = async text => {
        console.log('my text on change hhh', text);
        if (text.text.trim() === '') {
            await getFilterStatement(1, selectedButton);
        } else {
            await getFilterStatement(1, selectedButton, text.text);
        }
        setFilterValue(text.text)
    }

    const getSuggestion = async () => {
        setLoading(true)
        var fUrl = get_suggestion
        var urls = 53
        // console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        // console.log(' get suggestion url', fUrl)
        // console.log('my url---------->', fUrl)
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoading(false)
        // console.log('the res of get suggest post', responseJson)
        if (responseJson.headers.success == 1) {
            // console.log('the res after sucess of post suggested1111', responseJson.body.data)
            generateThum(responseJson.body.data)
        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    const handleLoadMore = async () => {
        var pageNumber = 1;

        if (isFilterApplied) {
            await getFilterStatement(pageNumber,);
            pageNumber += 1;
        } else {
            await getStatement();
        }


    };
    const toggleModal = (state) => {
        // console.log('state', state);
        setShowModal({
            isVisible: state.isVisible,
            data: state.data,
        });
    };
    const removeCategoryFilter = async () => {
        // setSelectedCategory({})
        setSelectedButton('')
        // ArtCategory(true)
        const currentSelectedButton = selectedButton;
        await getFilterStatement(1, currentSelectedButton)
        // getDropdownData()
    }
    return (
        <SafeAreaView scrollEnabled={scrollEnabled} style={{ height: '100%', backgroundColor: '#F8F8F8' }}>
            {/* <ScrollView> */}
            <HomeHeaderRoundBottom height={100} extraStyle={{ paddingtop: 10, paddingBottom: 25 }} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#FFC40C'
                press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
                press2={() => { }} title2={'Startup'} fontWeight={'500'} img2height={20} color={'#fff'}
                press3={() => { props.navigation.navigate('InventionNotifications') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22} />


            <View style={{ top: -20, width: '90%', alignSelf: 'center' }} >

                <FashionSearch marginTop={0}
                    serchValue={filterValue}
                    placeholder={'Search by title'}
                    searchIcon={require('../../../assets/Art/CreationArtSearch.png')}

                    // onChangeText={(e) => {
                    //     console.log('my e', e);
                    //     if (e.text === '') {
                    //         console.log('my empyt text',)
                    //     }
                    //     setsearchValue(e);
                    //     if (e.text === '') {
                    //         ArtCategory();
                    //     } else { ArtCategory(false, '', e.text); }
                    // }}
                    onChangeText={text => searchFilter(text)}
                    presssearch={() => {

                    }} paddingLeft={20} />

            </View>
            <View style={{
                flex: 1, width: '90%',
                marginLeft: 'auto',
                marginRight: 'auto',

            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 10, }}>
                    <Text style={{ color: Mycolors.Black, fontWeight: '500', width: '50%' }} >Pick a Type</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        {Object.keys(selectedButton)?.length > 0 ?
                            <TouchableOpacity onPress={removeCategoryFilter} style={styles.refreshView}>
                                <Image source={require('../../../assets/Art/meclear.png')} style={{ height: 20, width: 20 }}></Image>
                                <Text style={{ color: '#fff', fontSize: 12, fontWeight: '400', marginLeft: 10 }} >Clear</Text>
                            </TouchableOpacity>
                            :
                            null
                        }
                        {/* <TouchableOpacity onPress={() => { setmodlevisual5(true) }}>
                            
                            <Image source={require('../../../assets/Art/FilterType.png')} style={{ height: 60, width: 60 }}></Image>
                        </TouchableOpacity> */}
                    </View>
                </View>


                <View
                    style={{
                        width: '97%',
                        paddingLeft: 0,
                        fontSize: 13,
                        height: 'auto',
                        fontWeight: '400',
                        color: '#000000',
                        marginVertical: 22,
                        flexDirection: 'column',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            height: 50,
                            borderWidth: 1,
                            borderColor: '#FFC40C',
                            borderRadius: 4,
                            marginHorizontal: 12,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '50%',
                                height: 47,
                                backgroundColor: selectedButton === 'Informational' ? '#FFC40C' : 'white',
                            }}
                            onPress={() => handleInformationalClick()}
                        >
                            <Text style={{ textAlign: 'center', color: selectedButton === 'Informational' ? 'white' : '#000000' }}>Informational</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',

                                height: 47,
                                width: '50%',
                                backgroundColor: selectedButton === 'Fundraiser' ? '#FFC40C' : 'white',
                            }}
                            onPress={handleFundraiserClick}
                        >
                            <Text style={{ color: selectedButton === 'Fundraiser' ? 'white' : '#000000' }}>Fundraiser</Text>
                        </TouchableOpacity>
                    </View>

                    {selectedButton === 'Fundraiser' ? ( // Use selectedButton state to conditionally render the input field
                        <>
                            <View style={{ width: '80%' }}>
                                <Text style={{ fontSize: 14, color: 'gray', marginVertical: 12, textAlign: 'center' }}>
                                    Launch your campaign and raise funds from our backers
                                </Text>
                            </View>
                        </>
                    ) : (
                        <View style={{ width: '80%' }}>
                            <Text style={{ fontSize: 14, color: 'gray', marginVertical: 0, textAlign: 'center', marginTop: 10 }}>
                                Create interactive posts to increase your reach among the community.
                            </Text>
                        </View>
                    )}
                </View>

                <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'center', height: dimensions.SCREEN_HEIGHT * 0.52, }}>
                    {categoryData.length === 0 ? (
                        <>
                            <Image source={require('../../../assets/Art/NoPostStartup.png')} style={{ alignSelf: 'center', justifyContent: 'center', marginTop: '30%' }}></Image>
                            <Text style={{ textAlign: 'center', fontSize: 16, color: 'black', marginTop: 12 }}>
                                No data found
                            </Text>
                        </>
                    ) : (

                        <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'center', }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                ref={scrollRef}
                                data={categoryData}
                                showsHorizontalScrollIndicator={false}
                                numColumns={1}
                                style={{}}
                                onEndReachedThreshold={0.9}
                                onEndReached={handleLoadMore}

                                // ListFooterComponent={renderFooter}

                                renderItem={({ item, index }) => {
                                    console.log(item.post_type
                                        , 'my itemsssss for profilee');
                                    item?.files?.map((image, index) => (
                                        // console.log(item, 'my file url')
                                        {}

                                    )




                                    )

                                    return (

                                        <View
                                            // onPress={() => {
                                            //     props.navigation.navigate('StartupPost', { id: item.id })
                                            // }}
                                            style={{ width: '95.5%', marginVertical: 10, borderRadius: 30, }}>
                                            <TouchableOpacity style={styles.flatlistMainView} onPress={() => {
                                                props.navigation.navigate('StartupPost', { id: item.id })
                                            }}>

                                                <View style={styles.followingImageView}>
                                                    <View
                                                    >

                                                        {item.user_profile_image ? (
                                                            <Image
                                                                source={{
                                                                    uri: item.user_profile_image
                                                                }}
                                                                style={{ width: 35, height: 35, borderRadius: 90, }}

                                                            />
                                                        ) : (
                                                            <Image
                                                                source={require('../../../assets/blankProfile.png')}
                                                                style={{ width: 35, height: 35, borderRadius: 40 }}
                                                            />
                                                        )}
                                                    </View>
                                                    <View style={styles.followingView}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '98%', }}>
                                                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64' }}>  {item.username
                                                            }</Text>
                                                            <View>
                                                                <Text style={{
                                                                    fontSize: 12,
                                                                    fontWeight: '500',
                                                                    color: '#FFC40C',
                                                                    top: 2

                                                                }}>{item.post_type}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                                                </View>

                                            </TouchableOpacity>

                                            {/* addd new view heree */}
                                            <View style={{ width: dimensions.SCREEN_WIDTH, alignSelf: 'center', }}>
                                                <View style={{ justifyContent: 'flex-start', }}>
                                                    <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
                                                        {item.type == 'video' ? (



                                                            <TouchableOpacity style={{ width: '100%', height: 227, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover' }} onPress={() => {
                                                                setShowModal({
                                                                    isVisible: true,
                                                                    data: item.files[0],
                                                                })
                                                            }} >
                                                                <View style={{ width: dimensions.SCREEN_WIDTH, height: 200, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover' }} onPress={() => {
                                                                    setShowModal({
                                                                        isVisible: true,
                                                                        data: item
                                                                    })
                                                                }}>

                                                                    <ImageBackground source={{ uri: item.thumb?.path }} style={{
                                                                        width: dimensions.SCREEN_WIDTH, height: 224, alignSelf: 'center', justifyContent: 'center',


                                                                    }} resizeMode='cover' >
                                                                        <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
                                                                    </ImageBackground>
                                                                </View>
                                                            </TouchableOpacity>
                                                        ) :

                                                            <View style={{ width: dimensions.SCREEN_WIDTH, height: 200, }}>

                                                                <Image
                                                                    source={{ uri: `${item.cover_photo}` }}
                                                                    style={styles.image}
                                                                    resizeMode='stretch'
                                                                // key={index}
                                                                />

                                                            </View>
                                                        }

                                                    </ScrollView>
                                                </View>
                                            </View>


                                            <TouchableOpacity style={styles.flatlistMainBottomView} onPress={() => {
                                                props.navigation.navigate('StartupPost', { id: item.id })
                                            }}>
                                                {
                                                    // <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, justifyContent: 'center', width: '94%' }} onPress={() => {
                                                    // }}>

                                                    //     <View style={{
                                                    //         flexDirection: 'row', alignItems: 'center',

                                                    //         width: '100%'

                                                    //     }}>


                                                    //         <View style={{
                                                    //             flexDirection: 'row',
                                                    //             justifyContent: 'space-between',
                                                    //             width: '100%',
                                                    //             marginTop: 10

                                                    //         }}>
                                                    //             <Text numberOfLines={2} style={{

                                                    //                 width: '59%', fontSize: 14,
                                                    //                 fontWeight: '400',
                                                    //                 color: '#263238',

                                                    //                 justifyContent: 'flex-start',
                                                    //                 textAlign: 'left',



                                                    //             }}>


                                                    //                 {item.headline}
                                                    //             </Text>
                                                    //             <Text style={{ width: '35%', textAlign: 'right', color: '#FFC40C' }}>
                                                    //                 {item.category}
                                                    //             </Text>
                                                    //         </View>
                                                    //     </View>
                                                    // </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, justifyContent: 'center', width: '93%' }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, }} >
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                                width: '100%',


                                                            }}>
                                                                <Text numberOfLines={2} style={{

                                                                    width: '59%', fontSize: 14,
                                                                    fontWeight: '400',
                                                                    color: '#263238',

                                                                    justifyContent: 'flex-start',
                                                                    textAlign: 'left',



                                                                }}>

                                                                    {item.headline}

                                                                </Text>
                                                                <Text style={{ width: '35%', textAlign: 'right', color: '#FFC40C' }}>
                                                                    {item.category}

                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                }
                                                <View style={styles.flatlistBottomView}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                        {item.post_type != 'Fundraiser' ? < View style={styles.buttonsContainer} >
                                                            <View style={styles.buttonView}>
                                                                <Image
                                                                    source={require('../../../assets/images/fashion-dark-like-button.png')}
                                                                    style={styles.buttonIcon}
                                                                />

                                                                <Text style={styles.buttonText}>{item.totalLikes} Likes</Text>

                                                            </View>
                                                            <View style={styles.buttonView}>
                                                                <Image
                                                                    source={require('../../../assets/images/fashion-dark-dislike-button.png')}
                                                                    style={styles.buttonIcon}
                                                                />

                                                                <Text style={styles.buttonText}>{item.totalDislikes} Dislikes</Text>
                                                            </View>
                                                            <View style={styles.buttonView}>
                                                                <Image
                                                                    source={require('../../../assets/People/commentPostPeople.png')}
                                                                    style={styles.buttonIcon}
                                                                />

                                                                <Text style={styles.buttonText}>{item.totalComments
                                                                } Comments</Text>
                                                            </View>
                                                        </View> : null}
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <View style={{ marginRight: 10 }}>

                                                        </View>

                                                    </View>
                                                </View>
                                                {item.post_type == 'Fundraiser' ? < View >
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.88, paddingHorizontal: 12, }}>
                                                        <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item.project_estimate} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> USD</Text></Text>
                                                        <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{3} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}>backers</Text></Text>
                                                    </View>
                                                    <ProgressBar height={15} width={dimensions.SCREEN_WIDTH * 0.82} backgroundColor={'#E0E0E0'} borderColor={'#E0E0E0'} progress={item.total_amount_raised / item.project_estimate} color={'#FFC40C'} borderRadius={10} marginLeft={12} />
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.90, paddingVertical: 3, paddingHorizontal: 15, marginBottom: 12 }}>
                                                        <Text style={{ fontWeight: '400', fontSize: 14, color: 'black' }}>{((item.total_amount_raised / item.project_estimate) * 100).toFixed(0)}% of {'$' + item.project_estimate} <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', }}></Text></Text>
                                                        <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>
                                                            {/* {Math.floor(Math.floor((new Date(item.expiry_date)) - new Date()) / (1000 * 60 * 60 * 24))} */}

                                                            {Math.floor(moment(item.expiry_date).diff(moment(), 'days'))}
                                                            <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> days left</Text> </Text>
                                                    </View>
                                                </View> : null
                                                }

                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                                }
                                keyExtractor={item => item.id}
                            />
                        </View>

                    )}
                </View>
                {/* <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10 }}>
            <FlatList
              data={courseData}
              showsHorizontalScrollIndicator={true}
              horizontal
              renderItem={({ item, index }) => {
                return (

                  <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH / 2.8, height: 160, marginRight: 15, borderRadius: 10, overflow: 'hidden', position: 'relative', alignItems: 'center', borderRadius: 15, paddingHorizontal: 10 }}
                    onPress={() => { }}>
                    <Image source={item.img} style={{ width: dimensions.SCREEN_WIDTH / 2.8, height: 160 }} resizeMode='contain'></Image>
                    <LinearGradient
                      colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.43)']}
                      style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1, }}
                    >
                      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff', bottom: 20 }}>{item.title}</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                )
              }}
              keyExtractor={item => item.id}
            />
          </View> */}

                {/* ///Intro slider */}









            </View >

            {/* </ScrollView> */}
            {/* <TouchableOpacity onPress={()=>props.navigation.navigate('ShopProdCart')} style={{width:'80%',height:60,flexDirection:'row',justifyContent:'flex-end',position:'absolute',bottom:40, right:20, shadowColor: '#FFD037', shadowOffset: {width: 0,height: 3},shadowRadius: 1,shadowOpacity: 0.1,elevation: 5}}> */}
            {/* <TouchableOpacity onPress={() => { props.navigation.navigate('ArtUpload') }} style={{ bottom: 60, right: 20, position: 'absolute', alignSelf: 'flex-end', width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: '#29913C', justifyContent: 'center', alignItems: 'center', shadowColor: '#FFD037', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.1, elevation: 5 }}>
                <Image source={require('../../../assets/images/fashion-upload-icon.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity> */}
            {/* </TouchableOpacity> */}
            {loading || loading2 ? <Loader /> : null}
            <Modal
                isVisible={showReportModal}
                swipeDirection="down"
                onBackdropPress={() => setShowReportModal(false)}
                onSwipeComplete={(e) => {
                    setShowReportModal(false)
                }}
                scrollTo={() => { }}
                scrollOffset={1}
                propagateSwipe={true}
                coverScreen={false}
                backdropColor='transparent'
                style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                <View style={{ height: '90%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#455A64', textAlign: 'center', marginBottom: 20, marginTop: 30 }}>Report</Text>
                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={reportReasonData}
                            showsHorizontalScrollIndicator={false}
                            numColumns={1}
                            keyExtractor={item => item.id}
                            style={{ marginBottom: 10 }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity key={item.id} onPress={() => setSelectedReasonId(item.id)} style={selectedReasonId === item.id ? styles.selectedReasonView : styles.reasonView}>
                                        <Image source={selectedReasonId === item.id ? require('../../../assets/images/fastion-selected-reason-icon.png') : require('../../../assets/images/fastion-reason-icon.png')} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 14, lineHeight: 14, fontWeight: '400', color: '#455A64' }}>{item.name}</Text>
                                            {item.headline ?
                                                <Text style={{ fontSize: 12, lineHeight: 12, fontWeight: '400', color: '#C5C6C9', marginTop: 2 }}>{item.headline}</Text>
                                                : null}
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />

                        <TouchableOpacity style={styles.reportButtonView}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff', }}>Report</Text>
                        </TouchableOpacity>

                    </ScrollView>

                </View>
            </Modal>

            {
                showModal.isVisible ? (

                    <VideoModel
                        isVisible={showModal.isVisible}
                        toggleModal={toggleModal}
                        videoDetail={{ ...showModal?.data, url: showModal?.data?.file_url }}
                        {...props}
                    />
                ) : null
            }
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    unselectedTabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#263238'
    },
    requestCallView: {
        marginTop: 10,
        width: 140,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#29913C',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#6D2F91',
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.17,
        elevation: 2
    },
    VideoThumbWrapper: {
        position: 'relative',
        // width: '48%',
        // marginRight: 8,
        marginBottom: 4,

        width: dimensions.SCREEN_WIDTH / 1.5,
        height: 160,
        marginRight: 20,
        borderRadius: 15,
        // shadowColor:'#000',
        // shadowOffset: {width: 0,height: 3},
        // shadowRadius: 1,
        // shadowOpacity: 0.03,
        // elevation: 1,
    },
    PlayIconContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    PlayIconWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    BackGroundImage: {
        width: '100%',
        height: 160,
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',


    },
    buttonText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#8F93A0',
        marginLeft: 5
    },
    reasonView: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 15,
        // paddingVertical:10,
        paddingHorizontal: 10,
        width: '90%',
        height: 60,
    },
    selectedReasonView: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 15,
        // paddingVertical:10,
        paddingHorizontal: 10,
        width: '90%',
        height: 60,
        borderColor: '#E7F7FF',
        borderWidth: 1,
        shadowColor: '#455A64',
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.10,
        elevation: 1
    },
    reportButtonView: {
        height: 60,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#0089CF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.10,
        elevation: 2
    },
    flatlistMainView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: dimensions.SCREEN_WIDTH * 0.9,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomWidth: 1,
        borderLeftColor: '#EDEEEE',
        borderRightColor: '#EDEEEE',
        borderBottomColor: '#EDEEEE'

    },
    followingImageView: {
        flexDirection: 'row',
        alignItems: 'center',


    },
    followingView: {
        justifyContent: 'center',

        width: '87%'

    },
    flatlistMainBottomView: {
        // backgroundColor: '#fff',
        // // paddingVertical: 10,
        // width: dimensions.SCREEN_WIDTH * 0.9,
        // borderBottomRightRadius: 20,
        // borderBottomLeftRadius: 20,
        // borderLeftWidth: 1,
        // borderRightWidth: 1,
        // borderBottomWidth: 1,
        // borderLeftColor: '#EAEBEB',
        // borderRightColor: '#EAEBEB',
        // borderBottomColor: '#EAEBEB',
        backgroundColor: '#fff',
        // paddingVertical: 10,
        width: dimensions.SCREEN_WIDTH * 0.9,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftColor: '#EAEBEB',
        borderRightColor: '#EAEBEB',
        borderBottomColor: '#EAEBEB',


    },
    flatlistBottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    textContainerrrr: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: dimensions.SCREEN_WIDTH * 0.55,
    },
    refreshView: {
        flexDirection: 'row',
        alignItems: 'center',
        // width: '25%',
        // marginTop: 10,
        marginRight: 10,
        backgroundColor: '#FFC40C',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 50
    },
    descriptionTextrrrr: {
        fontSize: 14,
        fontWeight: '400',
        color: '#263238',
        width: '59%',

    },
    createdTimeText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#263238',
        textAlign: 'right',
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    image: {
        width: dimensions.SCREEN_WIDTH * 1,
        height: '99%',
        alignSelf: 'center',
        //  backgroundColor: 'red',
        justifyContent: 'center',


    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4, // Add margin between text and buttons
        // Align buttons with the text,
        justifyContent: 'space-between',
        width: '93%',
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 3


    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    buttonIcon: {
        height: 20,
        width: 20,
    },
    buttonText: {
        marginLeft: 5, // Add spacing between icon and text
        fontSize: 14,
        color: '#263238',
    },
    topRightImage: {
        position: 'absolute',
        top: 10, // Adjust the top position as needed
        right: 10, // Adjust the right position as needed
        width: 30,
        height: 30,
        resizeMode: 'contain',


    }, topRightImageContainer: {
        position: 'absolute',
        top: 30, // Adjust the top position as needed
        right: 30, // Adjust the right position as needed
        zIndex: 999,
        backgroundColor: 'transparent'
    },
    // categorySelectedStyle: {
    //     borderWidth: 2,
    //     borderColor: '#FFC40C',
    //     borderRadius: 10
    // },
    // categoryUnSelectedStyle: {
    //     borderWidth: 2,
    //     borderColor: '#B2B7B9',
    //     borderRadius: 10
    // },

});
export default AllSatrtupSuggested 