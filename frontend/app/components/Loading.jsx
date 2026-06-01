import { FourSquare, OrbitProgress } from "react-loading-indicators";

export const LoadingPage = ({ text }) => {
  return (
    <FourSquare
      size="large"
      text="Loading.."
      color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]}
    >
      <h1>{text ? text : "Loading..."}</h1>
    </FourSquare>
  );
};

export const LoadingComponent = () => {
  return <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />;
};
