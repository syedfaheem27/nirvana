import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  const totalSales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  //occupancy rate => number of nights cabins were occupied/total nights in all cabins during a stay
  const occupation =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (cabinCount * numDays);
  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={bookings.length}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={confirmedStays.length}
      />
      <Stat
        title="occupancy rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupation * 100)}
      />
    </>
  );
};

export default Stats;
