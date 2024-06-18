import { useEffect } from "react";
import { useState } from "react";
import "./scroll.css";

export default function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const respone = await fetch(getUrl);
      const data = await respone.json();
      if (data && data.products && data.products.length > 0) {
        setData(data.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  }

  function handleScrollPercentage() {
    // console.log(
    //   document.body.scrollTop,
    //   document.documentElement.scrollTop,
    //   document.documentElement.scrollHeight,
    //   document.documentElement.clientHeight
    // );

    const BODYSCROLLTOP = document.body.scrollTop;
    const SCROLLTOP = document.documentElement.scrollTop;
    const SCROLLHEIGHT = document.documentElement.scrollHeight;
    const CLIENTHEIGHT = document.documentElement.clientHeight;

    const howMuchScrolled = BODYSCROLLTOP || SCROLLTOP;

    const height = SCROLLHEIGHT - CLIENTHEIGHT;

    setScrollPercentage((howMuchScrolled / height) * 100);
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if (errorMessage) {
    return <div>Error! {errorMessage}</div>;
  }

  if (loading) {
    return <div>Loading data! Please wait</div>;
  }

  return (
    <div>
      <div className="top-container">
        <h1>Custom Scroll Indicator</h1>
        <div className="scroll-progress-tracking-container">
          <div
            className="current-progress-bar"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="data-container">
        {data && data.length > 0
          ? data.map((dataItem) => <p>{dataItem.title}</p>)
          : null}
      </div>
    </div>
  );
}
