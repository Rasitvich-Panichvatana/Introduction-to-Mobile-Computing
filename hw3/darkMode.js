let dark = false;
function darkMode() {
  dark = !dark;
  if (dark) {
    document.getElementById("box").style.color = "white";
    document.getElementById("box").style.backgroundColor = "black";
  } else {
    document.getElementById("box").style.color = "black";
    document.getElementById("box").style.backgroundColor = "white";
  }
}
