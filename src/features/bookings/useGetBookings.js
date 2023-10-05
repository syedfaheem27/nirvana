import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useGetBookings() {
  const [searchParams] = useSearchParams();

  const filter =
    searchParams.get("status") === "all" || !searchParams.get("status")
      ? null
      : {
          field: "status",
          value: searchParams.get("status"),
        };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings(filter),
  });

  return { isLoading, bookings, error };
}
