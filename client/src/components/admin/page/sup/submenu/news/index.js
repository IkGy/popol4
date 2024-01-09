import './news.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../config/contansts';
import { Link } from 'react-router-dom';
import ArrowDown from '../../images/arrowdown.png';
import ArrowUp from '../../images/arrowup.png';

function News(){

    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 페이지변경
    const pageLimit = 10; // 페이지 글 제한
    const [showContents, setShowContents] = useState({}); // title 의 내용보기

    // 공지사항 데이터 요청
    const fetchNews = async () => {
        try {
            const res = await axios.get(`${API_URL}/board`);
            setNews(res.data);
            // console.log('공지사항 데이터조회 완료')
            // console.log(res.data);
        } catch (error) {
            // console.log('공지사항 데이터조회 실패')
            // console.error(error);
        }
    };
    useEffect(() => {
        fetchNews();
    }, []);

    // 이벤트 삭제 요청
    const deleteNews = async (id) => {

        const isConfirmed = window.confirm("해당 공지사항을 삭제하시겠습니까?");

        if (isConfirmed) {
            try {
                console.log(id);
                const res = await axios.delete(`${API_URL}/board/admin`, {params:{id:id}});
                setNews(res.data);
                console.log('삭제 완료')
                window.location.reload();
            } catch (error) {
                console.log('삭제 실패')
                console.error(error);
            }
        }
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');

        return `${year}년 ${month}월 ${day}일 ${hour}:${minute}:${second}`;
    };

    // 페이지 계산
    const firstPostIndex = (currentPage - 1) * pageLimit;
    const lastPostIndex = currentPage * pageLimit;
    const displayedPosts = news.slice(firstPostIndex, lastPostIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 내용보기 toggle
    const toggleContent = (id) => {
        setShowContents(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    // 활성화된 내용 toggle 모두 닫기
    const closeAllToggles = () => {
        setShowContents({});
    };

    // 내용 모두 열기
    const openAllToggles = () => {
        const allOpen = news.reduce((acc, news) => {
            acc[news.id] = true;
            return acc;
        }, {});
        setShowContents(allOpen);
    };


    return (
        <>
            <div className='KJH_news_section'>
                <div className='KJH_news_route'>
                    Admin &gt; 고객 지원 &gt; 공지사항
                </div>
                <div className='KJH_news_info'>
                    <div className='KJH_news_top_section'>
                        <span className='KJH_news_top_pos_num_info'>공지사항</span>
                        <span className='KJH_news_top_pos_num'>{news.length} 건</span>
                        <span className='KJH_news_top_toggle_section'>
                            {/* 내용 모두 닫기 */}
                            <button onClick={closeAllToggles} className="KJH_news_top_close_toggle_section">
                                <img src={ArrowUp} alt='위쪽 화살표' />
                            </button>
                            {/* 내용 모두 열기 */}
                            <button onClick={openAllToggles} className="KJH_news_top_open_toggle_section">
                                <img src={ArrowDown} alt='아래쪽 화살표' />
                            </button>
                        </span>
                        {/* 페이지 버튼 */}
                        <span className='KJH_news_top_page_button_section'>
                            {[...Array(Math.ceil(news.length / pageLimit)).keys()].map(number => (
                            <button key={number} onClick={() => handlePageChange(number + 1)}>
                                {number + 1}
                            </button>
                            ))}
                        </span>
                        <Link to="/admin/support/create-news">
                            <div className='KJH_news_top_create_faq'>
                                등록하기
                            </div>
                        </Link>
                    </div>
                    <table className='KJH_news_table_section'>
                        <thead className='KJH_news_table_thead_section'>
                            <tr className='KJH_news_title_section'>
                                <th className='KJH_news_title_id'>구분</th>
                                <th className='KJH_news_title_title'>제목</th>
                                <th className='KJH_news_title_created'>등록일</th>
                                <th className='KJH_news_title_ctrl'>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(displayedPosts) && displayedPosts.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    <tr className='KJH_news_contents_section' onClick={() => toggleContent(item.id)}>
                                        <td className='KJH_news_contents_id'>{index + 1}</td>
                                        <td className='KJH_news_contents_title'>{item.title}</td>
                                        <td className='KJH_news_contents_created'>{formatDate(item.createdAt)}</td>
                                        <td className='KJH_news_contents_ctrl'>
                                            <span className='KJH_news_contents_ans'>
                                            <Link to={`/admin/support/update-news`}
                                                state={{id:item.id}}
                                            >수정</Link>
                                            </span>
                                            <span className='KJH_news_contents_del'
                                                onClick={() => deleteNews(item.id)}>
                                                삭제
                                            </span>
                                        </td>
                                    </tr>
                                    {showContents[item.id] && (
                                        <>
                                            <tr className='KJH_news_coment_tr_1st'>
                                                <td />
                                                <td colSpan="2" className='KJH_news_contents_content'>{item.content}</td>
                                                <td />
                                            </tr>
                                        </>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default News;