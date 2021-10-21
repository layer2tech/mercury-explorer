import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import Logo2 from '../../images/LogoColor';

import './index.css';

const Footer = () => (
    <footer className = "footer-container">
        <div className="links">
            <div className="footer-list-item">
                <Link to={routes.about}>About</Link>
            </div>
            {/*<div className="footer-list-item">*/}
            {/*    <Link to={routes.pricing}>Pricing</Link>*/}
            {/*</div>*/}
            <div className="footer-list-item">
                <a href="https://github.com/layer2tech/mercury-explorer/blob/main/helpers/docs/explorer_api.md">
                    API Information
                </a>
            </div>
            <div className="footer-list-item">
                <Link to={routes.privacy}>Privacy policy</Link>
            </div>
            <div className="footer-list-item">
                <Link to={routes.terms}>Terms And Conditions</Link>
            </div>
        </div>
        <div className="image-copyright">
            <div className="m-auto">
                <Logo2 />
                <span>© 2021 CommerceBlock Limited. All rights reserved.</span>
            </div>
        </div>
    </footer>
);
export default Footer;