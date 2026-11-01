import { ImageResponse } from "next/og";
export const alt =
  "Sayantan Ghosh — Software Engineer. Thoughtful interfaces. Considered foundations.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#e7e9ec",
        padding: 35,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          border: "1px solid #b8c0cb",
          borderRadius: 18,
          background: "#f5f6f7",
          padding: "45px 50px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 16,
            color: "#536171",
          }}
        >
          <span>SIGNAL BENCH / AN INTRODUCTION</span>
          <span>↳_</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 55,
            gap: 45,
            alignItems: "center",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "48%" }}
          >
            <span style={{ fontSize: 15, color: "#ba4524", letterSpacing: 3 }}>
              SOFTWARE ENGINEER
            </span>
            <span
              style={{
                fontSize: 76,
                lineHeight: 1.08,
                letterSpacing: -4,
                color: "#18212f",
                marginTop: 22,
              }}
            >
              Sayantan
              <br />
              Ghosh.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#101c2a",
              borderRadius: 12,
              padding: 35,
              width: "52%",
              height: 270,
              color: "#f3f7fc",
            }}
          >
            <span style={{ fontSize: 13, color: "#77e0da", letterSpacing: 2 }}>
              THE DETAILS. THE BIGGER PICTURE.
            </span>
            <span style={{ fontSize: 31, lineHeight: 1.4, marginTop: 30 }}>
              Thoughtful interfaces.
              <br />
              Considered foundations.
            </span>
            <span style={{ color: "#a9bacd", fontSize: 13, marginTop: 25 }}>
              INTERFACE → LOGIC → DATA
            </span>
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
