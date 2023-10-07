import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  /*I will be using this to add a user corresponding to the querykey:['user']
    in order to make the login faster - When we login, we get the user and then
    afterwards, we get the currentUser in the protected route to see if we have
    a current active user. Now, in getCurrentUser, if there is an active session, 
    we fetch the user again which can make the login a bit slow. So, to avoid that
    we add the user data corresponding to the queryKey:['user'] so that in the protected
    user, the data is being fetched from the cache on login only.
    */

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { isLoading: isAuthenticating, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Authentication failed - Email or Password is incorrect");
    },
  });

  return { login, isAuthenticating };
}
