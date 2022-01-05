import React from 'react';
import './App.css';

let scrollInterval = '';
let innerTimeout = '';

export default function App() {
    let [listData, setListData] = React.useState([
        {
            title: '同城零售-ToB产品运营（猫超卡）-用户运营部',
            location: "杭州",
            time: new Date().toLocaleTimeString()
        }, {
            title: '阿里云智能事业群-系统研发专家-机器学习平台',
            location: "杭州",
            time: new Date().toLocaleTimeString()
        }, {
            title: '中台运营事业部-品牌搜索产品运营-上海',
            location: "上海",
            time: new Date().toLocaleTimeString()
        }, {
            title: '阿里妈妈技术-前端开发专家/高级专家-北京',
            location: "北京",
            time: new Date().toLocaleTimeString()
        }, {
            title: '同城零售-渠道拓展专家-天猫超市',
            location: "杭州",
            time: new Date().toLocaleTimeString()
        },
    ]);

    let [listMarginTop, setListMarginTop] = React.useState("0");
    let [hasAnimate, setHasAnimate] = React.useState(false);

    let scroll = (e) => {
        let height = document.getElementById("scroll-list").childNodes[0].scrollHeight; // 每次滚动时要移动的高度
        setHasAnimate(true);
        setListMarginTop("-" + height + "px");
        innerTimeout = setTimeout(() => {
            listData.push(listData[0]);
            listData.shift();
            setHasAnimate(false);
            setListMarginTop("0");
            setListData([...listData]);
        }, 1800)
    };

    let startScroll = (e) => {
        stopScroll();
        scroll();
        scrollInterval = setTimeout(startScroll, 1800); // 使用setTimeout加递归的方式代替setInterval
    }

    let stopScroll = (e) => { // 停止滚动时清除所有定时器，防止页面数据发生错误
        clearTimeout(scrollInterval);
        clearTimeout(innerTimeout);
    }

    React.useEffect(() => {
        startScroll();
    }, []);

    return (
        <div className="scroll-list-container">
            <ul
                id="scroll-list"
                style={{ marginTop: listMarginTop }}
                className={hasAnimate ? "scroll-animate" : ""}
                onMouseEnter={stopScroll} // 鼠标移入时停止滚动
                onMouseLeave={startScroll} // 鼠标移出时恢复滚动
            >
                {
                    listData.map((item, index) => {
                        return (
                            <li className="job-details" key={index}>
                                <a href="/">{item.title}</a>
                                <p className="location">{item.location}</p>
                                <p className="time">{item.time}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}