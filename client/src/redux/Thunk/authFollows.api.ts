const authFollows = async () => {
  try {
    const response = await fetch("http://localhost:3000/profiles/follows", {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

const newFollow = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/profiles/follows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ followId: id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

const unsub = async (id) => {
  try {
    const response = await fetch("http://localhost:3000/profiles/follows", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ followId: id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
};

export { authFollows, newFollow, unsub };
