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
    View,
    ActivityIndicator
} from "react-native"
import { useSelector, useDispatch } from 'react-redux';

import React, { useEffect, useRef, useState } from "react"

import ImagePicker from "react-native-image-crop-picker"
import Toast from 'react-native-toast-message'
// import { Formik } from "formik"
import axios from "axios"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
//internal imports
import CameraGalleryModal from "../groups/CameraGalleryModal"
import CommentImagesTab from "../groups/CommentImagesTab"
import CustomHeader from "../../Constants/CustomHeaader"
// import NotesService from "../../service/NotesService"
import SubmitButton from "../../Constants/SubmitButton"
//   import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
//   import { notesValidation } from "../../constants/SchemaValidation"

const CreateNotes = ({ navigation }) => {
    const [buttonLoader, setButtonLoader] = useState(false)
    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [feedbackImage, setFeedbackImage] = useState([])
    const [notesId, setNotesId] = useState()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [picker, setPicker] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    // function for open camera
    // const openCamera = async () => {
    //     try {
    //         let value = await ImagePicker.openCamera({
    //             width: 1080,
    //             height: 1080,
    //             cropping: true,
    //             mediaType: "photo",
    //             compressImageQuality: 1,
    //             compressImageMaxHeight: 1080 / 2,
    //             compressImageMaxWidth: 1080 / 2
    //         }).then(image => {
    //             const img = {
    //                 name: image.path.slice(
    //                     image.path.lastIndexOf("/"),
    //                     image.path.length
    //                 ),
    //                 uri: image.path,
    //                 type: image.mime
    //             }
    //             setFeedbackImage([img])
    //             setCameraGalleryModal(false)
    //         })
    //     } catch (error) {
    //         setCameraGalleryModal(false)
    //         console.log("error in openLibrary", error)
    //     }
    // }
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
                setFeedbackImage([img])
                setCameraGalleryModal(false)
            })
        } catch (error) {
            setCameraGalleryModal(false)
            console.log("error in openLibrary", error)
        }
    }
    const User = useSelector(state => state.user.user_details)
    console.log('User', User);
    useEffect(() => {

        const unsubscribe = navigation.addListener('blur', () => {

            setFeedbackImage([])
            setTitle('')
            setDescription('')
            setPicker([])
        });


        return unsubscribe;
    }, [navigation])

    // function for open gallery
    // const openLibrary = async () => {
    //     try {
    //         let imageList = []
    //         let value = await ImagePicker.openPicker({
    //             width: 1080,
    //             height: 1080,
    //             cropping: true,
    //             multiple: true,
    //             mediaType: "photo",
    //             compressImageQuality: 1,
    //             compressImageMaxHeight: 1080 / 2,
    //             compressImageMaxWidth: 1080 / 2
    //         }).then(image => {
    //             image.map(e => {
    //                 imageList.push({
    //                     name: e.path.slice(e.path.lastIndexOf("/"), e.path.length),
    //                     uri: e.path,
    //                     type: e.mime
    //                 })
    //             })
    //             setFeedbackImage(imageList)
    //             setCameraGalleryModal(false)
    //         })
    //     } catch (error) {
    //         setCameraGalleryModal(false)
    //         console.log("error in openLibrary", error)
    //     }
    // }
    const openLibrary = async () => {
        let imageList = []
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


            console.log('---------then block------->', images);
            // setPicker([...picker, ...images]);
            const totalSelectedImages = picker.length + images.length;
            if (totalSelectedImages > 5) {
                Toast.show({ text1: 'You can select up to 5 images' });
                setCameraGalleryModal(false)
            } else {
                console.log('---------then block------->', images);
                setPicker([...picker, ...images]);
                setcurrentSelection('image');
                setCameraGalleryModal(false)
            }

            images.map(e => {
                imageList.push({
                    name: e.path.slice(e.path.lastIndexOf("/"), e.path.length),
                    uri: e.path,
                    type: e.mime
                })
            })

            if (imageList.length > 5) {
                Toast.show({ text1: 'You can select up to 5 images' });
                setCameraGalleryModal(false)
            } else {
                console.log('---------then block------->', images);
                setFeedbackImage(imageList)
                setCameraGalleryModal(false)
            }



        } catch (error) {
            console.log('error in openLibrary', error);
        }
    };
    // list for images on comments
    const renderAddNotesImages = ({ item }) => {
        return <CommentImagesTab commentImages={item} />
    }

    //  function for notes submit button click with api call
    // const onSubmit = async () => {
    //     console.log('does it come to nte submut');
    //     // setButtonLoader(true)
    //     // if (!title || !description) {
    //     //     Toast.show({ text1: 'Enter name and description' });
    //     //     return;
    //     // }
    //     try {
    //         const feedBackData = new FormData()
    //         console.log('does it reaxh here');
    //         // if (feedbackImage !== null) {
    //         //     feedbackImage.map((e, index) => {
    //         //         feedBackData.append(`files`, e)
    //         //     })
    //         // }
    //         feedBackData.append("title", title)
    //         feedBackData.append("description", description)

    //         // NotesService.postCreateNotes(feedBackData)
    //         //     .then(response => {
    //         //         setButtonLoader(false)
    //         //         navigation.replace("StackNavigation", {
    //         //             screen: "NotesDetails",
    //         //             params: {
    //         //                 id: response.data.noteid
    //         //             }
    //         //         })
    //         //         setNotesId(response.data.noteid)
    //         //     })
    //         //     .catch(error => {
    //         //         setButtonLoader(false)
    //         //         console.log(error)
    //         //     })
    //         var url = `http://54.153.75.225/backend/api/v1/goaccounting/add-note`
    //         console.log('my data----->>', feedBackData);
    //         console.log('my url for edit', url);
    //         const response = await axios.post(
    //             url,
    //             feedBackData,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     Authorization: `Bearer ${User.token}`,
    //                 },
    //             }
    //         );


    //         if (response.status === 200) {
    //             // handleModalClose()
    //             console.log('notess', response);

    //             // navigation.goBack();
    //             console.log('Response for edit group:', response.data.headers.message);
    //             Toast.show({ text1: response.data.headers.message });
    //             setButtonLoader(false)
    //             // navigation.replace("StackNavigation", {
    //             //     screen: "NotesDetails",
    //             //     params: {
    //             //         id: response.data.noteid
    //             //     }
    //             // })
    //             // setNotesId(response.data.noteid)
    //         } else {
    //             console.log('Error creating post:', response.data.headers.message);
    //         }

    //         // Assuming you want to set loading to false after the request.

    //     } catch (error) {
    //         console.error('Error in CreatePost', error);
    //     }
    // }
    const onSubmit = async () => {
        setIsLoading(true)
        if (!title) {
            // Show a toast or handle the case where the task name is empty
            Toast.show({ text1: 'Title is empty' });
            return; // Exit the function early to prevent the API call
        }
        if (!description) {
            // Show a toast or handle the case where the task name is empty
            Toast.show({ text1: 'Description is empty' });
            return; // Exit the function early to prevent the API call
        }
        if (picker.length == 0) {
            // Show a toast or handle the case where the task name is empty
            Toast.show({ text1: 'Please select images' });
            return; // Exit the function early to prevent the API call
        }
        try {
            console.log('Starting post creation...');


            const data = new FormData();

            data.append("title", title);
            data.append("description", description)

            if (picker.length > 0) {
                console.log('Uploading from gallery', picker);
                picker.forEach((item, index) => {
                    const imageName = item.path.slice(item.path.lastIndexOf('/') + 1);
                    data.append('files', {
                        name: imageName,
                        type: item.mime,
                        uri: item.path,
                    });
                });

            }

            console.log('Data to be sent:', data);

            const response = await axios.post(
                'http://54.153.75.225/backend/api/v1/goaccounting/add-note',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${User.token}`,
                    },
                }
            );

            console.log('Response:', response.data);

            if (response.status === 200) {
                setIsLoading(false)
                console.log('notes created successfully', response.data.body.noteid);
                // navigation.goBack()
                // { console.log('my groupiddd after successsss------->>>', groupId); }
                Toast.show({ text1: response.data.headers.message });
                console.log('does it reach here toast')
                // navigation.replace(
                //     "NotesDetails",
                //     {
                //         id: response.data.body.noteid
                //     }
                // )
                console.log('my updatedd by crrearing the notes---->>', response.data.body.noteid);
                navigation.navigate(
                    "NotesDetails",
                    { id: response.data.body.noteid }
                )
                setNotesId(response.data.body.noteid)

            } else {
                setIsLoading(false)
                console.log('Error creating post:', response.data.headers.message);
            }

            // Assuming you want to set loading to false after the request.

        } catch (error) {
            console.error('Error in CreatePost', error);
        }
    }
    const initialValues = {
        description: "",
        title: ""
    }

    return (


        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>

            {!isLoading ? (
                <>
                    {/* header section */}
                    <CustomHeader
                        headerText={"Create Note"}
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
                        <View
                        // validationSchema={notesValidation}
                        // initialValues={initialValues}
                        // onSubmit={values => {
                        //     onSubmit(values)
                        // }}
                        >
                            {/* {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        setFieldTouched
                    }) => ( */}
                            <View>
                                {/* title section  */}
                                <View style={{ marginVertical: 13 }}>
                                    <TextInput
                                        placeholder="Enter Title"
                                        placeholderTextColor={Mycolors.textGray}
                                        style={styles.titleInput}
                                        value={title}
                                        onChangeText={(text) => {
                                            setTitle(text)
                                        }}
                                    // value={values.title}
                                    // onChangeText={handleChange("title")}
                                    // onBlur={() => {
                                    //     handleBlur("title")
                                    //     setFieldTouched("title")
                                    // }}
                                    />

                                    {/* <Text style={styles.errorMessage}>
                                {touched.title && errors.title}
                            </Text> */}
                                </View>
                                {/*Description section  */}
                                <View style={{ marginVertical: 13 }}>
                                    <TextInput
                                        placeholder="Type Note Description…"
                                        placeholderTextColor={Mycolors.textGray}
                                        style={styles.descriptionInput}
                                        // value={values.description}
                                        numberOfLines={8}
                                        multiline={true}
                                        textAlignVertical="top"
                                        value={description}
                                        onChangeText={(text) => {
                                            setDescription(text)
                                        }}
                                    // onChangeText={handleChange("description")}
                                    // onBlur={() => {
                                    //     handleBlur("description")
                                    //     setFieldTouched("description")
                                    // }}
                                    />
                                    {/* <Text style={styles.errorMessage}>
                                {touched.description && errors.description}
                            </Text> */}
                                </View>
                                {feedbackImage?.length >= 0 ? (
                                    <FlatList
                                        data={feedbackImage}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={renderAddNotesImages}
                                        keyExtractor={(item, index) => String(index)}
                                    />
                                ) : null}
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

                                    {/* save group button  */}

                                    {/* <TouchableOpacity onPress={() => { handleSubmit() }}>                          <SubmitButton
                                buttonText={"Submit"}
                                // submitButton={handleSubmit}
                                loader={buttonLoader}
                            />
                            </TouchableOpacity> */}
                                    <TouchableOpacity onPress={() => onSubmit()}>
                                        <SubmitButton
                                            buttonText={"Submit"}
                                            loader={buttonLoader}
                                        // submitButton={handleSubmit}
                                        />
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
                                </View>
                            </View>
                            {/* )} */}
                        </View>
                    </KeyboardAwareScrollView>
                </>) : (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#F0A434" />
                </View>)}

        </KeyboardAvoidingView>


    )
}

export default CreateNotes

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        padding: 10
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
    titleInput: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 8,
        borderWidth: 1,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 15
    },
    descriptionInput: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 8,
        borderWidth: 1,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        height: 150,
        padding: 15
    },
    errorMessage: {
        color: Mycolors.RED,
        paddingHorizontal: 10
    }
})
