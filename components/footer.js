import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="p-2 border-top border-2">
            <ul id="footer-ul">
                <li><Link href={"/"}><FontAwesomeIcon icon={faHouse} className="fs-1 text-dark" /></Link></li>
                <li><Link href={"/test"} className="text-decoration-none">test</Link></li>
                <li>C</li>
                <li>D</li>
            </ul>
        </footer>
    );
}
