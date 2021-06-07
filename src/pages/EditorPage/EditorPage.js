import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import QuillEditor from '../../components/Editor/QuillEditor';
import NavForSinglePost from '../../components/Nav/NavForSinglePost';
import Dropzone from 'react-dropzone';
import AddIcon from '@material-ui/icons/Add';
import domain from '../../domain';
const EditorPage = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [coverFilePath, setCoverFilePath] = useState([])
    const [tag1, setTag1] = useState('');
    const [tag2, setTag2] = useState('');
    const [tag3, setTag3] = useState('');
    const handleSubmit = (e) => {
        let allTags = [];
        if (tag1) {
            allTags.push(tag1);
            if (tag2) {
                allTags.push(tag2)
                if (tag3) {
                    allTags.push(tag3)
                }
            }
            else {
                if (tag2) {
                    allTags.push(tag2)
                    if (tag3) {
                        allTags.push(tag3)
                    }
                }
                else {
                    if (tag3) {
                        allTags.push(tag3)
                    }
                }
            }
        } else {
            if (tag2) {
                allTags.push(tag2)
                if (tag3) {
                    allTags.push(tag3)
                }
            }
            else {
                if (tag3) {
                    allTags.push(tag3)
                }

                else {
                    if (tag3) {
                        allTags.push(tag3)
                    }
                }
            }
        }
        allTags.toString();
        let finalTags = '"' + allTags + '"';
        let coverFinalFilePath = '"' + coverFilePath + '"';
        e.preventDefault();
        if (!localStorage.getItem('loginUser')) {
            alert('Please login first')
            history.push('/login');
            
        }

        const variables = {
            writerId: localStorage.getItem('loginUserId'),
            title: title,
            content: content,
            tags: finalTags,
            coverFilePath:coverFinalFilePath
        }
        axios.post(`${domain}/blog/createPost`, variables)
            .then(res => {
                if (res.data.success) {
                    alert('插入成功')
                    history.push('/');
                }
            })

    }

    const onEditorChange = (value) => {
        setContent(value)
        console.log(value)
    }

    const onFilesChange = (file) => {
        setFiles(file);
    }

    const handleTitleChange = (e) => {

        setTitle(e.target.value);



    }
    const handleChangeOne = (e) => {
        if (e.target.value === 'Choose your tag...') {
            setTag1('');
        } else {
            setTag1(e.target.value);
        }

    }
    const handleChangeTwo = (e) => {
        if (e.target.value === 'Choose your tag...') {
            setTag2('');
        } else {
            setTag2(e.target.value);
        }
    }
    const handleChangeThree = (e) => {
        if (e.target.value === 'Choose your tag...') {
            setTag3('');
        } else {
            setTag3(e.target.value);
        }
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append('file', files[0])
        axios.post(`${domain}/blog/articleCover`, formData, config)
            .then(res => {
                if (res.data.success) {
                    setCoverFilePath([...coverFilePath, res.data.url])
                }
            })


    }

    return (
        <>
            {/* <NavForSinglePost /> */}
            <div style={{ width: '100%', margin: '50px auto 50px auto', minHeight: '600px' }}>


                <Form style={{ width: '800px', margin: '60px auto auto auto' }}>
                    <h3>Post Editor</h3>
                    <Form.Label style={{ textAlign: 'left', width: '100%', marginTop:'25px' }}>Cover</Form.Label>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    
                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={80000000}
                            style={{ height: '100px', background: '#f00' }}>
                            {({ getRootProps, getInputProps }) => (

                                <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                    {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <AddIcon style={{ fontSize: '3rem' }} />
                                </div>

                            )}
                        </Dropzone>
                        <div style={{ display: 'flex', width: '300px', height: '240px', overflowX:'auto', overflowY:'hidden' }}>

                            {coverFilePath !== '' && coverFilePath.map((image, index) => {
                                return (
                                    <div style={{  width: '300px', height: '240px' }}>
                                        <img src={`http://localhost:5000/${image}`} style={{ minWidth: '300px', height: '100%' }} alt='haha' />
                                    </div>
                                )


                            })}
                        </div>
                    </div>
                    <Form.Group style={{marginTop:'25px'}} controlId="formGroupEmail">
                        <Form.Label style={{ textAlign: 'left', width: '100%' }}>Title</Form.Label>
                        <Form.Control onChange={handleTitleChange} type="text" placeholder="Enter title..." />
                    </Form.Group>
                    <Form.Label style={{ textAlign: 'left', width: '100%', marginTop: '30px' }}>Content</Form.Label>
                    <QuillEditor
                        placeholder={"Start Posting Something"}
                        onEditorChange={onEditorChange}
                        onFilesChange={onFilesChange}
                    />
                    <div style={{ width: '800px', display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                        <div  >
                            <Form.Label style={{ textAlign: 'left', width: '100%', marginTop: '20px' }} >Tag1</Form.Label>
                            <Form.Control onChange={handleChangeOne} as="select" defaultValue="Choose your tag...">
                                <option>Choose your tag...</option>
                                <option>Front-End</option>
                                <option>Back-End</option>
                            </Form.Control>
                        </div>
                        <div >
                            <Form.Label style={{ textAlign: 'left', width: '100%', marginTop: '20px' }} >Tag2</Form.Label>
                            <Form.Control onChange={handleChangeTwo} as="select" defaultValue="Choose...">
                                <option>Choose your tag...</option>
                                <option>React</option>
                                <option>Javascript</option>
                                <option>Node.js</option>
                                <option>HTML</option>
                                <option>CSS</option>
                            </Form.Control>
                        </div>
                        <div>
                            <Form.Label style={{ textAlign: 'left', width: '100%', marginTop: '20px' }} >Tag3</Form.Label>
                            <Form.Control onChange={handleChangeThree} as="select" defaultValue="Choose...">
                                <option>Choose your tag...</option>
                                <option>React</option>
                                <option>Javascript</option>
                                <option>Node.js</option>
                                <option>HTML</option>
                                <option>CSS</option>
                            </Form.Control>
                        </div>

                    </div>
                    <Button style={{ width: '100%', marginTop: '50px', background: '#fff', color: '#888', border: '1px solid #ccc' }} onClick={handleSubmit} as="input" type="submit" value="SUBMIT" />
                    <Button style={{ width: '100%', marginTop: '20px', background: '#222222', color: '#FFF', border: '1px solid #ccc' }} onClick={()=>history.push('/')} as="input" type="submit" value="BACK TO BLOG PAGE" />
                </Form>


            </div>
        </>
    )
}

export default EditorPage
