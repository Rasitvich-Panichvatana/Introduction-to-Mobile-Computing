function getDate() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000); // timeout 3 วินาที

  fetch("https://learningportal.ocsc.go.th/learningspaceapi/localdatetime", {
    signal: controller.signal,
  })
    .then((response) => {
      clearTimeout(timeout);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Server error");
      }
    })
    .then((data) => {
      document.getElementById("date").innerHTML = data.datetime;
    })
    .catch((e) => {
      if (e.name === "AbortError") {
        document.getElementById("date").innerHTML = "ระบบเครือข่ายล้มเหลว";
      } else {
        document.getElementById("date").innerHTML = e.toString();
      }
    });
}
// เรียกทุก 1 วินาที
setInterval(getDate, 1000);
