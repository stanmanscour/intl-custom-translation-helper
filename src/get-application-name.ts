import * as vscode from "vscode";
import * as path from "path";

import { Application } from "./types";

export const getApplicationName = (
  editor: vscode.TextEditor
): Application | undefined => {
  const documentPath = editor.document.uri.fsPath;
  const dirName = path.dirname(documentPath);

  const regex = /MD\.React\.[^/]+/;
  const match = dirName.match(regex);

  if (match) {
    return match[0] as Application;
  }
};
