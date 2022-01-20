import "../styles/global.css";
import "../styles/reset.css";
import "../styles/awsm.css";
import UIContainer from "../components/display-components/UIContainer";

export default function App({ Component, pageProps }) {
  return (
    <UIContainer>
      <Component {...pageProps} />
    </UIContainer>
  );
}
