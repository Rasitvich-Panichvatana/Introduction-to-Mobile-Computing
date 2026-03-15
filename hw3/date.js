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
      const date = new Date(data.datetime);

      const day = date.getDate();
      const month = date.toLocaleString("th-TH", { month: "long" });
      const year = date.getFullYear() + 543;
      const time = date.toLocaleTimeString("th-TH");

      const thaiDatetime = `วันที่ ${day} ${month} ${year} เวลา ${time} น.`;

      document.getElementById("date").innerHTML = thaiDatetime;
    })
    .catch((e) => {
      document.getElementById("date").innerHTML = "ระบบเครือข่ายล้มเหลว";
    });
}
// เรียกทุก 1 วินาที
setInterval(getDate, 1000);
