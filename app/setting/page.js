import Header from "@/components/header";
import Footer from "@/components/footer";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Setting() {
    return (
        <main>
            <Header />
            <div className="container">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Web Services by Yahoo! JAPAN （https://developer.yahoo.co.jp/sitemap/）</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                </ul>
            </div>
            <Footer />
        </main>
    );
};
