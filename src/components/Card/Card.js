import React, { useState, useEffect, useCallback } from 'react'
import style from './Card.module.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import axios from 'axios';
import { useSelector } from 'react-redux';
import domain from '../../domain';
const Card = (props) => {
    const [writer, setWriter] = useState('');
    const [coverFilePath, setFilePath] = useState('');
    const [tags, setTags] = useState([]);

    const pinnedTagPosts = useSelector(state => state.blog.pinnedTagPosts);


    const getWriter = () => {
        const variables = {
            writerId: props.post.writerId
        }
        return axios.post(`${domain}/blog/getWriter`, variables)
            .then(res => {
                if (res.data.success) {

                    return { writer: res.data.result[0].username }
                }
            })
    }
    const fetchData = useCallback(() => {
        const fetchingData = async () => {
            const data = await getWriter();
            setWriter(data.writer)
        }

        fetchingData();
    }, [props.post, pinnedTagPosts])

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        const handleFilePath = () => {
            let filePath = Array.from(props.post.coverFilePath);
            filePath.splice(0, 1);
            filePath.splice(filePath.length - 1, 1);
            setFilePath(filePath.join(''))
        }

        const handleTags = () => {
            let Tags = Array.from(props.post.tags);

            Tags.splice(0, 1);
            Tags.splice(Tags.length - 1, 1);
            Tags = Tags.join('');
            setTags(Tags.split(','));
        }
        handleFilePath();
        handleTags();
    }, [props.post,pinnedTagPosts])

    if (props.post) {
        return (
            <div className={style.card}>

                <div className={style.top}>
                    <img src={`http://localhost:5000/${coverFilePath}`} />
                    <div>
                        <Link className={style.linkUrl} to={`/post/${props.post.id}`}>
                            <LinkRoundedIcon className={style.linkIcon} />
                        </Link>
                        <Link className={style.linkUrl}
                            to='#' >
                            <SearchIcon className={style.searchIcon} />
                        </Link>

                    </div>
                </div>

                <div className={style.shadow}>
                    <div className={style.center}>
                        <div className={style.authorDate}>
                            <Link style={{ textDecoration: 'none' }} to='#'><span>by {writer}</span></Link>
                            <Link style={{ textDecoration: 'none' }} to='#'><span>{moment(props.post.createdAt).format('MMMM DD, YYYY')}</span></Link>
                        </div>

                        <Link style={{ textDecoration: 'none' }} to={`/post/${props.post.id}`}>
                            <div className={style.title}><h2>{props.post.title}</h2></div>
                        </Link>
                        <div className={style.content}><p dangerouslySetInnerHTML={{ __html: props.post.content }} /></div>
                    </div>

                    <div className={style.bottom}>
                        <Link to='#'>
                            <div className={style.comment}>
                                <i className="far fa-comment"></i>
                                <span>2</span>
                            </div>
                        </Link>

                        <div className={style.tags}>
                            {tags && tags.map((tag, index) => {
                                return (
                                    <Link key={index} style={{ textDecoration: 'none' }} className={style.tagLink} to='#'><span>{tag}</span></Link>
                                )
                            })}


                        </div>

                    </div>
                </div>
            </div>
        )
    }
    else {
        <div>Loading page</div>
    }

}

export default Card
