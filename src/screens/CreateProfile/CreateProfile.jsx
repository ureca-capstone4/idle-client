import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import kidPic from '../../../static/img/indecisive-kid-1.png'; // 경로 수정
import "./style.css";

export const CreateProfile = () => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/select_profile");
  };

  const handleSave = async () => {
    const token = localStorage.getItem("accessToken");

    try{
      const response = await fetch("http://localhost:8080/api/v1/kids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          birthDate: birthdate,
          gender: gender
        })
      });

      const data = await response.json();

      if(response.ok){
        alert("자녀 추가 성공");
        navigate("/select_profile");
      } else {
        alert("자녀 프로필 생성 실패");
      }

    } catch (error){
      alert("내부 문제로 자녀 프로필 생성 불가");
    }
  }


  return (
    <div className="create-profile">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group-4">
            <img className="polygon" alt="Polygon" src="/img/polygon-1-2.svg" />

            <div className="ellipse" />
            <div className="ellipse-2" />

            <div className="frame-27">
              <div className="frame-28">
                <img
                  className="logo-white-3"
                  alt="Logo white"
                  src="/img/image.svg"
                />

                <div className="frame-29">
                  <img
                    className="boy-blue"
                    alt="Boy blue"
                    src={kidPic}
                  />

                  <div className="frame-30">
                    <div className="div-wrapper-2">
                      <input
                        type="text"
                        placeholder="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-wrapper-13"
                      />
                    </div>

                    <div className="div-wrapper-2">
                      <input
                        type="text"
                        placeholder="생년월일"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        className="text-wrapper-13"
                      />
                    </div>

                    <div className="gender-field">
                      <input
                        type="text"
                        placeholder="성별"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="text-wrapper-13"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button className="save-button" onClick={handleSave}>
                <img
                  className="save-icon"
                  alt="Save icon"
                  src="/img/saveicon.svg"
                />
              </button>
            </div>
          </div>

          <img
            className="go-back"
            alt="Go back"
            src="/img/goback-1.svg"
            onClick={handleGoBack} // 클릭 이벤트 추가
            style={{ cursor: "pointer" }} // 클릭 가능 표시를 위해 커서 변경
          />
        </div>
      </div>
    </div>
  );
};