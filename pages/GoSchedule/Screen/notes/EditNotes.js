//external imports
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import { useIsFocused } from "@react-navigation/native";
import ImagePicker from "react-native-image-crop-picker"
import React, { useEffect, useState } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
//internal imports
import axios from "axios"
import CameraGalleryModal from "../groups/CameraGalleryModal"
import CommentImageOnEditModal from "../groups/CommentImageOnEditModal"
import CommentImagesTab from "../groups/CommentImagesTab"
import CustomHeader from "../../Constants/CustomHeaader"
import Toast from 'react-native-toast-message'
// import NotesService from "../../service/NotesService"
import SubmitButton from "../../Constants/SubmitButton"
import { Mycolors } from "../../../../utility/Mycolors"
// edit_notes
import { requestGetApi, requestPostApi, edit_notes } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';


const EditNotes = ({ navigation, route }) => {
    const isFocus = useIsFocused()
    const User = useSelector(state => state.user.user_details)

    const [arrayList, setArrayList] = useState([])
    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [descriptionState, setDescriptionState] = useState(false)
    const [feedbackImage, setFeedbackImage] = useState([])
    const [notesDescription, setNotesDescription] = useState()
    const [notesTitle, setNotesTitle] = useState()
    const [titleState, setTitleState] = useState(false)
    const [picker, setPicker] = useState([])
    useEffect(() => {
        console.log('my notes id from the screen---->>', route?.params?.data?.id);
        setFeedbackImage([])
        if (route?.params?.data?.imagedetails != null) {
            let imageId = route?.params?.data?.imagedetails.map(e => e.imageid)
            setArrayList(imageId) //for pre selected images id
        }
        setNotesTitle(route?.params?.data?.notes_title)
        setNotesDescription(route?.params?.data?.notes_text)
    }, [isFocus])

    // function for open camera
    const openCamera = async () => {
        try {
            let value = await ImagePicker.openCamera({
                width: 1080,
                height: 1080,
                cropping: true,
                mediaType: "photo",
                compressImageQuality: 1,
                compressImageMaxHeight: 1080 / 2,
                compressImageMaxWidth: 1080 / 2
            }).then(image => {
                const img = {
                    name: image.path.slice(
                        image.path.lastIndexOf("/"),
                        image.path.length
                    ),
                    uri: image.path,
                    type: image.mime
                }
                let imageList = []
                image?.map(e => {
                    imageList.push({
                        name: e.path.slice(e.path.lastIndexOf("/"), e.path.length),
                        uri: e.path,
                        type: e.mime
                    })
                })

                setFeedbackImage(imageList)

                setFeedbackImage([img])
                setCameraGalleryModal(false)
            })
        } catch (error) {
            setCameraGalleryModal(false)
            console.log("error in openLibrary", error)
        }
    }


    const openLibrary = async () => {
        console.log('picker');
        try {
            let images = await ImagePicker.openPicker({
                width: 1080,
                height: 1080,
                cropping: true,
                mediaType: 'photo',
                compressImageQuality: 1,
                compressImageMaxHeight: 1080 / 2,
                compressImageMaxWidth: 1080 / 2,
                multiple: true
            });
            const totalSelectedImages = picker.length + images.length;

            console.log('---------then block------->', images);
            setPicker([...picker, ...images]);
            let imageList = []
            images?.map(e => {
                imageList.push({
                    name: e.path.slice(e.path.lastIndexOf("/"), e.path.length),
                    uri: e.path,
                    type: e.mime
                })
            })
            //  setPicker([...picker, ...value]);
            setFeedbackImage(imageList)
            setCameraGalleryModal(false)
            setCameraGalleryModal(false)

        } catch (error) {
            console.log('error in openLibrary', error);
        }
    };

    // function for submit button click on api call to edit notes
    const handleSubmitt = async () => {
        console.log('handel submit edit');
        if (notesTitle == "") {
            setTitleState(true)
        } else if (notesDescription == "") {
            setDescriptionState(true)
        } else {
            setTitleState(false)
            setDescriptionState(false)
            const editData = new FormData()
            // if (feedbackImage !== null) {
            //     feedbackImage.map((e, index) => {
            //         editData.append(`images[${index}]`, e)
            //     })
            // }
            // editData.append("id", route?.params?.data?.id)
            editData.append("title", notesTitle)
            editData.append("description", notesDescription)
            // if (arrayList !== null) {
            //     arrayList.forEach(e => editData.append("preselectedimagesid[]", e))
            // }
            console.log('data to be send to edit request--->>', editData);
            var url = edit_notes;
            var murl = route?.params?.data?.id
            if (murl != undefined) {
                url = url + murl
            }
            console.log('my urledit---->>', url);
            const { responseJson, err } = await requestPostApi(url, data, 'PUT', User.token)
            console.log('does it come here', url);
            console.log('my edit response from the api--->', responseJson);
            // NotesService.postEditNotes(editData)
            //     .then(response => {
            //         navigation.navigate("StackNavigation", {
            //             screen: "NotesDetails"
            //         })
            //     })
            //     .catch(error => {
            //         console.log("error", JSON.stringify(error))
            //     })
        }
    }

    const handleSubmit = async () => {
        console.log('my handel submit called');
        try {
            console.log('Starting post creation...');
            const editData = new FormData()
            console.log('Starting post creation2...', arrayList);
            if (arrayList !== null) {
                arrayList.forEach(e => editData.append("deleteimageid[]", e))
            }
            if (picker.length > 0) {
                console.log('Uploading from gallery', picker);
                picker.forEach((item, index) => {
                    const imageName = item.path.slice(item.path.lastIndexOf('/') + 1);
                    editData.append('files', {
                        name: imageName,
                        type: item.mime,
                        uri: item.path,
                    });
                });

            }
            editData.append("title", notesTitle)
            editData.append("description", notesDescription)

            console.log('Data to be sent:', editData);
            var url = 'http://54.153.75.225/backend/api/v1/goaccounting/edit-note/'
            var furl = route?.params?.data?.id
            if (furl != undefined) {
                var url = url + furl
            }
            console.log('my url======????', url);
            const response = await axios.put(
                url,
                editData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${User.token}`,
                    },
                }
            );
            console.log('Response:', response);
            if (response.status === 200) {
                navigation.navigate(
                    "NotesDetails", { id: route?.params?.data?.id }
                )
                console.log(' response.data.headers.message ', response.data.headers.message);
                Toast.show({ text1: response.data.headers.message });
                // setPicker([])
                // setFeedbackImage([])
                // navigation.goBack();
                // console.log('Post edited succesfulllyyyyy', response.data.headers.message);
                // Toast.show({ text1: response.data.headers.message });


                // Handle success
            } else {
                // console.log('Error creating post:', response.data.headers.message);
                // Handle error
            }
            // Assuming you want to set loading to false after the request.
        } catch (error) {
            console.error('Error in CreatePost', error);
            console.log('Axios Error:', error.response);
            // Handle Axios error (e.g., show an error message to the user)
        }
    };
    // function on remove selected members
    const handleRemoveImage = selectedImagesId => {
        if (arrayList.includes(selectedImagesId)) {
            setArrayList(arrayList.filter(ids => ids !== selectedImagesId))
        }
    }


    // list for pre added notes image
    const renderPreAddedNotesImages = ({ item }) => {
        return (
            <CommentImageOnEditModal
                commentImages={item}
                removeImage={handleRemoveImage}
                checkedList={arrayList}
            />
        )
    }

    // list for image son comments
    const renderAddedNotesImages = ({ item }) => {
        return <CommentImagesTab commentImages={item} />
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* header section */}
            <CustomHeader
                headerText={"Edit Notes"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.goBack()
                    }
                }}
            />

            {/* body section */}
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={styles.body}
            >
                <>
                    <TextInput
                        value={notesTitle}
                        style={styles.textInput}
                        onChangeText={text => {
                            setNotesTitle(text)
                            setTitleState(false)
                        }}
                    />
                    {/* error section is case of empty field  */}
                    <Text style={styles.errorText}>
                        {titleState ? "*Title is required" : null}
                    </Text>

                    <TextInput
                        style={styles.textInput}
                        value={notesDescription}
                        numberOfLines={6}
                        multiline={true}
                        textAlignVertical="top"
                        onChangeText={text => {
                            setNotesDescription(text)
                            setDescriptionState(false)
                        }}
                    />
                    {/* error section is case of empty field  */}
                    <Text style={styles.errorText}>
                        {descriptionState ? "*Description is required" : null}
                    </Text>

                    {/* pre selected image section  */}
                    {route?.params?.data?.imagedetails?.length >= 0 ? (
                        <FlatList
                            data={route?.params?.data?.imagedetails}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderPreAddedNotesImages}
                            keyExtractor={(item, index) => String(index)}
                        />
                    ) : null}

                    <View style={{ marginVertical: 5 }}>
                        {feedbackImage?.length >= 0 ? (
                            <FlatList
                                data={feedbackImage}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderAddedNotesImages}
                                keyExtractor={(item, index) => String(index)}
                            />
                        ) : null}
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => setCameraGalleryModal(true)}
                            style={styles.uploadMediaContainer}
                        >
                            <Image
                                style={styles.uploadImageStyle}
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/UploadMedia.png")}
                            />
                            <Text style={styles.uploadMediaText}>Upload Media</Text>
                        </TouchableOpacity>
                    </View>

                    {/* save group button  */}
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => { handleSubmit() }}>
                        <SubmitButton buttonText={"Submit"} submitButton={handleSubmit} />
                    </TouchableOpacity>

                    {/* Camera Gallery Modal  */}
                    <CameraGalleryModal
                        visibleModal={cameraGalleryModal}
                        onClose={() => {
                            setCameraGalleryModal(false)
                        }}
                        cameraClick={openCamera}
                        galleryClick={openLibrary}
                    />
                </>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditNotes

const styles = StyleSheet.create({
    container: { flex: 1 },
    body: {
        flex: 1,
        padding: 10
    },
    textInput: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 8,
        borderWidth: 1,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 15
    },
    errorText: {
        color: Mycolors.RED,
        padding: 5
    },
    uploadMediaContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        borderStyle: "dotted",
        borderWidth: 2,
        flexDirection: "row",
        height: 60,
        justifyContent: "center",
        marginVertical: 20
    },
    uploadImageStyle: {
        height: 30,
        paddingHorizontal: 25,
        width: 30
    },
    uploadMediaText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "400"
    },
    imageStyle: {
        borderRadius: 10,
        height: "100%",
        width: "100%"
    },
    headerText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 15
    },
    direction: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    crossContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 30,
        position: "absolute",
        right: 15,
        top: 10,
        width: 30,
        zIndex: 1
    },
    errorMessage: {
        color: Mycolors.RED,
        paddingHorizontal: 10
    },
    buttonContainer: { paddingTop: 10 }
})
