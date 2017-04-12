// import Hello from '../Hello/index.jsx';
// import World from './World/index.jsx';
//
// import './Hello/index.less';
// import './World/index.less';

import React from 'react';
import '../styles/main.scss'


// 获取图片相关的数据
import imageDatas from '../data/imageDatas.json'

console.log(imageDatas);
// import imageURL from '../images'
//
// let imageDatas = require('json!../data/imageDatas.json')
// //利用自执行函数,将图片名信息转成图片的URL
// imageDatas = ((imageDataArray) =>{
//     for (var i=0,j=imageDataArray.length;i<j;i++){
//         var singleImageData = imageDataArray[i];
//         singleImageData.imageURL = require ('../images'+singleImageData.fileName);
//         imageDataArray[i]=singleImageData;
//
//     }
//     return imageDataArray;
//
// })(imageDatas);

class GalleryByReactApp extends React.Component{

    render(){
        return (
            // <div>hello</div>
            <section className="stage">
                <section className="img-sec">
                </section>
                <nav className="controller-nav">
                </nav>
            </section>
        );
    }

}

export default GalleryByReactApp
