import { ScaleLoader } from "react-spinners";

export default function Spinner({ fullWidth }) {
  if (fullWidth) {
    return (
      <div className="w-full flex justify-center">
        <ScaleLoader color={"#ff8e3c"} speedMultiplier={2} />
      </div>
    );
  }
  return <ScaleLoader color={"#ff8e3c"} speedMultiplier={2} />;
}
