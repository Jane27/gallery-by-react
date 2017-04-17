/**
 * Created by wangjing on 17/4/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom'
import '../styles/main.scss'

class ImgFigure  extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    //imageFigure的点击处理函数
    handleClick(e){
        //  console.log("press");
        if(this.props.arrange.isCenter) {
            this.props.inverse();
        }else{
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
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

        if(this.props.arrange.isCenter){
            styleObj.zIndex = 11;
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
                            {this.props.data.desc}
                        </p>
                    </div>
                </figcaption>

            </figure>
        );
    }

}
export default ImgFigure