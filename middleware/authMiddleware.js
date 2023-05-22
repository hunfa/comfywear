import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const authMiddleware = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log("Page changed to:", url);
      if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
        router.push("/");
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
  }, [router]);

  return <>{children}</>;
};

export default authMiddleware;
