import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SERVER_URL } from "../constants/constants";

const RedirectUrl = () => {
  const [InvalidErrorstate, setInvalidErrorState] = useState<Boolean>(false);

  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    fetch(`${SERVER_URL}/url/redirect/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message !== "InvalidUrl") {
          window.location.href = data.message;
        } else {
          setInvalidErrorState(true);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return <p>{InvalidErrorstate ? "invalid url" : ""}</p>;
};

export default RedirectUrl;
