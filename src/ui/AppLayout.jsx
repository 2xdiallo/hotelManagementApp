import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

import supabase from "../services/supabase";

import styled from "styled-components";
import { useEffect } from "react";
const Main = styled.main`
  background-color: pink;
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  gap: 1px;
  border: 1px solid var(--color-grey-100);
  border-radius: 0.8rem;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  gap: 3.2rem;
  display: flex;
  flex-direction: column;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
