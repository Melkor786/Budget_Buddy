import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { MainLayout } from "../styles/Layouts";
import Orb from "./Orb";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";
import Income from "./Income";
import Expenses from "./Expenses/Expenses";

function Home() {
  const [active, setActive] = useState(1);

  
  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Income />;
      case 3:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };
  

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <HomeStyled>
      <MainLayout>
        {orbMemo}
        <Navigation active={active} setActive={setActive}/>
        <main>{displayData()}</main>
      </MainLayout>
    </HomeStyled>
  );
}

const HomeStyled = styled.div`
  height: 100vh;
  transform: scale(0.9);
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default Home;
