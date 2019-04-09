import React, { Component } from 'react'
import ending from '../../../assets/ending.jpg'
import clock from '../../../assets/clock.jpg'
import ladyBug from '../../../assets/瓢虫.jpg'

import './index.css'

class MineClearance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chessman: []
        }
        for(let i = 0; i < 480; i ++) {
            this.state.chessman[i] = i
        }
    }

    componentDidMount() {
        function addEvent(ele, type, handle){
            if(ele.addEventListener){
                ele.addEventListener(type, handle, false);
            }else if(ele.attachEvent)
                ele.attachEvent('on' + type, function(){
                    //因为事件处理函数里可能包含this
                    //但在IE独有的attachEvent函数里的this指向window所以要用call改变this指向
                    handle.call(ele);
                });
            else ele['on' + type] = handle;
        }
        //封装一个取消dom元素绑定方法的函数,默认是事件冒泡模式
        function removeEvent(ele, type, handler){
            if(ele.addEventListener){
                ele.removeEventListener(type, handler, false);
            }else ele.detachEvent('on' + type, handler);
        }
        function getStyle(ele, prop){
            //如果window.getComputedStyle方法存在的话
            if(window.getComputedStyle){
                return window.getComputedStyle(ele, null)[prop];
            }else {
                //为了兼容IE
                return ele.currentStyle[prop];
            }
        }
        //封装一个取消默认事件的函数,event为事件对象
        function cancelHandler(event){
            if(event.preventDefault){
                event.preventDefault();
            }	event.returnValue = false;
        }

        function star(){
            if(flag === false)
                flag = true;
            if(flag && parseInt(time1.value) + parseInt(time2.value) === 0){
                //刚开始的地雷有99个
                number.value = '99';
                //每个一秒执行一次该函数
                timer = setInterval(function(){
                    if(time2.value === '59'){
                        if(parseInt(time1.value) < 9)
                            time1.value = '0' + (parseInt(time1.value) + 1 + '');
                        else time1.value = parseInt(time1.value) + 1 + '';
                        time2.value = '00';
                    }else {
                        if(parseInt(time2.value) < 9)
                            time2.value = '0' + (parseInt(time2.value) + 1 + '');
                        else time2.value = parseInt(time2.value) + 1 + '';
                    }
                }, 1000);
            }
            removeEvent(this, 'mousedown', star);
        }

        function mousedown(e){
            //为了兼容IE
            e = e || window.event;
            //当左击到影藏瓢虫的草块时游戏结束
            if(e.button === 0 && this.have === true &&  this.clickNumber === 0){
                this.className = 'lei';
                this.clickNumber = 0;
                //让全部的瓢虫晚些在出现,这样会比马上出现的视觉效果好很多
                for(let i = 0; i < 16; i ++){
                    for(let j = 0;j < 30; j ++){
                        removeEvent(arrli[i][j], 'mousedown', mousedown);
                    }
                }
                setTimeout(
                    function(){
                        for(let i = 0; i < 16; i ++){
                            for(let j = 0; j < 30; j ++){
                                if(arrli[i][j].have === true){
                                    arrli[i][j].className = 'lei';
                                }
                            }
                        }
                        number.value = "0";
                    }, 2000);
                //移除定时器,停止计时
                clearInterval(timer);
                ending.style.display = 'block';
                //结束的图片从top降下来
                let imageMove = setInterval(function(){
                    ending.style.top = parseInt(ending.style.top) + 10 + 'px';
                    if(parseInt(ending.style.top) > 500)
                        clearInterval(imageMove);
                }, 30);
            }
            //如果没触雷
            else if(e.button === 0 && this.clickNumber === 0){
                let num = 0;
                for(let i = 0; i < 8; i ++){
                    //如果当前的位置没有越界
                    let newx = h[i] + this.x, newy = l[i] + this.y;
                    if(newx >= 0 && newx < 16 && newy >= 0 && newy < 30){
                        if(arrli[newx][newy].have === true)
                            num ++;
                    }
                }
                //为当前格子换上对应的图片
                select(this, num);
                //当num为0时,需要为它身边8个格子全部搜一遍
                if(num === 0){
                    dfs(this);
                }
                removeEvent(this, 'mousedown', mousedown);
                //如果敲击右键
            }else if(e.button === 2){
                this.clickNumber ++;
                //如果奇数次就插旗
                if(this.clickNumber % 3 === 1){
                    this.className = 'banner';
                    number.value = parseInt(number.value) - 1 + '';
                }else if(this.clickNumber % 3 === 2){
                    this.className = 'unknow';
                    number.value = parseInt(number.value) + 1 + '';
                }else {
                    this.className = 'secret';
                    //让该格子可以被点击
                    this.clickNumber = 0;
                }
            }
        }

        function select(ele, num){
            if(num === 0){
                ele.className = 'ling';
            }else if(num === 1){
                ele.className = 'one';
            }else if(num === 2){
                ele.className = 'tow';
            }else if(num === 3){
                ele.className = 'three';
            }else if(num === 4){
                ele.className = 'four';
            }else if(num === 5){
                ele.className = 'five';
            }else if(num === 6){
                ele.className = 'six';
            }else if(num === 7){
                ele.className = 'seven';
            }else if(num === 8){
                ele.className = 'eight';
            }
        }
        function dfs(ele){
            let stack = [];
            stack.push(ele);
            //表明已经搜过了
            ele.fou = true;
            while(stack.length){
                let ge = stack.pop();
                for(let i = 0; i < 8; i ++){
                    let newx = ge.x + h[i];
                    let newy = ge.y + l[i];
                    if(newx >= 0 && newx < 16 && newy >= 0 && newy < 30 && arrli[newx][newy].fou === false){
                        let num = cal(arrli[newx][newy]);
                        if(num === 0){
                            stack.push(arrli[newx][newy]);
                        }
                        arrli[newx][newy].fou = true;
                    }
                }
            }
        }
        //计算当前格子边上有几个地雷,并选择相应图片
        function cal(ele){
            let num = 0;
            for(let i = 0; i < 8; i ++){
                let newx = ele.x + h[i];
                let newy = ele.y + l[i];
                if(newx >= 0 && newx < 16 && newy >= 0 && newy < 30){
                    if(arrli[newx][newy].have === true){
                        num ++;
                    }
                }
            }
            select(ele, num);
            return num;
        }

        //点击任意一个格子后,开始计时,并且显示当前隐藏的地雷数量
        let time1 = document.getElementsByClassName('time1')[0];
        let time2 = document.getElementsByClassName('time2')[0];
        let number = document.getElementsByClassName('number')[0];
        let container = document.getElementsByClassName('container')[0];
        let ending = document.getElementsByTagName('img')[0];
        //搜索的时候用作按某方向前进的道具,8个方向
        let h  = [-1, -1, 0, 1, 1, 1, 0, -1], l = [0, 1, 1, 1, 0, -1, -1, -1];
        //flag为标记,当它为true时,表明开始计时
        let flag = false;
        //为了方便移除定时器
        let timer;
        let li = document.getElementsByClassName('chessman');
        //建立一个二维数组,把所有的li标签都存进数组里面
        let arrli = [], k = 0;
        //addEvent是自己封装的函数，给dom元素添加事件
        //注意只有mousedown和mouseup才能区分左右键
        //随机选择99个格子埋上地雷
        let num = 99;
        addEvent(container, 'mousedown', star);
        //为每个li标签绑定click事件
        for(let i = 0; i < 16; i ++)
            arrli[i] = [];
        for(let i = 0; i < 16; i ++){
            for(let j = 0; j < 30; j ++){
                arrli[i][j] = li[k ++];
                //记录下当前li标签的位置
                arrli[i][j].x = i;
                arrli[i][j].y = j;
                //作为右击要选择的样式的参考条件
                arrli[i][j].clickNumber = 0;
                //为了防止重复搜素
                arrli[i][j].fou = false;
            }
        }
        while(num){
            let x = parseInt(Math.random() * 16);//范围是0 ~ 15
            let y = parseInt(Math.random() * 30);
            if( arrli[x][y].have !== true){
                arrli[x][y].have = true;
                num --;
            }
        }

        for(let i = 0;i < 16; i ++){
            for(let j = 0; j < 30; j ++){
                addEvent(arrli[i][j], 'mousedown', mousedown);
            }
        }
        //取消了右击的，默认事件
        addEvent(document, 'contextmenu', cancelHandler);
    }

    render() {
        let chessMans = this.state.chessman
        return (
            <div id="block">
                <img className="ending" src={ ending } alt="ending"
                     style={ {marginLeft:"40%", top:'0px', position: 'relative', display: 'none'} } />
                <div className="game">
                    <div className="top">
                        <img src={ clock } alt="clock" style={ {marginLeft:'500px'} }/>
                        <input className="time1" type="text" defaultValue="00" style={ {marginLeft:'20px'} }/>分
                        <input className="time2" type="text" defaultValue="00" style={ {marginLeft:'20px'} } />秒
                        <img src={ ladyBug } alt="瓢虫" style={ {marginLeft:'50px'} } />
                        <input className="number" type="text" defaultValue="00" style={ {marginLeft:'20px'} }  />
                    </div>
                    <div className="container">
                        <ul className="chessboard">
                            {
                                chessMans.map((value, index)=>{
                                    return (
                                        <li className="chessman" key={index} />
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default MineClearance;
