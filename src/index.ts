import fetch from "node-fetch";

fetch(`https://${process.env.SERVER}:${process.env.PORT}/v1/user/login`, {
  method: "POST",
  body: JSON.stringify({
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
