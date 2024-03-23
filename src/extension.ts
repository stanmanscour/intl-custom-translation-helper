import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

type Lang = "fr" | "en" | "es" | "pt";
type Application = "MD.React.Patient" | "MD.React.Medecin" | "MD.React.Admin";

const getApplicationFromEditor = (
  editor: vscode.TextEditor
): Application | undefined => {
  console.log("getApplicationFromEditor");
  const documentPath = editor.document.uri.fsPath;
  const dirName = path.dirname(documentPath);

  const regex = /MD\.React\.[^/]+/;
  const match = dirName.match(regex);

  if (match) {
    return match[0] as Application;
  }
};

const getLanguagesByApp = (
  application: Application
): { key: Lang; flag: any }[] => {
  if (application === "MD.React.Patient") {
    return [
      { key: "fr", flag: "🇫🇷" },
      { key: "en", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { key: "es", flag: "🇪🇸" },
      { key: "pt", flag: "🇵🇹" },
    ];
  } else {
    return [{ key: "fr", flag: "🇫🇷" }];
  }
};

let timeout: NodeJS.Timeout | undefined = undefined;

function loadTranslations(
  editor: vscode.TextEditor,
  lang: Lang
): { [key: string]: string } {
  const documentPath = editor.document.uri.fsPath;
  const dirName = path.dirname(documentPath);

  const translationFilePath = path.join(
    dirName.split("/ClientApp")[0],
    "ClientApp/src/translations/",
    `${lang}.json`
  );

  let translations = {};

  try {
    if (fs.existsSync(translationFilePath)) {
      const fileContents = fs.readFileSync(translationFilePath, "utf8");
      translations = JSON.parse(fileContents);
    } else {
      console.log(`Translation file not found: ${translationFilePath}`);
    }
  } catch (err) {
    console.error(
      `Error loading translation file: ${translationFilePath}`,
      err
    );
  }

  return translations;
}

const decorationType = vscode.window.createTextEditorDecorationType({
  after: {
    margin: "0 0 0 1em",
    textDecoration: "none",
  },
  rangeBehavior: vscode.DecorationRangeBehavior.OpenOpen,
});

function triggerUpdateDecorations(editor: vscode.TextEditor) {
  if (timeout !== undefined) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => applyDecorations(editor), 500); // Attend 500ms avant de recalculer
}

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "intl-custom-translation-helper" is now active!'
  );

  vscode.workspace.onDidOpenTextDocument(
    (document) => {
      const editor = vscode.window.activeTextEditor;
      if (editor && document === editor.document) {
        applyDecorations(editor);
      }
    },
    null,
    context.subscriptions
  );

  if (vscode.window.activeTextEditor) {
    applyDecorations(vscode.window.activeTextEditor);
  }

  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      if (editor) {
        applyDecorations(editor);
      }
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidChangeTextDocument((event) => {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor && event.document === activeEditor.document) {
      triggerUpdateDecorations(activeEditor);
    }
  });
}

function applyDecorations(editor: vscode.TextEditor) {
  const application = getApplicationFromEditor(editor);

  if (!application) {
    return;
  }

  const languages = getLanguagesByApp(application);

  const text = editor.document.getText();
  const regex = /<Translation\s+id=['"][^'"]*['"](?:\s[^>]*)?>/g;
  let matches;
  const decorationOptions: vscode.DecorationOptions[] = [];

  while ((matches = regex.exec(text)) !== null) {
    const matchStart = editor.document.positionAt(matches.index);
    const matchEnd = editor.document.positionAt(
      matches.index + matches[0].length
    );

    const matchText = matches[0];
    const id = matchText.match(/id='([^']*)'/)?.[1] || "";

    const contentTextArray = languages.map((lang) => {
      const countryTranslations = loadTranslations(editor, lang.key);
      let text = "";
      if (countryTranslations) {
        text = `${lang.flag} ${countryTranslations[id] ?? "❌"}`;
      }

      return text;
    });

    const decoration: vscode.DecorationOptions = {
      range: new vscode.Range(matchStart, matchEnd),
      renderOptions: {
        after: {
          contentText: contentTextArray.join(" / "),
          fontWeight: "bold",
          color: "rgba(155, 155, 155, 0.7)",
        },
      },
    };

    decorationOptions.push(decoration);
  }

  editor.setDecorations(decorationType, decorationOptions);
}

export function deactivate() {}
