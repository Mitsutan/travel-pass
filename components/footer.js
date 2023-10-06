import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHouse } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="p-2 border-top border-2">
            <div className="container-fluid h-100">
            <ul id="footer-ul">
                <li><Link href={"/"}><FontAwesomeIcon icon={faHouse} className="fs-1 text-dark" /></Link></li>
                <li><Link href={"/test"} className="text-decoration-none">test</Link></li>
                <li>hoge</li>
                <li><Link href={"/setting"}><FontAwesomeIcon icon={faGear} className="fs-1 text-dark" /></Link></li>
            </ul>
            </div>
        </footer>
    );
}
