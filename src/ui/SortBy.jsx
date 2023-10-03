import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortValue = searchParams.get("sortBy") || "";

  function changeSortParam(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={sortValue}
      onChange={changeSortParam}
      type="white"
    />
  );
};

export default SortBy;
