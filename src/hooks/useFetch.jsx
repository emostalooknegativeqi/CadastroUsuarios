// import React, { useEffect, useState } from "react";
// // Hook para fetch
// export const useFetch = (url) => {
//   const [data, setData] = useState(null);

//   // Configurando o POST
//   const [config, setConfig] = useState(null);
//   const [method, setMethod] = useState(null);
//   const [callFetch, setCallFetch] = useState(null);

//   // Tratando Loading ( duplo clique )
//   const [loading, setLoading] = useState(false);

//   // Tratando Erros try / catch
//   const [error, setError] = useState(null);

//   const [itemId, setItemId] = useState(null);

//   const httpConfig = (data, method) => {
//     if (method === "POST") {
//       setConfig({
//         method,
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       setMethod(method);
//     }

//     if (method === "PUT") {
//       setConfig({
//         method,
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       console.log(config)
//       setMethod(method);
//       setItemId(data.id)
//     }


//     if (method === "DELETE") {
//       setConfig({
//           method,
//           headers: {
//               "Content-type": "application/json"
//           },
//       });

//       setMethod(method);
//       setItemId(data);
//   };




//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(url);
//         const json = await res.json();
//         setData(json);
//       } catch (error) {
//         console.log(error.message);
//         setError("Houve algum erro ao carregar os dados ...");
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, [url, callFetch]);

//   useEffect(() => {
//     const httpRequest = async () => {
//       if (method === "POST") {
//         let fetchOptions = [url, config];
//         const res = await fetch(...fetchOptions);
//         const json = await res.json();
//         setCallFetch(json);
//       }

//       if (method === 'PUT') {
//         console.log(method )
//         let fetchOptions = [`${url}/${itemId}`, config];
//         console.log(fetchOptions)
//         const res = await fetch(...fetchOptions);
//         const json = await res.json();
//         setCallFetch(json);
//     };
//       if (method === 'DELETE') {
//         let fetchOptions = [`${url}/${itemId}`, config];
//         const res = await fetch(...fetchOptions);
//         const json = await res.json();
//         setCallFetch(json);
//     };
//     };
//     httpRequest();
//   }, [config, method, url]);

//   return { data, httpConfig, loading , error};
// };

import React, { useEffect, useState, useCallback } from "react";

// Hook para fetch
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemId, setItemId] = useState(null);

  // Função para configurar a requisição HTTP
  const httpConfig = useCallback((data, method) => {
    const headers = {
      "Content-Type": "application/json",
    };

    let configObject = {
      method,
      headers,
    };

    if (method === "POST" || method === "PUT" || method === "PATCH") {
      configObject.body = JSON.stringify(data);
    }

    if (method === "PUT" || method === "PATCH" || method === "DELETE") {
      setItemId(data.id || data);
    }

    setConfig(configObject);
    setMethod(method);
  }, []);

  // Efeito para a requisição inicial (GET)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Erro na requisição");
        }
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError(`Houve algum erro ao carregar os dados: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, callFetch]);

  // Efeito para requisições POST, PUT, PATCH, DELETE
  useEffect(() => {
    const httpRequest = async () => {
      if (!method) return;

      setLoading(true);
      try {
        const endpoint = (method === "PUT" || method === "PATCH" || method === "DELETE") ? `${url}/${itemId}` : url;
        const res = await fetch(endpoint, config);
        if (!res.ok) {
          throw new Error("Erro na requisição");
        }
        const json = await res.json();
        setCallFetch((prev) => !prev);
      } catch (error) {
        setError(`Houve algum erro na requisição: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    httpRequest();
  }, [config, method, url, itemId]);

  return { data, httpConfig, loading, error };
};
