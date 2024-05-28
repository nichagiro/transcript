const userFake = {
  servicio: 1,
  usuario: 1,
  loginName: "RR2506",
  perfil: 1
}

const servicio: HTMLInputElement | null = document.getElementById("IdServicio") as HTMLInputElement;
const usuario: HTMLInputElement | null = document.getElementById("IdUsuario") as HTMLInputElement;
const loginName: HTMLInputElement | null = document.getElementById("Login") as HTMLInputElement;
const perfil: HTMLInputElement | null = document.getElementById("IdPerfil") as HTMLInputElement;

const user = {
  servicio: servicio?.value,
  usuario: usuario?.value,
  loginName: loginName?.value,
  perfil: perfil?.value,
};

export default import.meta.env.MODE === "production" ? user : userFake;
