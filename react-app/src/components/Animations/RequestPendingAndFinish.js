import React from "react"
import Lottie from "lottie-react";
import checkAnimation from "./checkAnimation.json";

const RequestPendingAndFinish = ({
  pending = false,
  onAnimationComplete = () => {},
}) => {
  const loop = pending ? true : 1;
  const segment = pending ? [15, 99] : [100, 175];
  return (
    <Lottie
      initialSegment={segment}
      animationData={checkAnimation}
      loop={loop}
      onComplete={() => {
        if (!pending) {
          onAnimationComplete();
        }
      }}
    />
  );
};

export default RequestPendingAndFinish;
