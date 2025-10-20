import Header from "../../Components/Header/Header";
import "./PageNotFound.css";

const PageNotFound = () => {
  console.log("Page wasn't found");
  return (
    <>
      <title>404 Page not found</title>
      <link
        rel="icon"
        type="image/svg-xml"
        href="home-favicon.png"
      />
      <Header />
      <div className="not-found-text">
        <p>Whoops! Looks like this page doesn't exist.</p>
      </div>
    </>
  );
};

export default PageNotFound;
