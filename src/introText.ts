export function createIntroText() {
  const txtContainer = document.createElement("div");
  txtContainer.classList.add("intro-txt-container");
  const hdr = document.createElement("h1");
  hdr.textContent = "Welcome to the WebGL Labs";
  txtContainer.appendChild(hdr);

  txtContainer.addEventListener("click", () => {
    txtContainer.parentNode?.removeChild(txtContainer);
  });

  return txtContainer;
}
