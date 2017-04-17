/**
 * Created by wangjing on 17/4/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom'
import '../styles/main.scss'

class ControllerUnit extends React.Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    //ControllerUnit的点击处理函数
    handleClick(e){
        // 如果点击的是当前正在选中态的按钮,则反转图片,否则,就将对应图片居中
        if(this.props.arrange.isCenter) {
            this.props.inverse();
        }else{
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        var controllerUnitClassName = "controller-unit"

        //如果对应是居中的图片,显示控制按钮的居中态
        if(this.props.arrange.isCenter) {
            controllerUnitClassName += " is-center";

            //如果同时对应的是翻转图片,显示控制按钮的翻转态
            if(this.props.arrange.isInverse) {
                controllerUnitClassName += " is-inverse";
            }
        }
        return(
            <span className={controllerUnitClassName} onClick={this.handleClick}></span>

        )
    }

}
export default ControllerUnit