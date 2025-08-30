"use client";

import type { ForwardedRef } from "react";
import {
  MDXEditor,
  type MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  sandpackPlugin,
  linkPlugin,
  imagePlugin,
  diffSourcePlugin,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  InsertCodeBlock,
  InsertSandpack,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  BlockTypeSelect,
  ListsToggle,
  CreateLink,
  InsertImage,
  Separator,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { basicDark } from "cm6-theme-basic-dark";
import "./dark-editor.css";
import { useTheme } from "next-themes";
import type { SandpackConfig } from "@mdxeditor/editor";

interface Props {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const Editor = ({ value, editorRef, fieldChange, ...props }: Props) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const cmExtensions = isDark ? [basicDark] : [];

  // Sandpack: motyw + nadpisany /index.css (wpływa na wnętrze iframa)
  const simpleSandpackConfig: SandpackConfig = {
    defaultPreset: "react",
    presets: [
      {
        label: "React",
        name: "react",
        meta: "live react",
        sandpackTemplate: "react",
        sandpackTheme: isDark ? "dark" : "light",
        snippetFileName: "/App.js",
        snippetLanguage: "jsx",
        initialSnippetContent: defaultSnippetContent,
        // Nadpisujemy plik stylów template'u, aby tło w iframie było ciemne/jasne
        files: {
          "/index.css": `
            :root { color-scheme: ${isDark ? "dark" : "light"}; }
            html, body, #root {
              height: 100%;
            }
            body {
              margin: 0;
              background: ${isDark ? "#0f1117" : "#ffffff"};
              color: ${isDark ? "#e5e7eb" : "#111827"};
              font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            }
            a { color: ${isDark ? "#93c5fd" : "#2563eb"}; }
            code, pre { background: ${isDark ? "#151821" : "#f4f6f8"}; }
          `.trim(),
        },
      },
    ],
  };

  return (
    <MDXEditor
      key={resolvedTheme}
      markdown={value}
      className="background-light800_dark200 light-border-2 markdown-editor dark-editor grid w-full border rounded-md"
      onChange={fieldChange}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "codeblock",
                  contents: () => (
                    <>
                      <ChangeCodeMirrorLanguage />
                      <Separator />
                      <UndoRedo />
                    </>
                  ),
                },
                {
                  when: (editor) => editor?.editorType === "sandpack",
                  contents: () => (
                    <span className="text-xs opacity-70 px-2">Sandpack</span>
                  ),
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />
                      <BoldItalicUnderlineToggles />
                      <CodeToggle />
                      <Separator />
                      <span className="mdx-blocktype-select">
                        <BlockTypeSelect />
                      </span>

                      <ListsToggle />
                      <Separator />
                      <CreateLink />
                      <InsertImage />
                      <Separator />
                      <InsertCodeBlock />
                      <InsertSandpack />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
        codeBlockPlugin({
          defaultCodeBlockLanguage: "ts",
          // @ts-ignore
          codeMirrorExtensions: cmExtensions,
        }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            ts: "TypeScript",
            js: "JavaScript",
            tsx: "TSX",
            jsx: "JSX",
            css: "CSS",
            html: "HTML",
            json: "JSON",
            bash: "Bash",
            sh: "Shell",
            md: "Markdown",
            yaml: "YAML",
            yml: "YAML",
            sql: "SQL",
            python: "Python",
            go: "Go",
            rust: "Rust",
          },
        }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        linkPlugin(),
        imagePlugin(),
        diffSourcePlugin({ viewMode: "rich-text" }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
      {...props}
      ref={editorRef}
    />
  );
};

export default Editor;
