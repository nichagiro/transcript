import api from "../global/api";

export default async function create(text: string, user: string): Promise<void> {
  try {
    const res = await fetch(`${api}/insertarnota`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        loginName: user,
        graNota: text
      })
    })

    if (res.ok) {
      window.close();
    } else {
      alert("Algo salio mal :(")
    }

  } catch (error) {
    alert("Algo salio mal :(")
  }
}

