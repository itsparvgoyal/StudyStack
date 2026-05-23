import { useEffect, useState } from "react";

const TypingText = () => {

  const text = "UGAC!";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {

    const typingSpeed = isDeleting ? 80 : 150;

    const timer = setTimeout(() => {

      if (!isDeleting) {

        setDisplayText(text.substring(0, index + 1));
        setIndex(index + 1);

        if (index === text.length) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1000);
        }

      } else {

        setDisplayText(text.substring(0, index - 1));
        setIndex(index - 1);

        if (index === 0) {
          setIsDeleting(false);
        }
      }

    }, typingSpeed);

    return () => clearTimeout(timer);

  }, [index, isDeleting]);

  return (
    <div className="flex items-center text-[clamp(30px,8vw,140px)] font-bold mt-[2rem]  md:mt-[4rem]  lg:mt-[6rem]">

      <span className="text-zinc-500 mr-2">
        Built by {"  "}
      </span>

      <div className="w-[90px] flex">
        <span className="text-cyan-400">
          {displayText}
        </span>

        <span className="text-cyan-400 animate-pulse">
          |
        </span>
      </div>

    </div>
  );
};

export default TypingText;