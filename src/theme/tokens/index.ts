import type { TextmateColors, ThemeContext } from '../../types';

export default function getBaseTokens(context: ThemeContext): TextmateColors {
  const { palette, options } = context;
  const { syntax } = palette;

  const commentStyle = options.enableItalics && options.italicComments ? 'italic' : '';
  const keywordStyle = options.enableItalics && options.italicKeywords
    ? options.emphasizeDeclarations
      ? 'bold italic'
      : 'italic'
    : options.emphasizeDeclarations
      ? 'bold'
      : '';
  const typeStyle = options.enableItalics ? 'italic' : '';

  const baseTokens: TextmateColors = [
    {
      name: 'Comments',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: syntax.comment,
        fontStyle: commentStyle,
      },
    },
    {
      name: 'Keywords and storage',
      scope: [
        'keyword',
        'storage',
        'storage.modifier',
        'storage.type',
        'keyword.control',
        'keyword.operator.word',
      ],
      settings: {
        foreground: syntax.keyword,
        fontStyle: keywordStyle,
      },
    },
    {
      name: 'Operators',
      scope: [
        'keyword.operator',
        'punctuation.separator',
        'punctuation.accessor',
        'punctuation.terminator',
      ],
      settings: {
        foreground: syntax.operator,
      },
    },
    {
      name: 'Variables',
      scope: ['variable', 'variable.other.readwrite'],
      settings: {
        foreground: syntax.variable,
      },
    },
    {
      name: 'Constants',
      scope: [
        'constant',
        'variable.other.constant',
        'entity.name.constant',
        'constant.language',
      ],
      settings: {
        foreground: syntax.constant,
      },
    },
    {
      name: 'Strings',
      scope: ['string', 'string.quoted', 'string.template'],
      settings: {
        foreground: syntax.string,
      },
    },
    {
      name: 'Escapes',
      scope: ['constant.character.escape', 'constant.other.placeholder'],
      settings: {
        foreground: syntax.decorator,
      },
    },
    {
      name: 'Numbers and booleans',
      scope: ['constant.numeric', 'constant.language.boolean'],
      settings: {
        foreground: syntax.number,
      },
    },
    {
      name: 'Functions and calls',
      scope: [
        'entity.name.function',
        'support.function',
        'variable.function',
        'meta.function-call',
      ],
      settings: {
        foreground: syntax.function,
      },
    },
    {
      name: 'Types and classes',
      scope: [
        'entity.name.type',
        'entity.name.class',
        'support.type',
        'support.class',
        'entity.other.inherited-class',
      ],
      settings: {
        foreground: syntax.type,
        fontStyle: typeStyle,
      },
    },
    {
      name: 'Namespaces and modules',
      scope: [
        'entity.name.namespace',
        'entity.name.module',
        'support.class.component',
      ],
      settings: {
        foreground: syntax.namespace,
        fontStyle: typeStyle,
      },
    },
    {
      name: 'Function parameters',
      scope: ['variable.parameter', 'meta.function.parameters variable'],
      settings: {
        foreground: syntax.parameter,
      },
    },
    {
      name: 'Properties and members',
      scope: [
        'variable.other.property',
        'meta.property-name',
        'support.type.property-name',
      ],
      settings: {
        foreground: syntax.property,
      },
    },
    {
      name: 'Punctuation and brackets',
      scope: [
        'punctuation',
        'meta.brace',
        'meta.group',
        'punctuation.definition.parameters',
        'punctuation.definition.arguments',
      ],
      settings: {
        foreground: syntax.punctuation,
      },
    },
    {
      name: 'Decorators and annotations',
      scope: [
        'meta.decorator',
        'meta.annotation',
        'storage.type.annotation',
        'punctuation.decorator',
      ],
      settings: {
        foreground: syntax.decorator,
        fontStyle: options.enableItalics ? 'italic' : '',
      },
    },
    {
      name: 'Regular expressions',
      scope: ['string.regexp', 'constant.regexp', 'keyword.control.anchor.regexp'],
      settings: {
        foreground: syntax.regexp,
      },
    },
    {
      name: 'Markup headings',
      scope: ['markup.heading', 'punctuation.definition.heading'],
      settings: {
        foreground: syntax.namespace,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markup emphasis',
      scope: ['markup.italic', 'markup.bold'],
      settings: {
        foreground: syntax.attribute,
      },
    },
    {
      name: 'Markup links',
      scope: ['markup.underline.link', 'string.other.link', 'meta.link'],
      settings: {
        foreground: syntax.namespace,
        fontStyle: 'underline',
      },
    },
    {
      name: 'Markup code',
      scope: ['markup.inline.raw', 'markup.fenced_code', 'markup.raw'],
      settings: {
        foreground: syntax.string,
      },
    },
    {
      name: 'Markup quote and list',
      scope: ['markup.quote', 'markup.list', 'punctuation.definition.list_item'],
      settings: {
        foreground: syntax.comment,
      },
    },
    {
      name: 'Invalid',
      scope: ['invalid', 'invalid.illegal'],
      settings: {
        foreground: palette.status.error,
        fontStyle: 'underline',
      },
    },
    {
      name: 'Diff inserted',
      scope: ['markup.inserted', 'meta.diff.header.to-file'],
      settings: {
        foreground: palette.git.added,
      },
    },
    {
      name: 'Diff deleted',
      scope: ['markup.deleted', 'meta.diff.header.from-file'],
      settings: {
        foreground: palette.git.deleted,
      },
    },
    {
      name: 'Diff changed',
      scope: ['markup.changed'],
      settings: {
        foreground: palette.git.modified,
      },
    },
  ];

  const jsTsTokens: TextmateColors = [
    {
      name: 'JS/TS keywords',
      scope: [
        'source.ts keyword',
        'source.tsx keyword',
        'source.js keyword',
        'source.jsx keyword',
        'keyword.control.import',
        'keyword.control.export',
      ],
      settings: {
        foreground: syntax.keyword,
        fontStyle: keywordStyle,
      },
    },
    {
      name: 'JS/TS object keys and members',
      scope: [
        'meta.object-literal.key',
        'variable.other.property.ts',
        'variable.other.property.js',
        'meta.object.member.ts',
      ],
      settings: {
        foreground: syntax.property,
      },
    },
    {
      name: 'JS/TS type annotations',
      scope: [
        'meta.type.annotation.ts',
        'meta.return.type.ts',
        'entity.name.type.alias.ts',
      ],
      settings: {
        foreground: syntax.type,
        fontStyle: typeStyle,
      },
    },
    {
      name: 'JS/TS template interpolation',
      scope: [
        'meta.template.expression.ts',
        'meta.template.expression.js',
        'punctuation.definition.template-expression',
      ],
      settings: {
        foreground: syntax.operator,
      },
    },
    {
      name: 'JSX/TSX tags',
      scope: [
        'entity.name.tag.jsx',
        'entity.name.tag.tsx',
        'support.class.component.jsx',
        'support.class.component.tsx',
      ],
      settings: {
        foreground: syntax.tag,
      },
    },
    {
      name: 'JSX/TSX attributes',
      scope: ['entity.other.attribute-name.jsx', 'entity.other.attribute-name.tsx'],
      settings: {
        foreground: syntax.attribute,
      },
    },
  ];

  const goTokens: TextmateColors = [
    {
      name: 'Go declarations',
      scope: [
        'source.go keyword.package',
        'source.go keyword.import',
        'source.go keyword.function',
        'source.go keyword.type',
      ],
      settings: {
        foreground: syntax.keyword,
        fontStyle: keywordStyle,
      },
    },
    {
      name: 'Go package names and imports',
      scope: [
        'source.go entity.name.package.go',
        'source.go meta.import.go entity.name.package.go',
        'source.go meta.import.go string.quoted.go',
      ],
      settings: {
        foreground: syntax.namespace,
      },
    },
    {
      name: 'Go function declarations',
      scope: [
        'source.go entity.name.function.go',
        'source.go meta.function.go entity.name.function.go',
        'source.go meta.function.declaration.go entity.name.function.go',
      ],
      settings: {
        foreground: syntax.function,
        fontStyle: options.emphasizeDeclarations ? 'bold' : '',
      },
    },
    {
      name: 'Go types and interfaces',
      scope: [
        'entity.name.type.go',
        'entity.name.struct.go',
        'entity.name.interface.go',
      ],
      settings: {
        foreground: syntax.type,
        fontStyle: typeStyle,
      },
    },
    {
      name: 'Go receiver and parameters',
      scope: [
        'variable.parameter.receiver.go',
        'meta.function.parameters.go variable.parameter.go',
      ],
      settings: {
        foreground: syntax.parameter,
      },
    },
    {
      name: 'Go struct fields and members',
      scope: ['source.go variable.other.member.go', 'source.go variable.other.field.go'],
      settings: {
        foreground: syntax.property,
      },
    },
    {
      name: 'Go built-ins',
      scope: ['support.function.builtin.go', 'support.type.builtin.go', 'constant.language.go'],
      settings: {
        foreground: syntax.decorator,
      },
    },
    {
      name: 'Go strings and runes',
      scope: ['source.go string.quoted.go', 'source.go constant.other.rune.go'],
      settings: {
        foreground: syntax.string,
      },
    },
  ];

  const pythonTokens: TextmateColors = [
    {
      name: 'Python declarations',
      scope: [
        'source.python keyword.control.import',
        'source.python keyword.control.from',
        'source.python storage.type.function',
        'source.python storage.type.class',
      ],
      settings: {
        foreground: syntax.keyword,
        fontStyle: keywordStyle,
      },
    },
    {
      name: 'Python decorators',
      scope: ['meta.function.decorator.python', 'meta.class.decorator.python'],
      settings: {
        foreground: syntax.decorator,
        fontStyle: options.enableItalics ? 'italic' : '',
      },
    },
    {
      name: 'Python self and cls',
      scope: ['variable.parameter.function.language.special.self.python'],
      settings: {
        foreground: syntax.namespace,
      },
    },
    {
      name: 'Python type hints',
      scope: ['meta.function.parameters.annotations.python', 'meta.type.annotation.python'],
      settings: {
        foreground: syntax.type,
        fontStyle: typeStyle,
      },
    },
    {
      name: 'Python f-string interpolation',
      scope: ['meta.interpolation.python', 'punctuation.definition.interpolation.begin.python'],
      settings: {
        foreground: syntax.operator,
      },
    },
  ];

  const javaTokens: TextmateColors = [
    {
      name: 'Java declarations',
      scope: [
        'source.java keyword.control',
        'source.java storage.modifier',
        'source.java storage.type',
      ],
      settings: {
        foreground: syntax.keyword,
        fontStyle: keywordStyle,
      },
    },
    {
      name: 'Java annotations',
      scope: ['storage.type.annotation.java', 'meta.annotation.java'],
      settings: {
        foreground: syntax.decorator,
      },
    },
    {
      name: 'Java types and generics',
      scope: ['entity.name.type.class.java', 'entity.name.type.interface.java', 'entity.name.type.module.java'],
      settings: {
        foreground: syntax.type,
        fontStyle: typeStyle,
      },
    },
    {
      name: 'Java package and imports',
      scope: ['entity.name.namespace.java', 'meta.import.java entity.name.type.java'],
      settings: {
        foreground: syntax.namespace,
      },
    },
  ];

  const rustTokens: TextmateColors = [
    {
      name: 'Rust keywords',
      scope: [
        'source.rust keyword',
        'source.rust storage.modifier',
        'source.rust storage.type',
      ],
      settings: {
        foreground: syntax.keyword,
        fontStyle: keywordStyle,
      },
    },
    {
      name: 'Rust lifetimes',
      scope: ['entity.name.type.lifetime.rust', 'punctuation.definition.lifetime.rust'],
      settings: {
        foreground: syntax.parameter,
      },
    },
    {
      name: 'Rust macros',
      scope: ['support.macro.rust', 'entity.name.function.macro.rust'],
      settings: {
        foreground: syntax.decorator,
      },
    },
    {
      name: 'Rust traits and types',
      scope: ['entity.name.type.rust', 'entity.name.trait.rust', 'support.type.rust'],
      settings: {
        foreground: syntax.type,
        fontStyle: typeStyle,
      },
    },
  ];

  const webTokens: TextmateColors = [
    {
      name: 'HTML tags',
      scope: ['text.html entity.name.tag', 'punctuation.definition.tag'],
      settings: {
        foreground: syntax.tag,
      },
    },
    {
      name: 'HTML attributes',
      scope: ['text.html entity.other.attribute-name', 'meta.tag entity.other.attribute-name'],
      settings: {
        foreground: syntax.attribute,
      },
    },
    {
      name: 'CSS selectors',
      scope: ['source.css entity.other.attribute-name.class', 'source.css entity.other.attribute-name.id'],
      settings: {
        foreground: syntax.tag,
      },
    },
    {
      name: 'CSS properties',
      scope: ['source.css support.type.property-name', 'source.css meta.property-name'],
      settings: {
        foreground: syntax.property,
      },
    },
    {
      name: 'CSS values and units',
      scope: [
        'source.css support.constant.property-value',
        'source.css constant.numeric',
        'source.css keyword.other.unit',
      ],
      settings: {
        foreground: syntax.number,
      },
    },
    {
      name: 'CSS pseudo selectors',
      scope: ['source.css entity.other.attribute-name.pseudo-class', 'source.css entity.other.attribute-name.pseudo-element'],
      settings: {
        foreground: syntax.keyword,
      },
    },
  ];

  const dataTokens: TextmateColors = [
    {
      name: 'JSON keys',
      scope: [
        'source.json meta.structure.dictionary.json support.type.property-name.json',
        'source.json meta.object-literal.key',
      ],
      settings: {
        foreground: syntax.attribute,
        fontStyle: options.emphasizeDeclarations ? 'bold' : '',
      },
    },
    {
      name: 'JSON strings',
      scope: ['source.json string.quoted.double.json'],
      settings: {
        foreground: syntax.string,
      },
    },
    {
      name: 'JSON numbers, booleans, null',
      scope: [
        'source.json constant.numeric.json',
        'source.json constant.language.boolean.json',
        'source.json constant.language.null.json',
      ],
      settings: {
        foreground: syntax.number,
      },
    },
    {
      name: 'YAML keys',
      scope: ['source.yaml entity.name.tag.yaml', 'source.yaml support.type.property-name.yaml'],
      settings: {
        foreground: syntax.attribute,
        fontStyle: options.emphasizeDeclarations ? 'bold' : '',
      },
    },
    {
      name: 'YAML anchors and aliases',
      scope: ['source.yaml variable.other.alias.yaml', 'source.yaml entity.name.type.anchor.yaml'],
      settings: {
        foreground: syntax.namespace,
      },
    },
    {
      name: 'JSON/YAML punctuation',
      scope: [
        'source.json punctuation',
        'source.yaml punctuation',
        'source.json punctuation.separator.dictionary.key-value.json',
        'source.json punctuation.separator.array.json',
      ],
      settings: {
        foreground: syntax.operator,
      },
    },
  ];

  const markdownTokens: TextmateColors = [
    {
      name: 'Markdown headings',
      scope: ['source.gfm markup.heading', 'text.html.markdown markup.heading'],
      settings: {
        foreground: syntax.keyword,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markdown heading markers',
      scope: ['source.gfm punctuation.definition.heading', 'text.html.markdown punctuation.definition.heading'],
      settings: {
        foreground: syntax.tag,
      },
    },
    {
      name: 'Markdown bold',
      scope: ['source.gfm markup.bold', 'text.html.markdown markup.bold'],
      settings: {
        foreground: syntax.attribute,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markdown italic',
      scope: ['source.gfm markup.italic', 'text.html.markdown markup.italic'],
      settings: {
        foreground: syntax.parameter,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Markdown links',
      scope: [
        'source.gfm markup.underline.link',
        'source.gfm string.other.link.title',
        'source.gfm string.other.link.description',
        'text.html.markdown markup.underline.link',
        'text.html.markdown string.other.link.title',
        'text.html.markdown string.other.link.description',
      ],
      settings: {
        foreground: syntax.namespace,
        fontStyle: 'underline',
      },
    },
    {
      name: 'Markdown link punctuation',
      scope: [
        'source.gfm punctuation.definition.link',
        'source.gfm meta.link punctuation',
        'text.html.markdown punctuation.definition.link',
        'text.html.markdown meta.link punctuation',
      ],
      settings: {
        foreground: syntax.decorator,
      },
    },
    {
      name: 'Markdown inline code',
      scope: ['source.gfm markup.inline.raw', 'text.html.markdown markup.inline.raw'],
      settings: {
        foreground: syntax.string,
      },
    },
    {
      name: 'Markdown fenced code',
      scope: [
        'source.gfm markup.fenced_code',
        'source.gfm punctuation.definition.fenced.markdown',
        'text.html.markdown markup.fenced_code',
      ],
      settings: {
        foreground: syntax.string,
      },
    },
    {
      name: 'Markdown lists and task markers',
      scope: [
        'source.gfm markup.list',
        'source.gfm punctuation.definition.list_item',
        'source.gfm markup.list.numbered.digit.markdown',
        'text.html.markdown markup.list',
        'text.html.markdown punctuation.definition.list.begin.markdown',
      ],
      settings: {
        foreground: syntax.decorator,
      },
    },
    {
      name: 'Markdown quotes',
      scope: [
        'source.gfm markup.quote',
        'source.gfm punctuation.definition.quote.begin.markdown',
        'text.html.markdown markup.quote',
      ],
      settings: {
        foreground: syntax.comment,
      },
    },
    {
      name: 'Markdown separators and escapes',
      scope: ['source.gfm meta.separator.markdown', 'source.gfm constant.character.escape.markdown'],
      settings: {
        foreground: syntax.operator,
      },
    },
  ];

  const sqlTokens: TextmateColors = [
    {
      name: 'SQL keywords',
      scope: [
        'source.sql keyword',
        'keyword.other.DDL.sql',
        'keyword.other.DML.sql',
        'keyword.other.authorization.sql',
      ],
      settings: {
        foreground: syntax.keyword,
        fontStyle: keywordStyle,
      },
    },
    {
      name: 'SQL functions',
      scope: ['source.sql support.function', 'source.sql entity.name.function'],
      settings: {
        foreground: syntax.function,
      },
    },
    {
      name: 'SQL tables and schemas',
      scope: ['source.sql entity.name.table', 'source.sql entity.name.schema'],
      settings: {
        foreground: syntax.type,
        fontStyle: typeStyle,
      },
    },
    {
      name: 'SQL columns and aliases',
      scope: ['source.sql entity.name.column', 'source.sql variable.alias'],
      settings: {
        foreground: syntax.property,
      },
    },
    {
      name: 'SQL literals and operators',
      scope: ['source.sql constant.numeric', 'source.sql string', 'source.sql keyword.operator'],
      settings: {
        foreground: syntax.number,
      },
    },
    {
      name: 'SQL parameters',
      scope: ['source.sql variable.parameter', 'source.sql variable.other'],
      settings: {
        foreground: syntax.parameter,
      },
    },
  ];

  return [
    ...baseTokens,
    ...jsTsTokens,
    ...goTokens,
    ...pythonTokens,
    ...javaTokens,
    ...rustTokens,
    ...webTokens,
    ...dataTokens,
    ...markdownTokens,
    ...sqlTokens,
  ];
}
