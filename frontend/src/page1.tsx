import { Link } from "react-router-dom";

export const Page1 = ()=> {
  return (
    <div>
      <h2>This page is 1!</h2>
      <Link to="/page1/page1Child">DetailA</Link>
    </div>
  );
}

// export { Page1 };
