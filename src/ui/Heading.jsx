import styled from "styled-components";

const H1 = styled.h1`
    
    
    ${props => props.as === "h1" &&
           `font-size: 3rem;
    font-weight: 600;`}
    
    ${props => props.as === "h2" &&
           `font-size: 2rem;
    font-weight: 600;`}

    ${props => props.as === "h3" &&
           `font-size: 2rem;
    font-weight: 500;`}
  `

export default H1;