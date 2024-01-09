import "./noticedetail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../config/contansts';

function Noticedetail() {
  const { id } = useParams();
  const [data, setData] = useState("")

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hour}:${minute}`;
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/board/news`, {params: {id: id}})
      .then((res) => {
        // console.log("db조회 완료");
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        // console.log("실패");
      });
  }, []);

  return (
    <div className="n_1_all">
      <div className="n_1_title">
        <h3>{data.title}</h3>
        <p>{formatDate(data.updated_at)}</p>
      </div>
      <div className="n_1_image">
        <img src={API_URL+"/upload/"+data.image_url}></img>
        <p>
          {data.content}
        </p>
      </div>
      <div className="n_back_b">
        <button id="n_back_1">
          <a href="/newsPage/Notice">목록</a>
        </button>
      </div>
    </div>
  );
}

export default Noticedetail;
