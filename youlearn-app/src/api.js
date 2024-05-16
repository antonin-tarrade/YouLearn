
async function invokePost(method, data, successMsg, failureMsg) {
    const requestOptions = {
         method: "POST",
         headers: { "Content-Type": "application/json; charset=utf-8" },
         body: JSON.stringify(data)
     };
     const res = await fetch("/YouLearn/rest/"+method,requestOptions);
     if (res.ok) console.log(successMsg);
     else console.log(failureMsg);
 }
 
 async function invokeGet(method, failureMsg) {
 
   const res = await fetch("/YouLearn/rest/"+method);
   if (res.ok) return await res.json();    
   console.log(failureMsg);
   return null;
 }   