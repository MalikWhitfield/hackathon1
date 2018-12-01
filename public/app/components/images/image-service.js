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
let _votes = 0


export default class ImageService {

    get images() {
        return _images
    }
    get comments() {
        return _comments
    }
    get votes() {
        return _votes
    }

    getImages(draw) {
        console.log("getting the images")
        _api.get('/images')
            .then((res) => {
                _images = res.data.image
                this.getComments(draw)
                // this.getVotes(draw)
            })
            .catch(logError)
    }
    getComments(draw) {
        console.log('getting the comments')
        _api.get('/comments')
            .then(res => {

                res.data.comments.forEach(comment => {
                    if (!_comments[comment.imageId]) {
                        _comments[comment.imageId] = []
                    }
                    _comments[comment.imageId].push(comment)
                });

                draw()
            })
            .catch(err => {
                console.log(err)
            })
    }

    postImage(image, draw) {
        _api.post('/images', image)
            .then((res) => {
                this.getImages(draw)
            })
    }

    upVote(imgId, draw) {
        let image = {}
        _images.forEach(i => {
            if (i._id == imgId) {
                image = i;
                image.vote++
            }
        })
        _api.put('/images/' + imgId, image)
            .then((res) => {
                this.getImages(draw);
            })

    }
    downVote(imgId, draw) {
        let image = {}
        _images.forEach(i => {
            if (i._id == imgId) {
                image = i;
                image.vote--
            }
        })
        _api.put('/images/' + imgId, image)
            .then((res) => {
                // debugger
                this.getImages(draw);
            })

        // getVotes(draw){
        // console.log('getting the votes')
        // _api.get('/images')
        // .then(res => {
        //     res.data.image.forEach(img => {
        //         if(!_votes[img.imageId]){
        //             _votes[img.imageId] = []
        //         }
        //         _votes[img.imageId].push(vote)
        //     });
        //     draw()
        // })
        // .catch(err =>{
        //     console.log(err)
        // })
        // }
    }
    addComment(comment, draw) {
        _api.post('/comments/', comment)
            .then(res => {
                this.getComments(draw)
            })
    }


}