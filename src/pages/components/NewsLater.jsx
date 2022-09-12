import React, { useState } from 'react'
import { useEffect } from 'react';
import $ from 'jquery';
import './NewsLater.css'
import { useSelector } from "react-redux";
import { N_getWebsiteData } from '../redux/helpers/api_functions_new';
export default function NewsLater() {
    let { webData } = useSelector((state) => state.websiteDBReducer);
    const [data, setData] = useState([
        {
            id: 1,
            type: 'info',
            msg: 'I won $10000000.'
        },
        {
            id: 2,
            type: 'danger',
            msg: 'I won $10000000 again.'
        },
        {
            id: 1,
            type: 'primary',
            msg: 'I won $10000000 again and again.'
        },
        {
            id: 2,
            type: 'success',
            msg: 'I won $10000000 again and again and again.'
        }
    ]);
    const [news, setNews] = useState("");
    const [news_type, setNewsType] = useState("");
    const [index, setIndex] = useState(0);
    useEffect(() => {
        N_getWebsiteData()
        .then((data) => {
          if (data.status === 200) {
            let news_later =  data.params.website ? data.params.website.news_later:'';
            setNews(news_later);
          }
        })
        .catch((e) => e);
       
    }, [])

    useEffect(async() => {
        await $("#newslater").promise();
        if (data[index]) {
            // setNews(data[index].msg);
            setNewsType(data[index].type)
            setIndex(index + 1);
        } else {
            // setNews(data[0].msg);
            setNewsType(data[0].type)
            setIndex(1);
        }
        await $("#newslater").fadeIn(300).delay(1000).promise();
    }, [index])
    return (
        <>
        {news ? (
            <div className=' scrolling-limit text-warning '>
            <span className=  {'news-type  movingtext scrolling ' + news_type} id="newslater">
                <span className='news text-danger'>{news}</span>
            </span>
            </div>
        ) : ''}
        </>
    )
}