const fileInput = document.querySelector("input");
const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  downloadBtn.innerText = "Baixando...";
  fethFile(fileInput.value);
});

function fethFile(url) {
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      let tempUrl = URL.createObjectURL(file);
      let aTag = document.createElement("a");
      aTag.href = tempUrl;
      aTag.download = url.replace(/^.*[\\\/]/, "");
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      URL.revokeObjectURL(tempUrl);
      downloadBtn.innerText = "Concluido";
    })
    .catch(() => {
      downloadBtn.innerText = "Falha";
      downloadBtn.style.background = "#e62429";
      alert("Falha no download do arquivo.");
    });
}
