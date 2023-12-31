import React, { useState } from "react";
import MapContainer from "./map";

function StoreSearch() {
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText("");
  };

  return (
    <div className="CHM_serachBG">
      <div className="CHM_serachFlex" style={{backgroundColor:"green"}}>
        <form className="CHM_inputForm" onSubmit={handleSubmit}  style={{backgroundColor:"white", justifyContent:"space-between"}}>
          <input
            placeholder="지역을 입력해주세요"
            onChange={onChange}
            value={InputText}
          />
          <i
            onClick={handleSubmit}
            type="submit"
            class="fa-solid fa-magnifying-glass"
          ></i>
        </form>
      </div>

      <MapContainer searchPlace={Place} />
    </div>
  );
}

export default StoreSearch;
