import http from "./httpService";

// DATA

export function getJewels() {
  return http.get("/api/jewels/").then((res) => {
    return res.data;
  });
}

export function getJewel(id) {
  return http
    .put(`/api/jewels/jewel`, { id: id })
    .then((res) => {
      return res.data;
    });
}

export function getUserJewels(userId) {
  return http.post("/api/users/jewels", { userId });
}

export function getSimilarJewels(type) {
  return http
    .post("/api/jewels/similar", { type: type })
    .then((res) => {
      return res.data;
    });
}

export function getStones() {
  return http.get("/api/stones/").then((res) => {
    return res.data;
  });
}

export function getMetals() {
  return http.get("/api/metals/").then((res) => {
    return res.data;
  });
}

export function getPieces() {
  return http.get("/api/pieces/").then((res) => {
    return res.data;
  });
}

export function postJewels(newJewel, userToken) {
  console.log(userToken, "[ADD JEWEL TOKEN]")
  return http
    .post("/api/jewels/add", newJewel, {
      headers: {
        "x-auth-token": userToken,
        action: "/multiple-upload",
        enctype: "multipart/form-data",
        "Content-type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
}

export async function editJewel(updatedJewel, jewelId, userToken) {
  return await http
    .post(`/api/jewels/update/${jewelId}`, updatedJewel, {
      headers: {
        "x-auth-token": userToken,
        action: "/multiple-upload",
        enctype: "multipart/form-data",
        "Content-type": "application/json",
      },
    })
    .then(async (res) => {
      return await res.data;
    });
}

export function deleteJewel(jewelId, userToken) {
  return http
    .delete(`/api/jewels/delete/${jewelId}`, {
      headers: {
        "x-auth-token": userToken,
      },
    })
    .then((res) => {
      return res.data;
    });
}

// USER

export function registerUser(user) {
  return http.post("/api/users/", user).then((res) => {
    return res;
  });
}

export function loginUser(email, password) {
  return http.post("/api/auth/", { email, password });
}

export function forgotPassword(email) {
  return http
    .post("/api/password-reset", { email })
    .then((res) => {
      return res.data;
    });
}

export function changePassword(userId, userToken, password) {
  return http
    .post(`/api/password-reset/${userId}/${userToken}`, {
      password,
    })
    .then((res) => {
      return res;
    });
}
