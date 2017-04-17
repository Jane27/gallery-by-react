// import Hello from '../Hello/index.jsx';
// import World from './World/index.jsx';
//
// import './Hello/index.less';
// import './World/index.less';

import React from 'react';
import ReactDOM from 'react-dom'
import '../styles/main.scss'

//import ImgFigure from '../containers/ImgFigure'


// 获取图片相关的数据
//import imageDatas from '../data/imageDatas.json'
//import imageURL from '../images'

let imageDatas = require('../data/imageDatas.json');
//console.log("image:"+imageDatas.fileName);


//
 //利用自执行函数,将图片名信息转成图片的URL
imageDatas = ((imageDataArray) =>{
    for (let i=0,j=imageDataArray.length;i<j;i++){
        let singleImageData = imageDataArray[i];
       // import imageDataArray[i].imageURL from "'../images/'+singleImageData.fileName";
        singleImageData.imageURL = require ('../images/'+singleImageData.fileName);
        imageDataArray[i]=singleImageData;

    }
    return imageDataArray;

})(imageDatas);

//获取期间内的随机值

var getRangeRandom=(low,high)=>{
    return Math.ceil(Math.random()*(high-low)+low);
};
//旋转角度0-30之间的正负值
var get30DegRandom=()=>{
    //大于0.5是正的,小于0.5是负的
    return(Math.random() >0.5 ? '':'-') + Math.ceil(Math.random()*30);

};


class ImgFigure  extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    //imageFigure的点击处理函数
    handleClick(e){
        console.log("press");

        e.stopPropagation();
        e.preventDefault();
        this.props.inverse();
    }

    render() {
        console.log("Rederring ImgFigure");
        var styleObj = {};
        //如果PROPS属性中制定了这张图片的位置,则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }
        if(this.props.arrange.rotate) {
            // //旋转的CSS3: transform:rotate(7deg);
            // //此时不是兼容所有浏览器
            // // -ms-transform:rotate(7deg); 	/* IE 9 */
            // // -moz-transform:rotate(7deg); 	/* Firefox */
            // // -webkit-transform:rotate(7deg); /* Safari 和 Chrome */
            // // -o-transform:rotate(7deg); 	/* Opera */
            // styleObj['transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            var vendorPrefix = ['Moz', 'Ms', 'Webkit', ''];
            for(let i=0;i<vendorPrefix.length;i++){
                styleObj[vendorPrefix[i]+'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }
        }

        var imgFigureClassName = "img-figure";
        imgFigureClassName += this.props.arrange.isInverse? ' is-inverse':'';


        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                {/*console.log(this.props.data);*/}
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">
                        {this.props.data.title}
                    </h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.data.title}
                        </p>
                    </div>
                </figcaption>

            </figure>
        );
    }

}




