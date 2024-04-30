import { useEffect, useState } from "react";

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }

  function handleCreateRandomHEXColor() {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }

    console.log(hexColor);

    setColor(hexColor);
  }

  function handleCreateRandomRGBColor() {
    const red = randomColorUtility(256);
    const green = randomColorUtility(256);
    const blue = randomColorUtility(256);

    setColor(`rgb${red},${green},${blue}`);
  }

  useEffect(() => {
    if (typeOfColor === "rgb") handleCreateRandomRGBColor();
    else handleCreateRandomHEXColor();
  }, [typeOfColor]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: color }}>
      <button onClick={() => setTypeOfColor("hex")}>Create HEX Color</button>
      <button onClick={() => setTypeOfColor("rgb")}>Create RGB Color</button>
      <button
        onClick={
          typeOfColor === "hex"
            ? handleCreateRandomHEXColor
            : handleCreateRandomRGBColor
        }
      >
        Generate Rondom Color
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "60px",
          marginTop: "20px",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h3>{typeOfColor === "rgb" ? "RGB Color " : "HEX Color "}</h3>
        <h1>{color}</h1>
      </div>
    </div>
  );
}
