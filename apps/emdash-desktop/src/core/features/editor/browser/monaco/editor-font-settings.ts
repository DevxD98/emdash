import type { editor } from 'monaco-editor';
import {
  EDITOR_FONT_SIZE_DEFAULT,
  type EditorSettings,
} from '@core/primitives/app-settings/api';

export type EditorFontDefaults = {
  fontFamily: string;
  lineHeight?: number;
};

export type EditorFontOptions = {
  fontFamily: string;
  fontSize: number;
  lineHeight?: number;
};

export function buildEditorFontOptions(
  settings: EditorSettings | undefined,
  defaults: EditorFontDefaults
): EditorFontOptions {
  const fontSize = settings?.fontSize ?? EDITOR_FONT_SIZE_DEFAULT;
  const configuredFontFamily = settings?.fontFamily?.trim();
  const options: EditorFontOptions = {
    fontFamily: configuredFontFamily || defaults.fontFamily,
    fontSize,
  };

  if (defaults.lineHeight !== undefined) {
    // Keep the existing diff spacing at the default size. Let Monaco derive an
    // appropriate line height for custom sizes so larger fonts are not clipped.
    options.lineHeight = fontSize === EDITOR_FONT_SIZE_DEFAULT ? defaults.lineHeight : 0;
  }

  return options;
}

export function updateCodeEditorFontOptions(
  target: Pick<editor.IStandaloneCodeEditor, 'updateOptions'>,
  settings: EditorSettings | undefined,
  defaults: EditorFontDefaults
): void {
  target.updateOptions(buildEditorFontOptions(settings, defaults));
}

export function updateDiffEditorFontOptions(
  target: Pick<editor.IStandaloneDiffEditor, 'updateOptions'>,
  settings: EditorSettings | undefined,
  defaults: EditorFontDefaults
): void {
  target.updateOptions(buildEditorFontOptions(settings, defaults));
}
