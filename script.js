const burger = document.getElementById("burger");
const menuPanel = document.getElementById("menu-panel-id");
const closeBtn = document.getElementById("btn-close");

burger.addEventListener("click", () => {
  menuPanel.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  menuPanel.classList.remove("active");
});
