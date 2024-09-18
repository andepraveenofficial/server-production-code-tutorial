const fetchData = async (i) => {
  try {
    const response = await fetch("http://localhost:5000");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

for (let i = 0; i <= 25; i++) {
  fetchData();
}
