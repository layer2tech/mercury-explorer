import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import Logo2 from '../../images/LogoColor';
import CookieConsent from "react-cookie-consent"

import './index.css';

const Footer = () => (
    <footer className = "footer-container">
        <div className="links">
            {/* <div className="footer-list-item">
                <Link to={routes.about}>About</Link>
            </div> */}
            {/*<div className="footer-list-item">*/}
            {/*    <Link to={routes.pricing}>Pricing</Link>*/}
            {/*</div>*/}
            <div className="footer-list-item">
                <a href="https://github.com/layer2tech/mercury-explorer/blob/main/helpers/docs/explorer_api.md">
                    API Information
                </a>
            </div>
            <div className="footer-list-item">
                <a href = 'https://mercurywallet.com/privacy'>Privacy policy</a>
            </div>
            <div className="footer-list-item">
                <Link to={routes.terms}>Terms And Conditions</Link>
            </div>
        </div>
        <div className="image-copyright">
            <div className="m-auto">
                <Logo2 />
                <span>© 2022 Mercury Wallet Team. All rights reserved.</span>
            </div>
        </div>
        <CookieConsent
            disableStyles={true}
            location="none"
            containerClasses="z-10 fixed inset-x-0 bottom-0 mx-auto flex items-center justify-center px-4 py-2 w-full text-white bg-black bg-opacity-50 backdrop-filter backdrop-blur"
            contentClasses="mr-3 text-sm text-dark leading-relaxed"
            buttonClasses="px-4 py-2 text-sm font-medium text-black leading-none rounded-full bg-white"
            buttonText="Accept"
        >
            This website uses cookies to enhance the user experience.{" "}
            <a href="https://mercurywallet.com/privacy">
                <a className="font-bold underline" title="Privacy Policy">
                    Learn more
                </a>
            </a>
        </CookieConsent>
    </footer>
);
export default Footer;