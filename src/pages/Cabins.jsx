import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

import AddCabins from "../features/cabins/AddCabins";

/*Placing all the stateful logic in a separate component
as the cabins page should be as lean as possible and without 
any stateful logic */

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
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
