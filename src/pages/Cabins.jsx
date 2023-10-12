import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import AddCabins from "../features/cabins/AddCabins";
import TableOperations from "../ui/TableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <TableOperations />
      </Row>

      <Row type="horizontal">
        <CabinTable />
      </Row>
      <Row>
        <AddCabins />
      </Row>
    </>
  );
}

export default Cabins;
