import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

export const SelectProfile = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  // login_screen으로 이동하는 함수
  const handleGoBack = () => {
    navigate("/login_screen");
  };

  // create_profile
  const handleCreateProfile = () => {
    navigate("/create_profile");
  };

  // 자녀 프로필 가져오기
  useEffect(() => {
    const fetchProfiles = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token is not available.");
        return;
      }

      console.log("Access Token:", accessToken); // 토큰 출력 로그 추가

      try {
        const response = await axios.get('http://localhost:8080/api/v1/kids', {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
        
        // 응답이 성공적인지 확인하고, 데이터가 배열인지 체크
        const { kidsProfiles } = response.data; // kidsProfiles 추출
        if (Array.isArray(kidsProfiles)) {
          setProfiles(kidsProfiles); // kidsProfiles 배열을 상태에 설정
        } else {
          throw new Error("Response data is not an array.");
        }
      } catch (error) {
        console.error("서버 오류입니다.", error);
      }
    };

    fetchProfiles();
  }, []);

  // 프로필 선택 핸들러
  const handleSelectProfile = (id) => {
    localStorage.setItem("kidId", id); // kid id를 localStorage에 저장
    navigate("/main_page"); // 메인 페이지로 이동
  };

  return (
    <div className="select-profile">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <img className="polygon" alt="Polygon" src="/img/polygon-1.svg" />
            <div className="ellipse" />
            <div className="div" />

            <div className="profile-autolayer">
              {profiles.map((profile) => (
                <div
                  className="profile-button"
                  key={profile.id}
                  onClick={() => handleSelectProfile(profile.id)} // 프로필 클릭 시 선택 핸들러 호출
                >
                  <img
                    className="boy-blue"
                    alt={profile.name}
                    src={profile.profileImageUrl}
                  />
                  <div className="text-wrapper">{profile.name}</div>
                </div>
              ))}

              {/* 프로필이 3명 이하일 때만 "프로필 생성" 버튼 표시 */}
              {profiles.length <= 3 && (
                <div className="create-profile">
                  <img
                    className="img"
                    alt="Create profile"
                    src="/img/createprofilebutton.png"
                    onClick={handleCreateProfile}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="empty-space">빈칸</div>
                </div>
              )}
            </div>

            <img
              className="logo-white"
              alt="Logo white"
              src="/img/logowhite.svg"
            />
          </div>
          <img
            className="go-back"
            alt="Go back"
            src="/img/goback-1.svg"
            onClick={handleGoBack}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};