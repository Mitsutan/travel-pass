import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="p-2">
            <ul id="footer-ul">
                <li><FontAwesomeIcon icon={faHouse} className="fs-1" /></li>
                <li><Link href="/test">test</Link></li>
                <li>C</li>
                <li>D</li>
            </ul>
        </footer>
    );
}
