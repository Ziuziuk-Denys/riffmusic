import { editor, images } from "../lib/content";
import { SplitSection } from "./SplitSection";

export function Editor() {
  return <SplitSection id="editor" title={editor.title} lead={editor.lead} image={images.editor} mediaSide="left" />;
}
