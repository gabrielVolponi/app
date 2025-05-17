function gerarSenhaAleatoria() {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  const tamanhoSenha = 12;
  let senha = "";

  for (let i = 0; i < tamanhoSenha; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    senha += caracteres.charAt(indiceAleatorio);
  }

  console.log(senha);

  return senha;
}

function exibirSenha() {
  const resposta = document.getElementById("senhaGerada");
  const senha = gerarSenhaAleatoria();
  resposta.textContent = senha;
}

const copiarSenha = document.getElementById("copiarSenha");

copiarSenha.addEventListener("click", function () {
    const senhaCopiada = document.getElementById("senhaGerada").textContent;
    navigator.clipboard.writeText(senhaCopiada).then(() => {
        // alert("Senha copiada para a área de transferência!");
        const modal = document.getElementById("modalCopied");
        modal.classList.remove("hidden");
        setTimeout(() => {
            modal.classList.add("hidden");
        }, 1500);
    })
});
