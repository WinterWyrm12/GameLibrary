// Imports
import { Link } from "react-router-dom";



export default function NotFound() {
    return (
        <>
            <div className="page-404">
                <h1 className="404">404</h1>
                <h3>Page Not Found</h3>
                <p>Sorry, the page your looking for does not exist.</p>
                <Link to="/">
                    <button className="home-btn">Click Here to Return Home</button>
                </Link>
            </div>
        </>
    );
}