
export async function invokePost(method, data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(data)
  };
  const url = `/api/YouLearn/rest/${method}`;
  const res = await fetch(url, requestOptions);

  if (res.ok) 
    console.log("POST success : " + url);
  else 
    console.log("POST failure : " + url);
}

export async function invokePostAndAwaitResponse(method, data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(data)
  };
  const url = `/api/YouLearn/rest/${method}`;
  const res = await fetch(url, requestOptions);

  if (res.ok) {
    console.log("POST(with response) success : " + url);
    return await res;
  } else {
    console.log("POST(with response) failure : " + url);
    return null;
  } 
}

export async function invokeGet(method, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `/api/YouLearn/rest/${method}` + (queryString ? `?${queryString}` : '');
  const res = await fetch(url);

  if (res.ok) {
    console.log("GET success : " + url);
    return await res;
  } else {
    console.log("GET failure : " + url);
    return null;
  } 
}