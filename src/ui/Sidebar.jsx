import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import useCabins from "../features/cabins/useCabins";
const StyledSideBar = styled.aside`
    background-color:var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-bottom: 1px solid var(--color-grey-100);
    grid-row: span 2;
`

function Sidebar() {
    const {isLoading, cabins, } = useCabins();
    return (
        <StyledSideBar>
            <Logo/>
            <MainNav/>
        </StyledSideBar>
    )
}

export default Sidebar
