import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isLoading: isLoadingRecBook, recentBookings } = useRecentBookings();
  const {
    isLoading: isLoadingRecStays,
    recentStays,
    confirmedStays,
  } = useRecentStays();

  if (isLoadingRecBook || isLoadingRecStays) return <Spinner />;
  console.log(recentStays);
  console.log(confirmedStays);

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today&apos;s activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
