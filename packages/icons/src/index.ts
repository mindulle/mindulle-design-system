import * as React from "react";
export * from "lucide-react";

// Mds* is canonical across Figma, code, and docs.
export * from "./components/MdsAddIcon";
export * from "./components/MdsArrowRightIcon";
export * from "./components/MdsCheckIcon";
export * from "./components/MdsCloseIcon";
export * from "./components/MdsDocumentIcon";
export * from "./components/MdsHomeIcon";
export * from "./components/MdsMenuIcon";
export * from "./components/MdsSearchIcon";
export * from "./components/MdsUserIcon";

// Sng* remains a source-compatible alias for pre-MDS consumers.
export { MdsAddIcon as SngAddIcon } from "./components/MdsAddIcon";
export { MdsArrowRightIcon as SngArrowRightIcon } from "./components/MdsArrowRightIcon";
export { MdsCheckIcon as SngCheckIcon } from "./components/MdsCheckIcon";
export { MdsCloseIcon as SngCloseIcon } from "./components/MdsCloseIcon";
export { MdsDocumentIcon as SngDocumentIcon } from "./components/MdsDocumentIcon";
export { MdsHomeIcon as SngHomeIcon } from "./components/MdsHomeIcon";
export { MdsMenuIcon as SngMenuIcon } from "./components/MdsMenuIcon";
export { MdsSearchIcon as SngSearchIcon } from "./components/MdsSearchIcon";
export { MdsUserIcon as SngUserIcon } from "./components/MdsUserIcon";
