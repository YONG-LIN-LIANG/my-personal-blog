import React, { useState, useEffect } from 'react'
import NavForSinglePost from '../../components/Nav/NavForSinglePost';
import style from './UploadVideoPage.module.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dropzone from 'react-dropzone';
import AddIcon from '@material-ui/icons/Add';
import { Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import domain from '../../domain';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& .MuiTextField-root': {
            margin: '30px 0px',
            width: '100ch',

        },
    },

}));




const UploadVideoPage = (props) => {
    
    const classes = useStyles();
    const [writer, setWriter] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [privacy, setPrivacy] = useState(0);
    const [categories, setCategories] = useState('Film & Animation');
    const [filePath, setFilePath] = useState('');
    const [duration, setDuration] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    useEffect(() => {
        const loginUser = localStorage.getItem('loginUser');
        setWriter(loginUser)
        console.log(writer)
    }, [writer])


    const Private = [
        { value: 0, label: 'Private' },
        { value: 1, label: 'Public' }
    ]
    const Catogory = [
        { value: 0, label: 'Film & Animation' },
        { value: 0, label: 'Autos & Vehicles' },
        { value: 0, label: 'Music' },
        { value: 0, label: 'Pets & Animals' },
        { value: 0, label: 'Sports' },
    ]
    const handleTitle = (e) => {
        setTitle(e.target.value);

    };
    const handleDescription = (e) => {
        setDescription(e.target.value);

    };

    const handleChangeOne = (e) => {
        setPrivacy(e.target.value);
        console.log(e.target.value)
    }
    const handleChangeTwo = (e) => {
        setCategories(e.target.value);
        console.log(e.target.value)
    }

    const handleSubmit = (e) => {
        const userId = parseInt(localStorage.getItem('loginUserId'));
        e.preventDefault();

        if (writer == '') {
            return alert('Please Login first')
        }

            if(title =='' || description =='' || filePath =='' || duration =='' || thumbnail ==''){
                return alert('Please Fill all the fields')
            }
                const variables = {
                    writer: writer,
                    title: title,
                    description: description,
                    privacy: privacy,
                    filePath: filePath,
                    category: categories,
                    duration: duration,
                    thumbnail: thumbnail,
                    userId:userId
                }
                axios.post(`${domain}/video/uploadVideo`, variables)
                    .then(res => {
                        if (res.data.success) {
                            alert('Video uploaded successfully');
                            props.history.push('/recommendVideo');
                        }
                        else {
                            console.log('Fail to upload video')
                        }
                    })
    }

    const onDrop = (files) => {
        //????????????formData???????????????????????????????????????
        let formData = new FormData();
        //??????formData????????????????????????form??????header?????????????????????
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        //???????????????formData ???form?????????file?????????????????????????????????????????????????????????????????????????????????????????????????????????
        formData.append('file', files[0])
        //???formData???header??????????????????:'video/upload'??????
        axios.post(`${domain}/video/upload`, formData, config)
            .then(res => {
                //???????????????????????????????????????????????????success???true??????????????????????????????????????????
                if (res.data.success) {
                    let variable = {
                        filePath: res.data.filePath,
                        fileName: res.data.fileName
                    }
                    //?????????????????????state?????????????????????thumbnail?????????
                    setFilePath(res.data.filePath);
                    //??????????????????????????????????????????thumbnail???route
                    axios.post(`${domain}/video/thumbnail`, variable)
                        .then(res => {
                            if (res.data.success) {
                                setDuration(res.data.fileDuration);
                                //????????????????????????????????????state?????????????????????????????????
                                setThumbnail(res.data.thumbsFilePath);
                            }
                            else {
                                alert('Fail to make a thumbnail');
                            }
                        })
                }
                else {
                    alert('Fail to save the video in server')
                }
            })
    }
    return (
        <div className={style.uploadVideoPage}>
            <NavForSinglePost />
            <div className={style.content}>
                <h2>Upload Video</h2>
                <div className={style.uploadAndShow}>
                    <Dropzone
                        onDrop={onDrop}
                        style={{ height: '100px', background: '#f00' }}>
                        {({ getRootProps, getInputProps }) => (

                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                {...getRootProps()}>
                                <input {...getInputProps()} />
                                <AddIcon style={{ fontSize: '3rem' }} />
                            </div>

                        )}
                    </Dropzone>
                    {thumbnail !== '' &&
                        <div className={style.thumbnail}>
                            <img src={`http://localhost:5000/${thumbnail}`} alt='haha' />
                        </div>
                    }
                </div>
                <form className={classes.root} noValidate autoComplete="off">

                    <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        onChange={handleTitle}
                        value={title}
                    />
                    <TextField
                        className='textarea'
                        id="outlined-textarea"
                        label="Description"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        onChange={handleDescription}
                        value={description}
                    />
                </form>
                <div className={style.optionArea}>
                    <div style={{display: 'flex', marginBottom:'30PX'}}>
                    <Form.Control
                        onChange={handleChangeOne}
                        as="select"
                        className="my-1 mr-sm-2"
                        id="inlineFormCustomSelectPref"
                        custom
                        style={{ width: '120px', marginBottom: '50px' }}
                    >
                        {
                            Private.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))
                        }
                    </Form.Control>
                    <Form.Control
                        onChange={handleChangeTwo}
                        as="select"
                        className="my-1 mr-sm-2"
                        id="inlineFormCustomSelectPref"
                        custom
                        style={{ width: '120px' }}
                    >
                        {
                            Catogory.map((item, index) => (
                                <option key={index} value={item.label}>{item.label}</option>
                            ))
                        }
                    </Form.Control>
                    </div>
                    <Button onClick={handleSubmit} variant="primary">Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default UploadVideoPage
