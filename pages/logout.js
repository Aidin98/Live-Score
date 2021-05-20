import { useEffect } from "react";
import { useRouter } from "next/router";
import withApollo from "../hoc/withApollo";
import { useSignOut } from "../apollo/actions";
import BaseLayout from "../layout/BaseLayout";
const Logout = ({ apollo }) => {
  const [signOut] = useSignOut();
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => {
      apollo.resetStore().then(() => router.push("/login"));
    });
  }, []);

  return (
    <BaseLayout>
      <div>
        <p>Signing Out</p>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Logout);
