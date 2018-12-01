let _api = axios.create({
    baseURL: '/api/',
    withCredentials: true,
    timeout: 3000
})



function logError(e) {
    console.log(e)
}


let _images = []
let _comments = {
    //key imgId : value [comments]
}

export default class ImageService {

    get images() {
        return _images
    }
    get comments(){
        return _comments
    }

    getImages(draw) {
        console.log("getting the images")
        _api.get('/images')
        .then((res) => {
            _images = res.data.image
            this.getComments(draw)
        })
        .catch(logError)
    }  
    getComments(draw){
        console.log('getting the comments')
        _api.get('/comments')
        .then(res => {
           
            res.data.comments.forEach(comment => {
                if(!_comments[comment.imageId]){
                    _comments[comment.imageId] = []
                }
                _comments[comment.imageId].push(comment)
            });
         
            draw()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    postImage(image, draw) {
        _api.post('/images', image)
        .then((res) => {
            this.getImages(draw)
        })
    }
}