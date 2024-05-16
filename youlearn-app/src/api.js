
export async function invokePost(method, data, successMsg, failureMsg) {
    console.log("JINVOQUE");
    const requestOptions = {
         method: "POST",
         headers: { "Content-Type": "application/json; charset=utf-8" },
         body: JSON.stringify(data)
     };
     const res = await fetch("/api/YouLearn/rest/"+method,requestOptions);
     if (res.ok) console.log(successMsg);
     else console.log(failureMsg);
 }
 
 export async function invokeGet(method, failureMsg) {
 
   const res = await fetch("/api/YouLearn/rest/"+method);
   if (res.ok) return await res.json();    
   console.log(failureMsg);
   return null;
 }   