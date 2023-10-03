import styled from "styled-components";

const StyledTableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

import Filter from "./Filter";

const TableOperations = () => {
  return (
    <StyledTableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
    </StyledTableOperations>
  );
};

export default TableOperations;
