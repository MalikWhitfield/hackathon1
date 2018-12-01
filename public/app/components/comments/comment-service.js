let _imageApi = axios.create({
  baseURL: '/api/images',
  withCredentials: true,
  timeout: 3000
})

function logError(e) {
  console.log(e)
}


let _comments =[]


export default class CommentService {

  get comments(draw){
    return _comments
  }




}
//   getComments(draw) {
//     console.log("getting the comments")
//     _imageApi.get('comments')
//       .then((res) => {
//         _comments = res.data.log
//         draw()
//       })
//       .catch(logError)
//   }
