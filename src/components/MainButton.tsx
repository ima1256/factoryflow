import { Button } from "@mui/material";
// import { useState, useEffect, useRef } from "react";

export default function MainButton({
  onClick,
  disabled = false,
  children,
  shake = false,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  shake?: boolean;
}) {
  // const [shake, setShake] = useState(false);

  // const isFirstRender = useRef(true);

  // const triggerShake = () => {
  //   setShake(true);
  //   setTimeout(() => {
  //     setShake(false);
  //   }, 500);
  // };

  // useEffect(() => {
  //   triggerShake();
  // }, [numberShake]);

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="contained"
      disableElevation
      className={shake ? "shake" : ""}
      sx={{
        display: "block", // Necesario para que margin funcione correctamente
        margin: "0 auto",
        fontSize: "1rem",
        fontWeight: 400,
        width: "100%", // w-full
        padding: "6px 16px", // p-2 (equivale a py-2 px-4)
        textTransform: "none", // quitar uppercase por defecto
        borderRadius: "0.5rem", // rounded-lg
        backgroundColor: disabled ? "#94a3b8" : "#2563eb", // slate-400 o blue-600
        color: disabled ? "#e2e8f0" : "#ffffff", // slate-300 o white
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 0.2s ease-in-out", // transition-colors
        "&:hover": {
          backgroundColor: disabled ? "#94a3b8" : "#1d4ed8", // hover:bg-blue-700
        },
      }}
    >
      {children}
    </Button>
  );
}

// #1a01ab

{
  /* <button className="cursor-pointer w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
  Guardar
</button>; */
}
