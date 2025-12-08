import { useSearchParams } from "react-router-dom"
import Select from "./Select"

function SortBy({options}) {
    const [searchParam, setSearchParam] = useSearchParams();
    const sortBy = searchParam.get("sortBy") || "";

    function handleChange(e) {
        const next = new URLSearchParams(searchParam);
        next.set("sortBy", e.target.value);
        setSearchParam(next);
    }
    return (
        <Select value={sortBy} options={options} onChange={handleChange} type="white"/>    
    )
}

export default SortBy
