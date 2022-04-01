import React, { useState, useEffect } from 'react';
import { Box, makeStyles, TextareaAutosize, Button, FormControl } from '@material-ui/core';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useRef } from "react";
import { postFailure, postStart, postSuccess } from "../redux/postRedux";
import { Attachment } from '@material-ui/icons';
import '../index.css'
import { Editor } from "@tinymce/tinymce-react";
const useStyle = makeStyles(theme => ({
    container: {
        margin: '50px 100px',
        [theme.breakpoints.down('md')]: {
            margin: 0
        },
    },
    picture: {
        width: "100%",
        height: "50vh",
        objectFit: "cover",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
    },
    form: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    textfield: {
        flex: 1,
        margin: '0 30px',
        fontSize: 25,
        fontWeight: '600',
        border: 'none',
        backgroundColor: 'transparent',
        resize: 'none',
        outline: 'none',
        fontFamily: "'Quicksand', 'sans-serif'"
    },
    textarea: {
        width: '100%',
        border: 'none',
        marginTop: 50,
        borderLeft: "3px solid gray",
        paddingLeft: "10px",
        fontSize: 18,
        fontFamily: "'Quicksand', 'sans-serif'",
        '&:focus-visible': {
            outline: 'none'
        }
    },
    spanstyle: { color: "red", marginTop: "10px" }
}));
const initialPost = {
    title: '',
    description: '',
    picture: '',
}
const UpdatePost = ({ match }) => {
    const editorRef = useRef(null);
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user.currentUser);
    const [postdata, setPostdata] = useState(initialPost);
    const [imageurl, setImageurl] = useState('');
    const [imageurlafter, setImageurlafter] = useState('');
    const { isFetching, error } = useSelector((state) => state.post);
    const userid = user.id;
    useEffect(() => {
        const getImage = async () => {
            if (postdata.picture) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    setImageurlafter(reader.result)
                }
                reader.readAsDataURL(postdata.picture);
            }
        }
        getImage();
    }, [postdata.picture])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/post/${match.params.id}`)
            setPostdata({ title: response.data.title, description: response.data.description, picture: response.data.picture })
            if (response.data.userId !== userid) {
                history.push('/')
            }
            setImageurl(response.data.picture);
        }
        fetchData()
    }, [])

    const savePost = async () => {
        await updatePost(dispatch, postdata);
    }
    const handleChange = (e) => {
        setPostdata({ ...postdata, [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value });
    }
    const updatePost = async (dispatch, post) => {
        dispatch(postStart());
        try {
            const data = new FormData();
            data.append("picture", postdata.picture);
            data.append("title", postdata.title);
            data.append("description",editorRef.current.getContent());
            const result = await axios.put(`/post/${match.params.id}/update`,
                data, {
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem('currentUser')).accesstoken
                }
            }
            );
            dispatch(postSuccess(result.data));
            history.push('/')
        } catch (err) {
            alert('Post not Updated, Something went Wrong!')
            dispatch(postFailure());
        }
    };
    const url = imageurlafter ? imageurlafter : `/${imageurl.slice(7,)}`
    return (
        <>
            <Box className={classes.container}>
                <img src={url} alt="banner" className={classes.picture} />
                <FormControl className={classes.form}>
                    <label htmlFor="fileInput">
                        <Attachment className={classes.addIcon} fontSize="large" color="action" />
                    </label>
                    <input
                        name='picture'
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => handleChange(e)}
                    />
                    <input name='title' defaultValue={postdata.title} placeholder="Title" onChange={(e) => handleChange(e)} className={classes.textfield} />
                    <Button onClick={() => savePost()} disabled={isFetching} variant="contained" color="primary">Publish</Button>
                </FormControl>
                <Editor
                defaultValue={postdata.description}
                onInit={(evt, editor) => editorRef.current = editor}
                name='description'
                />
                {/* <TextareaAutosize

                    rowsMin={5}
                    name='description'
                    placeholder="Start Writing!"
                    defaultValue={postdata.description}
                    className={classes.textarea}
                    onChange={(e) => handleChange(e)}
                /> */}
                {error && <Alert severity="error">
                    <AlertTitle>Post not Updated</AlertTitle>
                    Something went Wrong!
                </Alert>
                }
            </Box>
        </>
    )
}

export default UpdatePost;