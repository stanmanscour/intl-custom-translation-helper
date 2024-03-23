/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const path = __importStar(__webpack_require__(2));
const fs = __importStar(__webpack_require__(3));
const getApplicationFromEditor = (editor) => {
    console.log("getApplicationFromEditor");
    const documentPath = editor.document.uri.fsPath;
    const dirName = path.dirname(documentPath);
    const regex = /MD\.React\.[^/]+/;
    const match = dirName.match(regex);
    if (match) {
        return match[0];
    }
};
const getLanguagesByApp = (application) => {
    if (application === "MD.React.Patient") {
        return [
            { key: "fr", flag: "🇫🇷" },
            { key: "en", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
            { key: "es", flag: "🇪🇸" },
            { key: "pt", flag: "🇵🇹" },
        ];
    }
    else {
        return [{ key: "fr", flag: "🇫🇷" }];
    }
};
let timeout = undefined;
function loadTranslations(editor, lang) {
    const documentPath = editor.document.uri.fsPath;
    const dirName = path.dirname(documentPath);
    const translationFilePath = path.join(dirName.split("/ClientApp")[0], "ClientApp/src/translations/", `${lang}.json`);
    let translations = {};
    try {
        if (fs.existsSync(translationFilePath)) {
            const fileContents = fs.readFileSync(translationFilePath, "utf8");
            translations = JSON.parse(fileContents);
        }
        else {
            console.log(`Translation file not found: ${translationFilePath}`);
        }
    }
    catch (err) {
        console.error(`Error loading translation file: ${translationFilePath}`, err);
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
function triggerUpdateDecorations(editor) {
    if (timeout !== undefined) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(() => applyDecorations(editor), 500); // Attend 500ms avant de recalculer
}
function activate(context) {
    console.log('Congratulations, your extension "intl-custom-translation-helper" is now active!');
    vscode.workspace.onDidOpenTextDocument((document) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && document === editor.document) {
            applyDecorations(editor);
        }
    }, null, context.subscriptions);
    if (vscode.window.activeTextEditor) {
        applyDecorations(vscode.window.activeTextEditor);
    }
    vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
            applyDecorations(editor);
        }
    }, null, context.subscriptions);
    vscode.workspace.onDidChangeTextDocument((event) => {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations(activeEditor);
        }
    });
}
exports.activate = activate;
function applyDecorations(editor) {
    const application = getApplicationFromEditor(editor);
    if (!application) {
        return;
    }
    const languages = getLanguagesByApp(application);
    const text = editor.document.getText();
    const regex = /<Translation\s+id=['"][^'"]*['"](?:\s[^>]*)?>/g;
    let matches;
    const decorationOptions = [];
    while ((matches = regex.exec(text)) !== null) {
        const matchStart = editor.document.positionAt(matches.index);
        const matchEnd = editor.document.positionAt(matches.index + matches[0].length);
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
        const decoration = {
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
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map