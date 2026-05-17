import { readFileSync } from "fs";
import path from "path";
import { ImageResponse } from "next/og";

export const alt = "npmstats";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Image() {
  const iconBuffer = readFileSync(
    path.join(process.cwd(), "public/icon.png")
  );
  const iconSrc = `data:image/png;base64,${iconBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <img src={iconSrc} width={400} height={250} alt="" />
        <div style={{ color: "white", fontSize: 72, fontWeight: 700 }}>
          npmstats
        </div>
        <div style={{ color: "white", fontSize: 48 }}>
          Visualize download stats for any npm package
        </div>
      </div>
    ),
    size
  );
}

export default Image;