class GalleryByReactApp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            //存放图片的位置信息和旋转信息
            imgArrangeArray:[
                // {
                //     //位置
                //     pos: {
                //         left:'0',
                //         top:'0'
                //     },
                //     //旋转角度
                //     rotate:0,
                //      //图片正反面:False--正面,true--反面
                //     isInverse: false

                // }
            ]
        };
        this.Constant = {
            centerPos: {
                left:0,
                right:0
            },
            // 水平方向的取值范围
            hPosRange:{
                leftSecX:[0,0],
                rightSecX:[0,0],
                y:[0,0]
            },
            // 垂直方向的取值范围
            vPosRange: {
                x:[0,0],
                topY:[0,0]
            }
        };

    }
    //翻转图片
    //index 输入当前被执行INverse操作的图片对应的图片信息数组的INDEX值
    //return {} 是一个闭包函数,其中RETURN一个真正待被执行的函数

    inverse (index) {
        return ()=> {
            console.log("inverse pic: ", index);
            // var imgArr = this.state.imgArrangeArray;
            // imgArr[index].isInverse = !imgArr[index].isInverse;
            // this.setState = ({
            //     imgArrangeArray: imgArr
            //
            // });

            let imgArr = this.state.imgArrangeArray;
            imgArr[index].isInverse = !imgArr[index].isInverse;

            this.setState({imgArrangeArray: imgArr})
        }
    }




    rearrange(centerIndex) {
        let imgsArrangArray = this.state.imgArrangeArray,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,

            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,

            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgArrangeTopArray = [],
            topImgNum = Math.floor(Math.random() * 2), //取一个或者不取
            topImgSpliceIndex = 0,
            imgArrangeCenterArray = imgsArrangArray.splice(centerIndex, 1);



        /******************************中心图片信息********************************************************/
            //从所有ARRAY中剔除掉一个,拿到的就是centerIndex,
            //此处为CENTERiDEX处的状态信息
        imgArrangeCenterArray = imgsArrangArray.splice(centerIndex, 1);
        //居中 centerIndex
        imgArrangeCenterArray[0].pos = centerPos;
        //中心的图片不需要旋转
      //  imgArrangeCenterArray[0].rotate = 0;

        /******************************取出要布局上侧的图片的状态信息****************************************/
            //上面区域的图片信息0-1
       // let imgArrangeTopArray = [],
        topImgNum = Math.ceil(Math.random() * 2);

            //从数组对象取出的位置
          //  topImgSpliceIndex = 0;

        //从索引往后取
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangArray.length - topImgNum));

        imgArrangeTopArray = imgsArrangArray.splice(topImgSpliceIndex, topImgNum);

        //布局位于上侧的图片
        for (let index = 0; index < imgArrangeTopArray.length; index++) {
            imgArrangeTopArray[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1]),
                },
                rotate: get30DegRandom(),

            };
        }

        /****************************************布局左右两侧的图片*************************************************/
        for (let  i = 0, j = imgsArrangArray.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;

            //前半部分布局左边,后半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangArray[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),

            };
        }
        //填充上部分区域
        //如果上面有图片

            if (imgArrangeTopArray && imgArrangeTopArray[0]) {
                //topImgSpliceIndex--插入位置
                imgsArrangArray.splice(topImgSpliceIndex, 0, imgArrangeTopArray[0]);
            }
            //填充中心区域
            imgsArrangArray.splice(centerIndex, 0, imgArrangeCenterArray[0]);

            this.setState({
                imgArrangeArray: imgsArrangArray
            })
        }



    // 组件加载后为每张图片计算其位置的范围
    componentDidMount(){
        //舞台大小
        var stageDom =ReactDOM.findDOMNode(this.refs.stage),
        //scrollWidth ,scrollHeight DOM元素的宽高,对象实际内容宽度
         stageW = stageDom.scrollWidth,
         stageH = stageDom.scrollHeight,

        //转换为整数
         halfStageW = Math.ceil(stageW / 2),
         halfStageH = Math.ceil(stageH / 2);

        //获取IMAGEFIGURE的大小
        var imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigures0),
            imgW=imgFigureDom.scrollWidth,
            imgH = imgFigureDom.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        //计算中心图片位置点
        this.Constant.centerPos = {
            left:halfStageW-halfImgW,
            top:halfStageH-halfImgH
        };
        //计算左侧右侧区域图片排布位置的取值范围
        this.Constant.hPosRange.leftSecX[0]=-halfImgW;
        this.Constant.hPosRange.leftSecX[1]=halfStageW-halfImgW*3;

        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW -halfImgW;

        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;
        //计算上侧区域图片排布位置
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH-halfImgH*3;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.rearrange(0);

    }

    render(){
        //包含控制组件:下面的小点点
        var controllerUnits = [];
        //用到的图片
        var imageFigures = [];
       // console.log(imageDatas);
        //遍历imageDatas
        // for (var [value, index] of imageDatas) {
        //     console.log("value:",value);
        //     if(!this.state.imgArrangeArray[index]) {
        //         this.state.imgArrangeArray[index] ={
        //             //初始化状态对象,定位到左上角
        //             pos: {
        //                 left:0,
        //                 top:0
        //             }
        //         }
        //
        //     }
        //     imageFigures.push(<ImgFigure data ={value} ref={"imgFigures"+index}
        //                                  arrange = {this.state.imgArrangeArray[index]}/>);
        // }
        // console.log(this);
        console.log("Rendering GalleryByReactApp");

        for(let index = 0; index < imageDatas.length; index++) {

            if(!this.state.imgArrangeArray[index]) {
                this.state.imgArrangeArray[index] ={
                    //初始化状态对象,定位到左上角
                    pos: {
                        left:0,
                        top:0,
                    },
                    rotate:0,
                    isInverse:false,
                }

            }
            imageFigures.push(<ImgFigure key= {index} data ={imageDatas[index]}
                                         ref={"imgFigures" + index}
                                         arrange = {this.state.imgArrangeArray[index]}
                                         inverse={this.inverse(index)}/>);
        }


        return (
            // <div>hello</div>
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imageFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }

}

export default GalleryByReactApp;