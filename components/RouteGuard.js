import { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { Context as AuthContext } from "../context/AuthContext";

const RouteGuard = ({ children }) => {
    const { state, tryTokenLogin } = useContext(AuthContext);
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [firstRender, setFirstRender] = useState(false);

    useEffect(async () => {
        await tryTokenLogin();
        setFirstRender(true);
    }, []);

    useEffect(() => {
        if (firstRender) {
            // on initial load - run auth check
            authCheck(router.asPath);

            // on route change start - hide page content by setting authorized to false
            const hideContent = () => setAuthorized(false);
            router.events.on("routeChangeStart", hideContent);

            // on route change complete - run auth check
            router.events.on("routeChangeComplete", authCheck);

            // unsubscribe from events in useEffect return function
            return () => {
                router.events.off("routeChangeStart", hideContent);
                router.events.off("routeChangeComplete", authCheck);
            };
        }
    }, [state.auth, firstRender]);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        const publicPaths = ["/login", "/register"];
        const path = url.split("?")[0];
        if (!state.auth && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }

    return <>{authorized && children}</>;
};

export default RouteGuard;
