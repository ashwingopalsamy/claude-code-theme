import type { SemanticTokenRule, ThemeContext } from '../types';

export function getSemanticTokens(context: ThemeContext): SemanticTokenRule {
  const { palette, options } = context;
  const { syntax } = palette;

  const italicTypes = options.enableItalics ? 'italic' : '';
  const keywordStyle = options.enableItalics && options.italicKeywords ? 'italic' : '';
  const commentStyle = options.enableItalics && options.italicComments ? 'italic' : '';
  const declarationStyle = options.emphasizeDeclarations ? 'bold' : '';

  return {
    class: {
      foreground: syntax.type,
      fontStyle: italicTypes,
    },
    'class.defaultLibrary': {
      foreground: syntax.type,
    },
    enum: {
      foreground: syntax.type,
      fontStyle: italicTypes,
    },
    enumMember: {
      foreground: syntax.constant,
    },
    interface: {
      foreground: syntax.type,
      fontStyle: italicTypes,
    },
    namespace: {
      foreground: syntax.namespace,
      fontStyle: italicTypes,
    },
    type: {
      foreground: syntax.type,
      fontStyle: italicTypes,
    },
    'type.defaultLibrary': {
      foreground: syntax.namespace,
    },
    typeParameter: {
      foreground: syntax.parameter,
      fontStyle: italicTypes,
    },
    function: {
      foreground: syntax.function,
    },
    'function.defaultLibrary': {
      foreground: syntax.namespace,
    },
    method: {
      foreground: syntax.function,
    },
    macro: {
      foreground: syntax.decorator,
    },
    decorator: {
      foreground: syntax.decorator,
      fontStyle: options.enableItalics ? 'italic' : '',
    },
    parameter: {
      foreground: syntax.parameter,
    },
    property: {
      foreground: syntax.property,
    },
    'property.readonly': {
      foreground: syntax.constant,
    },
    variable: {
      foreground: syntax.variable,
    },
    'variable.readonly': {
      foreground: syntax.constant,
    },
    'variable.constant': {
      foreground: syntax.constant,
    },
    'variable.defaultLibrary': {
      foreground: syntax.namespace,
    },
    keyword: {
      foreground: syntax.keyword,
      fontStyle: keywordStyle,
    },
    operator: {
      foreground: syntax.operator,
    },
    string: {
      foreground: syntax.string,
    },
    regexp: {
      foreground: syntax.regexp,
    },
    number: {
      foreground: syntax.number,
    },
    boolean: {
      foreground: syntax.number,
    },
    comment: {
      foreground: syntax.comment,
      fontStyle: commentStyle,
    },
    label: {
      foreground: syntax.namespace,
    },
    event: {
      foreground: syntax.function,
    },
    '*.readonly': {
      foreground: syntax.constant,
    },
    '*.async': {
      fontStyle: options.enableItalics ? 'italic' : '',
    },
    '*.declaration': {
      fontStyle: declarationStyle,
    },
    '*.static': {
      fontStyle: options.enableItalics ? 'italic' : '',
    },
    '*.deprecated': {
      fontStyle: 'strikethrough',
    },
    '*.modification': {
      fontStyle: '',
    },
    '*.documentation': {
      fontStyle: commentStyle,
    },
  };
}
