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
        //建立新的formData以便存放要上傳的檔案的資料
        let formData = new FormData();
        //建立formData的資料類型，傳送form的話header都是設一樣的值
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        //命名要放入formData 的form名稱為file，然後因為可以一次上傳多個檔案，不過這裡只選擇一個檔案，所以只取第一個
        formData.append('file', files[0])
        //把formData和header傳到後端路徑:'video/upload'處理
        axios.post(`${domain}/video/upload`, formData, config)
            .then(res => {
                //接收後端傳回來的資料，這邊回傳的是success為true，還有檔案存放路徑和檔案名稱
                if (res.data.success) {
                    let variable = {
                        filePath: res.data.filePath,
                        fileName: res.data.fileName
                    }
                    //把檔案路徑放到state裡，待後面建立thumbnail時使用
                    setFilePath(res.data.filePath);
                    //將檔案名稱和路徑傳到後端處理thumbnail的route
                    axios.post(`${domain}/video/thumbnail`, variable)
                        .then(res => {
                            if (res.data.success) {
                                setDuration(res.data.fileDuration);
                                //截圖路徑從後端回傳並存到state裡，準備把它放到網頁上
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
