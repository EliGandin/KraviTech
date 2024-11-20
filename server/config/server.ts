import app from "@/app";

app.listen(process.env.BACKEND_PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.BACKEND_PORT || 8000}`);
});