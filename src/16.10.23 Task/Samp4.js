// import React, { useState } from "react";
// import { Box, TextField, Typography, Button } from "@mui/material";
// import { Info } from "@mui/icons-material";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// const Samp4 = ({ checkbox, step, setStep, nextFun, backFun }) => {
//   const selector = useSelector((state) => state.Task);
//   console.log(selector);
//   const Web = selector.filter((values) => {
//     if (values.selected_metrics?.WEB) {
//       return values;
//     }
//   });
//   console.log(Web);
//   const [ipWeb, setIpWeb] = useState(Web);
//   //   const [ipData, setIpData] = useState();
//   console.log(ipWeb);
//   function handleInputChange(ip, field, value) {
//     setIpWeb((prevDat) => {
//       return prevDat.map((item) => {
//         console.log(item);
//         if (item?.ip === ip) {
//           const newExchange = item?.meta ? { ...item.meta } : {};
//           console.log(newExchange);
//           newExchange[field] = value;
//         }
//         return item;
//       });
//     });
//   }
//   return (
//     <Box>
//       {ipWeb.map((web) => (
//         <Box>
//           <Typography>{web?.ip}</Typography>
//           <Box sx={{ display: "flex", justifyContent: "center" }}>
//             <Typography sx={{ position: "relative", top: 30 }}>
//               Auth Error
//             </Typography>
//             <TextField
//               label="Database Name"
//               sx={{ m: 2 }}
//               name="dbname"
//               onChange={(e) =>
//                 handleInputChange(web?.ip, "dbname", e.target.value)
//               }
//             ></TextField>
//             <TextField
//               label="Database Query"
//               sx={{ m: 2 }}
//               name="query"
//               onChange={(e) =>
//                 handleInputChange(web?.ip, "query", e.target.value)
//               }
//             ></TextField>
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "center" }}>
//             <Typography sx={{ position: "relative", top: 30 }}>
//               Trade Error
//             </Typography>
//             <TextField label="Database Name" sx={{ m: 2 }}></TextField>
//             <TextField label="Database Query" sx={{ m: 2 }}></TextField>
//           </Box>
//         </Box>
//       ))}
//       <React.Fragment>
//         <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//           <Button
//             color="inherit"
//             disabled={step === 0}
//             onClick={backFun}
//             sx={{ mr: 1 }}
//           >
//             Back
//           </Button>
//           <Box sx={{ flex: "1 1 auto" }} />
//           <Button onClick={nextFun} sx={{ mr: 1 }}>
//             Next
//           </Button>
//         </Box>
//       </React.Fragment>
//     </Box>
//   );
// };

// export default Samp4;
import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { Info } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

const Samp4 = ({ checkbox, step, setStep, nextFun, backFun }) => {
  const selector = useSelector((state) => state.Task);
  console.log(selector);
  const Web = selector.filter((values) => values.selected_metrics?.WEB);
  console.log(Web);
  const [ipWeb, setIpWeb] = useState(Web);

  function handleInputChange(ip, auth,field, value) {
    setIpWeb((prevDat) => {
      return prevDat.map((item) => {
        if (item.ip === ip) {
          return {
            ...item,
            meta: {
              ...item?.meta,
              web_log:{
                ...item?.meta?.web_log,
                [auth]:{
                    ...item?.meta?.web_log?.[auth],
                       [field]: value,
                },
                
              }
           
            },
          };
        }
        return item;
      });
    });
  }
  console.log(ipWeb);
  return (
    <Box>
      {ipWeb.map((web) => (
        <Box key={web.ip}>
          <Typography>{web.ip}</Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ position: "relative", top: 30 }}>
              Auth Error
            </Typography>
            <TextField
              label="Database Name"
              sx={{ m: 2 }}
              name="dbname"
              value={web.meta?.dbname}
              onChange={(e) =>
                handleInputChange(web.ip, "auth_error","dbname", e.target.value)
              }
            ></TextField>
            <TextField
              label="Database Query"
              sx={{ m: 2 }}
              name="query"
              value={web.meta?.query}
              onChange={(e) =>
                handleInputChange(web.ip,"auth_error", "query", e.target.value)
              }
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ position: "relative", top: 30 }}>
              Trade Error
            </Typography>
            <TextField
              label="Database Name"
              sx={{ m: 2 }}
              onChange={(e) =>
                handleInputChange(web.ip, "trade_error","dbname", e.target.value)
              }
            ></TextField>
            <TextField
              label="Database Query"
              sx={{ m: 2 }}
              onChange={(e) =>
                handleInputChange(web.ip,  "trade_error","query", e.target.value)
              }
            ></TextField>
          </Box>
        </Box>
      ))}
      <React.Fragment>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={step === 0}
            onClick={backFun}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={nextFun} sx={{ mr: 1 }}>
            Next
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default Samp4;
