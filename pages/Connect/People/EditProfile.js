import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Button } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Loader from '../../../WebApi/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast'
import ViewMoreText from 'react-native-view-more-text';
import ReadMoreComponent from './Components/ReadMoreComponent';
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission } from './Permissions';
import { CommonActions } from '@react-navigation/core';
import { connect_people_block_user, connect_people_react_post, connect_people_save_post, connect_people_user_profile, requestGetApi, requestPostApi, connect_edit_profile } from '../../../WebApi/Service';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserResult, saveUserToken, setVenderDetail, onLogoutUser, savepeoplemoduleuserdata } from '../../../redux/actions/user_action';
const EditProfile = (props) => {
    const dispatch = useDispatch();
    const User = useSelector(state => state.user.user_details);

    console.log('my user------>', User.profile_image_url);
    const Userpeople = useSelector(state => state.user.people_user);
    const [searchValue, setsearchValue] = useState('')
    const [scrollEnabled, setScrollEnabled] = useState(false)
    const myTextInput = useRef()
    const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
    const [image, setImage] = useState('');
    const [image2, setimage2] = useState('')
    const [profileImg, setProfileImg] = useState(
        User.profile_image_url
            ? User.profile_image_url
            : '',
    );
    const [isimageChange, setisimageChange] = useState(false);

    const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)

    const [upData, setupData] = useState([
        {
            id: '1',
            name: 'Aryav Nadkarni',
            desc: 'Amazing footbal shorts caption this',
            numViews: '183K',
            numComments: '183',
            time: '',
            img: require('../../../assets/images/images.png'),
        },
        {
            id: '2',
            name: 'Aryav Nadkarni',
            desc: 'Amazing footbal shorts caption this',
            numViews: '183K',
            numComments: '183',
            time: '',
            img: require('../../../assets/images/images.png'),
        },
        {
            id: '3',
            name: 'Aryav Nadkarni',
            desc: 'Amazing footbal shorts caption this',
            numViews: '183K',
            numComments: '183',
            time: '',
            img: require('../../../assets/images/images.png'),
        },
        {
            id: '4',
            name: 'Aryav Nadkarni',
            desc: 'Amazing footbal shorts caption this',
            numViews: '183K',
            numComments: '183',
            time: '',
            img: require('../../../assets/images/images.png'),
        },

    ])
    const [username, setUsername] = useState(User.username ? User.username : '');
    const [bio, setBio] = useState(User.first_name ? User.first_name : '');
    // const [dob, setDob] = useState(User.last_name ? User.last_name : '');
    const [fullname, setFullname] = useState(User.last_name ? User.last_name : '');

    const [loading, setLoading] = useState(false);
    // dispatch(savepeoplemoduleuserdata(responseJson.body.posts[0]))
    // const handleSave = async () => {
    //     setLoading(true)
    //     var data = {
    //         "username": username,
    //         "about": bio,
    //         "fullname": fullname,
    //         "DOB": dob,
    //         "activity_status": 'test',
    //         "intrest_in": '1'
    //     }
    //     console.log(data);
    //     const { responseJson, err } = await requestPostApi(connect_edit_profile + Userpeople.userid, data, 'POST', User.token)
    //     setLoading(false)
    //     console.log('the res==>>', responseJson)
    //     if (responseJson.success == 1) {
    //         // setmodlevisual3(false)
    //         // setmodlevisual4(true)
    //         // setmodlevisual1(false)
    //         // setmodlevisual2(false)
    //         // dispatch(saveUserResult(data))
    //         props.navigation.navigate('PeopleHome')

    //         // Alert.alert('Booking request has been sent successfully you will receive a notification once your table is finalized.')
    //     } else {
    //         setalert_sms(err)
    //         setMy_Alert(true)
    //     }


    // }
    const goToHome = CommonActions.reset({
        index: 1,
        routes: [{ name: 'PeopleHome' }],
    });
    const handleSave = async () => {
        setLoading(true)
        const feedBackData = new FormData();
        console.log('image-------->', image);
        ;
        if (image2 != '') {
            var imageName = image2.path.slice(
                image2.path.lastIndexOf('/'),
                image2.path.length,
            );
            feedBackData.append('file', {
                name: imageName,
                type: image2.mime,
                uri: image2.path,
            });
        }
        feedBackData.append("first_name", bio);
        feedBackData.append("last_name", fullname);
        feedBackData.append("username", username);




        console.log('formdata-------->', JSON.stringify(feedBackData))
        const headers = {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${User.token}`,
        };
        const url = 'http://54.153.75.225/backend/api/v1/connect/people/update-profiledata/47';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: feedBackData,
            });

            const responseJson = await response.json();

            if (responseJson.success == 1) {
                console.log(responseJson.profle_details
                    , 'my response');
                const data = { ...responseJson.profle_details, token: User.token }
                dispatch(saveUserResult(data))
                //const updatedData = JSON.stringify(data)
                AsyncStorage.setItem("kinengo", JSON.stringify(data));
                props.navigation.dispatch(goToHome)
                //Toast.show({ text1: responseJson.message });
            } else {
                console.log(response.message);
                // setalert_sms(err)
                // setMy_Alert(true)
            }


        } catch (error) {
            console.log('Error uploading data:', error);
        }




    }
    const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }

    useEffect(() => {
        // setFullname(`${User.first_name} ${User.last_name}`);
        setProfileImg(User.image_url ? User.image_url : '')
    }, []);

    console.log(fullname, 'fullNAme ');

    const onSelectImage = async () => {
        const permissionStatus = await androidCameraPermission()
        if (permissionStatus || Platform.OS == 'ios') {
            Alert.alert(
                'choose Picture',
                'choose an option',
                [
                    { text: 'camera', onPress: onCamera },
                    { text: 'Gallery', onPress: onGallery },
                    { text: 'Cancel', onPress: () => { } }
                ]
            )
        }
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
            // changeProfileImg(image)
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
                setimage2(image)
                setisimageChange(true)
                console.log('imagre set-------////////', image?.path);
                console.log('imagre set-------////////', image);

                //  changeProfileImg(image)
            });
        } catch (error) {
            console.log('error in openLibrary', error);
        }
    }
    return (
        <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8' }}>
            {/* <ScrollView> */}
            <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor='#fff'
                press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/events_arrow.png')} img1width={25} fontSize={16}
                img1height={20}
                press2={() => { }} title2={'Edit Profile'} fontWeight={'500'} img2height={20} color='#455A64'
                press3={() => { }} img3width={25} img3height={25} borderBottomLeftRadius={25} borderBottomRightRadius={25} />


            <View style={{ padding: 16, marginTop: 10 }}>

                <TouchableOpacity style={styles.uploadedImageBox} onPress={() => { onSelectImage() }} >
                    {console.log('image tag**********', image2)}
                    {/* <Image

                        source={
                            isimageChange ?
                                {
                                    uri: image2,
                                }
                                // : 
                                // profileImg != null ? {
                                //     uri: User.image_url
                                // }
                                :
                                require('../../../assets/images/images.png')
                        }
                        style={{
                            height: '100%',
                            width: '100%',
                            borderWidth: 2,
                            borderRadius: 40,
                            backgroundColor: 'red'
                        }}
                    /> */}
                    <Image source={{ uri: Object.keys(image2)?.length > 0 ? image2?.path : profileImg }} style={{
                        height: '100%',
                        width: '100%',
                        borderWidth: 2,
                        borderRadius: 40,
                    }} />
                </TouchableOpacity>

                <View style={{ padding: 16, marginTop: 10 }}>
                    <TextInput
                        placeholder="Username"
                        value={username}
                        onChangeText={text => setUsername(text)}
                        style={styles.textInput}
                    />

                    <TextInput
                        placeholder="FirstName"
                        value={bio}
                        onChangeText={text => setBio(text)}
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder="LastName"
                        value={fullname}
                        onChangeText={text => setFullname(text)}

                        // style={{ marginBottom: 16, height: 100, textAlignVertical: 'top' }}
                        style={styles.textInput}
                    />
                    {/* <TextInput
                            placeholder="Date of Birth"
                            value={dob}
                            onChangeText={text => setDob(text)}
                            style={styles.textInput}
                        /> */}
                </View>
                <TouchableOpacity onPress={() => { handleSave() }} style={styles.button} >
                    <Text style={{ alignSelf: 'center', marginTop: 8, color: 'white' }}>Update</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 100 }} />
            {/* </ScrollView> */}
            {loading ? <Loader /> : null}
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    textInput: {
        marginBottom: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    button: {

        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#0089CF',
        height: 50,
        marginTop: '20%',
        width: '92%',
        alignSelf: 'center'
    },
    bioInput: {
        marginBottom: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 8,
        height: 100,
        textAlignVertical: 'top',
    },
    uploadedImageBox: {
        height: 80,
        width: 80,
        // backgroundColor: 'white',
        // position: 'relative',
        // marginRight: 29,
        alignSelf: 'center'
    },


});
export default EditProfile 