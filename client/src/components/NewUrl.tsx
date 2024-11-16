import { ChangeEvent, FormEvent, useState } from "react";

const NewUrl = () => {
  const [formData, setFormData] = useState<{ url: string }>({
    url: "",
  });
  const [data, setData] = useState<{ url: string }>({
    url: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    fetch("http://localhost:8000/url/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData((prev) => ({ ...prev, url: data.message }));
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">Url</label>
        <input id="url" type="text" name="url" onChange={handleChange} />
        <button type="submit">generate url</button>
      </form>
      <p>{data?.url}</p>
    </>
  );
};

export default NewUrl;
