import moment from 'moment';
import random from 'string-random';
export const videoDuration = (time) => {
    const hour = Math.floor(time / 3600);
    const minute = Math.floor(time / 60);
    const second = Math.floor(time);
    if (hour == 0) {
        return (
            minute + ':' + second
        )
    }
    else {
        return (
            hour + ':' + minute + ':' + second
        )
    }
}

export const tillNow = (time) => {
    const videoTime = moment(time).format('YYYYMMDD');
    const since = moment(`${videoTime}`).fromNow();
    //如果現在時間離影片發布時間<24小時，顯示''小時前
    //如果現在時間離影片發布時間>1個禮拜<1個月，再計算幾個禮拜前，顯示''禮拜前
    //如果現在時間離影片發布時間<1個禮拜，顯示''天前
    //如果現在時間離影片發布時間>1個月，顯示''月前
    //如果現在時間離影片發布時間>1年，顯示''年前
    //其他顯示''分前

    return (since)
}


export const randomNum = () => {

    const string = random(9, { letters: false });
    const num = parseInt(string);
    return num
}

export const handleTags = (tagData) => {
    let Tags = Array.from(tagData);
    Tags.splice(0, 1);
    Tags.splice(Tags.length - 1, 1);
    Tags = Tags.join('');
    Tags = Tags.split(',');
    return Tags
}

export const handleFilePath = (filePathData) => {
    let filePath = Array.from(filePathData);
    filePath.splice(0, 1);
    filePath.splice(filePath.length - 1, 1);
    filePath = filePath.join('');
    return filePath
}


export const handlePinnedTag = (posts, pinnedTag) => {
    let result = posts.map((post)=>{

        const postTag = handleTags(post.tags)
        // return postTag
        return postTag.filter((tag, index, arr)=>{
            return arr[index] === pinnedTag
        })
    })
    // return result[2]
    let finalArr = [];
    for(let i = 0; i<result.length; i++){
            if(result[i].length>0){
                finalArr.push(posts[i])
            }
    
       }
    return finalArr
    
   }

   
    



export const handleLatestPost = (posts) => {
    if (posts.length > 0) {
        let newArr = posts;
        let tagArr = [];
        let finalArr = [];

        for (let i = 0; i < 4; i++) {
            //如果有值才進行推送，確保不會推送undefined的值
            if (newArr[i]) {
                finalArr.push(newArr[i])
            }

        }
        finalArr.forEach(post => {
            tagArr.push(post.tags)
        })

        return finalArr
    }
}

export const handleLatestPostForFooter = (posts) => {
    if (posts.length > 0) {
        let newArr = posts;
        let tagArr = [];
        let finalArr = [];

        for (let i = 0; i < 3; i++) {
            //如果有值才進行推送，確保不會推送undefined的值
            if (newArr[i]) {
                finalArr.push(newArr[i])
            }

        }
        finalArr.forEach(post => {
            tagArr.push(post.tags)
        })

        return finalArr
    }
}