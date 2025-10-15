import Header from "../../Components/Header/Header";

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
      <div>
        <p>Whoops! Looks like this page doesn't exist.</p>
      </div>
    </>
  );
};

export default PageNotFound;
