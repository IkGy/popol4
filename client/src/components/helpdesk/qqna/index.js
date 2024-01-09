import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Ask_Data from './data/ask_data';
import Submit_Data from './data/submit_data';
import './qqna.css'

function QQNA() {

    const rendertext = (text) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    const [checkedState, setCheckedState] = useState(
        Ask_Data.reduce((acc, item) => {
            acc[item.id] = false;
            return acc;
        }, {})
    );

    const handleCheckboxChange = (id) => {
        setCheckedState({
            ...checkedState,
            [id]: !checkedState[id],
        });
    };

    

    return (
        <>
            <div className='kk_help_container'>
                <div className='kk_faq_help_bar'>
                    <Link to='/ffaq'>
                        <div className='kk_faq_help_bar_faq'>
                            FAQ
                        </div>
                        
                    </Link>
                    <Link to='/qqna'>
                        <div className='kk_ask_help_bar_qna'>
                            1:1문의
                            <div className='kk_ask_line_bar'></div>
                        </div>
                    </Link>
                </div>
                <div className='kk_ask_all'>
                    <div className='kk_ask_section'>
                        <div className='kk_ask_title'>
                            1:1 문의
                        </div>
                        <div className='kk_ask_gre_all'>
                            <div className='kk_ask_agree_section'>
                                {Ask_Data.map((ask, index) => (
                                    <div key={ask.id} className={`kk_ask_agree_left_section
                                    ${index === Ask_Data.length - 1 ? 'last-element' : ''}`}>
                                        <div className='kk_ask_agree_left_title'>
                                            {ask.title}
                                        </div>
                                        <div className='kk_ask_agree_left_info'>
                                            <div className='kk_ask_agree_left_info_section'>
                                            {rendertext(ask.text)}
                                        </div>
                                    </div>
                                    <div className='kk_ask_agree_checkbox_section'>
                                        <input
                                            type="checkbox"
                                            id={`custom-checkbox-${ask.id}`}
                                            className="kk_checkbox-custom"
                                            checked={checkedState[ask.id]}
                                            onChange={() => handleCheckboxChange(ask.id)}
                                        />
                                        <label htmlFor={`custom-checkbox-${ask.id}`} className="checkbox-custom-label"></label>
                                        {ask.check} <span className='kk_check_ess'>(필수)</span>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <div className='kk_ask_btm_section'>
                                <div className='kk_ask_btm_title'>
                                    문의 작성하기
                                </div>
                                <div className='kk_ask_btm_title_right'>
                                필수입력사항
                                </div>
                            </div>
                            <table className='kk_ask_btm_table'>
                                <caption>문의 작성하기 테이블</caption>
                                <colgroup>
                                    <col width="130px" />
                                    <col width="*" />
                                </colgroup>
                                {Submit_Data.map((item) => (
                                    <tbody key={item.id}>
                                        <tr scopte="col">
                                            <th scope="col">
                                                {item.title}
                                            </th>
                                            <td>
                                                <span className='kk_form_text' style={{ width: '100%' }}>
                                                    {item.type === 'textarea' ? (
                                                        <textarea
                                                            id={item.input_id}
                                                            name={item.name}
                                                            placeholder={item.holder}
                                                            className='kk_form_textarea'
                                                        />
                                                    ) : (
                                                        <input
                                                            id={item.input_id}
                                                            name={item.name}
                                                            placeholder={item.holder}
                                                            type={item.type}
                                                        />
                                                    )}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                            <div className='kk_ask_btm_btn_sction'>
                                <Link to ="/" className='kk_ask_btm_btn_cancel'>
                                    <span>취소</span>
                                </Link>
                                {/* 이부분은 데이터 취합해서 submit 하는 부분 만들어야함 */}
                                <Link to ="/" className='kk_ask_btm_btn_reg'>
                                    <span>등록하기</span> 
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QQNA;