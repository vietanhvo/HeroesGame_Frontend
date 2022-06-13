import Layout from "../components/Layout";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/assets/css/fontawesome-all.min.css";
import "../public/assets/css/animate.css";
import "../styles/globals.css";
import "../public/assets/css/responsive.css";
import "../styles/pages.css";
import "../styles/starterPack.css";
import "../styles/marketplace.css";
import "../styles/fight-monster.css";
import "../styles/custom.css";
import "../styles/mybag.css";
import "../styles/header.css";
import "../styles/modal.css";
import "../styles/auth.css";

import { Provider as AuthProvider } from "../context/AuthContext";
import { Provider as HeroProvider } from "../context/HeroContext";
import { Provider as ItemProvider } from "../context/ItemContext";
import RouteGuard from "../components/RouteGuard";

const MyApp = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <ItemProvider>
                <HeroProvider>
                    <RouteGuard>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </RouteGuard>
                </HeroProvider>
            </ItemProvider>
        </AuthProvider>
    );
};

export default MyApp;
