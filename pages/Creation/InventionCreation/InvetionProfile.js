

import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, } from 'react-native';
import HomeHeaderRoundBottom from './components/HomeHeaderRoundBottom';
import { androidCameraPermission } from './Permissions';
import moment from 'moment';
import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_people_newPost, art_getCollection, requestPostApiMedia, art_PostCollection, postApiWithToken2, art_HomePage, addProfile_image, get_profile, delet_article, update_profileImg, creation_addPhoto, creation_profile, creation_delete_article, creation_delete, invention_profile, getAPI } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../WebApi/Loader';
import ProgressBar from 'react-native-progress/Bar'
import MyAlert from "../../../component/MyAlert";
import { saveUserResult, saveUserToken, setVenderDetail, onLogoutUser, savepeoplemoduleuserdata } from '../../../redux/actions/user_action';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import FashionSearch from './components/FashionSearch';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient'
import AppIntroSlider from 'react-native-app-intro-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import VideoPlayer from 'react-native-video-player'
import { createThumbnail } from "react-native-create-thumbnail";
import ViewMoreText from 'react-native-view-more-text';
import { VideoModel } from '../../../component/VideoModel';

const InventionProfile = (props) => {
    const dispatch = useDispatch();
    const User = useSelector(state => state.user.user_details)
    console.log('User', User);
    const [categoryData, setCategoryData] = useState([])
    const [articleData, setArticleData] = useState('')
    const [searchValue, setsearchValue] = useState('')
    const [scrollEnabled, setScrollEnabled] = useState(false)
    const myTextInput = useRef()
    const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
    const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState({ isVisible: false, data: null });
    const [showVideoModal, setShowVideoModal] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState({})
    const [showReportModal, setShowReportModal] = useState(false)
    const [selectedReasonId, setSelectedReasonId] = useState(null)
    const [image, setImage] = useState('');
    const [image2, setimage2] = useState('')
    const [profileModal, setProfileModal] = useState('')

    const [isimageChange, setisimageChange] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [profileImg, setProfileImg] = useState(
        '')
    const [modlevisual5, setmodlevisual5] = useState(false)
    const [selectedId, setSelectedId] = useState(null);
    const [myselectcat, setMyslectcat] = useState('')
    const [modlevisual, setmodlevisual] = useState(false);
    const [totalAmount, setTotalAmount] = useState(1000)
    const [raisedAmount, setRaisedAmount] = useState(200)
    const progress = raisedAmount / totalAmount;
    console.log('progess ammaount', (progress * 100).toFixed(0));
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
    const [ctegoryData, setCategorydata] = useState('')
    const [selectedCategory, setSelectedCategory] = useState({})
    console.log('selected category', selectedCategory);
    const [introSliderData] = useState([
        // require('../../assets/Group75972.png'),
        { key: 'one', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
        { key: 'two', image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
        { key: 'three', image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' }
    ])
    const [likes, setLikes] = useState('')
    const [dislike, setdisikes] = useState('')
    console.log('kkkkkk', dislike)
    const [comment, setcommes] = useState('')
    const [profile, setProile] = useState('')
    const [desData, setData] = useState([])
    const [My_Alert2, setMy_Alert2] = useState(false);
    const [alert_sms2, setalert_sms2] = useState("");
    const [desc, setdesc] = useState('')
    const [title, setTile] = useState('')
    const [article, setArticle] = useState('')
    const [userame, setUserName] = useState()
    const [selectedCategoryy, setSelectedCategoryy] = useState(null);
    const [selectedButton, setSelectedButton] = useState('')

    const [loading2, setLoading2] = useState(false);
    const [showFundraiserInput, setShowFundraiserInput] = useState(false);

    const [isViewVisible, setIsViewVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isEditingOptionsVisible, setEditingOptionsVisible] = useState(false);
    const [typeArticle, setTypeArticle] = useState('Fundraiser')
    const handleToggleView = (itemId) => {
        console.log('itemId', itemId[0].article_id);
        setSelectedItemId(itemId[0].article_id);
    };
    useEffect(() => {
        if (selectedItemId !== null) {
            console.log('is selected item selecte', selectedItemId)

            setEditingOptionsVisible(true);
        } else {
            setEditingOptionsVisible(false);
        }
    }, [selectedItemId]);
    const handleInformationalClick = () => {
        console.log('informaion');
        setShowFundraiserInput(false);
        setSelectedButton('Informational');
        getFilterStatement(1, 'Informational')
        // GetMyServicesFilter()
    };
    const handleFundraiserClick = () => {
        console.log('fundraiser function');
        setShowFundraiserInput(true); setSelectedButton('Fundraiser')
        getFilterStatement(1, 'Fundraiser')
        // GetMyServicesFilter()
    };
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // The screen is focused
            setSelectedItemId(null);
            // Call any action
            ArtCategory()
            // getFilterStatement(1, selectedButton)
            // Categories()
            // GetMyServicesFilter()
            // console.log('my user id of state----->', userID);
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [props, selectedButton]);
    const ArtCategory = async () => {
        setLoading(true)
        var fUrl = invention_profile
        var urls = User.userid

        var murl = '&module_id=' + '59'
        var ru = `?page_no=1&limit=10`
        console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls + ru + murl
        }

        console.log("LIKE CLICK for cooking:::", fUrl);
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoading(false)

        console.log('the res after sucess of profile vrinda', responseJson.body.data.dataArray)
        if (responseJson.body.data.dataArray.length == 0) {
            // If data is null, set the states to 0
            console.log('0 is called  kkkkkkkk',);
            setLikes(0);
            setdisikes(0);
            setcommes(0);
            setProile(responseJson.body.data.user_profileImage);
            setUserName(responseJson.body.data.user_name);
        } else {
            console.log('1 is called  kkkkkkkk',);
            // Check if the API call was successful (responseJson.headers.success == 1)
            if (responseJson.headers.success === 1) {

                generateThumb(responseJson.body.data.dataArray);
                console.log('username for profile data ', responseJson.body.data
                );
                setLikes(responseJson.body.data.total_article_likes);
                setdisikes(responseJson.body.data.total_article_dislikes);
                setcommes(responseJson.body.data.total_article_comments);
                setProile(responseJson.body.data.user_profileImage);
                setUserName(responseJson.body.data.dataArray[0].username);
                // Toast.show({ text1: responseJson.headers.message });
            } else {
                setalert_sms(err);
                setMy_Alert(true);
            }
        }
    }
    const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }

    const toggleModal = (state) => {
        console.log('state', state);
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
        ArtCategory()
        // getDropdownData()
    }
    const Delete = async (id) => {
        setLoading(true)
        console.log('the deleteee post id', id)
        console.log('myy url ', creation_delete + id)

        const { responseJson, err } = await requestPostApi(creation_delete + id, '', 'DELETE', User.token)
        // props.navigation.navigate('MyProfile')
        console.log('the deleteee post of cooking', responseJson)

        if (responseJson.headers
            .success == 1) {
            // setUserid(nameAgeList[0].rest.userid)
            // props.navigation.navigate('MyProfile')
            // setdescrbe(responseJson.post.post_description)
            Toast.show({ text1: responseJson.headers.message });
            setLoading(false)
            ArtCategory()
            // setLoading(false)
            // Toast.show({ text1: responseJson.headers.message });

        } else {

            setalert_sms(err)
            setMy_Alert(true)

        }
        setLoading(false)
    }
    const openImageModal = (index) => {

        console.log('my image')
        setmodlevisual(true)
    }
    const onCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setImage(image)
            setimage2(image?.path)
            console.log('imagre set-------////////', image);
            setisimageChange(true)
            console.log(image.path);
            { profile ? UpdateProfileImg(image) : changeProfileImg(image) }
            setmodlevisual(false)
        });
    }
    const onGallery = async () => {
        try {
            let value = await ImagePicker.openPicker({
                width: 1080,
                height: 1080,
                cropping: true,
                mediaType: 'photo',
                compressImageQuality: 1,
                compressImageMaxHeight: 1080 / 2,
                compressImageMaxWidth: 1080 / 2,
            }).then(image => {
                setImage(image);
                setimage2(image?.path)
                setisimageChange(true)
                console.log('imagre set------- profile////////', profile);
                console.log('my profile cccccccccc');
                { profile ? UpdateProfileImg(image) : changeProfileImg(image) }
                setmodlevisual(false)
            });
        } catch (error) {
            console.log('error in openLibrary', error);
        }
    };

    const changeProfileImg = async (image) => {
        console.log('oes it reach to profile image');
        setLoading(true)
        const feedBackData = new FormData();
        console.log('image-------->', image);
        ;
        if (image != '') {
            var imageName = image.path.slice(
                image.path.lastIndexOf('/'),
                image.path.length,
            );
            feedBackData.append('file', {
                name: imageName,
                type: image.mime,
                uri: image.path,
            });
        }
        console.log('formdata-------->', feedBackData)
        const headers = {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${User.token}`,
        };
        const url = 'http://54.153.75.225/backend/api/v1/creation/common/add-profile-image';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: feedBackData,
            });

            const responseJson = await response.json();
            console.log('myyyyyyyy edit profile image', responseJson)


            // console.log(responseJson
            //     , 'my response of profile');
            setLoading(false)
            //Toast.show({ text1: responseJson.message });


        } catch (error) {
            console.log('Error uploading data:', error);
        }




    }

    const UpdateProfileImg = async (image) => {
        console.log('oes it reach to updateee image');
        setLoading(true)
        const feedBackData = new FormData();
        console.log('image-------->', image);
        ;
        if (image != '') {
            var imageName = image.path.slice(
                image.path.lastIndexOf('/'),
                image.path.length,
            );
            feedBackData.append('file', {
                name: imageName,
                type: image.mime,
                uri: image.path,
            });
        }
        console.log('formdata-------->', feedBackData)
        const headers = {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${User.token}`,
        };
        const url = 'http://54.153.75.225/backend/api/v1/creation/common/update-profile-image';
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers,
                body: feedBackData,
            });

            const responseJson = await response.json();
            console.log('myyyyyyyy update  profile image uploaded success', responseJson.headers.success)
            if (responseJson.headers.message == 'Profile image updated!')
                console.log('is image updated')


            // console.log(responseJson
            //     , 'my response of profile');
            setLoading(false)
            //Toast.show({ text1: responseJson.message });

            Toast.show({ text1: 'Profile Image has been Updated' })
        } catch (error) {
            console.log('Error uploading data:', error);
        }




    }

    const getFilterStatement = async (
        pageNo = 1,
        type = '',
        module_id = '59'

    ) => {
        try {
            const paramData = {
                page_no: pageNo,
                type: type,
                limit: 20,
                module_id: module_id
            };
            console.log(paramData, 'paramData');
            const { response, status, message } = await getAPI(
                invention_profile + User.userid,
                paramData,
                User.token,
            );
            console.log('status');
            if (status) {
                console.log('jjjj checkkkk');
                // if (response?.listing?.length > 0) {
                if (pageNo == 1) {
                    console.log('mr new function rr let me check', response.data.dataArray)
                    generateThumb(response.data.dataArray);
                    // setStatementData(response?.listing);

                    //  generateThumb(response.articles)
                } else {
                    //generateThumb([...articleData, ...response.body.articles]);
                    setPage(newpage);
                }
                // }
            }
        } catch (error) {
            console.error('error in getFilterStatement', error);
        }
    };
    const generateThumb = async (item) => {
        console.log('item  profile', item);
        setLoading2(true)
        const allData1 =
            await Promise.all(item?.map(async (el) => {
                console.log('myyyy thumb commr', el.total_comments)
                const data = await Promise.all(el.images?.map(async (imgData, index) => {
                    if (imgData?.post_type === "Image") {
                        return {
                            ...imgData, type: 'image', id: index, description: el.description, likes: el.total_likes, dislike: el.total_dislikes, cretedTime: el.created_date, article_id: el.article_id, title: el.headline, comment: el.total_comments, category_data: el.category_id, category_name: el.category, post: el.type,
                            ammountRaised: el.total_amount_raised, project_estimate: el.project_estimate, expiry_date: el.expiry_date
                        }
                    } else {
                        console.log("createThumbnail will be called for profile ", imgData);
                        const thumb = await createThumbnail({
                            url: imgData.file_url,
                            timeStamp: 10, // Specify the time position for the thumbnail (in milliseconds)
                        });
                        return {
                            ...imgData,
                            thumb,
                            type: "video",
                            id: index,
                            description: el.description,
                            likes: el.total_likes,
                            dislike: el.total_dislikes,
                            cretedTime: el.created_date,
                            article_id: el.article_id,
                            title: el.headline,
                            comment: el.total_comments,
                            category_data: el.category_id,
                            category_name: el.category,
                            post: el.type,
                            ammountRaised: el.total_amount_raised,
                            project_estimate: el.project_estimate,
                            expiry_date: el.expiry_date
                        };
                    }
                }))
                return data
            }))
        console.log(allData1, 'my profile thumb11111');
        setData(allData1)

        setLoading2(false)
    };
    const handleLoadMore = async () => {
        var pageNumber = 1;

        if (isFilterApplied) {
            await getFilterStatement(pageNumber, startDate, endDate, selectedCrDr);
            pageNumber += 1;
        } else {
            await getStatement();
        }


    };
    const _renderItem = ({ item }) => {
        console.log(item, 'item ggggg');


        return (
            <>
                {
                    item.type === 'video' ? (
                        // <VideoPlayer
                        //     resizeMode="contain"
                        //     video={{ uri: item.file_url }}
                        //     style={{ borderWidth: 2 }}
                        //     videoWidth={dimensions.SCREEN_WIDTH}
                        //     videoHeight={120}
                        //     autoplay={false}
                        //     thumbnail={{ uri: item.thumb.path }}
                        //     endWithThumbnail
                        //     disableControlsAutoHide
                        //     customStyles={{
                        //         thumbnail: { width: '100%', height: 200, },
                        //         videoWrapper: { width: '100%', height: 150, resizeMode: 'stretch' },
                        //         // wrapper: { width: '100%', height: 227 },
                        //     }}
                        // />
                        <TouchableOpacity style={{ width: '100%', height: 200, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover' }} onPress={() => {
                            setShowModal({
                                isVisible: true,
                                data: item
                            })
                        }} >

                            <ImageBackground source={{ uri: item.thumb.path }} style={{
                                width: '100%', height: 200, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
                                overflow: 'hidden',
                            }} resizeMode='cover' >
                                <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
                            </ImageBackground>
                        </TouchableOpacity>
                    ) : (
                        <Image source={{ uri: item.file_url }} style={{ width: '100%', height: 350, alignSelf: 'center' }} />
                    )
                }
            </>
        );
    }



    const GetMyServicesFilter = async () => {
        console.log('filter function is called');
        setLoading(false);
        var fUrl = invention_profile
        var urls = User.userid

        // console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls

        }
        console.log("my furls", fUrl);

        // console.log("....Filter GetMyServicesFilter......", statusValue);
        // var Date = moment(orderDate).format("YYYY-MM-DD");
        // console.log(statusValue, 'my console ');
        var murl = '59'
        const inputData = {}

        if (selectedButton != "") {
            inputData.status = selectedButton
            console.log('my date---', orderTypeValue);
        }


        if (murl != "") {
            //console.log('kkk', inputData.date = Date);
            inputData.module_id = murl
        }
        console.log('filter otputstring');
        const outputString = objToQueryString(inputData);
        console.log("....Filter urlS......", outputString,);
        setLoading(true);
        const { responseJson, err } = await requestGetApi(
            fUrl + outputString,
            "",
            "GET",
            User.token
        );
        setLoading(false);
        console.log("the res==>>GetMyServicesFilter", responseJson?.body, fUrl + outputString);
        if (responseJson?.headers?.success == 1) {
            // setMyService(responseJson?.body)
            ;
            console.log("the res==>> ", responseJson?.body, fUrl + outputString);

            setTransactionData(responseJson.body.data);
            // setStatusValue("");
            // setOrderDate("");
            // setOrderTypeValue("");
        } else {
            Toast.show({ text1: responseJson?.headers?.message });
            // setalert_sms(responseJson.headers.message);
            // setMy_Alert(true)
        }
    };
    return (
        <SafeAreaView scrollEnabled={scrollEnabled} style={{ height: '100%', backgroundColor: '#F8F8F8' }}>
            <ScrollView>
                {/* <HomeHeaderRoundBottom height={80} extraStyle={{ paddingtop: 10, paddingBottom: 25 }} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#29913C'
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
                    press2={() => { }} title2={'Art'} fontWeight={'500'} img2height={20} color={'#fff'}
                    press3={() => { props.navigation.navigate('ArtNotifications') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22} /> */}
                <HomeHeaderRoundBottom height={100} extraStyle={{ paddingtop: 10, paddingBottom: 25 }} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#FFC40C'
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
                    press2={() => { }} title2={'Invention'} fontWeight={'500'} img2height={20} color={'#fff'}
                    press3={() => { props.navigation.navigate('InventionNotifications') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22}
                    press4={() => {
                        // AsyncStorage.clear();
                        // dispatch(onLogoutUser())
                        setalert_sms2("Are you sure want to logout?");
                        setMy_Alert2(true);

                    }} img4={require('../../../assets/People/PeopleLogoutIconModal.png')} img4width={25} img4height={22}
                />
                <View style={{
                    flex: 1,

                    backgroundColor: '#F8F8F8'
                }}>
                    <View style={{ height: 200, marginTop: 20 }}>
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                            style={styles.descriptionView}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                                <View style={{ flex: 1 }}>
                                    {console.log(profile, 'myProfileeeee')}
                                    <Image
                                        source={
                                            isimageChange
                                                ? { uri: image2 }

                                                : profile
                                                    ? { uri: profile }
                                                    : require('../../../assets/blankProfile.png')
                                        }
                                        style={{
                                            height: '50%',
                                            width: '80%',
                                            borderWidth: 2,
                                            borderRadius: 90,
                                            alignSelf: 'center', // Add this to center the image
                                        }}
                                    // Set resizeMode as per your requirement
                                    />
                                </View>
                                {profile == 'null' ? <TouchableOpacity style={{ position: 'absolute', marginLeft: 26, top: 54 }} onPress={openImageModal}>
                                    <Image
                                        source={require('../../../assets/Art/ArtFile.png')}
                                        style={{ width: 15, height: 15, borderRadius: 30, }}
                                    />
                                </TouchableOpacity> :
                                    <TouchableOpacity style={{ position: 'absolute', marginLeft: 26, top: 54 }} onPress={openImageModal}>
                                        <Image
                                            source={require('../../../assets/Art/ArtFile.png')}
                                            style={{ width: 15, height: 15, borderRadius: 30, }}
                                        />
                                    </TouchableOpacity>}
                                {/* <View style={styles.descriptionView}> */}
                                <View style={{ flex: 5, }}>
                                    <View style={styles.imageRowView}>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64', left: -2 }}>
                                                {/* {`${firstname} ${lastname}`} */}

                                                {userame
                                                }
                                            </Text>

                                        </View>


                                        <TouchableOpacity style={styles.threeDotsView} onPress={() => { props.navigation.navigate('InventionPaymentHistory') }}>
                                            {/* <Text style={{ height: 23, alignSelf: 'center', bottom: 4, color: 'white' }}>Add Post</Text> */}
                                            <Image source={require('../../../assets/Art/Transaction.png')} style={{ height: 35, width: 70, marginTop: 20 }} resizeMode='contain'>
                                            </Image>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10, }}>
                                <LinearGradient
                                    colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                                    style={[styles.numView, { marginRight: 10 }]}
                                >
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: '500',
                                        color: '#455A64', marginHorizontal: 12
                                    }}>

                                        {/* {postCount} */}
                                        {likes}
                                    </Text>
                                    <Text style={styles.numText}>Likes</Text>
                                </LinearGradient>
                                <LinearGradient
                                    colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                                    style={[styles.numView, { marginRight: 10 }]}
                                >
                                    <TouchableOpacity


                                    >
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: '500',
                                            color: '#455A64', marginHorizontal: 12
                                        }}>

                                            {/* {foolCount} */}
                                            {dislike}
                                        </Text>
                                        <Text style={styles.numText}>Dislikes</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                                <LinearGradient
                                    colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                                    style={styles.numView}
                                >
                                    <TouchableOpacity style={{ alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'column', marginRight: 10 }}>
                                            {/* Vertical text */}
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: '500',
                                                color: '#455A64', marginHorizontal: 12
                                            }}>
                                                {comment}

                                            </Text>
                                        </View>
                                        <View style={{ width: '100%' }}>
                                            {/* Horizontal text */}
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: '400',
                                                color: '#455A64',
                                                marginLeft: -3
                                            }}>Comments</Text>
                                        </View>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>

                        </LinearGradient>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 50, marginLeft: 28, paddingVertical: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238' }}>My posts</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
                            {Object.keys(selectedButton)?.length > 0 ?
                                <TouchableOpacity onPress={removeCategoryFilter} style={styles.refreshView}>
                                    <Image source={require('../../../assets/Art/meclear.png')} style={{ height: 20, width: 20 }}></Image>
                                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '400', marginLeft: 10 }} >Clear</Text>
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
                                width: '90%',
                                height: 50,
                                borderWidth: 1,
                                borderColor: '#FFC40C',
                                borderRadius: 4,
                                justifyContent: 'center',
                                alignSelf: 'center',
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
                                onPress={handleInformationalClick}
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
                            <View style={{ width: '80%' }}>
                                <Text style={{ fontSize: 14, color: 'gray', marginVertical: 12, textAlign: 'center' }}>
                                    Launch your campaign and raise funds from our backers
                                </Text>

                            </View>
                        ) : (
                            <View style={{ width: '80%' }}>
                                <Text style={{ fontSize: 14, color: 'gray', marginVertical: 0, textAlign: 'center', marginTop: 10 }}>
                                    Create interactive posts to increase your reach among the community.
                                </Text>
                            </View>
                        )}
                    </View>


                    <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'center', marginTop: 10 }}>
                        {desData.length === 0 ? (
                            <Text style={{ fontSize: 16, color: '#FFC40C', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>No posts found</Text>
                        ) : (<FlatList
                            data={desData}
                            showsHorizontalScrollIndicator={false}
                            numColumns={1}
                            style={{}}
                            onEndReachedThreshold={0.9}
                            onEndReached={handleLoadMore}
                            renderItem={({ item, index }) => {
                                console.log(item[0].project_estimate
                                    , 'harticle_id of profile');
                                return (

                                    <View style={{ width: '95.5%', marginVertical: 10, borderRadius: 30, }}>
                                        <TouchableOpacity style={styles.flatlistMainView} onPress={() => { props.navigation.navigate('InventionPost', { id: item[0].article_id }) }}>

                                            <View style={styles.followingImageView}>
                                                <View style={{ borderRadius: 90, width: 35, height: 35, }} >

                                                    {profile ? (
                                                        <Image
                                                            source={{
                                                                uri: profile
                                                            }}
                                                            style={{ width: 35, height: 35, borderRadius: 90, alignSelf: 'center' }}

                                                        />
                                                    ) : (
                                                        <Image
                                                            source={require('../../../assets/blankProfile.png')}
                                                            style={{ width: 35, height: 35, borderRadius: 90 }}
                                                        />
                                                    )}
                                                </View>
                                                <View style={styles.followingView}>
                                                    <View onPress={() => {


                                                    }}>
                                                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64' }}>  {userame
                                                        }</Text>
                                                    </View>

                                                </View>
                                            </View>
                                            <View style={{ width: '30%' }}>
                                                <Text style={{ marginRight: 0, color: Mycolors.STARTUP, textAlign: 'right' }}>{item[0].post}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        // handleToggleView(item) 
                                                        setSelectedItemId(item[0].article_id)
                                                    }}
                                                    style={[styles.rightButtonsView, { marginRight: 0, }]}
                                                >
                                                    <Image source={require('../../../assets/images/people-three-dots.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                                </TouchableOpacity>
                                                <View style={{ position: 'relative', }}>
                                                    {console.log(selectedItemId === item[0].article_id, 'hhhhhhhhbid check')}
                                                    {selectedItemId === item[0].article_id && (
                                                        <View
                                                            style={{
                                                                position: 'absolute',
                                                                top: 12,
                                                                right: 12,
                                                                width: 100,
                                                                height: 90,
                                                                backgroundColor: 'white',
                                                                zIndex: -999,
                                                                borderRadius: 5,
                                                                borderColor: '#D9D9D9',
                                                                borderWidth: 1,


                                                            }}
                                                            onTouchEnd={() => setSelectedItemId(null)}
                                                        >
                                                            {/* View content */}

                                                            <TouchableOpacity onPress={() => { setSelectedItemId(null), props.navigation.navigate('InventionEditArticle', { id: item[0].article_id, cat: item.category_id, desc: item[0].description, title: item[0].title, category: item[0].category_data, type: item[0].post, price: item[0].ammountRaised }) }} style={{ marginTop: 7, marginBottom: 3, }}>
                                                                <Text

                                                                    style={{
                                                                        fontWeight: '500',
                                                                        marginLeft: 15, color: 'black', fontSize: 12,
                                                                    }}
                                                                >Edit</Text>
                                                            </TouchableOpacity>
                                                            <View style={{ width: '100%', height: 1, backgroundColor: '#E0E0E0', marginTop: 5, marginBottom: 5 }} />
                                                            <TouchableOpacity onPress={() => { setSelectedItemId(null), Delete(item[0].article_id) }} style={{}}>
                                                                <Text

                                                                    style={{ fontWeight: '500', color: 'black', fontSize: 12, marginLeft: 15, }}
                                                                >Delete</Text>
                                                            </TouchableOpacity>
                                                            <View style={{ width: '100%', height: 1, backgroundColor: '#E0E0E0', marginTop: 5, marginBottom: 5 }} />
                                                            <TouchableOpacity onPress={() => { setSelectedItemId(null) }} style={{}}>
                                                                <Text

                                                                    style={{ fontWeight: '500', color: 'black', fontSize: 12, marginLeft: 15, }}
                                                                >Close</Text>
                                                            </TouchableOpacity>

                                                        </View>
                                                    )}

                                                    {/* Trigger the view */}
                                                    {/* <TouchableOpacity style={{ backgroundColor: 'red' }} >
                                                        
                                                    </TouchableOpacity> */}
                                                </View>
                                            </View>

                                        </TouchableOpacity>

                                        <View style={{ width: dimensions.SCREEN_WIDTH, alignSelf: 'center' }}>
                                            <View style={{ justifyContent: 'flex-start', }}>
                                                <View style={styles.scrollViewContent}>
                                                    {console.log(item, 'my filter function for rrr')
                                                    }
                                                    <View style={styles.imageContainer} >
                                                        <View style={styles.imageView} onPress={() => { props.navigation.navigate('InventionPost', { id: item[0].article_id }) }}>
                                                            {console.log(image, 'image under flatList')}
                                                            <AppIntroSlider
                                                                data={item.filter(item => item.file_url !== null)}

                                                                renderItem={_renderItem}
                                                                // renderPagination={() => null}
                                                                renderDoneButton={() => <View />}
                                                                renderNextButton={() => <View />}
                                                                activeDotStyle={{ backgroundColor: '#FFC40C', height: 4, width: 18, borderRadius: 0, top: 20 }}
                                                                dotStyle={{ backgroundColor: '#fff', height: 4, width: 18, borderRadius: 0, top: 20 }}
                                                                keyExtractor={(item) => item.id}
                                                            />
                                                            {/* // <Image
                                                                //     source={{ uri: image?.file_url }}
                                                                //     style={styles.image}
                                                                //     resizeMode='stretch'
                                                                // /> */}

                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        <TouchableOpacity style={styles.flatlistMainBottomView} onPress={() => { props.navigation.navigate('InventionPost', { id: item[0].article_id }) }}>


                                            {
                                                <View>
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

                                                                    {item[0].title}

                                                                </Text>
                                                                <Text style={{ width: '35%', textAlign: 'right', color: '#FFC40C' }}>
                                                                    {item[0].category_name}

                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.flatlistBottomView}>
                                                        {item[0].post != 'Fundraiser' ? <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                                            < View style={styles.buttonsContainer} >
                                                                <View style={styles.buttonView}>
                                                                    <Image
                                                                        source={require('../../../assets/images/fashion-dark-like-button.png')}
                                                                        style={styles.buttonIcon}
                                                                    />
                                                                    <Text style={styles.buttonText}>{item[0].likes} Likes</Text>
                                                                </View>
                                                                <View style={styles.buttonView}>
                                                                    <Image
                                                                        source={require('../../../assets/images/fashion-dark-dislike-button.png')}
                                                                        style={styles.buttonIcon}
                                                                    />
                                                                    <Text style={styles.buttonText}>{item[0].dislike} Dislikes</Text>
                                                                </View>
                                                                <View style={styles.buttonView}>
                                                                    <Image
                                                                        source={require('../../../assets/People/commentPostPeople.png')}
                                                                        style={styles.buttonIcon}
                                                                    />
                                                                    <Text style={styles.buttonText}>{item[0].comment} Comments</Text>
                                                                </View>
                                                            </View>
                                                        </View> : null}
                                                    </View>
                                                    {item[0].post == 'Fundraiser' ? < View >
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.88, paddingHorizontal: 12, }}>
                                                            <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item[0].ammountRaised
                                                            } <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> USD</Text></Text>
                                                            <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item[0].likes} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}>backers</Text></Text>
                                                        </View>
                                                        <ProgressBar height={15} width={dimensions.SCREEN_WIDTH * 0.82} backgroundColor={'#E0E0E0'} borderColor={'#E0E0E0'} progress={item[0].ammountRaised / item[0].project_estimate} color={'#FFC40C'} borderRadius={10} marginLeft={12} />
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.90, paddingVertical: 3, paddingHorizontal: 15, marginBottom: 12 }}>
                                                            <Text style={{ fontWeight: '400', fontSize: 14, color: 'black' }}>{((item[0].ammountRaised / item[0].project_estimate) * 100).toFixed(0)}% of {'$' + item[0].project_estimate} <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', }}></Text></Text>
                                                            <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>
                                                                {/* {Math.floor(Math.floor((new Date(item[0].expiry_date)) - new Date()) / (1000 * 60 * 60 * 24))} */}
                                                                {Math.floor(moment(item[0].expiry_date).diff(moment(), 'days'))}

                                                                <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> days left</Text> </Text>
                                                        </View>
                                                    </View> : null
                                                    }
                                                </View>

                                            }
                                        </TouchableOpacity>
                                    </View>
                                )
                            }}
                            keyExtractor={item => item.id}
                        />)}
                    </View>
                </View >
            </ScrollView >
            <Modal
                isVisible={editModal}
                swipeDirection="down"
                selectedId={selectedId}
                selectedCategoryy={selectedCategoryy}
                title={title}
                desc={desc}
                onBackdropPress={() => setEditModal(false)}
                onSwipeComplete={e => {
                    setEditModal(false);
                }}
                scrollTo={() => { }}
                scrollOffset={1}
                propagateSwipe={true}
                coverScreen={false}
                backdropColor="transparent"
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                    backgroundColor: 'rgba(211, 211, 211, 0.7)',
                }}>
                <View
                    style={{
                        height: '35%',
                        backgroundColor: '#FFF',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        paddingVertical: 20,
                    }}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}>
                        <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
                            <View style={{ backgroundColor: '#F8F8F8', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 10 }}>
                                <TouchableOpacity style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                                    console.log('my id111', title)
                                    props.navigation.navigate('InventionEditArticle', { id: selectedId, cat: selectedCategoryy, desc: desc, title: title }), setEditModal(false)


                                }}>
                                    <Text style={{ fontSize: 14, color: 'black', }}>Edit Article</Text>

                                </TouchableOpacity>


                            </View>

                            <View style={{
                                backgroundColor: '#F8F8F8', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 10, marginTop: 20
                            }}>
                                <TouchableOpacity style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center' }} onPress={() => {

                                }}>
                                    <Text style={{ fontSize: 14, color: 'black', }}>Delete Article</Text>

                                </TouchableOpacity>


                            </View>
                        </View>

                        <View style={{ width: 100, height: 100 }} />
                    </ScrollView>
                </View >
            </Modal >
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

            <Modal

                isVisible={modlevisual}
                swipeDirection="down"
                onSwipeComplete={() => setmodlevisual(false)}
                coverScreen={false}
                backdropColor="transparent"
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View style={{ height: 150, backgroundColor: Mycolors.BG_COLOR, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, margin: 0, bottom: 0 }}>
                    <View style={styles.mainView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <TouchableOpacity style={{ width: 150, height: 150 }} onPress={onGallery}>
                                <Image source={require('../../../assets/Art/GalleryCreation.png')} style={{ width: 40, height: 40, alignSelf: 'center', tintColor: '#FFC40C' }} />
                                <Text style={{ textAlign: 'center', color: Mycolors.TEXT_COLOR }}>Open Library</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 150, height: 150 }} onPress={onCamera}>
                                <Image source={require('../../../assets/Art/cameraCreation.png')} style={{ width: 40, height: 35, alignSelf: 'center', tintColor: '#FFC40C' }} />
                                <Text style={{ textAlign: 'center', color: Mycolors.TEXT_COLOR }}>Open Camera</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* edit modal */}

            {/* modify edit modal */}
            < Modal
                isVisible={profileModal}
                // swipeDirection="down"

                // onSwipeComplete={e => {
                //   setProfileModal(false);
                // }}
                swipeDirection="down"
                onBackdropPress={() => setProfileModal(false)}
                onSwipeComplete={(e) => {
                    setProfileModal(false)
                }}
                scrollTo={() => { }}
                scrollOffset={1}
                propagateSwipe={true}
                coverScreen={false}
                backdropColor='transparent'

                style={{
                    justifyContent: 'flex-start', // Update justifyContent to 'flex-start'
                    margin: 0,
                    height: 30,
                    backgroundColor: 'transparent',
                }}>
                <View
                    style={{
                        height: '15%',
                        backgroundColor: '#FFF',
                        marginTop: '24%',
                        width: '70%',
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end',
                        right: 20,
                        borderRadius: 20
                    }}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}>
                        <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>

                            <View style={{ borderRadius: 10, }}>


                                <TouchableOpacity style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                                    props.navigation.navigate('InventionEditArticle', { id: selectedId, cat: selectedCategoryy, desc: desc, title: title }), setProfileModal(false)

                                }}>
                                    <Image source={require('../../../assets/People/PeopleProfileIConModal.png')} style={{ width: 34, height: 34 }} resizeMode='contain' />
                                    <Text style={{ marginLeft: 4, fontSize: 14, left: 10, color: 'black' }}>Edit Artile</Text>
                                </TouchableOpacity>
                            </View >
                            <View style={{ backgroundColor: '#EDEEEE', height: 1, width: '100%', marginTop: 5 }}>

                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                                    Delete(selectedId)
                                        , setProfileModal(false)
                                }} >
                                    <Image source={require('../../../assets/People/PeopleLogoutIconModal.png')} style={{ width: 34, height: 34 }} resizeMode='contain' />

                                    <Text style={{ fontSize: 14, left: 14, color: 'black' }}>Delete Article</Text>
                                </TouchableOpacity>


                            </View>


                        </View>

                        <View style={{ width: 100, height: 100 }} />
                    </ScrollView>
                </View>
            </Modal >
            {My_Alert2 ? (
                <MyAlert
                    sms={alert_sms2}
                    sms2={"Logout"}
                    okPress={() => {
                        AsyncStorage.clear();
                        dispatch(onLogoutUser())
                    }}
                    canclePress={() => {
                        setMy_Alert2(false);
                    }}
                />
            ) : null}

            {loading || loading2 ? <Loader /> : null}

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
        backgroundColor: '#FFC40C',
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
        marginTop: 10,
        // backgroundColor: 'red',
        width: '50%',
        alignSelf: 'center'
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
    contMap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20%',
        alignSelf: 'center',
        marginHorizontal: 20
    },
    categorySelectedStyle: {
        borderWidth: 2,
        borderColor: '#835E23',
        borderRadius: 10
    },
    refreshView: {
        flexDirection: 'row',
        alignItems: 'center',
        // width: '25%',
        // marginTop: 10,
        marginRight: 10,
        backgroundColor: '#FFC40C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50
    },
    descriptionView: {

        paddingTop: 10,
        width: dimensions.SCREEN_WIDTH * 0.9,
        alignSelf: 'center',
        paddingHorizontal: 10,
        paddingBottom: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },

        shadowRadius: 5,
        shadowOpacity: 0.03,
        elevation: 1,
    },
    imageRowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    followingView: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#0089CF',

        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.1,
        elevation: 5,

    },
    numView: {
        alignItems: 'center',
        width: 90,
        height: 90,
        justifyContent: 'center',
        borderRadius: 15,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.03,
        elevation: 1,
    },
    numValue: {
        fontSize: 20,
        fontWeight: '500',
        color: '#455A64'
    },
    numText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#455A64'
    },
    blueButtonView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0089CF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        shadowColor: '#0089CF',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.1,
        elevation: 1,
    },
    blueButtonSuperView: {
        justifyContent: 'center',
        backgroundColor: '#0089CF',
        width: 120,
        height: 40,
        borderRadius: 20,
        shadowColor: '#0089CF',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.1,
        elevation: 1,
    },
    blueButtonSubView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    blueButtonText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#fff',
        marginLeft: 10
    },
    allFiltersRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20
    },
    filter1View: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    filter2View: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    filter3View: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    threeDotsView: {

        padding: 10,
        right: 12,
        width: 103, height: 100,

    },
    imageView: {
        width: dimensions.SCREEN_WIDTH,
        height: 200,
        backgroundColor: '#F8F8F8',
        // backgroundColor: 'yellow'
    },
    scrollViewContent: {
        alignItems: 'center',
        flex: 1
    },
    image: {
        width: dimensions.SCREEN_WIDTH * 1,
        height: '99%',
        alignSelf: 'center',

        justifyContent: 'center',


    },
    imageContainer: {
        marginRight: 10,
        // Add margin between images
    },
    textContainer: {
        marginTop: 5, // Add margin between image and text

        flex: 1, // Allow the text container to take up remaining space
        flexDirection: 'row'
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#263238',
        textAlign: 'left',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4, // Add margin between text and buttons
        // Align buttons with the text,
        justifyContent: 'space-between',
        width: '99%',
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 3

    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20, // Add margin between buttons

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
        //  backgroundColor: 'red'

    }, topRightImageContainer: {
        position: 'absolute',
        top: 30, // Adjust the top position as needed
        right: 30, // Adjust the right position as needed
        zIndex: 999,
        backgroundColor: 'transparent'
    },
    flatlistMainView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 13,
        width: dimensions.SCREEN_WIDTH * 0.9,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomWidth: 1,
        borderLeftColor: '#EDEEEE',
        borderRightColor: '#EDEEEE',
        borderBottomColor: '#EDEEEE',
        zIndex: 999,


    },
    followingImageView: {
        flexDirection: 'row',
        alignItems: 'center',

        width: '60%'

    },
    followingView: {
        justifyContent: 'center',
        marginLeft: 10,

    },
    flatlistMainBottomView: {
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
        marginBottom: 15,
        width: '95%'
    },
    textContainerrrr: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'

    },
    descriptionTextrrrr: {
        fontSize: 14,
        fontWeight: '400',
        color: '#263238',
        width: '50%',

    },
    createdTimeText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#263238',
        textAlign: 'right',
    },

});
export default InventionProfile