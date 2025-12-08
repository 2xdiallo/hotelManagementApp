import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import useCabins from "../features/cabins/useCabins";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({filterField,options}) {
  const [searchParam,setSearchParam]= useSearchParams()
  // searchParam.set("discount",)
  const currentFilter = searchParam.get(filterField) || options[0].value;
  function handleClick(value){
    searchParam.set(filterField,value)
    setSearchParam(searchParam)

  }
  return (
    <StyledFilter>
      {options.map((option)=>{
        return <FilterButton disabled={option.value === currentFilter} active={option.value === currentFilter} key={option.value} onClick={()=>handleClick(option.value)}>{option.label}</FilterButton>

      })
      }
      
      
    </StyledFilter>
      // <FilterButton onClick={()=>handleClick("no-discount")}>No Discount</FilterButton>
      // <FilterButton onClick={()=>handleClick("with-discount")}>With Discount</FilterButton>
  )
}

export default Filter

