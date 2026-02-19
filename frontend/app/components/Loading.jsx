import { FourSquare } from "react-loading-indicators";

export const LoadingPage = () => {
  return (
    <FourSquare
      size="large"
      text="Loading.."
      color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]}
    />
  );
};

export const LoadingComponent = () => {
  return <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />;
};
