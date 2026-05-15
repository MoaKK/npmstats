import { ImageResponse } from "next/og";

const runtime = "edge";
const alt = "npmstats";
const size = { width: 1200, height: 630 };
const contentType = "image/png";

function Image() {
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
          gap: 16,
        }}
      >
        <div style={{ color: "white", fontSize: 72, fontWeight: 700 }}>
          npmstats
        </div>
        <div style={{ color: "#71717a", fontSize: 28 }}>
          Download stats for any npm package
        </div>
      </div>
    ),
    size
  );
}

export { runtime, alt, size, contentType };
export default Image;
