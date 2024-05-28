import api from "../global/api";
import user from "../global/user";

export default async function create(text: string): Promise<void> {
  try {
    const res = await fetch(`${api}/insertarnota`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        loginName: user.loginName,
        graNota: text
      })
    })

    if (res.ok) {
      window.close();
    } else {
      alert("Algo salio mal :(")
      console.log('Error API: ' + res);
    }

  } catch (error) {
    alert("Algo salio mal :(")
    console.log('Error en la petición: ' + error);
  }
}

